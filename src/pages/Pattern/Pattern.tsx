import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DownloadingIcon from '@mui/icons-material/Downloading';
import MenuIcon from '@mui/icons-material/Menu';
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';
import SwitchAccessShortcutAddIcon from '@mui/icons-material/SwitchAccessShortcutAdd';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { Box, Card, CardContent, Chip, Grid, IconButton } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import SearchInputBase from '../../components/components/SearchBox';
import { getAllIndexSensors } from "../../service/indexsensors";
import { IndexSensorsResponse } from "../../service/indexsensors/types";
import { getAverage, getMedian, getStandardDeviation } from "../../utils/Math/Math";
import "./Pattern.css";
import { getAllIndexes } from '../../service/indexes';
import { IndexesResponse } from '../../service/indexes/types';
import { getCorr } from '../../service/corr';
import { getOneIndex } from '../../service/indexes';
import { MultiLineChart } from '../../utils/Charts/MultiLineChart';

export default function Pattern({ handleOpenCloseMenu }: { handleOpenCloseMenu: Function }) {
    const [distincts, setDistincts] = useState<Array<any>>([]);
    const [dates, setDates] = useState<Array<any>>([]);
    const [keyword, setKeyword] = useState("");
    const [indexId, setIndexId] = useState(-1);
    const [targetId, setTargetId] = useState(-1);
    const [indexRecords, setIndexRecords] = useState<IndexSensorsResponse[]>([]);
    const [indexTotal, setIndexTotal] = useState<Array<any>>([]);
    const [loading, setLoading] = useState(-1);
    const [indexes, setIndexes] = useState<IndexesResponse[]>([]);
    const [runTargetId, setRunTargetId] = useState(false);

    const fetchAllIndexes = async () => {
        const data = await getAllIndexes("", 0, 0);
        setIndexes(data);
    };

    const handlePatternSearch = async (keyword: string) => {
        // get indexId by keyword
        const data = await getAllIndexes(keyword, 0, 0);
        if (data) {
            if (data[0]) {
                setIndexTotal([]);
                setKeyword(keyword);
                setIndexId(data[0].id);
                setTargetId(data[0].id);
                setLoading(0);
            }
        }
    }

    const handleMissingRateInAllDistinct = (date: string) => {
        let missing = 0;
        distincts.map((d, index) => {
            const record = indexRecords.filter((record, index) => moment(record.created_at).format('YYYY/MM/DD') === date && record.sensor_id === d.sensor_id)[0];
            if (!record) {
                missing += 1;
            }
        })
        return missing / distincts.length * 100;
    }

    const handleAverageInAllDistinct = (date: string) => {
        let total = 0;
        let length = 0;
        distincts.map((d, index) => {
            const record = indexRecords.filter((record, index) => moment(record.created_at).format('YYYY/MM/DD') === date && record.sensor_id === d)[0];
            if (record) {
                total += record.amount;
                length += 1;
            }
        })

        if (total / length) {
            return total / length;
        }

        return 0;
    }

    const corrCompare = async (id: number) => {
        const A = indexTotal[targetId];
        let B = indexTotal[id];
        B = B.length ? B : [B]

        const corr = await getCorr({
            "A": A.length ? A : [A],
            "B": B
        });
        B["corr"] = corr;
        setIndexTotal(prevState => ({ ...prevState, [id]: B }))
    }

    const processOneIndex = async () => {
        if (loading === 0) {

            // get All sensor records of target Index
            const records = await getAllIndexSensors(indexId, 0, 0);
            setIndexRecords(records);
            setLoading(1);
        }
        else if (loading === 1 && indexRecords.length >= 1) {

            // find All dates and distincts
            let inline_dates: Array<any> = [];
            let inline_distincts: Array<any> = [];
            indexRecords.map((d, index) => {
                const format_date = moment(d.created_at).format('YYYY/MM/DD');
                inline_dates.push(format_date);
                inline_dates.sort((a, b) => +new Date(a) - +new Date(b))
                setDates(Array.from(new Set(inline_dates)));

                inline_distincts.push(d.sensor_id);
                setDistincts(Array.from(new Set(inline_distincts)));
            })
            setLoading(2);
        }
        else if (loading === 2 && dates.length >= 1 && distincts.length >= 1) {

            // All distincts into one array
            let thisIndexTotal: Array<any> = indexTotal[indexId] ?? [];
            dates.map((date, index) => {
                // find same date record in all distinct
                const missingRate = handleMissingRateInAllDistinct(date);
                let average = 0;
                if (missingRate > 40 && index === 0) {
                    let total = 0;
                    // predict from same dataset
                    distincts.map((d, index) => {
                        const record = indexRecords.filter((record, index) => moment(record.created_at).format('YYYY/MM/DD') === date && record.sensor_id === d.sensor_id)[0];
                        if (record) {
                            total += record.amount
                        } else {
                            const records = indexRecords.filter((record, index) => record.sensor_id === d).map((record, index) => record.amount);
                            if (getStandardDeviation(records) > 40) {
                                total += getAverage(records);
                            } else {
                                total += getMedian(records);
                            }
                        }
                    })
                    average = total / distincts.length;
                } else {
                    // missingRate <= 40
                    average = handleAverageInAllDistinct(date);
                }
                thisIndexTotal.push(average);
                setIndexTotal(prevState => ({ ...prevState, [indexId]: thisIndexTotal }));
            })
            setLoading(3);
        }
    }

    const processAllIndexesRelations = () => {
        if (loading === 3) {
            if (!runTargetId && indexTotal[targetId]) {
                setIndexId(0);
                setRunTargetId(true);
            }
            fetchAllIndexes();
            setLoading(4);
        }
        else if (loading === 4 && indexes.length > 1) {
            if ((indexes.length) === (indexId)) {
                setLoading(5);
            } else {
                const new_indexId = indexId + 1;
                setIndexId(new_indexId);
                setLoading(0);
            }
        }
        else if (loading === 5) {
            indexes.map((d, index) => {
                if (indexTotal[d.id]) {
                    corrCompare(d.id);
                }
            })
            setLoading(6);
        }
    }

    useEffect(() => {
        if (loading < 3 && indexId > -1) {
            processOneIndex();
        } else if (loading >= 3) {
            processAllIndexesRelations();
        }
    }, [loading, indexRecords, indexes]);

    useEffect(() => {
        //
    }, [loading])

    return (
        <div className="Dashboad">
            <div id="top_search_fields">
                {/* Search Box */}
                <Grid container>
                    <Grid item xs={12} sm={1} md={1} xl={1} display="flex" justifyContent="center" alignItems="center">
                        <IconButton onClick={() => handleOpenCloseMenu()}>
                            <MenuIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} sm={7} md={7} xl={7} py={3} pl={3}>
                        <SearchInputBase onClick={handlePatternSearch} />
                    </Grid>
                </Grid>

                <Grid container px={3} spacing={2}>
                    <Grid item>
                        <div>
                            <Card>
                                <CardContent>
                                    <Box p={2} className="pattern-card-icon-style strong-positive">
                                        <SwitchAccessShortcutAddIcon />
                                    </Box>
                                </CardContent>
                                <Box px={4}>
                                    <h4>Strong Positive</h4>
                                </Box>
                            </Card>
                        </div>
                    </Grid>

                    <Grid item>
                        <div>
                            <Card>
                                <CardContent>
                                    <Box p={2} className="pattern-card-icon-style weak-positive">
                                        <SwitchAccessShortcutIcon />
                                    </Box>
                                </CardContent>
                                <Box px={4}>
                                    <h4>Weak Positive</h4>
                                </Box>
                            </Card>
                        </div>
                    </Grid>

                    <Grid item>
                        <div>
                            <Card>
                                <CardContent>
                                    <Box p={2} className="pattern-card-icon-style strong-negative">
                                        <TrendingDownIcon />
                                    </Box>
                                </CardContent>
                                <Box px={4}>
                                    <h4>Strong Negative</h4>
                                </Box>
                            </Card>
                        </div>
                    </Grid>

                    <Grid item>
                        <div>
                            <Card>
                                <CardContent>
                                    <Box p={2} className="pattern-card-icon-style weak-negative">
                                        <ArrowDownwardIcon />
                                    </Box>
                                </CardContent>
                                <Box px={4}>
                                    <h4>Weak Negative</h4>
                                </Box>
                            </Card>
                        </div>
                    </Grid>

                    <Grid item>
                        <div>
                            <Card>
                                <CardContent>
                                    <Box p={2} className="pattern-card-icon-style moderate-negative">
                                        <DownloadingIcon />
                                    </Box>
                                </CardContent>
                                <Box px={4}>
                                    <h4>Moderate Negative</h4>
                                </Box>
                            </Card>
                        </div>
                    </Grid>

                    <Grid item>
                        <div>
                            <Card>
                                <CardContent>
                                    <Box p={2} className="pattern-card-icon-style">
                                        <DownloadingIcon />
                                    </Box>
                                </CardContent>
                                <Box px={4}>
                                    <h4>No Correlation</h4>
                                </Box>
                            </Card>
                        </div>
                    </Grid>
                </Grid>
            </div>

            <div className="bottom-pattern-result">
                <Grid container p={2} spacing={2}>
                    <Grid item xs={12} sm={5} md={5} xl={5}>
                        <SearchInputBase onClick={handlePatternSearch} />
                    </Grid>
                    <Grid item xs={12} sm={7} md={7} xl={7}></Grid>

                    {
                        indexTotal[indexId] ?
                            (indexes.map((d, index) => {
                                const corr = indexTotal[d.id]?.corr;
                                let label = "";
                                type colors = "default" | "success" | "warning" | "primary" | "error" | "secondary" | "info";
                                let color: colors = "default";
                                if (corr > 0.5 && corr < 1) {
                                    label = "Strong Positive";
                                    color = "success";
                                }
                                else if (corr > 0 && corr < 0.5) {
                                    label = "Weak Positive";
                                    color = "warning";
                                }
                                else if (corr < 0 && corr > -0.5) {
                                    label = "Weak Negative";
                                    color = "primary";
                                }
                                else if (corr < -0.5 && corr > -1) {
                                    label = "Strong Negative";
                                    color = "error";
                                }
                                else if (corr === 0) {
                                    label = "No Correlation";
                                    color = "default";
                                } else {
                                    label = "No Data";
                                }

                                // console.log(indexTotal[d.id]);
                                console.log(indexTotal);
                                const chartData = {
                                    data: [indexTotal[d.id] ?? [], indexTotal[targetId]],
                                    label: Array.apply(0, Array(indexTotal[targetId].length)).map(function (x, i) { return i; }),
                                    labelName: [d.name, keyword]
                                };
                                if (d.id !== targetId) {
                                    return (
                                        <Grid item key={d.id}>
                                            <Card>
                                                <CardContent>
                                                    <h5>{d.name} &nbsp;<Chip label={label} color={color} variant="outlined" /></h5>
                                                    <MultiLineChart data={chartData} chartOptions={{
                                                        scalesYDisplay: false,
                                                        scalesXDisplay: false,
                                                        datalabelsDisplay: false, 
                                                        legendDisplay: true
                                                    }} />
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    );
                                }
                            }
                            ))
                            : <></>
                    }
                </Grid>
            </div>
        </div>
    );
}
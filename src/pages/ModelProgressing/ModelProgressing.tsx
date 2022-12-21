import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Button, Card, CardContent, Chip, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ProgressBar } from 'react-loader-spinner';
import { getOneIndex } from "../../service/indexes";
import { IndexesResponse } from "../../service/indexes/types";
import { getAllIndexSensors } from "../../service/indexsensors";
import { IndexSensorsResponse } from "../../service/indexsensors/types";
import { ModelsResponse } from "../../service/models/types";
import { getAllSensors } from "../../service/sensors";
import { SensorsResponse } from "../../service/sensors/types";
import { getAverage, getMedian, getStandardDeviation, processFormula } from "../../utils/Math/Math";
import "./ModelProgressing.css";
import SelectCheckBox from "./SelectCheckBox/SelectCheckBox";
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import moment from 'moment';

const Title = () => {
    return (
        <>
            <h5>Auto Complete</h5>
            <>Description Image</>
        </>
    );
}

type Props = {
    currentLoaded: number,
    targetLoaded: number,
    noRecord: boolean,
    finished: number,
    children: JSX.Element
}

const Loader = ({ currentLoaded, targetLoaded, finished, noRecord, children }: Props) => {
    if (noRecord) {
        return (
            <>No Record Found</>
        );
    }
    if (finished) {
        if (currentLoaded >= finished) {
            return <></>
        }
    }

    if (currentLoaded > targetLoaded) {
        return children
    }
    else if (currentLoaded === targetLoaded) {
        return <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor='#F4442E'
            barColor='#51E5FF'
        />
    }
    return <></>
}

export default function ModelProgressing({ modelDetails, handleSwitchToModelDetails }: { modelDetails: ModelsResponse | undefined, handleSwitchToModelDetails: Function }) {
    const [loading, setLoading] = useState(-1);
    const [indexes, setIndexes] = useState<JSON>();
    const [processingIndex, setProcessingIndex] = useState(1);
    const [processingIndexId, setProcessingIndexId] = useState(-1);
    const [indexDetails, setIndexDetails] = useState<IndexesResponse>();
    const [indexRecords, setIndexRecords] = useState<IndexSensorsResponse[]>([]);
    const [indexNoRecords, setIndexNoRecords] = useState(false);
    const [distincts, setDistincts] = useState<Array<any>>([]);
    const [dates, setDates] = useState<Array<any>>([]);
    const [sensors, setSensors] = useState<SensorsResponse[]>([]);
    const [selectAllChecked, setSelectAllChecked] = useState(true);
    const [selectDistinctChecked, setSelectDistinctChecked] = useState([true, true]);
    const [indexTotal, setIndexTotal] = useState<Array<any>>([]);
    const [processFormulaResult, setProcessFormulaResult] = useState<Array<any>>([]);

    const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectAllChecked(event.target.checked);
    };

    const handleSelectDistinctChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        setSelectDistinctChecked(prevState => ({ ...prevState, [index]: event.target.checked }))
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
            const record = indexRecords.filter((record, index) => moment(record.created_at).format('YYYY/MM/DD') === date && record.sensor_id === d.sensor_id)[0];
            if (record) {
                total += record.amount;
                length += 1;
            }
        })
        return total / length;
    }

    const fetchIndexDetails = async (id: number) => {
        const data = await getOneIndex(id);
        setIndexDetails(data);
    };

    const fetchIndexRecords = async () => {
        const data = await getAllIndexSensors(processingIndexId, 0, 0);
        setIndexRecords(data);
        if (!data) {
            setIndexNoRecords(true);
        }
    }

    const fetchSensorLocation = async () => {
        const data = await getAllSensors("", 0, 0);
        setSensors(data);
    }

    const handleProcessing = () => {
        if (indexes && loading === -1) {
            // set processing index
            Object.values(indexes).map((d, index) => {
                if (d.formula_id === processingIndex) {
                    setProcessingIndexId(d.index_id);
                    fetchIndexDetails(d.index_id);
                    setLoading(0);
                }
            })
        } else if (indexRecords.length < 1 && loading === 0) {
            fetchIndexRecords();
        } else if (loading === 0 && indexNoRecords) {
            //
        } else if (indexRecords.length >= 1 && loading === 0) {
            // find number of distincts and dates
            let distincts: Array<any> = [];
            let dates: Array<any> = [];
            indexRecords.map((d, index) => {
                distincts.push(d.sensor_id);
                const format_date = moment(d.created_at).format('YYYY/MM/DD');
                dates.push(format_date);
            })
            setDistincts(Array.from(new Set(distincts)));
            setDates(Array.from(new Set(dates)));
            setLoading(1);
            fetchSensorLocation();
        } else if (sensors.length >= 1 && loading === 1) {
            // find sensors name for user to select
            setDistincts(
                distincts.map((d, index) => ({
                    sensor_id: d,
                    name: sensors.filter((sensor, index) => sensor.id === d)[0].distinct
                }))
            );
            setLoading(2);
        } else if (loading === 2) {
            // find missing values in each distinct
            setDistincts(distincts.map((d, index) => {
                let missing = 0;
                let id = d.sensor_id;

                dates.map((date, index) => {
                    const find_missing = indexRecords.filter((record, index) => moment(record.created_at).format('YYYY/MM/DD') === date && record.sensor_id === id)[0];
                    if (!find_missing) {
                        missing += 1;
                    }
                })

                return ({
                    sensor_id: d.sensor_id,
                    name: d.name,
                    missing: missing
                })
            }))
            setLoading(3);
        } else if (loading === 4) {
            let thisIndexTotal: Array<any> = indexTotal[processingIndex] ?? [];
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
                            const records = indexRecords.filter((record, index) => record.sensor_id === d.sensor_id).map((record, index) => record.amount);
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
            })
            setIndexTotal(prevState => ({ ...prevState, [processingIndex]: thisIndexTotal }));
            setLoading(5);
        } else if (loading === 5 && indexes) {
            console.log(indexTotal);
            // load next index
            if (processingIndex < Object.values(indexes).length) {
                setProcessingIndex(processingIndex + 1);
                setLoading(-1);
            } else {
                setLoading(6);
            }
        } else if (loading === 6 && indexes) {
            const formula = modelDetails?.formula;

            dates.map((date, index) => {
                let indexList: Array<any> = [];
                console.log("Processing date" + (index + 1));
                Object.values(indexes).map((d) => {
                    indexList[d.formula_id - 1] = indexTotal[d.formula_id][index]
                })
                const result = processFormula(formula ?? "", indexList);
                processFormulaResult.push({
                    amount: result,
                    created_at: date
                });
                setProcessFormulaResult(processFormulaResult);
            })
            setLoading(7);
        }
        else if (loading === 7) {
            handleSwitchToModelDetails(modelDetails, processFormulaResult);
        }
        else {
            console.log("do nothing");
        }
    }

    useEffect(() => {
        if (!indexes) {
            setIndexes(modelDetails?.indexes);
        }
        handleProcessing();
    }, [indexes, indexRecords, sensors, loading]);

    if (indexes) {
        return (
            <>
                <Title />
                <Card>
                    <CardContent>
                        <h5>{Object.values(indexes).length} Indexes Found</h5>
                        <div className="text--light">Index {processingIndex} <div className="index-name">&nbsp; {indexDetails?.name}</div></div>

                        <Loader currentLoaded={loading} targetLoaded={0} noRecord={indexNoRecords} finished={0}>
                            <>
                                <Box p={1} m={1} className="data-found--box" display="flex" justifyItems="center" alignItems="center">
                                    <LocationOnIcon />&nbsp;{distincts.length} Distinct Found
                                </Box>
                                <Box p={1} m={1} className="data-found--box">
                                    <Box p={1} m={1} className="data-found--box" display="flex" justifyItems="center" alignItems="center">
                                        <InsertInvitationIcon />&nbsp;{dates.length} Date Found
                                    </Box>

                                    <Grid container ml={1} spacing={1}>
                                        {
                                            dates.map((date, index) => <Grid item><Chip label={moment(date).format('YYYY/MM/DD')} /></Grid>)
                                        }
                                    </Grid>
                                </Box>
                            </>
                        </Loader>

                        <Loader currentLoaded={loading} targetLoaded={1} noRecord={indexNoRecords} finished={0}>
                            <Box mb={3}>
                                <Grid container
                                    direction="row"
                                    justifyContent="flex-end"
                                    alignItems="center">
                                    <SelectCheckBox label="SELECT ALL" checked={selectAllChecked} handleOnChange={handleSelectAllChange} />
                                </Grid>
                                <Grid container spacing={3} px={2}>
                                    {
                                        distincts.map((d, index) => (
                                            <Grid item key={index}>
                                                <SelectCheckBox label="" checked={selectDistinctChecked[index]} handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSelectDistinctChange(e, index)} />
                                                <Typography variant="caption">Sensor ID: {d?.sensor_id}</Typography>
                                                <Typography variant="h6">{d?.name}</Typography>
                                                <Chip label={"Missing: " + d?.missing} variant="outlined" />
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </Box>
                        </Loader>
                        <Loader currentLoaded={loading} targetLoaded={2} noRecord={indexNoRecords} finished={5}>
                            <Grid container
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                                mt={1}>
                                <Button variant="contained" className="process-button" onClick={() => setLoading(4)}>Process</Button>
                            </Grid>
                        </Loader>

                        <Loader currentLoaded={loading} targetLoaded={5} noRecord={indexNoRecords} finished={0}>
                            <div className="formula--text">Formula: {modelDetails?.formula}</div>
                        </Loader>

                        <Loader currentLoaded={loading} targetLoaded={6} noRecord={indexNoRecords} finished={0}>
                            <></>
                        </Loader>
                    </CardContent>
                </Card>
            </>
        );
    }
    return (
        <>Indexes Not Found</>
    );
}
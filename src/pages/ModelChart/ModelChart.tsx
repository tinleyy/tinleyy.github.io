import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Box, Button, Card, Grid } from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from "moment";
import { useEffect, useState } from "react";
import { indexesInOneChart } from "../../service/general";
import { getIndexsensorsGraphdata } from "../../service/indexsensors";
import { IndexSensorsResponse, MathResponse } from "../../service/indexsensors/types";
import { ModelsResponse } from "../../service/models/types";
import { AreaChart } from "../../utils/Charts/AreaChart";
import { MultiLineChart } from "../../utils/Charts/MultiLineChart";
import PageContainer from '../../components/containers/PageContainer';
import "./ModelChart.css";

export default function ModelChart({ details, modelChartData, indexesInOneChartData, handleBackToHome }: { details: ModelsResponse | undefined, modelChartData: Array<any>, indexesInOneChartData: indexesInOneChart | undefined, handleBackToHome: Function }) {
    const [startDate, setStartDate] = useState("1971-01-01 00:00:00");
    const [endDate, setEndDate] = useState("2025-12-31 23:59:59");
    const [graphData, setGraphData] = useState<IndexSensorsResponse[]>([]);
    const [mathData, setMathData] = useState<MathResponse | null>();
    const [updated, setUpdated] = useState(0);

    const [indexesChartData, setIndexesChartData] = useState<Array<any>>([]);

    const [methodSkip, setMethodSkip] = useState(0);
    const [methodLimit, setMethodLimit] = useState(1);
    const pageTitle = ["Summarize Indexes in one chart", "All Indexes"];

    useEffect(() => {
        console.log(modelChartData);
        const indexes = details?.indexes;
        if (indexes && indexesChartData.length < 1) {
            let curr: Array<any> = [];
            Object.values(indexes).map(async (d, index) => {
                const data = await getIndexsensorsGraphdata(d.index_id, null, startDate, endDate);
                // console.log(data)
                data?.data.map((dd) => {
                    curr.push(dd);
                    setIndexesChartData(curr);
                })

                if (index === Object.values(indexes).length - 1) {
                    setUpdated(1);
                }
            });
        }
    }, []);

    const [tbArr, setTbArr] = useState<Array<any>>([]);

    useEffect(() => {
        if (updated === 1) {
            const unique_date = Array.from(new Set(indexesChartData.map(item => item.created_at)));
            const unique_sensor_id = Array.from(new Set(indexesChartData.map(item => item.sensor_id)));

            let di = 0;
            let si = 0;
            let arr: Array<any> = [];
            let tblength = unique_sensor_id.length * unique_date.length;
            for (let index = 0; index < tblength; index++) {
                if (si === unique_sensor_id.length - 1 && index !== 0) {
                    // show all sensor in same date
                    // * sensor length
                    di += 1;
                    si = 0;
                }

                arr.push({
                    date: unique_date[di],
                    sensor_id: unique_sensor_id[si]
                })

                if(!(unique_sensor_id.length === 1)){
                    si += 1;
                }

            }
            setTbArr(arr);
            setUpdated(2);
        } else if (updated === 3) {
            console.log(tbArr);
            setUpdated(2);
        }

    }, [updated])

    if (details) {
        return (
            <div className="Dashboad">
                <Box py={2}>
                    <Grid container alignItems="center" spacing={2} mb={1}>
                        <Grid item>
                            <Button variant="outlined" onClick={() => handleBackToHome()} className="back-to-home-button">
                                <ArrowLeftIcon />
                            </Button>
                        </Grid>
                        <Grid item>
                            <h3>{details.name}</h3>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} justifyItems="center" mb={1}>
                        <Grid item xs={12} sm={12} md={12} xl={12}>
                            {/* <Grid container justifyContent="center" spacing={1} mb={1}>
                                <Card>
                                    <Box px={2} pb={1}>
                                        <h5>Toolbar</h5>
                                        <Grid container spacing={1} justifyContent="center" alignItems="center">
                                            <Grid item>
                                                <ToggleDayTimeButton />
                                            </Grid>
                                            <Grid item>
                                                <ToggleChartButton />
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" className="toolbar_button sigma">
                                                    +2 Sigma
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" className="toolbar_button normaldis">
                                                    Normal Distribution
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Card>
                            </Grid> */}

                            <Box display="flex" justifyContent="end" alignContent="center" px={3}>
                                <h5>
                                    {pageTitle[methodSkip === 0 ? 0 : methodSkip]}
                                </h5>
                                <Button onClick={() => setMethodSkip(methodSkip - 1)} disabled={!methodSkip ? true : false}>
                                    <ArrowCircleLeftIcon />
                                </Button>
                                <Button onClick={() => setMethodSkip(methodSkip + 1)} disabled={methodSkip === pageTitle.length - 1 ? true : false}>
                                    <ArrowCircleRightIcon />
                                </Button>
                                <h5>Next: &nbsp;
                                    {pageTitle[methodSkip + 1]}
                                </h5>
                            </Box>
                            <Grid container spacing={1}>
                                <PageContainer currentPage={methodSkip} targetPage={0}>
                                    <Grid item xs={12} sm={12} md={12} xl={12}>
                                        <Card>
                                            <Grid container justifyContent="center" p={2} height={450}>
                                                <AreaChart data={modelChartData} chartOptions={{ scalesYDisplay: false, scalesXDisplay: true, datalabelsDisplay: true, legendDisplay: false }} fillArea={false} showLine={true} standard={0} showHighestBox={true} />
                                            </Grid>
                                        </Card>
                                    </Grid>
                                </PageContainer>
                                <PageContainer currentPage={methodSkip} targetPage={1}>
                                    <Grid item xs={12} sm={12} md={12} xl={12}>
                                        <Card>
                                            <Grid container justifyContent="center" p={2} height={450}>
                                                <MultiLineChart data={indexesInOneChartData} chartOptions={{ scalesYDisplay: true, scalesXDisplay: true, datalabelsDisplay: false, legendDisplay: true }} />
                                            </Grid>
                                        </Card>
                                    </Grid>
                                </PageContainer>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Button onClick={() => setUpdated(3)}>
                            Refresh
                        </Button>
                    </Grid>

                    <TableContainer component={Paper} sx={{ maxHeight: '30vh', bottom: 0, position: "absolute" }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Sensor Id</TableCell>
                                    {
                                        Object.values(details?.indexes).map((d, i) =>
                                            <TableCell key={i}>Index #{d.index_id}</TableCell>
                                        )
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    updated === 2 ? tbArr.map((tb, index) =>
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {moment(tb.date).format('YYYY-MM-DD hh:mm:ss')}
                                            </TableCell>
                                            <TableCell>{tb.sensor_id}</TableCell>
                                            {
                                                Object.values(details?.indexes).map((detail, i) => {
                                                    var data_found = false;
                                                    return indexesChartData.map((c, index) => {
                                                        if (c.created_at === tb.date && c.sensor_id === tb.sensor_id && c.index_id === detail.index_id) {
                                                            data_found = true;
                                                            return <TableCell key={index}>{c.amount}</TableCell>
                                                        }

                                                        if (index == (indexesChartData.length - 1) && !data_found) {
                                                            return <TableCell key={index}>NA</TableCell>
                                                        }
                                                    })
                                                })
                                            }
                                        </TableRow>
                                    ) : <></>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </div>
        );
    }
    return <></>
}
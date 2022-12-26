import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from "react";
import { indexesInOneChart } from "../../service/general";
import { getIndexsensorsGraphdata } from "../../service/indexsensors";
import { IndexSensorsResponse, MathResponse } from "../../service/indexsensors/types";
import { ModelsResponse } from "../../service/models/types";
import { AreaChart } from "../../utils/Charts/AreaChart";
import { MultiLineChart } from "../../utils/Charts/MultiLineChart";
import "./ModelChart.css";
import ToggleChartButton from "./ToggleChartButton/ToggleChartButton";
import ToggleDayTimeButton from "./ToggleDayTimeButton/ToggleDayTimeButton";
import moment from "moment";

export default function ModelChart({ details, modelChartData, indexesInOneChartData, handleBackToHome }: { details: ModelsResponse | undefined, modelChartData: Array<any>, indexesInOneChartData: indexesInOneChart | undefined, handleBackToHome: Function }) {
    const [startDate, setStartDate] = useState("2020-01-01 00:00:00");
    const [endDate, setEndDate] = useState("2022-12-31 23:59:59");
    const [graphData, setGraphData] = useState<IndexSensorsResponse[]>([]);
    const [mathData, setMathData] = useState<MathResponse | null>();
    const [updated, setUpdated] = useState(false);

    const [indexesChartData, setIndexesChartData] = useState<Array<any>>([]);
    const fetchIndexesInChart = () => {
        const indexes = details?.indexes;
        if (indexes) {
            Object.values(indexes).map(async (d, index) => {
                const data = await getIndexsensorsGraphdata(d.index_id, null, startDate, endDate);
                data?.data.map((d) => {
                    setIndexesChartData(prevState => [...prevState, d]);
                })
                setUpdated(!updated);
            });
        }
    }

    useEffect(() => {
        fetchIndexesInChart();
    }, []);

    useEffect(() => {
        console.log(indexesChartData);
    }, [updated]);

    if (details) {
        return (
            <div className="Dashboad">
                <Box p={2}>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={2} sm={2} md={2} xl={2}>
                            <Button variant="outlined" onClick={() => handleBackToHome()}>
                                <ArrowLeftIcon />
                            </Button>
                        </Grid>
                        <Grid item xs={10} sm={10} md={10} xl={10} alignItems="center" justifyItems="center">
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

                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6} md={6} xl={6}>
                                    <Card>
                                        <Grid container justifyContent="center" p={2}>
                                            <AreaChart data={modelChartData} chartOptions={{ scalesYDisplay: false, scalesXDisplay: true, datalabelsDisplay: false, legendDisplay: false }} fillArea={false} showLine={true} standard={0} showHighestBox={false} />
                                        </Grid>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} xl={6}>
                                    <Card>
                                        <Grid container justifyContent="center" p={2}>
                                            <MultiLineChart data={indexesInOneChartData} chartOptions={{ scalesYDisplay: true, scalesXDisplay: true, datalabelsDisplay: false, legendDisplay: true }} />
                                        </Grid>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>


                    <TableContainer component={Paper} sx={{ maxHeight: '30vh' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Index</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell>CreateAt</TableCell>
                                    <TableCell>UpdateAt</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    indexesChartData.map((d, index) =>
                                        <TableRow
                                            key={d.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {d.id}
                                            </TableCell>
                                            <TableCell>{d.amount}</TableCell>
                                            <TableCell>{d.index_id}</TableCell>
                                            <TableCell>{d.sensor_id}</TableCell>
                                            <TableCell>{moment(d.created_at).format('YYYY/MM/DD hh:mm:ss')}</TableCell>
                                            <TableCell>{moment(d.updated_at).format('YYYY/MM/DD hh:mm:ss')}</TableCell>
                                        </TableRow>
                                    )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </div>
        );
    }
    return <></>
}
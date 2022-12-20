import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Box, Button, Grid, Card, CardContent } from "@mui/material";
import ButtonGroup from '@mui/material/ButtonGroup';
import { IndexesResponse } from "../../service/indexes/types";
import { ModelsResponse } from "../../service/models/types";
import { AreaChart } from "../../utils/Charts/AreaChart";
import IndexTable from "./Table/Table";
import ToggleChartButton from "./ToggleChartButton/ToggleChartButton";
import ToggleDayTimeButton from "./ToggleDayTimeButton/ToggleDayTimeButton";
import LocationSelector from "./LocationSelector/LocationSelector";
import { Typography } from "@mui/material";
import "./ModelChart.css";
import { useEffect, useState } from "react";
import { getIndexsensorsGraphdata } from "../../service/indexsensors";
import { MathResponse, IndexSensorsResponse } from "../../service/indexsensors/types";

export default function ModelChart({ details, modelChartData, handleBackToHome }: { details: IndexesResponse | ModelsResponse | null, modelChartData: Array<any>, handleBackToHome: Function }) {
    const [startDate, setStartDate] = useState("2022-01-01 00:00:00");
    const [endDate, setEndDate] = useState("2022-12-31 23:59:59");
    const [graphData, setGraphData] = useState<IndexSensorsResponse[]>([]);
    const [mathData, setMathData] = useState<MathResponse | null>();

    const fetchGraphData = async (sensorId: number | null) => {
        const data = await getIndexsensorsGraphdata(details?.id || 0, sensorId ?? null, startDate, endDate);
        setGraphData(data.data);
        setMathData(data.math);
    };

    useEffect(() => {
        console.log(modelChartData);
        console.log(details);
        // if(graphData.length < 1){
        //     fetchGraphData(null);
        // }
    }, []);

    if (details) {
        return (
            <div className="Dashboad">
                <Box p={2}>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                            <Button variant="outlined" onClick={() => handleBackToHome()}>
                                <ArrowLeftIcon />
                            </Button>
                        </Grid>
                        <Grid item>
                            <h3>{details.name}</h3>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} justifyItems="center" mb={1}>
                        <Grid item xs={12} sm={12} md={12} xl={12}>
                            <Grid container justifyContent="center" spacing={1} mb={1}>
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
                            </Grid>

                            <Grid container>
                                <Grid item>
                                    <Card>
                                        <Grid container justifyContent="center">
                                            <AreaChart data={modelChartData} />
                                        </Grid>
                                        <Grid container justifyContent="center" alignItems="center" spacing={1} mb={2}>
                                            <Grid item className="chart-date-font-size-small">
                                                <Typography className="left">{startDate}</Typography>
                                            </Grid>
                                            <Grid item>
                                                <h5>Highest</h5>
                                                <span>{mathData?.highest}</span>
                                            </Grid>
                                            <Grid item>
                                                <h5>Lowest</h5>
                                                <span>{mathData?.lowest}</span>
                                            </Grid>
                                            <Grid item>
                                                <h5>Medium</h5>
                                                <span>{mathData?.average}</span>
                                            </Grid>
                                            <Grid item className="chart-date-font-size-small right">
                                                {endDate}
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                                <Grid item>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        );
    }
    return <></>
}
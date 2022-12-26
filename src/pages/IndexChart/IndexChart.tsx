import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { IndexesResponse } from "../../service/indexes/types";
import { getIndexsensorsGraphdata } from "../../service/indexsensors";
import { IndexSensorsResponse, MathResponse } from "../../service/indexsensors/types";
import { AreaChart } from "../../utils/Charts/AreaChart";
import "./IndexChart.css";
import LocationSelector from "./LocationSelector/LocationSelector";
import IndexTable from "./Table/Table";
import ToggleChartButton from "./ToggleChartButton/ToggleChartButton";
import ToggleDayTimeButton from "./ToggleDayTimeButton/ToggleDayTimeButton";
import ToggleMoreButton from "./ToggleMoreButton/ToggleMoreButton";
import HeatMap from "./HeapMap/HeapMeap";

export default function IndexChart({ details, handleBackToHome }: { details: IndexesResponse | undefined, handleBackToHome: Function }) {
    const [startDate, setStartDate] = useState("1972-01-01 00:00:00");
    const [endDate, setEndDate] = useState("2022-12-31 23:59:59");
    const [graphData, setGraphData] = useState<IndexSensorsResponse[]>([]);
    const [mathData, setMathData] = useState<MathResponse | null>();
    const [updated, setUpdated] = useState(true);

    const fetchGraphData = async (sensorId: number | null) => {
        const data = await getIndexsensorsGraphdata(details?.id || 0, sensorId ?? null, startDate, endDate);
        setGraphData(data.data);
        setMathData(data.math);
        setUpdated(false);

        setShowLine(true);
        setChartType('line_chart');
        if (sensorId !== -1 && sensorId !== null) {
            setFillArea(true);
            setDatalabelsDisplay(true);
        } else {
            setFillArea(false);
            setDatalabelsDisplay(false);
        }
    };

    const [selectedDayTime, setSelectedDayTime] = useState('All');
    const [fillArea, setFillArea] = useState(false);
    const [showLine, setShowLine] = useState(true);
    const [datalabelsDisplay, setDatalabelsDisplay] = useState(false);
    const handleDayTimeChange = (
        event: React.MouseEvent<HTMLElement>,
        newSelected: string,
    ) => {
        setSelectedDayTime(newSelected);

        let startDate = "";
        let endDate = moment().format("YYYY-MM-DD 23:59:59");
        if (newSelected === "1D") {
            startDate = moment().add(-1, 'days').format("YYYY-MM-DD 00:00:00");
        }
        else if (newSelected === "5D") {
            startDate = moment().add(-5, 'days').format("YYYY-MM-DD 00:00:00");
        }
        else if (newSelected === "1M") {
            startDate = moment().add(-1, 'months').format("YYYY-MM-DD 00:00:00");
        }
        else if (newSelected === "3M") {
            startDate = moment().add(-3, 'months').format("YYYY-MM-DD 00:00:00");
        }
        else if (newSelected === "6M") {
            startDate = moment().add(-6, 'months').format("YYYY-MM-DD 00:00:00");
        }
        else if (newSelected === "YTD") {
            startDate = moment().add(-1, 'years').format("YYYY-MM-DD 00:00:00");
        }
        else if (newSelected === "1Y") {
            startDate = moment().add(-1, 'years').format("YYYY-MM-DD 00:00:00");
        }
        else if (newSelected === "2Y") {
            startDate = moment().add(-2, 'years').format("YYYY-MM-DD 00:00:00");
        }
        else if (newSelected === "3Y") {
            startDate = moment().add(-3, 'years').format("YYYY-MM-DD 00:00:00");
        }
        else if (newSelected === "5Y") {
            startDate = moment().add(-5, 'years').format("YYYY-MM-DD 00:00:00");
        }
        else {
            endDate = "";
        }
        setStartDate(startDate);
        setEndDate(endDate);
        setUpdated(true);
    };

    const [chartType, setChartType] = useState('line_chart');
    const handleChartTypeChange = (
        event: React.MouseEvent<HTMLElement>,
        newChartType: string,
    ) => {
        if (newChartType === "scatter_chart") {
            setShowLine(false);
            setFillArea(false);
        }
        else if (newChartType === "line_chart") {
            setShowLine(true);
        }
        setChartType(newChartType);
    };

    useEffect(() => {
        if (updated) {
            fetchGraphData(null);
        }
    }, [updated, graphData, mathData]);

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
                        <Grid item xs={12} sm={9} md={9} xl={9}>
                            <div>
                                <Card>
                                    <Grid container justifyContent="center" alignItems="center" spacing={1} mb={2}>
                                        <Grid item xs={12} sm={4} md={4} xl={4} className="chart-info-dates">
                                            <h5>Start Date</h5>
                                            <Typography className="left chart-date-font-size-small">{startDate}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={1} md={1} xl={1}>
                                            <h5>Highest</h5>
                                            <span>{mathData?.highest}</span>
                                        </Grid>
                                        <Grid item xs={12} sm={1} md={1} xl={1}>
                                            <h5>Lowest</h5>
                                            <span>{mathData?.lowest}</span>
                                        </Grid>
                                        <Grid item xs={12} sm={1} md={1} xl={1}>
                                            <h5>Average</h5>
                                            <span>{mathData?.average}</span>
                                        </Grid>
                                        <Grid item xs={12} sm={4} md={4} xl={4} className="chart-info-dates">
                                            <h5>End Date</h5>
                                            <Typography className="left chart-date-font-size-small">{endDate}</Typography>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </div>
                            <Card>
                                <Box p={2} pb={1}>
                                    <Grid container spacing={1} justifyContent="center" alignItems="center" className="toggle-buttons-bar">
                                        <Grid item xs={3} sm={3} md={3} xl={3}>
                                            <ToggleChartButton chartType={chartType} handleChartTypeChange={handleChartTypeChange} />
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} xl={6}>
                                            <ToggleDayTimeButton selected={selectedDayTime} handleChange={handleDayTimeChange} />
                                        </Grid>
                                        <Grid item xs={3} sm={3} md={3} xl={3}>
                                            <ToggleMoreButton />
                                        </Grid>
                                    </Grid>
                                    <Grid container height={300} justifyContent="center">
                                        {
                                            chartType === "heatmap_chart" ?
                                                <div>
                                                    <HeatMap/>
                                                    <Grid container spacing={1} pt={2} justifyContent="center">
                                                        <Grid item textAlign="right">
                                                            <Box className="heat-map-color-box heat-map-color-box-0-low">&nbsp;</Box>
                                                            {details?.low}
                                                        </Grid>
                                                        <Grid item textAlign="right">
                                                            <Box className="heat-map-color-box heat-map-color-box-low-middle">&nbsp;</Box>
                                                            {details?.middle}
                                                        </Grid>
                                                        <Grid item textAlign="right">
                                                            <Box className="heat-map-color-box heat-map-color-box-middle-high">&nbsp;</Box>
                                                            {details?.high}
                                                        </Grid>
                                                        <Grid item textAlign="right">
                                                            <Box className="heat-map-color-box heat-map-color-box-high-veryhigh">&nbsp;</Box>
                                                            {details?.very_high}
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                                : <AreaChart data={graphData} chartOptions={{ scalesYDisplay: false, scalesXDisplay: true, datalabelsDisplay: datalabelsDisplay, legendDisplay: true }} fillArea={fillArea} showLine={showLine} standard={details?.standard} showHighestBox={true}/>
                                        }
                                    </Grid>
                                </Box>
                            </Card>
                        </Grid>

                        <Grid item container xs={12} sm={3} md={3} xl={3}>
                            <Grid item className="grid-item-locationselector">
                                <LocationSelector handleLocationSelectorChange={fetchGraphData} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <IndexTable id={details.id} />
                </Box>
            </div>
        );
    }
    return <></>
}
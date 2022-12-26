import SearchIcon from '@mui/icons-material/Search';
import { Button, Card, CardContent, Chip, Grid } from "@mui/material";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { AreaChart } from "../../../utils/Charts/AreaChart";
import { getRelationship, RelationshipResponse } from "../../../service/relationship";
import "./Tabs.css";
import moment from "moment";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const getSeasons = (month: number) => {
    type colors = "default" | "success" | "warning" | "primary" | "error" | "secondary" | "info";
    let color: colors = "default";

    if ([3, 4, 5].includes(month)) {
        color = "info"
        return {
            label: "Spring",
            color: color
        };
    }
    else if ([6, 7, 8].includes(month)) {
        color = "error"
        return {
            label: "Summer",
            color: color
        };
    }
    else if ([9, 10, 11].includes(month)) {
        color = "warning"
        return {
            label: "Autumn",
            color: color
        };
    }
    else if ([12, 1, 2]) {
        color = "primary"
        return {
            label: "Winter",
            color: color
        };
    }
    return {
        label: "",
        color: color
    };
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface SelectProps {
    value: number,
    label: string
}

export default function RelationTabs({ upDownUnchangePatternInSameIndex, keyword, sensors }: {
    upDownUnchangePatternInSameIndex: Array<any>, keyword: string, sensors: {
        value: number,
        label: string
    }[]
}) {
    const [value, setValue] = React.useState(0);
    const graphData: Array<any> = [
        {
            amount: 10,
            created_at: "2017-02-01 00:00:00"
        },
        {
            amount: 20,
            created_at: "2018-02-01 00:00:00"
        },
        {
            amount: 5,
            created_at: "2019-02-01 00:00:00"
        },
        {
            amount: 100,
            created_at: "2020-01-01 00:00:00"
        },
        {
            amount: 50,
            created_at: "2021-02-01 00:00:00"
        }
    ];

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [chartData, setChartData] = React.useState<Array<any>[]>([]);
    const handleSearchRelationship = async (sensor_id: number, start_date: string, end_date: string) => {
        const data = await getRelationship({
            name: keyword,
            sensor_id: sensor_id,
            start_date: start_date,
            end_date: end_date
        });
        setChartData(prev => ({ ...prev, [sensor_id]: data }));
    }

    React.useEffect(() => {
        console.log(upDownUnchangePatternInSameIndex);
        upDownUnchangePatternInSameIndex.map((d, index) => handleSearchRelationship(d.sensor_id, d.start_date, d.end_date));
    }, [upDownUnchangePatternInSameIndex]);

    React.useEffect(() => {

    }, [chartData]);

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Index" {...a11yProps(0)} />
                    <Tab label="Other Index" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Grid container spacing={2} className="tab-panel-scroll">
                    {
                        upDownUnchangePatternInSameIndex.length >= 1 ?
                            upDownUnchangePatternInSameIndex.map((d, index) => {
                                var month = parseInt(moment(d.start_date).format("M"));
                                return (
                                    <Grid item xs={12} sm={12} md={12} xl={12}>
                                        <Card className="tab-card">
                                            <CardContent className="tab-card-height">
                                                <Grid container>
                                                    <Grid item xs={7} sm={7} md={7} xl={7} display="flex" justifyItems="center" alignItems="start" direction="column">
                                                        <div>{sensors.filter((sensor, i) => sensor.value === d.sensor_id).map((sensor, i) => sensor.label)}</div>
                                                        {d.start_date} - {d.end_date}
                                                    </Grid>
                                                    <Grid item xs={4} sm={4} md={4} xl={4} className="tab-card-height">
                                                        {
                                                            chartData[d.sensor_id] ?
                                                                <AreaChart data={chartData[d.sensor_id]} chartOptions={{ scalesYDisplay: false, scalesXDisplay: false, datalabelsDisplay: false, legendDisplay: false }} fillArea={true} showLine={true} standard={0} showHighestBox={false} />
                                                                : <></>
                                                        }
                                                    </Grid>
                                                    <Grid item xs={1} sm={1} md={1} xl={1} display="flex" justifyItems="center" alignItems="center">
                                                        <Button color="primary" className="tab-relation-search-button">
                                                            <SearchIcon />
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>

                                        <Grid container spacing={1} pt={2}>
                                            <Grid item>
                                                <Chip label={`${moment(d.end_date).diff(moment(d.start_date), 'days')} Days`} color="primary" className="tab-card-chip-days" />
                                            </Grid>
                                            <Grid item>
                                                <Chip label={getSeasons(month).label} color={getSeasons(month).color} className="tab-card-chip-season" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                );
                            }) : <></>
                    }
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
        </Box>
    );
}
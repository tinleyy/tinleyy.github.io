import { Grid, Card, CardContent, Button, Chip } from "@mui/material";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { AreaChart } from "../../../utils/Charts/AreaChart";
import "./Tabs.css";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
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

export default function RelationTabs() {
    const [value, setValue] = React.useState(0);
    const graphData: Array<any> = [
        {
            amount: 10,
            created_at: "2022-02-01 00:00:00"
        },
        {
            amount: 20,
            created_at: "2022-02-01 00:00:00"
        },
        {
            amount: 5,
            created_at: "2022-02-01 00:00:00"
        },
        {
            amount: 100,
            created_at: "2022-01-01 00:00:00"
        },
        {
            amount: 50,
            created_at: "2022-02-01 00:00:00"
        }
    ];

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Index" {...a11yProps(0)} />
                    <Tab label="Other Index" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} xl={12}>
                        <Card className="tab-card">
                            <CardContent className="tab-card-height">
                                <Grid container>
                                    <Grid item xs={7} sm={7} md={7} xl={7} display="flex" justifyItems="center" alignItems="center">
                                        2020/01/01 - 2022/12/31
                                    </Grid>
                                    <Grid item xs={4} sm={4} md={4} xl={4} className="tab-card-height">
                                        <AreaChart data={graphData} chartOptions={{ scalesYDisplay: false, scalesXDisplay: false, datalabelsDisplay: false, legendDisplay: false }} fillArea={true} showLine={true} standard={0}/>
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
                                <Chip label="xx Days" color="primary" className="tab-card-chip-days" />
                            </Grid>
                            <Grid item>
                                <Chip label="Spring" color="warning" className="tab-card-chip-season" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
        </Box>
    );
}
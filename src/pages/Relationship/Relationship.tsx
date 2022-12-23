import { Grid, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchInputBase from '../../components/components/SearchBox';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, TextField } from '@mui/material';
import { useState } from "react";
import { AreaChart } from "../../utils/Charts/AreaChart";
import { IndexSensorsResponse } from "../../service/indexsensors/types";
import RelationTabs from "./Tabs/Tabs";
import SearchIcon from '@mui/icons-material/Search';
import "./Relationship.css";

export default function Relationship({ handleOpenCloseMenu }: { handleOpenCloseMenu: Function }) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [graphData, setGraphData] = useState<IndexSensorsResponse[]>([]);
    const handleBasicSearch = () => { }

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
                        <SearchInputBase onClick={handleBasicSearch} />
                    </Grid>
                </Grid>
                <Grid container spacing={1} p={2}>
                    <Grid item xs={12} sm={6} md={6} xl={6}>
                        <h5>Start Date</h5>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                className="date-picker"
                                // label="StartAt"
                                value={startDate}
                                onChange={(date) => { }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} xl={6}>
                        <h5>End Date</h5>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                className="date-picker"
                                // label="StartAt"
                                value={endDate}
                                onChange={(date) => { }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Grid container height={300} display="flex" justifyContent="center" alignItems="center">
                    <AreaChart data={graphData} chartOptions={{ scalesYDisplay: false, scalesXDisplay: true, datalabelsDisplay: true }} />
                </Grid>

                <RelationTabs />
            </div>
        </div>
    );
}
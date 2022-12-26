import { Input } from "@material-ui/core";
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Grid, IconButton, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import Select from "react-select";
import SearchInputBase from '../../components/components/SearchBox';
import PageContainer from '../../components/containers/PageContainer';
import MethodLayers from "../../pages/Relationship/MethodLayers/MethodLayers";
import { getRelationship, getUpDownUnchange, getUpDownUnchangeInSameIndex, RelationshipResponse } from "../../service/relationship";
import { getAllSensors } from "../../service/sensors";
import { AreaChart } from "../../utils/Charts/AreaChart";
import "./Relationship.css";
import RelationTabs from "./Tabs/Tabs";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    minWidth: '30%',
    bgcolor: 'background.paper',
    borderRadius: 2,
    p: 4,
};

export default function Relationship({ handleOpenCloseMenu }: { handleOpenCloseMenu: Function }) {
    const [page, setPage] = useState(0);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [modelChildren, setModelChildren] = useState();
    const handleChangePage = (page: number, children: any) => {
        handleOpen();
        setPage(page);
        setModelChildren(children);
    }

    const [keyword, setKeyword] = useState("");
    const [startDate, setStartDate] = useState("1971-01-01 00:00:00");
    const [endDate, setEndDate] = useState("2022-12-31 00:00:00");
    const [selectedSensor, setSelectedSensor] = useState(-1);
    const [graphData, setGraphData] = useState<RelationshipResponse[]>([]);
    const [updated, setUpdated] = useState(true);

    const [sensors, setSensors] = useState<{
        value: number,
        label: string
    }[]>([]);
    const fetchSensorLocation = async () => {
        const sensors = await getAllSensors("", 0, 0);
        const sensors_select_value = sensors.map((sensor, index) => ({ value: sensor.id, label: sensor.distinct }));
        setSensors(sensors_select_value);
    }

    const handleBasicSearch = async (keyword: string) => {
        setKeyword(keyword);
        setUpdated(!updated);
    }

    const handleSearchRelationship = async () => {
        const data = await getRelationship({
            name: keyword,
            sensor_id: selectedSensor,
            start_date: startDate,
            end_date: endDate
        });
        setGraphData(data);
    }

    const [upDownUnchangePattern, setUpDownUnchangePattern] = useState<Array<any>>([]);
    const [indexId, setIndexId] = useState(-1);
    const fetchUpDownUnchangeRelation = async () => {
        if (keyword && selectedSensor && startDate && endDate) {
            const data = await getUpDownUnchange({
                name: keyword,
                sensor_id: selectedSensor,
                start_date: startDate,
                end_date: endDate
            });
            setUpDownUnchangePattern(data?.data);
            setIndexId(data?.index_id);
        }
    }

    const [upDownUnchangePatternInSameIndex, setUpDownUnchangePatternInSameIndex] = useState<Array<any>>([]);
    const fetchUpDownUnchangeInSameIndex = async () => {
        const data = await getUpDownUnchangeInSameIndex(indexId, upDownUnchangePattern);
        setUpDownUnchangePatternInSameIndex(data);
    }

    useEffect(() => {
        console.log(upDownUnchangePatternInSameIndex);
    }, [upDownUnchangePatternInSameIndex]);

    useEffect(() => {
        fetchUpDownUnchangeInSameIndex();
    }, [upDownUnchangePattern]);

    useEffect(() => {
        if (sensors.length < 1) {
            fetchSensorLocation();
        }
    }, []);

    useEffect(() => {
        handleSearchRelationship();
        fetchUpDownUnchangeRelation();
    }, [keyword, updated]);

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
                <Grid container spacing={1} p={2} pb={0}>
                    <Grid item xs={12} sm={4} md={4} xl={4} className="grid-item-start-date">
                        <h5 className="grid-item-h5-text">Start Date</h5>
                        <Input
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} xl={4} className="grid-item-end-date">
                        <h5 className="grid-item-h5-text">End Date</h5>
                        <Input
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} xl={4} className="grid-item-end-date">
                        <h5 className="grid-item-h5-text">Sensor</h5>
                        <Select
                            name="sensor_id"
                            options={sensors}
                            onChange={(e) => {
                                console.log(e?.value)
                                setSelectedSensor(e?.value ?? -1)
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container height={300} p={2}>
                    <Grid item xs={12} sm={12} md={12} xl={12} py={2} sx={{ height: '100%' }} display="flex" justifyContent="center" alignItems="center">
                        <AreaChart data={graphData} chartOptions={{ scalesYDisplay: true, scalesXDisplay: true, datalabelsDisplay: false, legendDisplay: false }} fillArea={false} showLine={true} standard={0} showHighestBox={true} />
                    </Grid>
                </Grid>

                <MethodLayers fetchUpDownUnchangeRelation={fetchUpDownUnchangeRelation} handleChangePage={handleChangePage}/>
                <RelationTabs upDownUnchangePatternInSameIndex={upDownUnchangePatternInSameIndex} keyword={keyword} sensors={sensors} />
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <PageContainer currentPage={page} targetPage={1}>
                        { modelChildren ?? <></>}
                    </PageContainer>
                </Box>
            </Modal>
        </div>
    );
}
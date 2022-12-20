import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Menu from "../../components/components/Menu/Menu";
import SearchIndexModel from "../SearchIndexModel/SearchIndexModel";
import Sensors from "../../pages/Sensor/Sensor";
import './LayerTwo.css';
import IndexChart from "../../pages/IndexChart/IndexChart";
import { IndexesResponse } from "../../service/indexes/types";
import { ModelsResponse } from "../../service/models/types";
import ModelChart from "../../pages/ModelChart/ModelChart";

export default function Layer2({ mapStorage }: { mapStorage: any }) {
    const [page, setPage] = useState(0);
    const [menuSwitch, setMenuSwitch] = useState(false);
    const handleOpenCloseMenu = () => {
        setMenuSwitch(!menuSwitch);
    }
    const handleChangePage = (num: number) => {
        setPage(num);
    }

    const [details, setDetails] = useState<IndexesResponse | ModelsResponse | null>(null);
    const handleSwitchToIndexDetails = (details: IndexesResponse | ModelsResponse) => {
        setDetails(details);
        setPage(2);
    }
    const [modelChartData, setModelChartData] = useState<Array<any>>([]);
    const handleSwitchToModelDetails = (details: IndexesResponse | ModelsResponse, modelChartData: Array<any>) => {
        setDetails(details);
        setModelChartData(modelChartData);
        setPage(3);
    }
    const handleBackToHome = () => {
        setPage(0);
    }

    let pageContent = <></>
    if (page === 0) {
        pageContent = <SearchIndexModel handleOpenCloseMenu={handleOpenCloseMenu} handleSwitchToIndexDetails={handleSwitchToIndexDetails} handleSwitchToModelDetails={handleSwitchToModelDetails}/>
    }
    else if (page === 1) {
        pageContent = <Sensors handleOpenCloseMenu={handleOpenCloseMenu} mapStorage={mapStorage} />
    }
    else if (page === 2) {
        pageContent = <IndexChart details={details} handleBackToHome={handleBackToHome}/>
    }
    else if (page === 3){
        pageContent = <ModelChart details={details}modelChartData={modelChartData} handleBackToHome={handleBackToHome}/>
    }

    useEffect(() => {
    }, [menuSwitch])

    return (
        <Grid container className="layer-two">
            <Grid item className="layer2">
                {menuSwitch ? <Menu handleChangePage={handleChangePage} /> : <></>}
            </Grid>
            <Grid item className="layer2">
                {pageContent}
            </Grid>
        </Grid>
    );
}
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
import Pattern from "../../pages/Pattern/Pattern";
import { indexesInOneChart } from "../../service/general";
import Relationship from "../../pages/Relationship/Relationship";

export default function Layer2({ mapStorage }: { mapStorage: any }) {
    const [page, setPage] = useState(0);
    const [menuSwitch, setMenuSwitch] = useState(false);
    const handleOpenCloseMenu = () => {
        setMenuSwitch(!menuSwitch);
    }
    const handleChangePage = (num: number) => {
        setPage(num);
    }

    const [indexDetails, setIndexDetails] = useState<IndexesResponse>();
    const [modelDetails, setModelDetails] = useState<ModelsResponse>();
    const handleSwitchToIndexDetails = (details: IndexesResponse) => {
        setIndexDetails(details);
        setPage(2);
    }
    const [modelChartData, setModelChartData] = useState<Array<any>>([]);
    const [indexesInOneChartData, setIndexesInOneChartData] = useState<indexesInOneChart>();
    const handleSwitchToModelDetails = (details: ModelsResponse, modelChartData: Array<any>, indexesInOneChartData: indexesInOneChart) => {
        setModelDetails(details);
        setModelChartData(modelChartData);
        setIndexesInOneChartData(indexesInOneChartData);
        setPage(3);
    }
    const handleBackToHome = () => {
        setPage(0);
    }

    let pageContent = <></>
    if (page === 0) {
        pageContent = <SearchIndexModel handleOpenCloseMenu={handleOpenCloseMenu} handleSwitchToIndexDetails={handleSwitchToIndexDetails} handleSwitchToModelDetails={handleSwitchToModelDetails} />
    }
    else if (page === 1) {
        pageContent = <Sensors handleOpenCloseMenu={handleOpenCloseMenu} mapStorage={mapStorage} />
    }
    else if (page === 2) {
        pageContent = <IndexChart details={indexDetails} handleBackToHome={handleBackToHome} />
    }
    else if (page === 3) {
        pageContent = <ModelChart details={modelDetails} modelChartData={modelChartData} indexesInOneChartData={indexesInOneChartData} handleBackToHome={handleBackToHome} />
    }
    else if (page === 4) {
        pageContent = <Pattern handleOpenCloseMenu={handleOpenCloseMenu} />
    }
    else if (page === 5) {
        pageContent = <Relationship handleOpenCloseMenu={handleOpenCloseMenu} />
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
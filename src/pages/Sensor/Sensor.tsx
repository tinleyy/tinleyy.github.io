import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, Grid, IconButton, Modal } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react';
import SearchInputBase from '../../components/components/SearchBox';
import SensorCard from '../../components/components/SensorCard/SensorCard';
import PageContainer from '../../components/containers/PageContainer';
import CreateSensorForm from '../../components/forms/CreateSensorForm/CreateSensorForm';
import { getAllSensors } from '../../service/sensors';
import { SensorsResponse } from '../../service/sensors/types';
import { addMarkerToMap } from '../../utils/GoogleMapsUtils';
import './Sensor.css';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  p: 4,
};

export default function Sensors({ handleOpenCloseMenu, mapStorage }: { handleOpenCloseMenu: Function, mapStorage: any }) {
  const [sensors, setSensors] = useState<SensorsResponse[]>([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(20);

  // pagination
  const [keyword, setKeyword] = useState("");
  const [pTotal, setPTotal] = useState(0);
  const [pPage, setPPage] = useState(1);
  const handleChangePPage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPPage(value);
    setSkip((value - 1) * limit);
  };

  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangePage = (page: number) => {
    handleOpen();
    setPage(page);
  }

  const sensorsToMarker = async (data: SensorsResponse[]) => {
    const map = await mapStorage.then((res: any) => { return res; })

    data.map((d) => {
      const contentString =
        '<div id="content">' +
        '<h5>' + d.remarks + '</h5>' +
        d.distinct +
        "</div>";

      addMarkerToMap(map, { lat: d.latitude, lng: d.longitude }, contentString);
    })
  }

  const fetchAllSensors = async () => {
    if (skip === 0) {
      const data = await getAllSensors(keyword, 0, null);
      let total = Math.round(data.length / limit);
      setPTotal(total);
    }
    const data = await getAllSensors(keyword, skip, limit);
    setSensors(data);
    sensorsToMarker(data);
  }

  const handleBasicSearch = async (keyword: string) => {
    setKeyword(keyword);
    setSkip(0);
  }

  useEffect(() => {
    fetchAllSensors();
  }, [skip, keyword]);

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
      </div>

      <div id="bottom_results_control_panel">
        {/* Create New Index or Model Button */}
        <Box p={1}>
          <Button className="create_button--white" onClick={() => handleChangePage(1)}>
            Create New
          </Button>
        </Box>

        <Box p={1}>
          <Grid container spacing={1}>
            {
              sensors.map((sensors, index) => (
                <Grid item key={index}>
                  <SensorCard data={sensors} />
                </Grid>
              ))
            }
          </Grid>
        </Box>

        {
          pTotal && pPage ?
            <Pagination count={pTotal} page={pPage} onChange={handleChangePPage} />
            : <></>
        }
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <PageContainer currentPage={page} targetPage={1}>
            <CreateSensorForm />
          </PageContainer>
        </Box>
      </Modal>
    </div >
  );
}
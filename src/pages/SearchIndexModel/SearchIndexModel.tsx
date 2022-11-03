import { LineAxis, Timeline } from '@mui/icons-material';
import { Box, Button, ButtonGroup, Grid, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import GeneralDisplayPanel from '../../components/components/GeneralDisplayPanel/GeneralDisplayPanel';
import IndexModelCard from '../../components/components/IndexModelCard/IndexModelCard';
import SearchInputBase from '../../components/components/SearchBox';
import PageContainer from '../../components/containers/PageContainer';
import CreateIndexForm from '../../components/forms/CreateIndexForm/CreateIndexForm';
import { getAllIndexes } from '../../service/indexes';
import { IndexesResponse } from '../../service/indexes/types';
import { getAllModels } from '../../service/models';
import { ModelsResponse } from '../../service/models/types';
import './SearchIndexModel.css';

const dataset = [
  {
    title: "Index",
    content: [
      {
        name: "NO2"
      },
      {
        name: "SO2"
      },
      {
        name: "O3"
      }
    ]
  },
  {
    title: "Model",
    content: [
      {
        name: "AQHI"
      }
    ]
  }
];

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

export default function SearchIndexModel() {
  const [indexes, setIndexes] = useState<IndexesResponse[]>([]);
  const [models, setModels] = useState<ModelsResponse[]>([]);

  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangePage = (page: number) => {
    handleOpen();
    setPage(1);
  }

  const [selectedCard, setSelectedCard] = useState<string>("Index");
  const handleSelectIndexModel = (selected: string) => {
    setSelectedCard(selected)
  }

  const fetchAllIndexes = async () => {
    const data = await getAllIndexes();
    setIndexes(data);
  };

  const fetchAllModels = async () => {
    const data = await getAllModels();
    setModels(data);
  }

  useEffect(() => {
    fetchAllIndexes();
    fetchAllModels();
  }, []);

  return (
    <div className="Dashboad layer2">
      <div id="top_search_fields">
        {/* Search Box */}
        <Grid container>
          <Grid item xs={12} sm={7} md={7} xl={7} py={3} pl={3}>
            <SearchInputBase />
          </Grid>
          <Grid item xs={12} sm={4} md={4} xl={4} p={3}>
            <ButtonGroup variant="outlined" aria-label="outlined button group" className="advance_analysis_button--dark">
              <Button startIcon={<Timeline />}>
                Relationship
              </Button>
              <Button startIcon={<LineAxis />}>
                Pattern
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12} sm={1} md={1} xl={1}></Grid>
        </Grid>

        {/* Display Common Index or Model */}
        <Grid container>
          <GeneralDisplayPanel data={dataset} selectedCard={selectedCard} handleSelectIndexModel={handleSelectIndexModel} />
        </Grid>
      </div>

      <div id="bottom_results_control_panel">
        {/* Create New Index or Model Button */}
        <Box p={1}>
          <Button className="create_button--white" onClick={() => handleChangePage(1)}>
            Create New
          </Button>
        </Box>

        {/* Display Index or Model here */}
        <Box p={1}>
          {
            selectedCard === "Index" ?
              indexes.map((indexes, index) => (
                <div key={index}>
                  <Box mb={1}>
                    <IndexModelCard data={indexes} />
                  </Box>
                </div>
              ))
              : models.map((models, index) => (
                <div key={index}>
                  <Box mb={1}>
                    <IndexModelCard data={models} />
                  </Box>
                </div>
              ))
          }
        </Box>
      </div >

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <PageContainer currentPage={page} targetPage={1}>
            <CreateIndexForm />
          </PageContainer>
        </Box>
      </Modal>
    </div >
  );
}
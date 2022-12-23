import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, Grid, IconButton, Modal, Chip } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import ModelProgressing from '../../pages/ModelProgressing/ModelProgressing';
import { useEffect, useState } from 'react';
import GeneralDisplayPanel from '../../components/components/GeneralDisplayPanel/GeneralDisplayPanel';
import IndexModelCard from '../../components/components/IndexModelCard/IndexModelCard';
import SearchInputBase from '../../components/components/SearchBox';
import PageContainer from '../../components/containers/PageContainer';
import PanelContainer from '../../components/containers/PanelContainer';
import CreateIndexForm from '../../components/forms/CreateIndexForm/CreateIndexForm';
import CreateModelForm from '../../components/forms/CreateModelForm/CreateModelForm';
import { deleteOneIndex, getAllIndexes, getOneIndex } from '../../service/indexes';
import { IndexesResponse } from '../../service/indexes/types';
import { deleteOneModel, getAllModels, getOneModel } from '../../service/models';
import { ModelsResponse } from '../../service/models/types';
import './SearchIndexModel.css';
import IndexDescription from '../../components/components/IndexDescription/IndexDescription';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateTagForm from '../../components/forms/CreateTagForm/CreateTagForm';
import { getAllTags } from '../../service/tags';
import { TagsResponse } from '../../service/tags/types';

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
  width: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 2,
  p: 4,
};

export default function SearchIndexModel({ handleOpenCloseMenu, handleSwitchToIndexDetails, handleSwitchToModelDetails }: { handleOpenCloseMenu: Function, handleSwitchToIndexDetails: Function, handleSwitchToModelDetails: Function }) {
  const [indexes, setIndexes] = useState<IndexesResponse[]>([]);
  const [models, setModels] = useState<ModelsResponse[]>([]);
  const [updated, setUpdated] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(2);

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
  const [indexId, setIndexId] = useState(-1);
  const handleChangePageWithIndexId = (page: number, indexId: number) => {
    setIndexId(indexId);
    handleOpen();
    setPage(page);
  }

  const [selectedCard, setSelectedCard] = useState<string>("Index");
  const handleSelectIndexModel = (selected: string) => {
    setSelectedCard(selected);
    setSkip(0);
    setUpdated(true);
  }

  const fetchAllIndexes = async () => {
    if (skip === 0) {
      const data = await getAllIndexes(keyword, 0, null);
      let total = Math.round(data.length / limit);
      setPTotal(total);
    }
    const data = await getAllIndexes(keyword, skip, limit);
    setIndexes(data);
  };

  const fetchAllModels = async () => {
    if (skip === 0) {
      const data = await getAllModels(keyword, 0, null);
      let total = Math.round(data.length / limit);
      setPTotal(total);
    }
    const data = await getAllModels(keyword, skip, limit);
    setModels(data);
  }

  const [tags, setTags] = useState<TagsResponse[]>([]);
  const fetchAllTags = async () => {
    const data = await getAllTags(keyword, 0, 0);
    setTags(data);
  }

  const handleBasicSearch = async (keyword: string) => {
    setKeyword(keyword);
    setSkip(0);
  }

  const [processingModelDetails, setProcessingModelDetails] = useState<ModelsResponse>();
  const handleDetails = async (id: number) => {
    if (selectedCard === "Index") {
      const data = await getOneIndex(id);
      handleSwitchToIndexDetails(data);
    }
    else if (selectedCard === "Model") {
      // call api
      const data = await getOneModel(id);
      setProcessingModelDetails(data);
      // open progressing popup
      handleChangePage(3);
      // change page
    }
  }

  const handleDelete = async (id: number) => {
    if (selectedCard === "Index") {
      const data = await deleteOneIndex(id);
      if (data) {
        setUpdated(!updated);
        alert(`deleted Index ${data.id} sucessfully`);
      }
    }
    else if (selectedCard === "Model") {
      const data = await deleteOneModel(id);
      if (data) {
        setUpdated(!updated);
        alert(`delete Model ${data.id} successfully`);
      }
    }
  }

  useEffect(() => {
    if (selectedCard === "Index") fetchAllIndexes();
    if (selectedCard === "Model") fetchAllModels();
    fetchAllTags();
  }, [skip, keyword, selectedCard, updated]);

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

        <Grid container spacing={2} px={2}>
          <Grid item>
            <Chip icon={<AddCircleIcon />} label="Add Tag" variant="outlined" color="primary" onClick={() => handleChangePage(5)} />
          </Grid>
          {
            tags.map((tag, index) =>
              <Grid item key={index}>
                <Chip label={tag.name} variant="outlined" color="primary" />
              </Grid>)
          }
        </Grid>

        {/* Display Common Index or Model */}
        <Grid container>
          <GeneralDisplayPanel data={dataset} selectedCard={selectedCard} handleSelectIndexModel={handleSelectIndexModel} />
        </Grid>
      </div>

      <div id="bottom_results_control_panel">
        {/* Create New Index or Model Button */}
        <Box p={1}>
          <PanelContainer currentPanel={selectedCard} targetPanel="Index">
            <Button className="create_button--white" onClick={() => handleChangePage(1)}>
              Create New
            </Button>
          </PanelContainer>

          <PanelContainer currentPanel={selectedCard} targetPanel="Model">
            <Button className="create_button--white" onClick={() => handleChangePage(2)}>
              Create New
            </Button>
          </PanelContainer>
        </Box>

        {/* Display Index or Model here */}
        <Box p={1}>
          <PanelContainer currentPanel={selectedCard} targetPanel="Index">
            <>
              {
                indexes.map((indexes, index) => (
                  <div key={index}>
                    <Box mb={1}>
                      <IndexModelCard data={indexes} handleDetails={handleDetails} handleDelete={handleDelete} handleChangePage={handleChangePageWithIndexId} />
                    </Box>
                  </div>
                ))
              }
            </>
          </PanelContainer>

          <PanelContainer currentPanel={selectedCard} targetPanel="Model">
            <>
              {
                models.map((models, index) => (
                  <div key={index}>
                    <Box mb={1}>
                      <IndexModelCard data={models} handleDetails={handleDetails} handleDelete={handleDelete} handleChangePage={handleChangePageWithIndexId} />
                    </Box>
                  </div>
                ))
              }
            </>
          </PanelContainer>
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
            <CreateIndexForm />
          </PageContainer>
          <PageContainer currentPage={page} targetPage={2}>
            <CreateModelForm />
          </PageContainer>
          <PageContainer currentPage={page} targetPage={3}>
            <ModelProgressing modelDetails={processingModelDetails} handleSwitchToModelDetails={handleSwitchToModelDetails} />
          </PageContainer>
          <PageContainer currentPage={page} targetPage={4}>
            <IndexDescription indexId={indexId} />
          </PageContainer>
          <PageContainer currentPage={page} targetPage={5}>
            <CreateTagForm />
          </PageContainer>
        </Box>
      </Modal>
    </div >
  );
}
import { LineAxis, Timeline } from '@mui/icons-material';
import { Box, Button, ButtonGroup, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import GeneralDisplayPanel from '../../components/components/GeneralDisplayPanel';
import IndexModelCard from '../../components/components/IndexModelCard/IndexModelCard';
import SearchInputBase from '../../components/components/SearchBox';
import { getAllIndexes } from '../../service/indexes';
import { IndexesResponse } from '../../service/indexes/types';
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

export default function SearchIndexModel() {
  const [indexes, setIndexes] = useState<IndexesResponse[]>([]);

  const fetchAllIndexes = async () => {
    const data = await getAllIndexes();
    setIndexes(data);
  };

  useEffect(() => {
    fetchAllIndexes();
  }, []);

  return (
    <div className="Dashboad layer2">
      <div id="top_search_fields">
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

        <Grid container>
          <GeneralDisplayPanel data={dataset} />
        </Grid>
      </div>

      <div id="bottom_results_control_panel">
        <Box p={1}>
          <Button className="create_button--white">
            Create New
          </Button>
        </Box>

        <Box p={1}>
          {indexes.map(index => (
            <Box mb={1}>
              <IndexModelCard data={index} />
            </Box>
          ))}
        </Box>
      </div>
    </div>
  );
}
import { Button, Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import { IndexesResponse } from '../../../service/indexes/types';
import { ModelsResponse } from '../../../service/models/types';
import './IndexModelCard.css';

function instanceOfIndexes(data: any): data is IndexesResponse {
  return 'standard' in data;
}

export default function IndexModelCard({ data }: { data: IndexesResponse | ModelsResponse }) {
  if (instanceOfIndexes(data)) {
    return (
      <Card>
        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={5} md={5} xl={5}>
              <Typography variant="h6">{data.name}</Typography>
              <Typography variant="subtitle1">#{data.id}</Typography>
              <Typography variant="caption" display="block">{data.description}</Typography>
            </Grid>
            <Grid item xs={12} sm={7} md={7} xl={7}>
              <Grid container rowSpacing={2}>
                <Grid item xs={12} sm={2} md={2} xl={2}><h5>Standard</h5></Grid>
                <Grid item xs={12} sm={2} md={2} xl={2}><h5>Low</h5></Grid>
                <Grid item xs={12} sm={2} md={2} xl={2}><h5>Middle</h5></Grid>
                <Grid item xs={12} sm={2} md={2} xl={2}><h5>High</h5></Grid>
                <Grid item xs={12} sm={3} md={3} xl={3}><h5>Very High</h5></Grid>
                <Grid item xs={12} sm={2} md={2} xl={2} className="math_content">{data.standard}</Grid>
                <Grid item xs={12} sm={2} md={2} xl={2} className="math_content">{data.low}</Grid>
                <Grid item xs={12} sm={2} md={2} xl={2} className="math_content">{data.middle}</Grid>
                <Grid item xs={12} sm={2} md={2} xl={2} className="math_content">{data.high}</Grid>
                <Grid item xs={12} sm={3} md={3} xl={3} className="math_content">{data.very_high}</Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Button variant="outlined">
              Details
            </Button>
          </Grid>
        </CardContent>
      </Card>
    );
  }
  else {
    const indexes = Object.values(data.indexes);
    const models = Object.values(data.models);

    return (
      <Card>
        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={5} md={5} xl={5}>
              <Typography variant="h6">{data.name}</Typography>
              <Typography variant="subtitle1">#{data.id}</Typography>
              <Typography variant="caption" display="block">{data.description}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            {
              indexes.map((d, index) => {
                return (
                  <Grid item key={index}>
                    <Button>
                      <Chip label={"%" + d?.formula_id} className="index_id_chip" />
                      {"[" + d?.index_id + "] " + d?.name}
                    </Button>
                  </Grid>
                );
              })
            }
          </Grid>
          <Grid container>
            {"Formula " + data.formula}
          </Grid>
          <Grid container justifyContent="flex-end">
            <Button variant="outlined">
              Details
            </Button>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
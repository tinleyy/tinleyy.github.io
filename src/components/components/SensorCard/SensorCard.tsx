import { Card, CardContent, Grid, Typography } from '@mui/material';
import { SensorsResponse } from '../../../service/sensors/types';
import './SensorCard.css';

export default function SensorCard({ data }: { data: SensorsResponse }) {
  return (
    <Card>
      <CardContent>
        <Grid container px={2}>
          <Grid item xs={12} sm={12} md={12} xl={12}>
            <Typography variant="h6">{data.distinct}</Typography>
            <Typography variant="subtitle1">#{data.id}</Typography>
            <Typography variant="caption" display="block">{"latitude: "+data.latitude}</Typography>
            <Typography variant="caption" display="block">{"longitude: "+data.longitude}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
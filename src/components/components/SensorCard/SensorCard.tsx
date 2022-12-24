import SensorsIcon from '@mui/icons-material/Sensors';
import { Box, Card, CardContent, Grid, Typography, Chip } from '@mui/material';
import { SensorsResponse } from '../../../service/sensors/types';
import './SensorCard.css';

export default function SensorCard({ data }: { data: SensorsResponse }) {
  return (
    <Card>
      <CardContent>
        <Grid container px={2}>
          <Grid item xs={12} sm={12} md={12} xl={12}>
            <Grid container flexDirection="column" className="sensor-card-top">
              <Box className="icon-box">
                <SensorsIcon />
              </Box>

              <h5 className="sensor-card-title">{data.distinct}</h5>
              <Typography variant="caption">SENSOR-ID-0{data.id}</Typography>
            </Grid>

            <Typography variant="caption" display="block">{"Latitude: " + data.latitude}</Typography>
            <Typography variant="caption" display="block">{"Longitude: " + data.longitude}</Typography>

            <Box my={1}>
              {data.remarks ? <Chip label={data.remarks} /> : <></>}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
import { Grid, Box } from "@mui/material";
import "../IndexChart.css";

const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function HeatMap() {
    return (
        <Grid container pt={2}>
            {
                month.map((m, i) =>
                    <Grid container key={i} spacing={1} justifyContent="center">
                        <Grid item xs={1} sm={1} md={1} xl={1} textAlign="right" pr={1}>
                            <span className="heap-map-grid-months">{m}</span>
                        </Grid>
                        {
                            Array.from(Array(2022 - 1971), (e, j) =>
                                <Grid item key={j} className="heap-map-grid-items">
                                    <Box className="heat-map-color-box-no-data">&nbsp;</Box>
                                </Grid>
                            )
                        }
                    </Grid>
                )
            }
        </Grid>
    );
}
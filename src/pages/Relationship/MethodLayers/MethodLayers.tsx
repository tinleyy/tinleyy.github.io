import { Grid, Box, Button } from "@mui/material";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import AddIcon from '@mui/icons-material/Add';
import "./MethodLayers.css";
import { useEffect, useState } from "react";

const method = [{
    name: "UpDownUnChange",
    description:
        `compare previous and next value to get changes, and change into 0,1,-1
        \n [1]: 15\t20\t30\t30\t\t5\t1\t50
        \n [2]: —-\tup\t up\t no change\t down\t down\t up
        \n [3]: 0 \t1 \t1 \t0 \t\t-1 \t-1 \t1`
}, {
    name: "FiveLevels",
    description: "The highest point in the dataset marked as 5, use highest point and lowest point to split data into 5 Levels"
}, {
    name: "+- Differnce",
    description: ""
}];

const methodDescriptionModel = (method: { name: string, description: string }) => {
    return (
        <Box>
            <h5>{method.name}</h5>
            <pre>{method.description}</pre>
        </Box>
    );
}

export default function MethodLayers({ fetchUpDownUnchangeRelation, handleChangePage }: { fetchUpDownUnchangeRelation: Function, handleChangePage: Function }) {
    const [layers, setLayers] = useState<Array<any>>([0]);
    const [methodSkip, setMethodSkip] = useState(0);
    const [methodLimit, setMethodLimit] = useState(2);

    useEffect(() => {
        fetchUpDownUnchangeRelation();
    }, [layers]);

    return (
        <Grid container>
            <Grid item xs={12} sm={6} md={6} xl={6}>
                <Box display="flex" justifyContent="end" alignContent="center">
                    <Button onClick={() => setMethodSkip(methodSkip - 2)}>
                        <ArrowCircleLeftIcon />
                    </Button>
                    <Button onClick={() => setMethodSkip(methodSkip + 2)}>
                        <ArrowCircleRightIcon />
                    </Button>
                </Box>
                <Grid container px={2} spacing={2} justifyContent="end">
                    {
                        method.map((m, i) => {
                            if (i >= methodSkip && i < methodSkip + methodLimit) {
                                return (
                                    <Grid item key={i}>
                                        <Box display="flex" px={2} columnGap={1} className="box-method">
                                            <h5>{m?.name} &nbsp;&nbsp;</h5>
                                            <Button variant="outlined" className="box-method-button" onClick={() => setLayers(prev => [...prev, i])}>
                                                <AddIcon />
                                            </Button>
                                            <Button variant="outlined" color="warning" className="box-method-button" onClick={() => handleChangePage(1, methodDescriptionModel(method[i]))}>
                                                INFO
                                            </Button>
                                        </Box>
                                    </Grid>
                                );
                            }
                        })
                    }
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={6} xl={6}>
                <Grid container justifyContent="center" spacing={2} px={5}>
                    <Grid item xs={12} sm={4} md={4} xl={4}>
                        <Box p={2} className="box-layer-display">
                            {
                                layers.map((layer, i) =>
                                    <Box px={2} py={1} mb={1} className="box-layer-display-box" key={i}>{method[layer].name}</Box>
                                )
                            }
                        </Box>
                    </Grid>
                    <Grid item container xs={12} sm={6} md={6} xl={6} alignContent="end" justifyContent="center" rowGap={1}>
                        {
                            layers.map((layer, i) =>
                                <Grid item key={i} xs={(12 - layers.length) + i} sm={(12 - layers.length) + i} md={(12 - layers.length) + i} xl={(12 - layers.length) + i} className="box-layer-display-lines">&nbsp;</Grid>)
                        }
                    </Grid>
                    <Grid item display="flex" alignItems="end" justifyContent="end" xs={12} sm={2} md={2} xl={2}>
                        <Button variant="outlined" onClick={() => setLayers([0])}>
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
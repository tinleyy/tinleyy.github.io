import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useState } from 'react';
import SearchInputBase from '../../../../components/components/SearchBox';
import { getAllIndexes } from '../../../../service/indexes';
import { IndexesResponse } from '../../../../service/indexes/types';
import { Indexes, Models } from '../../../../service/models/types';
import { getAllModels } from '../../../../service/models';
import { ModelsResponse } from '../../../../service/models/types';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs({ handleIndexesChanges, handleModelsChanges }: { handleIndexesChanges: Function, handleModelsChanges: Function }) {
    const [value, setValue] = useState(0);
    const [indexes, setIndexes] = useState<IndexesResponse[]>([]);
    const [models, setModels] = useState<ModelsResponse[]>([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(8);
    const [skip2, setSkip2] = useState(0);
    const [limit2, setLimit2] = useState(10);

    // pagination for Index
    const [keyword, setKeyword] = useState("");
    const [pTotal, setPTotal] = useState(0);
    const [pPage, setPPage] = useState(0);
    const handleChangePPage = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log("changepage", value);
        setPPage(value);
        setSkip((value - 1) * limit);
    };
    // pagination for Model
    const [keyword2, setKeyword2] = useState("");
    const [pTotal2, setPTotal2] = useState(0);
    const [pPage2, setPPage2] = useState(0);
    const handleChangePPage2 = (event: React.ChangeEvent<unknown>, value: number) => {
        setPPage2(value);
        setSkip2((value - 1) * limit);
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const fetchAllIndexes = async () => {
        if (skip === 0) {
            const data = await getAllIndexes(keyword, 0, null);
            let total = Math.ceil(data.length / limit);
            setPTotal(total);
        }
        const data = await getAllIndexes(keyword, skip, limit);
        setIndexes(data);
    };

    const fetchAllModels = async () => {
        if (skip2 === 0) {
            const data = await getAllModels(keyword2, 0, null);
            let total = Math.ceil(data.length / limit2);
            setPTotal2(total);
        }
        const data = await getAllModels(keyword2, skip2, limit2);
        setModels(data);
    }

    const handleBasicSearch = async (keyword: string) => {
        setKeyword(keyword);
        setSkip(0);
    }
    const handleModelSearch = async (keyword: string) => {
        setKeyword2(keyword);
        setSkip2(0);
    }

    const [formulaId, setFormulaId] = useState(0);
    const [formulaIndexes, setFormulaIndexes] = useState<Indexes[]>([]);
    const handleAddIndexesToFormula = (formulaIndex: number, formulaIndexName: string) => {
        setFormulaIndexes(prevState => [
            ...prevState,
            {
                formula_id: (formulaId + 1),
                index_id: formulaIndex,
                index_name: formulaIndexName
            }
        ]);
        setFormulaId(formulaId + 1);
    }
    const [formulaModels, setFormulaModels] = useState<Models[]>([]);
    const handleAddModelsToFormula = (formulaModel: number, formulaModelName: string) => {
        setFormulaModels(prevState => [
            ...prevState,
            {
                formula_id: (formulaId + 1),
                model_id: formulaModel,
                model_name: formulaModelName
            }
        ]);
        setFormulaId(formulaId + 1);
    }
    const handleClearFormulaIndexes = () => {
        setFormulaIndexes([]);
    }
    const handleClearFormulaModels = () => {
        setFormulaModels([]);
    }

    useEffect(() => {
        console.log(skip);
        fetchAllIndexes();
    }, [skip, keyword]);

    useEffect(() => {
        fetchAllModels();
    }, [skip2, keyword2]);

    useEffect(() => {
        handleIndexesChanges(formulaIndexes);
    }, [formulaIndexes]);

    useEffect(() => {
        handleModelsChanges(formulaModels);
    }, [formulaModels]);

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Index" {...a11yProps(0)} />
                    <Tab label="Model" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <SearchInputBase onClick={handleBasicSearch} />
                <Grid container spacing={1} mt={1} mb={1}>
                    {
                        indexes.map((indexes, index) => (
                            <Grid item key={index}>
                                <Button variant="outlined" onClick={() => handleAddIndexesToFormula(indexes.id, indexes.name)}>
                                    {indexes.name}
                                </Button>
                            </Grid>
                        ))
                    }
                </Grid>
                <Pagination count={pTotal} page={pPage} onChange={handleChangePPage} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <SearchInputBase onClick={handleModelSearch} />
                <Grid container spacing={1} mt={1} mb={1}>
                    {
                        models.map((models, index) => (
                            <Grid item key={index}>
                                <Button variant="outlined" onClick={() => handleAddModelsToFormula(models.id, models.name)}>
                                    {models.name}
                                </Button>
                            </Grid>
                        ))
                    }
                </Grid>
                <Pagination count={pTotal2} page={pPage2} onChange={handleChangePPage2} />
            </TabPanel>
            <>
                {
                    formulaIndexes.length >= 1 ?
                        <>
                            <h5>Indexes</h5>
                            <Grid container spacing={1} mt={1} mb={1}>
                                {
                                    formulaIndexes.map((indexes, index) => (
                                        <Grid item key={index}>
                                            <Button variant="outlined" color="success">
                                                %{indexes.formula_id}&nbsp;|&nbsp;{indexes.index_name}
                                            </Button>
                                        </Grid>
                                    ))
                                }
                                <Button onClick={handleClearFormulaIndexes} color="error">
                                    <ClearIcon />
                                </Button>
                            </Grid>
                        </>
                        : <></>
                }
            </>
            <>
                {
                    formulaModels.length >= 1 ?
                        <>
                            <h5>Models</h5>
                            <Grid container spacing={1} mt={1} mb={1}>
                                {
                                    formulaModels.map((models, index) => (
                                        <Grid item key={index}>
                                            <Button variant="outlined" color="success">
                                                %{models.formula_id}&nbsp;|&nbsp;{models.model_name}
                                            </Button>
                                        </Grid>
                                    ))
                                }
                                <Button onClick={handleClearFormulaModels} color="error">
                                    <ClearIcon />
                                </Button>
                            </Grid>
                        </>
                        : <></>
                }
            </>
        </Box>
    );
}
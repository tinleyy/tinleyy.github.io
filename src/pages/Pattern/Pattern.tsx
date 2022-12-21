import { CardContent, Grid, IconButton, Card, Box, Chip } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchInputBase from '../../components/components/SearchBox';
import SwitchAccessShortcutAddIcon from '@mui/icons-material/SwitchAccessShortcutAdd';
import "./Pattern.css";
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DownloadingIcon from '@mui/icons-material/Downloading';

export default function Pattern({ handleOpenCloseMenu }: { handleOpenCloseMenu: Function }) {
    const handlePatternSearch = async (keyword: string) => {
    }

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
                        <SearchInputBase onClick={handlePatternSearch} />
                    </Grid>
                </Grid>

                <Grid container px={3} spacing={2}>
                    <Grid item>
                        <div>
                            <Card>
                                <CardContent>
                                    <Box p={2} className="pattern-card-icon-style strong-positive">
                                        <SwitchAccessShortcutAddIcon />
                                    </Box>
                                </CardContent>
                                <Box px={4}>
                                    <h4>Strong Positive</h4>
                                </Box>
                            </Card>
                        </div>
                    </Grid>

                    <Grid item>
                        <div>
                            <Card>
                                <CardContent>
                                    <Box p={2} className="pattern-card-icon-style weak-positive">
                                        <SwitchAccessShortcutIcon />
                                    </Box>
                                </CardContent>
                                <Box px={4}>
                                    <h4>Weak Positive</h4>
                                </Box>
                            </Card>
                        </div>
                    </Grid>

                    <Grid item>
                        <div>
                            <Card>
                                <CardContent>
                                    <Box p={2} className="pattern-card-icon-style strong-negative">
                                        <TrendingDownIcon />
                                    </Box>
                                </CardContent>
                                <Box px={4}>
                                    <h4>Strong Negative</h4>
                                </Box>
                            </Card>
                        </div>
                    </Grid>

                    <Grid item>
                        <div>
                            <Card>
                                <CardContent>
                                    <Box p={2} className="pattern-card-icon-style weak-negative">
                                        <ArrowDownwardIcon />
                                    </Box>
                                </CardContent>
                                <Box px={4}>
                                    <h4>Weak Negative</h4>
                                </Box>
                            </Card>
                        </div>
                    </Grid>

                    <Grid item>
                        <div>
                            <Card>
                                <CardContent>
                                    <Box p={2} className="pattern-card-icon-style moderate-negative">
                                        <DownloadingIcon />
                                    </Box>
                                </CardContent>
                                <Box px={4}>
                                    <h4>Moderate Negative</h4>
                                </Box>
                            </Card>
                        </div>
                    </Grid>

                    <Grid item>
                        <div>
                            <Card>
                                <CardContent>
                                    <Box p={2} className="pattern-card-icon-style">
                                        <DownloadingIcon />
                                    </Box>
                                </CardContent>
                                <Box px={4}>
                                    <h4>No Correlation</h4>
                                </Box>
                            </Card>
                        </div>
                    </Grid>
                </Grid>
            </div>

            <div className="bottom-pattern-result">
                <Grid container p={2} spacing={2}>
                    <Grid item xs={12} sm={5} md={5} xl={5}>
                        <SearchInputBase onClick={handlePatternSearch} />
                    </Grid>
                    <Grid item xs={12} sm={7} md={7} xl={7}></Grid>

                    <Grid item>
                        <Card>
                            <CardContent>
                                <h5>Index &nbsp;<Chip label="Strong Positive" color="primary" variant="outlined" /></h5>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
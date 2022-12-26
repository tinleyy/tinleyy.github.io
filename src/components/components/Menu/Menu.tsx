import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem, { ListItemProps } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import StarIcon from '@mui/icons-material/Star';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import {
    Link as RouterLink, MemoryRouter
} from 'react-router-dom';
import './Menu.css';

interface ListItemLinkProps extends ListItemProps {
    to: string;
    open?: boolean;
    children: JSX.Element;
}

const breadcrumbNameMap: { [key: string]: string } = {
    '/inbox': 'Inbox',
    '/inbox/important': 'Important',
    '/home': 'Home',
    '/sensor': 'Sensor',
    '/relationship': 'RelationShip',
    '/pattern': 'Pattern'
};

export default function Menu({ handleChangePage }: { handleChangePage: Function }) {
    const [open, setOpen] = React.useState(true);
    const [page, setPage] = React.useState('Home');

    function ListItemLink(props: ListItemLinkProps) {
        const { to, open, children, ...other } = props;
        const primary = breadcrumbNameMap[to];

        let icon = null;
        if (open != null) {
            icon = open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
        }

        return (
            <li>
                <ListItem button component={RouterLink as any} to={to} {...other} className="listItem-button" selected={primary === page? true : false}>
                    {children}
                    <ListItemText primary={primary} className="listItem-text" />
                    {icon}
                </ListItem>
            </li>
        );
    }

    const handleClick = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    return (
        <MemoryRouter initialEntries={['/inbox']} initialIndex={0}>
            <Box sx={{ display: 'grid', flexDirection: 'column', width: 200, height: '100vh !important' }}>
                <Box
                    sx={{
                        bgcolor: 'background.paper'
                    }}
                    component="nav"
                >
                    <List>
                        <ListItemLink to="/home" onClick={() => {
                            setPage('Home');
                            handleChangePage(0);
                        }}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                        </ListItemLink>
                        {/* <ListItemLink to="/inbox" open={open} onClick={handleClick} />
                        <Collapse component="li" in={open} timeout="auto" unmountOnExit>
                            <List disablePadding>
                                <ListItemLink sx={{ pl: 4 }} to="/inbox/important" />
                            </List>
                        </Collapse> */}
                        <ListItemLink to="/sensor" onClick={() => {
                            setPage('Sensor');
                            handleChangePage(1);
                        }}>
                            <ListItemIcon className="listItem-icon">
                                <LocationOnIcon />
                            </ListItemIcon>
                        </ListItemLink>
                        <ListItemLink to="/relationship" onClick={() => {
                            setPage('RelationShip');
                            handleChangePage(5);
                        }}>
                            <ListItemIcon>
                                <QueryStatsIcon />
                            </ListItemIcon>
                        </ListItemLink>
                        <ListItemLink to="/pattern" onClick={() => {
                            setPage('Pattern');
                            handleChangePage(4);
                        }}>
                            <ListItemIcon>
                                <StackedLineChartIcon />
                            </ListItemIcon>
                        </ListItemLink>
                    </List>
                </Box>
            </Box>
        </MemoryRouter>
    );
}
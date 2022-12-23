import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem, { ListItemProps } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import {
    Link as RouterLink, MemoryRouter
} from 'react-router-dom';

interface ListItemLinkProps extends ListItemProps {
    to: string;
    open?: boolean;
}

const breadcrumbNameMap: { [key: string]: string } = {
    '/inbox': 'Inbox',
    '/inbox/important': 'Important',
    '/home': 'Home',
    '/sensor': 'Sensor',
    '/relationship': 'RelationShip',
    '/pattern': 'Pattern'
};

function ListItemLink(props: ListItemLinkProps) {
    const { to, open, ...other } = props;
    const primary = breadcrumbNameMap[to];

    let icon = null;
    if (open != null) {
        icon = open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
    }

    return (
        <li>
            <ListItem button component={RouterLink as any} to={to} {...other}>
                <ListItemText primary={primary} />
                {icon}
            </ListItem>
        </li>
    );
}

export default function Menu({ handleChangePage }: { handleChangePage: Function }) {
    const [open, setOpen] = React.useState(true);

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
                        <ListItemLink to="/home" onClick={() => handleChangePage(0)} />
                        {/* <ListItemLink to="/inbox" open={open} onClick={handleClick} />
                        <Collapse component="li" in={open} timeout="auto" unmountOnExit>
                            <List disablePadding>
                                <ListItemLink sx={{ pl: 4 }} to="/inbox/important" />
                            </List>
                        </Collapse> */}
                        <ListItemLink to="/sensor" onClick={() => handleChangePage(1)} />
                        <ListItemLink to="/relationship" onClick={() => handleChangePage(5)} />
                        <ListItemLink to="/pattern" onClick={() => handleChangePage(4)} />
                    </List>
                </Box>
            </Box>
        </MemoryRouter>
    );
}
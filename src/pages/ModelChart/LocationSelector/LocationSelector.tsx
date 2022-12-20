import { Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { getAllSensors } from "../../../service/sensors";

interface SelectProps {
    value: number,
    label: string
}

const theme = createTheme({
    typography: {
        body1: {
            fontWeight: 500,
            fontSize: "1rem",
            textAlign: "center"
        }
    }
});

export default function LocationSelector({ handleLocationSelectorChange }: { handleLocationSelectorChange: Function }) {
    const [sensors, setSensors] = useState<SelectProps[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
        sensorId: number|null
    ) => {
        setSelectedIndex(index);
        handleLocationSelectorChange(sensorId);
    };

    const fetchSensorLocation = async () => {
        const sensors = await getAllSensors("", 0, 0);
        const sensors_select_value = sensors.map((sensor, index) => ({ value: sensor.id, label: sensor.distinct }));
        setSensors(sensors_select_value);
    }

    useEffect(() => {
        if (sensors.length < 1) {
            fetchSensorLocation();
        }
    }, []);

    return (
        <>
            <ThemeProvider theme={theme}>
                <Typography>Location</Typography>
            </ThemeProvider>
            <List>
                <ListItem>
                    <ListItemButton
                        selected={selectedIndex === -1}
                        onClick={(event) => handleListItemClick(event, -1, null)}
                    >
                        <ListItemText
                            primary={`ALL`}
                        />
                    </ListItemButton>
                </ListItem>
                {
                    sensors.map((sensor, index) => {
                        return (
                            <ListItem key={index}>
                                <ListItemButton
                                    selected={selectedIndex === index}
                                    onClick={(event) => handleListItemClick(event, index, sensor.value)}
                                >
                                    <ListItemText
                                        primary={`${sensor.label} (${sensor.value})`}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })
                }
            </List>
        </>
    );
}
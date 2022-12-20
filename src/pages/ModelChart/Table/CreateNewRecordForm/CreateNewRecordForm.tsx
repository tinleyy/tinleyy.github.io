import { Input } from "@material-ui/core";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import { createIndexSensor } from "../../../../service/indexsensors";
import { IndexSensorsInput } from "../../../../service/indexsensors/types";
import { getAllSensors } from "../../../../service/sensors";
import "./CreateNewRecordForm.css";

export default function CreateNewRecordForm({ id, handleUpdateRefresh }: { id: number, handleUpdateRefresh: Function }) {
    // const alert = useAlert();
    const { control, handleSubmit, watch, formState: { errors } } = useForm<IndexSensorsInput>();
    const onSubmit: SubmitHandler<IndexSensorsInput> = async data => {
        let sensor_id = data.sensor_id.value;
        const response = await createIndexSensor({
            index_id: id,
            amount: data.amount,
            sensor_id: sensor_id
        });
        if (response?.id) {
            alert(`Data Record ${response.id} added successfully \n index_id: ${response?.index_id} \n sensor_id: ${response?.sensor_id}`);
        }
        handleUpdateRefresh();
    }

    // console.log(watch("name")) // watch input value by passing the name of it

    interface SelectProps {
        value: number,
        label: string
    }

    const [sensors, setSensors] = useState<SelectProps[]>([]);
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
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {/* default id */}
            </TableCell>
            <TableCell>
                <Controller
                    render={({ field }) => <Input {...field} className="materialUIInput" />}
                    name="amount"
                    rules={{ required: true }}
                    control={control}
                    defaultValue={0}
                />
            </TableCell>
            <TableCell>
                <Controller
                    name="sensor_id"
                    control={control}
                    render={({ field }) =>
                        <Select
                            {...field}
                            options={sensors}
                        />}
                />
            </TableCell>
            <TableCell>
                {/* default created_at */}
            </TableCell>
            <TableCell>
                {/* default updated_at */}
            </TableCell>
            <TableCell align="right">
                <Button onClick={handleSubmit(onSubmit)}>
                    <AddCircleOutlineIcon />
                </Button>
            </TableCell>
        </TableRow>
    );
}
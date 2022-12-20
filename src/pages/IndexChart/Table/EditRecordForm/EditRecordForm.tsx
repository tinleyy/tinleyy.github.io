import { Input } from "@material-ui/core";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, TextField } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import { updateOneIndexSensor } from "../../../../service/indexsensors";
import { IndexSensorsEditModeInput } from "../../../../service/indexsensors/types";
import { getAllSensors } from "../../../../service/sensors";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import "./EditRecordForm.css";

export default function EditRecordForm({ id, indexId, createAt, updateAt, handleUpdateRefresh }: { id: number, indexId: number, createAt: Date, updateAt: Date, handleUpdateRefresh: Function }) {
    // const alert = useAlert();
    const { control, handleSubmit, watch, formState: { errors } } = useForm<IndexSensorsEditModeInput>();
    const onSubmit: SubmitHandler<IndexSensorsEditModeInput> = async data => {
        let sensor_id = data.sensor_id.value;
        const response = await updateOneIndexSensor(id, {
            index_id: indexId,
            amount: data.amount,
            sensor_id: sensor_id,
            created_at: data.created_at,
            updated_at: data.updated_at
        });

        if (response?.id) {
            alert(`Data Record ${response.id} updated successfully \n index_id: ${response?.index_id} \n sensor_id: ${response?.sensor_id}`);
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
                {id}
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
                <Controller
                    control={control}
                    name="created_at"
                    // rules={{ required: true }} //optional
                    render={({
                        field: { onChange, name, value },
                        fieldState: { invalid, isDirty }, //optional
                        formState: { errors }, //optional, but necessary if you want to show an error message
                    }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                // label="StartAt"
                                value={value || createAt}
                                onChange={(date) => {
                                    onChange(date || "");
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    )}
                />
            </TableCell>
            <TableCell>
            <Controller
                    control={control}
                    name="updated_at"
                    // rules={{ required: true }} //optional
                    render={({
                        field: { onChange, name, value },
                        fieldState: { invalid, isDirty }, //optional
                        formState: { errors }, //optional, but necessary if you want to show an error message
                    }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                // label="StartAt"
                                value={value || updateAt}
                                onChange={(date) => {
                                    onChange(date || "");
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    )}
                />
            </TableCell>
            <TableCell align="right">
                <Button color="success" onClick={handleSubmit(onSubmit)}>
                    <CheckCircleIcon />
                </Button>
            </TableCell>
        </TableRow>
    );
}
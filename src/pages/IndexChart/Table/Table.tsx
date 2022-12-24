import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { IndexSensorsResponse } from '../../../service/indexsensors/types';
import { getAllIndexSensors } from '../../../service/indexsensors';
import moment from 'moment';
import CreateNewRecordForm from './CreateNewRecordForm/CreateNewRecordForm';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import EditIcon from '@mui/icons-material/Edit';
import { deleteOneIndexSensor } from '../../../service/indexsensors';
import EditRecordForm from './EditRecordForm/EditRecordForm';

export default function IndexTable({ id }: { id: number }) {
    const [rows, setRows] = useState<IndexSensorsResponse[]>([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(0);
    const [editMode, setEditMode] = useState(-1);
    const [updated, setUpdated] = useState(false);

    const fetchIndexRecords = async () => {
        const data = await getAllIndexSensors(id, skip, limit);
        setRows(data);
    }
    const handleUpdateRefresh = async () => {
        setUpdated(!updated);
    }

    const handleRemoveIndexSensor = async (id: number) => {
        const data = await deleteOneIndexSensor(id);
        if (data) {
            alert(`remove record ${id} sucessfully`);
        }
        handleUpdateRefresh();
    }

    useEffect(() => {
        if (rows.length < 1 || updated) {
            fetchIndexRecords();
            setUpdated(false);
        }
    }, [updated, rows]);

    return (
        <TableContainer component={Paper} sx={{ maxHeight: '30vh', bottom: 0, position: "absolute" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>CreateAt</TableCell>
                        <TableCell>UpdateAt</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* default row */}
                    <CreateNewRecordForm id={id} handleUpdateRefresh={handleUpdateRefresh} />

                    {rows.map((row, index) => {
                        if (editMode === row.id) {
                            return (
                                <EditRecordForm key={index} id={row.id} indexId={row.index_id} createAt={row.created_at} updateAt={row.updated_at} handleUpdateRefresh={handleUpdateRefresh} />
                            );
                        }
                        return (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell>{row.amount}</TableCell>
                                <TableCell>{row.sensor_id}</TableCell>
                                <TableCell>{moment(row.created_at).format('YYYY/MM/DD hh:mm:ss')}</TableCell>
                                <TableCell>{moment(row.updated_at).format('YYYY/MM/DD hh:mm:ss')}</TableCell>
                                <TableCell align="right">
                                    <Button color='error' onClick={() => handleRemoveIndexSensor(row.id)}>
                                        <RemoveCircleIcon />
                                    </Button>
                                    <Button onClick={() => setEditMode(row.id)}>
                                        <EditIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer >
    );
}
import React, {useState, useEffect} from 'react'
import axiosInstance from './axiosConfig';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';


const columns = [
    { id: 'word', label: 'Word', minWidth: 170 },
    { id: 'meaning', label: 'Meaning', minWidth: 100 },
];

export default function MyVocabs() {
    const [data, setData] = useState([])

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    useEffect(() => {
        async function getMyVocabs() {
            try {
                const vocabs = await axiosInstance.get('/myvocabs/', { headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                  } })
                console.log("MyVocabs: " + vocabs.data)
                setData(vocabs.data)
            } catch (error) {
                console.log("Error: " + error)
            }
        }
        getMyVocabs()
    }, []);
  return (
    <div className='container' style={{paddingTop: '80px'}}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, backgroundColor: 'rgb(239 255 238)' }}
                        >
                        <h6>{column.label}</h6>
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                <TableCell key={row.id} style={{ fontWeight: 700 }}>
                                    {row.word}
                                </TableCell>
                                <TableCell key={row.id}>
                                    {row.meaning}
                                </TableCell>
                            </TableRow>
                        );
                    })
                }
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Paper>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import axiosInstance from './axiosConfig';
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions() {
    const [data, setData] = useState([]);
    const [meaningData, setMeaningData] = useState(
        {
            "today": 0,
            "this_week": 0,
            "this_month": 0,
            "total": 0
        }
    );

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axiosInstance.get('/editorials/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                console.log("Data : " + response.data)
                setData(response.data);
            } catch (error) {
                alert("Please Select correct detail");
            }
        }
        fetchData();
    }, []);

    const [translation, setTranslation] = useState('');
    const handleClick = async (value) => {
        try {
            const response = await axiosInstance.get('/get_hindi_translation/', {
                params: { word: value }, headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            setTranslation(`${value} : ${response.data.tohindi}`);
        } catch (error) {
            alert("Please Select correct detail");
        }
    };

    useEffect(() => {
        async function fetchMeaningCount() {
            try {
                const meaningResponse = await axiosInstance.get('/meaningsearched/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                console.log("MeaningData : " + meaningResponse.data)
                setMeaningData(meaningResponse.data);
            } catch (error) {
                alert("Please Select correct detail");
            }
        }
        fetchMeaningCount();
    }, [translation]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(0);
    };

    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div className='container my-2' style={{ paddingTop: '60px' }}>
            <Card style={{ marginBottom: '20px' }}>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div" bgcolor="#00ffff29" color="black" padding="10px">
                        Meaning Searched
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 3, sm: 8, md: 8 }}>
                        <Grid item xs={6}>
                            <Item style={{ fontWeight: 700 }}>{meaningData.today}</Item>
                            <Item>Today</Item>
                        </Grid>
                        <Grid item xs={6}>
                            <Item style={{ fontWeight: 700 }}>{meaningData.this_week}</Item>
                            <Item>This Week</Item>
                        </Grid>
                        <Grid item xs={6}>
                            <Item style={{ fontWeight: 700 }}>{meaningData.this_month}</Item>
                            <Item>This Month</Item>
                        </Grid>
                        <Grid item xs={6}>
                            <Item style={{ fontWeight: 700 }}>{meaningData.total}</Item>
                            <Item>Total</Item>
                        </Grid>
                    </Grid>
                    </Typography>
                </CardContent>
            </Card>
            <div className="mb-1 mt-2" style={{ backgroundColor: '#fff', position: 'sticky', top: 70, width: '100%', left: 0, zIndex: 1000 }}>
                <textarea className="form-control" id="translate" value={translation} rows="2" placeholder='Open any artical and click on any word to see their meaning in hindi.'></textarea>
            </div>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div" bgcolor="#00ffff29" color="black" padding="10px">
                        Editorials
                    </Typography>
                    <Typography variant="body2" color="text.secondary">

                        {
                            data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(item => (
                                    <>
                                        <Accordion expanded={expanded === `panel${item.id}`} key={item.id} onChange={handleChange(`panel${item.id}`)}>
                                            <AccordionSummary aria-controls={`panel${item.id}d-content`} id={`panel${item.id}d-header`}>
                                                <Typography>{item.title}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    <strong className="editorial-content">{item.sub_title}</strong>
                                                    <br />
                                                    {
                                                        item.content.split(/[\s,.!?]+/).map((itm, index)  => (
                                                            <span style={{ textAlign: 'justify' }} key={`${itm}-${index}`} onClick={() => handleClick(itm)} className="editorial-content">{itm} </span>
                                                        ))
                                                    }
                                                    <span className="mx-3" style={{ float: 'right' }}>Date : {item.date}</span>
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </>
                                ))
                        }

                    </Typography>
                </CardContent>
                <CardActions>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={data.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        width='100%'
                    />
                </CardActions>
            </Card>
        </div>
    );
}
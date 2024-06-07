import React, {useState, useEffect} from 'react'
import axiosInstance from './axiosConfig';
import { Pagination } from '@mui/material';
import Stack from '@mui/material/Stack';

export default function VocabTextArea() {
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchEditorial(currentPage);
    }, [currentPage]);

    const fetchEditorial = async (value) => {
        try {
            const response = await axiosInstance.get('/editorials/?page='+value, { headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
              } });
            setData(response.data.results);
            let count = response.data.count
            setTotalPages(Math.ceil(count/10))
        } catch (error) {
            alert("Please Select correct detail");
        }
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const [translation, setTranslation] = useState('');
    const handleClick = async (value) => {
        try {
            const response = await axiosInstance.get('/get_hindi_translation/', { params: { word: value }, headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
              } });
            setTranslation(`${value} : ${response.data.tohindi}`);
        } catch (error) {
            alert("Please Select correct detail");
        }
    };

    return (
        <div className='container my-2' style={{paddingTop: '60px'}}>
        <div className="row">
            <div className="col-12">
                <div className="mb-3 mt-4" style={{backgroundColor: '#fff',position: '-webkit-sticky', position: 'sticky', top: 70, width: '100%', left: 0, zIndex: 1000}}>
                    <textarea className="form-control" id="translate" value={translation} rows="2" placeholder='Open any artical and click on any word to see their meaning in hindi.'></textarea>
                </div>
                <div className="card">
                    <div className="card-header" style={{ backgroundColor: 'rgb(239 255 238)' }}>
                        <h6 className='my-2'>Today's Editorial</h6>
                    </div>
                    <div className="card-body">
                        <div className="accordion" id="accordionExample">
                            {
                                data.map(item => (
                                    <div className="accordion-item" key={item.id}>
                                        <h2 className="accordion-header" id={`flush-heading-${ item.id }`}>
                                            <button className="accordion-button bg-light editorial-content" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${ item.id }`} aria-expanded="false" aria-controls={`collapse-${ item.id }`}>
                                                { item.title }
                                            </button>
                                        </h2>
                                        <div id={`collapse-${ item.id }`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <strong className="editorial-content">{ item.sub_title }</strong>
                                                <br />
                                                {
                                                    item.content.split(/[\s,.!?]+/).map(itm => (
                                                        <span style={{textAlign: 'justify'}} onClick={() => handleClick(itm)} className="editorial-content">{ itm } </span>
                                                    ))
                                                }
                                            </div>
                                            <p className="mx-3" style={{float: 'right'}}>Date : { item.date }</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="mx-1 my-3" style={{float: 'right', color: 'blue'}}>
                            <Stack spacing={2}>
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    variant="outlined"
                                    color='success'
                                />
                            </Stack>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

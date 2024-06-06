import React, {useState, useEffect} from 'react'
import axiosInstance from './axiosConfig';


export default function VocabTextArea() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState([]);
    const [prev, setPrev] = useState(null);
    const [next, setNext] = useState(null);

    useEffect(() => {
        if ( data.length < 1 ) {
            async function getAllEditorials() {
                try {
                    const editorials = await axiosInstance.get('/editorials/', { headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    } })
                    setData(editorials.data.results)
                    setPrev(editorials.data.previous)
                    setNext(editorials.data.next)
                    let count = editorials.data.count
                    let maxPage = Math.floor(count/10) + 1
                    let start = 1
                    let pageArray = [...Array(maxPage - start + 1).keys()].map(i => i + start);
                    setPage(pageArray)
                } catch (error) {
                    console.log("Error: " + error)
                }
            }
            getAllEditorials()
        }
    }, [data]);

    console.log("Data: "+ data)

    const fetchEditorial = async (value) => {
        console.log("Clicked div value:", value);
        try {
            const response = await axiosInstance.get('/editorials/?page='+value, { headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
              } });
            setData(response.data.results);
            setPrev(response.data.previous)
            setNext(response.data.next)
        } catch (error) {
            alert("Please Select correct detail");
        }
    };

    const [translation, setTranslation] = useState('');
    const handleClick = async (value) => {
        console.log("Clicked div value:", value);
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
        <div className='container my-3' style={{paddingTop: '70px'}}>
        <div className="row">
            <div className="col-12">
                <div className="mb-3 sticky-top" style={{backgroundColor: '#fff'}}>
                    {/* <label htmlFor="exampleFormControlTextarea1" className="form-label">Hindi Translation</label> */}
                    <textarea className="form-control" id="translate" value={translation} rows="2"></textarea>
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
                            {prev ? (
                                <span className='mx-1 btn btn-success' onClick={() => fetchEditorial(prev.split('=')[1])}>Prev</span>
                            ) : (
                                <span className='mx-1 btn btn-secondary' disabled>Prev</span>
                            )}
                            {
                                page.map(item => (
                                    <span className='mx-1 btn btn-success' onClick={() => fetchEditorial(item)}>{item}</span>
                                ))
                            }
                            {next ? (
                                <span className='mx-1 btn btn-success' onClick={() => fetchEditorial(next.split('=')[1])}>Next</span>
                            ) : (
                                <span className='mx-1 btn btn-secondary' disabled>Next</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

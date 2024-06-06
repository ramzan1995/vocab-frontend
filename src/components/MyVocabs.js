import React, {useState, useEffect} from 'react'
import axiosInstance from './axiosConfig';

export default function MyVocabs() {
    const [data, setData] = useState([])

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
    <div className='container' style={{paddingTop: '70px'}}>
        <div className='row'>
            <div className='col-12'>
                <div className='card my-3'>
                    <div className='card-header' style={{ backgroundColor: 'rgb(239 255 238)' }}>
                        <h6 className='my-2'>My Vocabulary</h6>
                    </div>
                    <div className='card-body'>
                        <div className='row'>
                            {
                                data.map(item => (
                                    <>
                                    <div className='col-4 d-flex justify-content-between'>
                                        <b>{item.word}</b>
                                    </div>
                                    <div className='col-4 d-flex justify-content-center'>
                                        <b>:</b>
                                    </div>
                                    <div className='col-4 d-flex justify-content-between'>
                                        <b>{item.meaning}</b>
                                    </div>
                                    </>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

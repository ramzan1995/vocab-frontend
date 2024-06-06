import React, {useState, useEffect} from "react"

export default function TextArea() {
  const [text, setText] = useState("Enter your text here")
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch('http://127.0.0.1:8000/editorials/')
  //     .then(response => response.json())
  //     .then(data => setData(data))
  //     .catch(error => console.error('Error:', error));
  // }, []);
  useEffect(() => {
    console.log('Component mounted or data fetching initiated');
    fetch('http://127.0.0.1:8000/editorials/')
    .then(response => {
        console.log('Data fetched successfully:', response.data);
        setData(response.data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
  }, []);

  console.log("Data: "+ data)
  useEffect(() => {
    console.log('Data state updated:', data);
  }, [data]);



  const handleOnChange=(event)=> {
    console.log("On Change Triggered.")
    setText(event.target.value);
  }

  const convertUpperCase=()=> {
    let upperText = text.toUpperCase();
    setText(upperText)
  }

  return (
    <div className="mb-3">
        <textarea className="form-control" id="textArea" onChange={handleOnChange} value={text} rows="8"></textarea>
        <button className='btn btn-primary my-2' onClick={convertUpperCase}>Convert To UpperCase</button>
    </div>
  )
}

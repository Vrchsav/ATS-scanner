import React, { useState } from 'react';
import './App.css';
import axios from 'axios'


function App() {
  const [pdfile, setPdfile] = useState(null); // Use null for initial file selection
  const [data, setData] = useState({
    jb: '',
  });
  const [reply, setReply] = useState(''); // Initialize reply state
  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  // Mock API response for development purposes

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('jd', data.jb);
    formData.append('pdfFile', pdfile);
    setIsLoading(true);
    console.log(import.meta.env.VITE_BASE_URL);
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/upload`, formData)
    setIsLoading(false);
    if (response.data.success) {
      setReply(response.data.message);
    } else {
      // Handle API errors here
      setReply('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <div className='container'>
  <h1>Resume ATS Score Checker</h1>
  <form onSubmit={onSubmitHandler}>
    <div className='upload-pdf'>
      <p>Upload your Resume (PDF only)</p>
      <label htmlFor="pdfile" className="file-label">Choose File</label>
      <input
        onChange={(e) => setPdfile(e.target.files[0])}
        type="file"
        id="pdfile"
        accept=".pdf"
        required
      />
    </div>
    <div className='job-description'>
      <p>Job Description</p>
      <textarea
        onChange={onChangeHandler}
        value={data.jb}
        name="jb"
        placeholder="Type here"
        required
      ></textarea>
    </div>
    <button type="submit">Submit</button>
  </form>
  <div className='reply'>
  {isLoading && <div className="loading-animation"></div>} 
  {reply && <p>{reply}</p>}
  
  </div>
</div>
    
    </>
  );
}

export default App;

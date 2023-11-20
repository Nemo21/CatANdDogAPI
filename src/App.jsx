import './App.css'
import {useState,useEffect} from 'react'
import axios from 'axios'

function App() {
  const urlcat=` https://api.thecatapi.com/v1/images/search`
  const urldog=` https://api.thedogapi.com/v1/images/search`
  
  const [loadingdog,setLoadingdog]=useState(true);
  const [loadingcat,setLoadingcat]=useState(true);
  const [score,setScore]=useState({cat:0,dog:0});
  const [err,setErr]=useState(undefined);
  const [catimage,setCatimage]=useState(undefined);
  const [dogimage,setDogimage]=useState(undefined);
  const getImagescat=()=>{
    axios.get(urlcat).then((response)=>{
      // console.log(response.data[0].url); 
      setCatimage(response.data[0].url);
      setLoadingcat(false);
    })
  }
  const getImagesdog=()=>{
    axios.get(urldog).then((response)=>{
      // console.log(response.data[0].url);
      setDogimage(response.data[0].url);
      setLoadingdog(false);
    })
  }
  useEffect(() => {
    
    getImagescat();
    getImagesdog();

  },[]);
  if(loadingcat || loadingdog)
  {
    return <h1>Loading...</h1>
  }
  return (
    <>
      <div className="container0">
      <div className="catvote">Like cat {score.cat}</div>
       <div className="dogvote">Like dog {score.dog}</div>
      </div>
      <div className="container">
      {catimage && <img src={catimage} alt="catimage" className="catimage"/>}
      {dogimage && <img src={dogimage} alt="dogimage" className="dogimage"/>}
      </div>
      <div className="container2">
      {catimage && <button className="btn" onClick={()=>{
        setScore({...score,cat:score.cat+1})
        getImagescat();
        getImagesdog();
      }}>Like cat</button>}
      {dogimage && <button className="btn" onClick={()=>{
        setScore({...score,dog:score.dog+1})
        getImagescat();
        getImagesdog();
      }}>Like dog</button>}
      </div>
    </>
  )
}

export default App

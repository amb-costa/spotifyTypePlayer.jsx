import React, { useState, useEffect, useRef } from "react";
import Nav from "./nav.jsx"
import ButtonBar from "./buttonbar.jsx"

//create your first component
const Home = () => {
  //songArray: array, contains set of data for each songs: id, category, name, url according to future songs
  //songSelected: index, points to song being modified/played
  //songPlay: boolean, false if song is paused
  //Music: reference to link player structure and functionality
  //initURL: main url, specific url will be added on audio tag
  const [songArray, setSongArray] = useState([{id:"",category:"",name:"",url:""}]);
  const [songSelected, setSongSelected] = useState(0);
  const [songPlay, setSongPlay] = useState(false);
  const Music = useRef();
  const initURL = "https://assets.breatheco.de/apis/sound/"

  //according to ./apis/sound/songs, there's 20 songs
  //however, there's 6 songs with cartoon category
  //there's also 3 songs with id:11
  //accordingly, we'll only fetch the first 16 songs on the url
  const Fetching = () => {
    fetch("https://assets.breatheco.de/apis/sound/songs")
      .then(response => response.json())
      .then(data =>
        setSongArray([
          {id: 0, category: data[0].category, name: data[0].name, url: data[0].url},
          {id: 1, category: data[1].category, name: data[1].name, url: data[1].url},
          {id: 2, category: data[2].category, name: data[2].name, url: data[2].url},
          {id: 3, category: data[3].category, name: data[3].name, url: data[3].url},
          {id: 4, category: data[4].category, name: data[4].name, url: data[4].url},
          {id: 5, category: data[5].category, name: data[5].name, url: data[5].url},
          {id: 6, category: data[6].category, name: data[6].name, url: data[6].url},
          {id: 7, category: data[7].category, name: data[7].name, url: data[7].url},
          {id: 8, category: data[8].category, name: data[8].name, url: data[8].url},
          {id: 9, category: data[9].category, name: data[9].name, url: data[9].url},
          {id: 10, category: data[10].category, name: data[10].name, url: data[10].url},
          {id: 11, category: data[11].category, name: data[11].name, url: data[11].url},
          {id: 12, category: data[12].category, name: data[12].name, url: data[12].url},
          {id: 13, category: data[13].category, name: data[13].name, url: data[13].url},
          {id: 14, category: data[14].category, name: data[14].name, url: data[14].url},
          {id: 15, category: data[15].category, name: data[15].name, url: data[15].url}
        ]))
  };
  //Fetching effect: songs stay in container array
  //Play effect: song is played or paused, called when audioTag or selected song changes
  useEffect(()=>{Fetching()},[]);
  useEffect(()=>{(songPlay)? Music.current.play(): Music.current.pause()}, [songSelected, songPlay]);
  
  //KEEP IN MIND!: last 3 songs generate a 404 error, buttons are still functional

  return (
    <>
      <Nav />
      <div className="w-100">
        {songArray.map((songName,index) => 
          <div className={songName.id==songSelected? "selected":""} id="actualSong" key={index} onClick={()=>{setSongSelected(index),setSongPlay(true)}}>
            <span>{index+1}</span>
            <span>{songName.name}</span>
          </div>)}
      </div>
      <audio src={initURL+songArray[songSelected].url} ref={Music} /> 
      <ButtonBar audioRef={Music} songPlaying={songPlay} setSongPlaying={setSongPlay} indexSelected={songSelected} setIndexSelected={setSongSelected} songList={songArray}/>
    </>
  );
};

export default Home;

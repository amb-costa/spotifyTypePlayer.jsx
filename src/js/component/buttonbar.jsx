import React from "react";
import {FaBackward, FaForward, FaPlay, FaPause} from "react-icons/fa";

const ButtonBar = ({audioRef,songPlaying,setSongPlaying,indexSelected,setIndexSelected,songList}) => {
    //Backwards: retrieves index from song being played
    //sets new selected song on previous index
    //if song is on index 0, new selected song will be the last on list
    //returns audioRef time to zero
    const Backwards = () => {
        const index = songList.findIndex(i => i.id == songList[indexSelected].id);
        ((index==0) ? setIndexSelected(songList.length-1): setIndexSelected(index-1));
        audioRef.current.currentTime=0;
    }

    //Forwards: retrieves index from song being played
    //sets new selected song on next index
    //if song is on index (listlength)-1, new selected song will be on index 0
    //returns audioRef time to zero
    const Forwards = () => {
        const index = songList.findIndex((i => i.id == songList[indexSelected].id));
        ((index==(songList.length-1))? setIndexSelected(0): setIndexSelected(index+1));
        audioRef.current.currentTime=0
    }

    //if songPlaying=true, then pause icon should display, turning songPlaying=false when clicked
    //if songPlaying=false, then play icon should display, turning songPlaying=true when clicked

    return (
        <div className="fixed-bottom bg-dark py-3 justify-content-center d-inline-flex">
        <FaBackward className="icon" onClick={Backwards}/>
        {songPlaying? <FaPause className="icon" onClick={()=>setSongPlaying(false)}/>:<FaPlay className="icon" onClick={()=>setSongPlaying(true)}/>}
        <FaForward className="icon" onClick={Forwards}/>
      </div>
    )
}

export default ButtonBar;
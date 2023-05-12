import { useRef, useEffect, useState } from "react";
import BigPlay from "./bigPlay";
import Controls from "./controls";
import VideoHeader from "./header";

export default function VideoForIframe({ src, id }) {
  const video = useRef(null);
  const [fresh, setFresh] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stalling, setStalling] = useState(false);
  const [time, setTime] = useState(0);

  const registerStream = async () => {
    await fetch(`/api/media/cs/${id}`);
  };

  const play = () => {
    video.current.play();
  };

  const pause = () => {
    video.current.pause();
    console.log(video.current.muted)
  };

  const fullscreen = () => {
    video.current.requestFullscreen();
  };

  const seek = (t)=>{
    video.current.currentTime = t;
  }

  const mute = ()=>{
    video.current.muted = !video.current.muted;
  }

  useEffect(() => {
    let totalTimeStreamed = 0;
    let _isPlaying = false;
    let streamCap = 0;

    let interval = setInterval(() => {
      if (!_isPlaying) return;
      totalTimeStreamed++;
      if (totalTimeStreamed >= streamCap) {
        clearInterval(interval);
        console.log("registering stream");
        registerStream();
      }
    }, 1000);

    // video.current.onclick = ()=>{
      
    // }

    window.onmessage = (e)=>{
      if(e.data.type == "pause"){
        pause();
      }else {
        play();
      }
    }

    video.current.onplaying = () => {
      streamCap =
        video.current.duration <= 30 ? video.current.duration - 1 : 30;
      _isPlaying = true;
      setIsPlaying(true);
    };

    // video.current.loadedmetadata = ()=>{
    //   window.parent?.postMessage({type: "duration", data: video.current.duration}, "http://localhost:3001");
    // }

    video.current.ontimeupdate = ()=> {
      window.parent?.postMessage({type: "timeupdate", data: {currentTime: video.current.currentTime, duration: video.current.duration}}, "*");
      setTime(video.current.currentTime);
    }

    video.current.onabort = 
      video.current.onstalled =
      video.current.onwaiting = ()=> {
        _isPlaying = false;
        setStalling(true);
      }
      video.current.onerror =
      video.current.onended =
      video.current.onemptied =
        () => {
          _isPlaying = false;
        };

    video.current.onpause = () => {
      _isPlaying = false;
      setIsPlaying(false);
    };

    return () => {
      video.current.ontimeupdate = null;
      video.current.onabort =
        video.current.onpause =
        video.current.onstalled =
        video.current.onwaiting =
        video.current.onerror =
        video.current.onended =
        video.current.onemptied =
        video.current.onplaying =
        window.onmessage = 
          null;

      interval.hasRef && clearInterval(interval);
    };
  }, []);
  return (
    <div className="h-[100vh] relative" id="video-for-iframe">
      <video
        src={src}
        ref={video}
        // autoPlay
        className="absolute top-[0px] left-[0] h-[100vh] w-[100vw] block bg-black"
        controlsList="nodownload"
        controls
      ></video>

      {/* <div className="z-10 w-full flex flex-col justify-between h-full"
        onClick={()=>{
          if(fresh) return;
          if(isPlaying){
            pause();
          }else {
            play();
          }
        }}
      >

        {fresh && (
          <BigPlay
            title={""}
            play={() => {
              play();
              setFresh(false);
            }}
          />
        )}
        {!fresh && (
          <Controls
            duration={video.current.duration}
            currentTime={time}
            isPlaying={isPlaying}
            toggle={() => {}}
            play={play}
            pause={pause}
            waiting={false}
            fullscreen={fullscreen}
            seek={seek}
            mute={mute}
          />
        )}
      </div> */}
    </div>
  );
}

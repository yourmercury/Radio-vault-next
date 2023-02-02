import { parseSecondsToTime } from "@/utils";
import { useEffect, useRef } from "react";

export default function Controls({fullscreen, isPlaying, pause, play, duration, currentTime, seek}){
    const bar = useRef(null);
    const progress = useRef(null)
    const nob = useRef(null);
    const perc = currentTime/duration * 100;

    useEffect(()=>{
        let down = false;
        let point = 0;

        bar.current.onclick = (e)=>{
            const x = e.offsetX;
            const w = bar.current.getBoundingClientRect().width-8

            const ratio = x/w;
            const t = ratio * duration;
            seek(t);
        }

        window.onmouseup = (e)=>{
            if(!down) return;
            e.stopPropagation()
            down = false;
            point = 0;
            
            const x = e.offsetX;
            const w = bar.current.getBoundingClientRect().width-8

            // console.log(x, w)
            const ratio = x/w;
            const t = ratio * duration;
            seek(t);
            play();
        }

        nob.current.onmousedown = (e)=>{
            pause();
            e.stopPropagation();
            down = true;
            point = e.screenX
            // console.log(point)
        }

        window.onmousemove = (e)=>{
            e.stopPropagation()
            if(down){
                let diff = e.screenX - point
                progress.current.style.width = (progress.current.getBoundingClientRect().width + diff)+"px";
                // console.log(progress.current.getBoundingClientRect().width)
                point = e.screenX;
            }
        }

        return ()=>{
            bar.current.onmouseup =
            window.onmouseup =
            progress.current.onmousedown
            window.onmousemove = null;
        }
    }, [])
    
    return (
        <div className="py-[4vh] px-[4vw] bg-gradient-to-b from-[#ffffff00] to-black mt-auto">
          <div className="flex">
            <img
              className="h-[35px] w-[35px] rounded-full ml-auto mb-[3.5vh]"
              src="/assets/vercel.svg"
            />
          </div>


          <div ref={bar} className="w-full flex justify-center items-center hover:bg-[#ffffff3a] rounded px-[4px] py-[4px]">
            <div className="bg-[#bcbcbc85] w-full h-[2px] rounded relative">
              <div className={`bg-theme-orange h-[2px] relative`} style={{width: `${perc}%`}} ref={progress}>
                  <div className="bg-theme-orange h-[8px] w-[8px] rounded-full right-0 centered absolute" ref={nob}>
                    
                  </div>
              </div>
            </div>
          </div>

        

          <div className="flex justify-between px-[5vw] mt-[3.5vh]">
            <div className="flex items-center">
              <img src={`/assets/${isPlaying? "pause": "play"}.svg`} alt="" className="mr-[25px] control-icon" 
                onClick={isPlaying? pause : play}
              />
              <img src="/assets/volume-up.svg" alt="" className="mr-[25px] control-icon" />
              {/* <div className="rounded-xl p-1 flex bg-[#ffffff] mr-[25px]">
                  <div className="h-[15px] w-[15px] bg-theme-orange mx-[2px] rounded"></div>
                  <div className="h-[15px] w-[15px] bg-theme-orange mx-[2px] rounded"></div>
                  <div className="h-[15px] w-[15px] bg-theme-orange mx-[2px] rounded"></div>
                  <div className="h-[15px] w-[15px] bg-theme-orange mx-[2px] rounded"></div>
              </div> */}
              <span className="text-[white]">{parseSecondsToTime(currentTime, duration/60/60 > 0)} / {parseSecondsToTime(duration)}</span>
            </div>

            <div className="flex items-center">
              {/* <img src="/assets/settings.svg" alt="" className="mr-[25px] control-icon" /> */}
              <img src="/assets/fullscreen.svg" alt="" className="control-icon"
                onClick={fullscreen}
              />
            </div>
          </div>
        </div>
    )
}
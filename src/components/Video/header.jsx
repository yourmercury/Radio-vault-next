export default function VideoHeader({play}) {
  return (
    <div className="flex justify-between items-center py-[4vh] px-[4vw] bg-gradient-to-b from-black to-[#ffffff00]">
      <div className="flex items-center">
        <img
          className="h-[35px] w-[35px] rounded-full mr-[10px]"
          src="/assets/vercel.svg"
        />
        <span className="text-[white]">Two seconds video...</span>
      </div>

      {/* <div className="flex items-center">
        <div className="flex flex-col items-center mr-[10vw]">
          <img src="/assets/share.svg" className="icon" alt="" />
          <span className="text-[white]">Share</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/assets/info.svg" className="icon" alt="" />
          <span className="text-[white]">Info</span>
        </div>
      </div> */}
    </div>
  );
}

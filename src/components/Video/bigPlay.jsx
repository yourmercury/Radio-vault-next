export default function BigPlay({ play }) {
  return (
    <div className="flex px-[4vw] absolute centered justify-center items-center w-full">
      {/* <div className="text-white w-[30%] max-h-[30vh] overflow-y-hidden bg-[#0000003e] p-[10px]">
        How to turn your songs to NFT on RadioVaults How to turn your songs to
        NFT on RadioVaults How to turn your songs to NFT on RadioVaults
      </div> */}
      <div className="flex-1 flex justify-center items-center">
        <img
          src="/assets/big-play.svg"
          alt=""
          className="bg-white rounded-full big-play"
          onClick={play}
        />
      </div>
      {/* <div className="flex-1"></div> */}
    </div>
  );
}

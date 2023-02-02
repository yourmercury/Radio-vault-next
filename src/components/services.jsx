import Text from "./texts";
import Button from "./button";

export default function Services() {
  return (
    <div className="w-full h-full flex justify-center items-center">
        <div className="w-[700px] h-fit p-10 flex bg-theme-light-grey top-[70px]">
      <div className="flex flex-col w-[50%] mr-10">
        <div className="mb-5">
          <Text size="mid" cls={"text-[18px] font-semibold w-fit"}>
            Create Vaults
          </Text>
          <Text cls={"my-1"}>
            Track all of your music in one place and permission where you want
            your music to play as the vault owner!
          </Text>
        </div>
        <div>
          <Text size="mid" cls={"text-[18px] font-semibold w-fit"}>
            Mint NFTs
          </Text>
          <Text cls={"my-1"}>
            Mint NFTs and receive a stream everytime the tune is played for any
            reason!
          </Text>
        </div>
      </div>

      <div className="flex flex-col w-[50%]">
        <div className="mb-5">
          <Text size="mid" cls={"text-[18px] font-semibold w-fit"}>
            Distribute Your Music
          </Text>
          <Text cls={"my-1"}>
            Distribute your music between web 2.0 and web 3.0 seamlessly!
          </Text>
        </div>
        <div>
          <Text size="mid" cls={"text-[18px] font-semibold w-fit"}>
            Stream Music Into Metaverse
          </Text>
          <Text cls={"my-1"}>
            License your music to be streamed in any metaverse - Be heard by
            millions across the globe!
          </Text>
        </div>
      </div>
    </div>
    </div>
  );
}

import Text from "./texts";
import Button from "./button";


export default function VaultNFTS() {
  return (
    <div className="">
      <div className="my-20">
        <Text size="mid" cls={"text-[18px] font-semibold pl-5 w-fit m-auto"}>
          Deploy Token on EVM chain (Coming soon)
        </Text>
        <Text cls={"text-center my-3"}>
          You can Tokenize this directly on our platform and make this into an
          NFT having these Metadatas and media binded to a blockchain record.
        </Text>
        {/* <Text cls={"text-center my-3"}>
          With the VRF you can control where the NFTs get deployed to and
          randomly select a web 2 streaming service provider to earn the stream
          for ANY particular stream on the blockchain!
        </Text> */}
        <Button label={"Coming soon!"} cls={"block m-auto"} />
      </div>
    </div>
  );
}

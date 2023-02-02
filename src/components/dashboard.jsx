import React, { useContext, useEffect, useState } from "react";
import Text from "./texts";
import { toast } from "react-toastify";
import { endPoint, getMetadata, getVaults, parseUrl } from "../api/api";
import { UserContext } from "../contexts/user.contexts";
import Button from "./button";
import { useRouter } from "next/router";

export default function Dashboard({ }) {
  const { vaults, setVaults, account, user } = useContext(UserContext);
  const [loaded, load] = useState(false);

  function loadVaults(signal) {
    toast.promise(
      async () => {
        try {
          return await getVaults(account, signal);
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      {
        pending: "Loading your Vaults",
        success: {
          render({ data }) {
            // console.log(data);
            load(true);
            setVaults(data.metadatas);
            return `Success!`;
          },
        },
        error: {
          render({ data }) {
            load(true);
            return "Oops! Something went wrong";
          },
        },
      }
    );
  }

  useEffect(() => {
    const controller = new AbortController()
    // if (!loaded) {
    //   load(true);
    //   return;
    // }
    loadVaults(controller.signal);

    return ()=>{
      controller.abort();
    }
  }, [loaded]);

  return (
    <div>
      <div className="flex">
        <div className="flex items-center w-fit ml-auto">
          {user && <div>
            <Text cls={`text-[11px]`}>Total Streams</Text>
            <Text cls={`font-bold text-right`}>{user.totalStreams}</Text>
          </div>}
          <div className="bg-theme-red w-fit h-[25px] rounded p-1 relative ml-3">
            <img src={"/assets/chart.svg"} className={`h-[100%]`} />
          </div>
        </div>
      </div>

      <div>
        <div className="mb-5">
          <Text size={"lg"} cls={"font-bold"}>
            TRACKS
          </Text>
        </div>
        <div>
          {vaults &&
            vaults.map((vault, index) => (
              <Track
                title={vault.mediaTitle}
                desc={vault.description}
                link={vault.ipfsUrl}
                key={index}
                id={vault._id}
                streams={vault.streamCount}
              />
            ))}
          {/* <Track />
          <Track />
          <Track /> */}
          {(!vaults || vaults.length == 0) && loaded && 
            <div className="text-center">You Have no vaults</div>
          }
        </div>
      </div>
    </div>
  );
}

function Track({ streams, link, id }) {
  const [metadata, setMetadata] = useState(null);
  const { setPrev, setSection } = useContext(UserContext);
  const router = useRouter()

  function preview() {
    router.push(`/preview/${id}`);
    // window.location.pathname = "/preview/"+id
  }

  useEffect(() => {
    getMetadata(link, id).then((meta) => {
      console.log(meta);
      setMetadata(meta);
    });
  }, []);

  if (!metadata) return null;

  return (
    <div className="my-4 flex justify-between items-center">
      <div className="flex items-center w-[40%] min-w-[500px] justify-between">
        <div>
          <video
            src={metadata.video}
            controls
            className={`h-[100px]`}
          ></video>
        </div>

        <div className="w-[200px] h-[100px] flex flex-col justify-between">
          <Text size={"md"} cls={`font-bold`}>
            {metadata.name}
          </Text>

          <Text cls={"text-[11px]"}>
            <Text cls={"font-bold"}>Description</Text>
            {metadata.description}
          </Text>
        </div>

        <div className="flex flex-col items-center">
          <Text size={"lg"} cls={"font-bold"}>
            {streams}
          </Text>
          <Text cls={`font-semibold`}>streams</Text>
        </div>
      </div>

      <div className="flex items-center">
        <Button label={"preview"} cls={"h-fit mr-10"} onClick={preview} />
        <Text
          cls={"text-12px underline"}
          onClick={() => {
            navigator.clipboard.writeText(`${endPoint}/metadata/${id}`);
            toast("copied");
          }}
        >
          copy link
        </Text>
      </div>
    </div>
  );
}

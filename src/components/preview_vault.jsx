import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/user.contexts";
import Button from "./button";
import Text from "./texts";
import { toast } from "react-toastify";

export default function Preview({metadata: prev}) {
  let [section, setSection] = useState(false);
  const [duration, setDuration] = useState(0);

  console.log(prev);

  useEffect(()=>{
    let vid = document.querySelector("#vid");
    vid && (vid.onload = (e)=>{
      console.log(vid.duration);
    })
  }, [prev])

  if(!prev) return null

  return (
    <div>
      <div className="flex justify-between">
        <Text size={"lg"} cls={"font-bold text-[25px]"}>
          {prev.name}
        </Text>

        <Text
          cls={"text-12px underline"}
          onClick={() => {
            navigator.clipboard.writeText(prev.link);
            toast("copied");
          }}
        >
          copy link
        </Text>
      </div>

      <div>
        <div className="relative my-5">
          <video id="vid" src={prev.video} controls className="w-[100%] h-[300px] object-cover" ></video>
        </div>

        <div className="">
          <Text cls={"font-bold"}>Description</Text>

          <Text>
            {prev.description}
          </Text>
        </div>

        <div className="flex w-fit bg-theme-red text-[white] px-5 py-2 rounded-xl justify-between m-auto my-8">
          {/* <div className="flex flex-col items-center">
            <Text size={"lg"} cls={"font-bold"}>
              Duration
            </Text>
            <Text cls={`font-semibold`}>10:00:00</Text>
          </div> */}
          <div className="flex flex-col items-center">
            <Text size={"lg"} cls={"font-bold"}>
              {prev.streams}
            </Text>
            <Text cls={`font-semibold`}>streams</Text>
          </div>
        </div>

        <div className="my-10">
          <div className="flex w-fit justify-between m-auto mb-10">
            <div
              className={`${
                section ? "border-theme-red" : "border-[transparent]"
              } border-b-[3px] py-2 cursor-pointer`}
              onClick={() => {
                setSection(true);
              }}
              style={{
                transition: "all 0.5s ease-in",
              }}
            >
              <Text size="mid" cls={"text-[18px] font-semibold pr-5"}>
                Web 3 Metadata
              </Text>
            </div>
            <div
              className={`${
                !section ? "border-theme-red" : "border-[transparent]"
              } border-b-[3px] py-2 cursor-pointer`}
              onClick={() => {
                setSection(false);
              }}
              style={{
                transition: "all 0.5s ease-in",
              }}
            >
              <Text size="mid" cls={"text-[18px] font-semibold pl-5"}>
                Web 2 Metadata
              </Text>
            </div>
          </div>
          {section && (
            <div className="w-[50%] m-auto">
              <Field title={"Name"} value={prev.name} />
              <Field title={"Collection"} value={prev.collection} />
              <Field
                title={"Description"}
                value={prev.description}
              />
            </div>
          )}

          {!section && (
            <div className="w-[50%] m-auto">
                {Object.keys(prev.web2_metadata).map((key, i)=>{
                    if(!prev.web2_metadata[key]) return null;
                    return <Field title={key} value={prev.web2_metadata[key]} />
                })}
            </div>
          )}

        </div>


        <div className="my-20">
          <Text size="mid" cls={"text-[18px] font-semibold pl-5 w-fit m-auto"}>
            Deploy Token on EVM chain
          </Text>
          <Text cls={"text-center my-3"}>You can Tokenize this directly on our platform and make this into an NFT having these Metadatas and media binded to a blockchain record</Text>
          <Button label={"click here"} cls={"block m-auto"}/>
        </div>
      </div>
    </div>
  );
}

function Field({ title, value }) {
  return (
    <div className="my-4">
      <Text cls={"font-semibold"}>{title}:</Text>
      <Text>{value}</Text>
    </div>
  );
}

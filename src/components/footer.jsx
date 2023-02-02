import React from "react";
import Text from "./texts";

export default function Footer() {
  return (
    <footer className="flex px-[10%] py-[20px] items-start justify-between bg-[black] text-[white]">
      <div className="">
        <Text size={"lg"} cls={"font-black text-[30px]"}>
          RadioVaults
        </Text>
        <Text cls="text-[11px]">@2022. All Rights Reserved</Text>
      </div>

      <div className="leading-7">
        <Text cls="mb-[10px]" size={"lg"}>
          Pages
        </Text>
        <div className="flex">
          <div>
            <Text cls="text-[11px]">Home</Text>
            <Text cls="text-[11px]">DashBoard</Text>
          </div>
          <div className="ml-5">
            <Text cls="text-[11px]">Create Radio Vault</Text>
            <Text cls="text-[11px]">Edit Radio Vault</Text>
          </div>
        </div>
      </div>

      <img src={"/assets/twitter.svg"} className={"h-[20px] self-center"} />
    </footer>
  );
}

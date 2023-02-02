import { useRouter } from "next/router";
import React from "react";
import Text from "./texts";

export default function Sidebar({setSection}){
    const router = useRouter()
    return (
        <div className="border-r-[7px] border-theme-red h-[100%] w-[20%] min-w-[150px] flex justify-center">
            <div className="h-[120px] flex flex-col justify-between mt-10 w-fit">
                <Text cls={`text-theme-red`} onClick={()=> router.push("/")}>
                    DashBoard
                </Text>
                <Text cls={`text-theme-red`} onClick={()=> router.push("/create-vault")}>
                    Create RadioVault
                </Text>
                <Text cls={`text-theme-red`} onClick={()=> router.push("/whitelist")}>
                    WhiteList
                </Text>
                <Text cls={`text-theme-red`} onClick={()=> router.push("/deploy-nft")}>
                    Deploy vaults NFTs (Coming soon) 
                </Text>
            </div>
        </div>
    )
}

import { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { getUser } from "../api/api";

export const UserContext = createContext();

export default function UserContextProvider({children}){
    const [account, setAccount] = useState("");
    const [vaults, setVaults] = useState(null);
    const [user, setUser] = useState(null);
    const [prev, setPrev] = useState(null);
    const [section, setSection] = useState(0);

    const handleConnect = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const accounts = await provider.send("eth_requestAccounts", [])
        setAccount(accounts[0])
    }
    
      const handleDisonnect = async () => {
        setAccount("");
      }
    
      useEffect(() => {
        // handleConnect();
        window.ethereum.on("accountsChanged", async (accounts) => {
          setAccount(accounts[0])
        })
      }, []);

      useEffect(()=>{
        const controller = new AbortController()
        console.log(account)
        account && getUser(account, controller.signal)
        .then((data)=>{
            console.log(data);
            setUser(data.user);
            setVaults(data.metadatas);
        })

        return ()=>{
          controller.abort();
        }
      }, [account]);
    

    return (
        <UserContext.Provider value={{account, handleConnect, handleDisonnect, vaults, setVaults, user, setUser, prev, setPrev, section, setSection}}>
            {children}
        </UserContext.Provider>
    )
}
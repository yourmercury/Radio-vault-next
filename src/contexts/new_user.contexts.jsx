import { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { getUser } from "../api/api";
import { AppConfig, UserSession, showConnect } from "@stacks/connect";

const appConfig = new AppConfig(["store_write", "publish_data"]);
const userSession = new UserSession({ appConfig });

export const UserContext = createContext();

function authenticate(setAccount) {
  showConnect({
    appDetails: {
      name: "My App",
      icon: window.location.origin + "/my-app-logo.svg",
    },
    redirectTo: "/",
    onFinish: () => {
      let userData = userSession.loadUserData();
      setAccount(userData.profile.stxAddress[testnet]);
    },
    userSession: userSession,
  });
}

export default function UserContextProvider({ children }) {
  const [account, setAccount] = useState("");
  const [vaults, setVaults] = useState(null);
  const [user, setUser] = useState(null);
  const [prev, setPrev] = useState(null);
  const [section, setSection] = useState(0);

  const handleConnect = async () => {
    authenticate(setAccount);
  };

  const handleDisonnect = async () => {
    setAccount("");
  };

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setAccount(userData.profile.stxAddress[process.env.NEXT_PUBLIC_NETWORK || "mainnet"]);
      });
    } else if (userSession.isUserSignedIn()) {
        let userData = userSession.loadUserData();
        setAccount(userData.profile.stxAddress[process.env.NEXT_PUBLIC_NETWORK || "mainnet"]);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    console.log(account);
    account &&
      getUser(account, controller.signal).then((data) => {
        console.log(data);
        setUser(data.user);
        setVaults(data.metadatas);
      });

    return () => {
      controller.abort();
    };
  }, [account]);

  return (
    <UserContext.Provider
      value={{
        account,
        handleConnect,
        handleDisonnect,
        vaults,
        setVaults,
        user,
        setUser,
        prev,
        setPrev,
        section,
        setSection,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

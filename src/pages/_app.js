import "@/styles/globals.css";
import UserContextProvider, { UserContext } from "@/contexts/user.contexts";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  if(router.pathname.includes("/iframe")){
    return <Component {...pageProps} />
  }
  return (
    <UserContextProvider>
      <UserContext.Consumer>
        {({ account, handleConnect, handleDisonnect, section, setSection }) => (
          <div className="relative flex flex-col h-[100vh]">
            <Header
              connect={handleConnect}
              disconnect={handleDisonnect}
              account={account}
              setSection={setSection}
            />
            {account && (
              <div className="flex relative flex-1">
                <Sidebar setSection={setSection} />
                <main className="flex-1 p-10 pr-[10vw]">
                  <Component {...pageProps} />
                </main>
              </div>
            )}
            {!account && (
              <div className={"flex-1 flex justify-center items-center"}>
                <p>Connect Wallet</p>
              </div>
            )}
            <Footer />
          </div>
        )}
      </UserContext.Consumer>
      <ToastContainer />
    </UserContextProvider>
  );
}

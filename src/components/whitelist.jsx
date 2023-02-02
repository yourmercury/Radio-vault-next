import Text from "./texts";
import Button from "./button";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user.contexts";
import { saveWhiteList } from "../api/api";
import { toast } from "react-toastify";

export default function Whitelist() {
  const { user, setUser, setVaults, account } = useContext(UserContext);
  const [list, setList] = useState("");

  function save() {
    toast.promise(
      async () => {
        try {
          return await saveWhiteList(list.replaceAll(" ", "").split(","), account);
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      {
        pending: "Saving WhiteList",
        success: {
          render({ data }) {
            setUser(data.user);
            setVaults(data.metadatas);
            return `Success!`;
          },
        },
        error: {
          render({ data }) {
            return "Oops! Something went wrong";
          },
        },
      }
    );
  }

  useEffect(() => {
      console.log(list);
    if (user) {
      let list = user.whiteList.join(", ");
      setList(list);
    }
  }, [user]);

  return (
    <div>
      <div className="my-20">
        <Text size="mid" cls={"text-[18px] font-semibold pl-5 w-fit m-auto"}>
          Whitelisted Domains
        </Text>
        <Text cls={"text-center my-3"}>
          The following Domains would be given access to Masked Stream your
          media from IPFS.
          Please seperate domains with (,) or ( , ) or (, )
        </Text>

        <textarea
          className="m-auto block text-[13px] my-10 border rounded-xl border-theme-red w-[300px] p-3"
          rows={4}
          value={list}
          onChange={(e) => {
            let val = e.target.value;
            setList(val);
          }}
        ></textarea>
        <Button label={"save"} cls={"block m-auto"} onClick={save} />
      </div>
    </div>
  );
}

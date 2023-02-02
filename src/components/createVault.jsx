import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Button from "./button";
import Text from "./texts";
import UploadMedia from "./uploadImage";
import Web2Metadata from "./web2Metadata";
import Web3Metadata from "./web3Metadata";
import { web2_form, web3_form } from "./form";
import { uploadToIpfsAndServer } from "../api/api";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/user.contexts";

export default function CreateVault({ }) {
  const { account } = useContext(UserContext);
  const [imageFile, setImageFile] = useState(null);
  const [web2Form, setWeb2Form] = useState({ ...web2_form });
  const [web3Form, setWeb3Form] = useState({ ...web3_form });
  const [error, setError] = useState(false);
  const errors = useRef({ ...web3_form });
  const [stage, setStage] = useState(0);
  const route = useRouter();

  function next() {
    if (stage == 0 && !imageFile) {
      return;
    }
    stage < 2 && setStage(stage + 1);
  }

  function back() {
    stage > 0 && setStage(stage - 1);
  }

  useEffect(() => {
    // console.log(imageFile);
  }, [imageFile]);

  function upload() {
    let _errors = Object.values(web3Form);
    if (_errors.includes("") || !imageFile) {
      setError(true);
      return;
    }
    toast.promise(
      async () => {
        try {
          await uploadToIpfsAndServer(
            imageFile,
            web3Form.name,
            web3Form.description,
            account,
            web2Form
          );
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      {
        pending: "Uploading Vault",
        success: {
          render({ data }) {
            setTimeout(()=>{
              route.push("/");
            }, 1500)
            return `Uploaded Successfully`;
          },
        },
        error: {
          render({ data }) {
            return "Oops! failed.";
          },
        },
      }
    );
  }

  return (
    <div>
      <Text size={"lg"} cls={"font-semibold"}>
        Create New Vault
      </Text>

      <div className="flex items-center w-fit mx-auto my-10">
        <div className="flex flex-col items-center justify-center relative">
          <div
            className={`rounded-xl ${
              stage >= 0
                ? "bg-theme-red h-[20px] w-[20px]"
                : "bg-theme-grey h-[15px] w-[15px]"
            } relative`}
            style={{
              transition: "all 0.2s ease-in",
            }}
          ></div>
          <Text
            cls={`absolute bottom-[-30px] text-[12px] w-[100px] ${
              stage >= 0 ? "text-theme-red font-bold" : ""
            }`}
          >
            Upload Media
          </Text>
        </div>
        <div
          className={`w-[200px] h-[3px] bg-theme-${
            stage >= 1 ? "red" : "grey"
          }`}
          style={{
            transition: "all 0.2s ease-in",
          }}
        ></div>
        <div className="flex flex-col items-center relative">
          <div
            className={`rounded-xl ${
              stage >= 1
                ? "bg-theme-red h-[20px] w-[20px]"
                : "bg-theme-grey h-[15px] w-[15px]"
            } relative`}
            style={{
              transition: "all 0.2s ease-in",
            }}
          ></div>
          <Text
            cls={`absolute bottom-[-30px] text-[12px] w-[100px] ${
              stage >= 1 ? "text-theme-red font-bold" : ""
            }`}
          >
            Web2 Metadata
          </Text>
        </div>
        <div
          className={`w-[200px] h-[3px] bg-theme-${
            stage >= 2 ? "red" : "grey"
          }`}
          style={{
            transition: "all 0.2s ease-in",
          }}
        ></div>
        <div className="flex flex-col items-center relative">
          <div
            className={`rounded-xl ${
              stage >= 2
                ? "bg-theme-red h-[20px] w-[20px]"
                : "bg-theme-grey h-[15px] w-[15px]"
            } relative`}
            style={{
              transition: "all 0.2s ease-in",
            }}
          ></div>
          <Text
            cls={`absolute bottom-[-30px] text-[12px] w-[100px] ${
              stage >= 2 ? "text-theme-red font-bold" : ""
            }`}
          >
            Web3 Metadata
          </Text>
        </div>
      </div>

      <div className="w-[360px] mx-auto my-[100px]">
        {stage == 0 && (
          <UploadMedia setImageFile={setImageFile} imageFile={imageFile} />
        )}
        {stage == 1 && <Web2Metadata form={web2Form} setForm={setWeb2Form} />}
        {stage == 2 && (
          <Web3Metadata
            form={web3Form}
            setForm={setWeb3Form}
            errors={errors}
            error={error}
          />
        )}
      </div>

      <div className="flex justify-between w-[260px] m-auto">
        {stage > 0 && <Button label={"Back"} onClick={back} />}
        {stage < 2 && <Button label={"Next"} onClick={next} cls={"ml-auto"} />}
        {stage == 2 && <Button label={"Submit"} onClick={upload} />}
      </div>
    </div>
  );
}

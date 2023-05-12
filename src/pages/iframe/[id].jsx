import VideoForIframe from "@/components/Video/video";
import axios from "axios";
import Head from "next/head";
import { useEffect, useRef } from "react";

export async function getServerSideProps(context) {
  let res = null;
  try {
    console.log(
      `${process.env.DOMAIN_FRONTEND}/api/metadata-app/${context.params.id}`
    );
    res = await axios.get(
      `${process.env.DOMAIN_FRONTEND}/api/metadata-app/${context.params.id}`
    );
  } catch (erorr) {
  } finally {
    return {
      props: { data: res?.data || null, id: context.params.id },
    };
  }
}

export default function Iframe({ data, id }) {
  // return null;
  return <VideoForIframe src={data.video} id={id} />;
}

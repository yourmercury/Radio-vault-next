import VideoForIframe from "@/components/Video/video";
import axios from "axios";
import Head from "next/head";
import { useEffect, useRef } from "react";

export async function getServerSideProps(context) {
    let res = await axios.get(`${process.env.DOMAIN_FRONTEND}/api/metadata-app/${context.params.id}`);
  return {
    props: { data: res.data, id: context.params.id },
  };
}

export default function Iframe({ data, id }) {
  
  return (
    <VideoForIframe src={data.video} id={id}/>
  );
}

import VideoForIframe from "@/components/Video/video";
import Head from "next/head";
import { useEffect, useRef } from "react";

export function getServerSideProps(context) {
  return {
    props: { id: context.params.id },
  };
}

export default function Iframe({ id }) {
  

  return (
    <VideoForIframe src={`/api/media/video/${id}`} id={id}/>
  );
}

import Preview from "@/components/preview_vault";
import axios from "axios";
import Head from "next/head";
import { useEffect, useRef } from "react";

export async function getServerSideProps(context) {
  let metadata = null;
  try {
    let res = await axios(`http://localhost:3000/api/metadata-app/${context.params.id}`);
    if (res.status < 300) {
      metadata = res.data;
      console.log(metadata);
    }
  } catch (error) {
    console.log(error);
  } finally {
    return { props: { metadata } };
  }
}

export default function PreviewPage({metadata}) {
  return <Preview metadata={metadata}/>;
}

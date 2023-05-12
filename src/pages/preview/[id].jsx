import Preview from "@/components/preview_vault";
import axios from "axios";
import Head from "next/head";
import { useEffect, useRef } from "react";

export async function getServerSideProps(context) {
  let metadata = null;
  try {
    let res = await axios(`${process.env.NEXT_PUBLIC_DOMAIN}/metadata-app/${context.params.id}`);
    if (res.status < 300) {
      metadata = res.data;
      console.log(res.status);
    }
  } catch (error) {
    // console.log(error);
  } finally {
    return { props: { metadata } };
  }
}

export default function PreviewPage({metadata}) {
  return <Preview metadata={metadata}/>;
}

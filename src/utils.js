import axios from "axios";

export async function getMetadata(id, db) {
  try {
    let record = await db.getMetadataRecordById(id);
    let url = record.ipfsUrl;
    let metadata = await _getMetadata(url);
    console.log(metadata.video);
    return { record, metadata };
  } catch (error) {
    throw error;
  }
}

export async function _getMetadata(url) {
  let includes = url.startsWith("ipfs://");
  let cid = url.split("ipfs://")[1];
  let response = await axios(
    includes ? `${process.env.IPFS_GATEWAY}/${cid}` : cid
  );
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    return null;
  }
}

export function parseUrl(link) {
  let check = link.startsWith("ipfs://");
  link = link.replace("ipfs://", "");
  return check ? process.env.IPFS_GATEWAY + "/" + link : link;
}

export function maskStream(url, res, title) {
  // console.log(parseUrl(url));
  axios({
    method: "get",
    url: parseUrl(url),
    responseType: "stream",
  })
    .then((response) => {
      res.writeHead(response.status, {
        ...response.headers,
        "Cache-Control": "no-cache",
        "X-Media-Title": title,
        "Access-Control-Allow-Origin": "http:localhost:3000",
      });
      console.log(response.status);
      response.data.pipe(res);
    })
    .catch((error) => {
      console.log(error);
      // console.log(error.response.status);
      res.status(500).end();
    });
}

function twoDigitalize(x) {
  x = Math.floor(x);
  if (x < 10) {
    return "0" + String(x);
  }
  return String(x);
}

export function parseSecondsToTime(x, full) {
  let h = x / 60 / 60;
  let m = (h - Math.floor(h)) * 60;
  let s = (m - Math.floor(m)) * 60;

  return h>0 || full? `${twoDigitalize(m)}:${twoDigitalize(s)}`:`${twoDigitalize(h)}:${twoDigitalize(m)}:${twoDigitalize(s)}`;
}


export async function streamWithRange(from, to) {

}
import axios from "axios";

export default async function photos(req, res) {
  const { albumUrl } = req.query;
  if (!albumUrl) {
    return res
      .status(400)
      .send({ error: "albumUrl query parameter is required." });
  }
  const photos = await fetchImages(albumUrl);
  res.status(200).send(photos);
}

// Source https://github.com/balenablocks/photo-gallery/blob/master/server.js
async function fetchImages(albumURL) {
  console.log("📷 - Fetching images...");

  const hostname = getHostName(albumURL);

  // Google Photos
  if (!["photos.app.goo.gl", "goo.gl"].includes(hostname)) {
    throw new Error("📷 - Invalid album URL");
  }

  console.log("📷 - Starting a google photos slideshow.");

  let photos = [];

  // Parse photos
  const rx =
    /\["(https:\/\/[^\.]+.googleusercontent\.com\/[^"]+)",([0-9]+),([0-9]+)[,\]]/;

  const extractPhotos = (data) =>
    data
      .match(new RegExp(rx, "g"))
      .map((m) => m.match(rx))
      .map((p) => {
        // const width = +p[2];
        // const height = +p[3];
        // const url = `${p[1]}=w${width}-h${height}-no`;
        return `${p[1]}=w1000`; // Change here to increase/decrease image width-size
      });

  const response = await axios.get(albumURL);
  // Fetch and remove duplicate images
  if (response.status !== 200) {
    throw new Error("📷 - Google Photos: Could not fetch album.");
  }
  photos = extractPhotos(response.data);
  photos = [...new Set(photos)]; // save only unique values
  photos = photos.map((photo) => `/api/proxy?url=${photo}`);

  console.log("Found " + photos.length + " images.");

  return photos;
}

/**
 * From a given URL, gets the hostname
 * @param {String} url Website url.
 */
function getHostName(url) {
  const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
  if (
    match != null &&
    match.length > 2 &&
    typeof match[2] === "string" &&
    match[2].length > 0
  ) {
    return match[2];
  } else {
    return null;
  }
}

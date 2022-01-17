import axios from "axios";

export default async function proxy(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send({ error: "url query parameter is required." });
  }
  const image = await axios.get(url, {
    responseType: "arraybuffer",
  });

  res.setHeader("Content-Type", "image/jpeg");
  res.status(200).send(Buffer.from(image.data));
}

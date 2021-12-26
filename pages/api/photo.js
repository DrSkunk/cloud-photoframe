import fs from "fs/promises";
import { resolve, extname } from "path";

const extensions = ["jpg", "jpeg", "png", "gif", "bmp", "tiff", "tif", "webp"];

// TODO go through all pictures before showing again
// TODO change to environment variable
const photosDir = resolve("photos");

export default async function photo(req, res) {
  const photos = (await fs.readdir(photosDir)).filter((file) =>
    extensions.includes(extname(file).slice(1).toLowerCase())
  );

  const image = photos[Math.floor(Math.random() * photos.length)];

  try {
    res.setHeader("Content-Type", "image/webp");
    res
      .status(200)
      .send(Buffer.from(await fs.readFile(resolve(photosDir, image))));
  } catch (error) {
    console.error(error);
    if (error.code === "ENOENT") {
      return res.status(500).send({ error: "file not found" });
    }
    return res
      .status(500)
      .send({ error: "Something went wrong fetching the file" });
  }
}

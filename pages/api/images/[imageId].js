var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dsvfol2fs",
  api_key: "523766635776657",
  api_secret: "WWhW7q8fvpISi476NXnLIBMd6QQ",
});

export default async function (req, res) {
  const { imageId } = req.query;
  const url = cloudinary.url(imageId, { width: 300, height: 300, crop: "fill", format: "webp" });
  res.json(url);
}

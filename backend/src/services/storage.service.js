const ImageKit = require("imagekit");  // or require("@imagekit/nodejs") depending on your installed package
require("dotenv").config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(file, fileName) {
  try {
    const params = {
      file: file,
      fileName: fileName,
    };
    const result = await imagekit.upload(params);
    return result;
  } catch (err) {
    console.error("Error uploading to ImageKit:", err);
    throw err;
  }
}

module.exports = {
  uploadFile
};

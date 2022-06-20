const cloudinary = require('cloudinary').v2

// cloudinary configuration
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
});

async function uploadCloudinaryImage(req, res, next) {
    const {image,image_name,folder} = req.body

    cloudinary.uploader.upload(image,{
      folder: `${folder}/`,
      public_id: image_name,
      overwrite: true,
      invalidate: true
    })
    .then((result) => {
        res.status(200).send({
        status: true,
        result
      });
    }).catch((error) => {
        res.status(500).send({
        status: false,
        error
      });
    });
}

module.exports = {uploadCloudinaryImage}
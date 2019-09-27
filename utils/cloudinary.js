const base64 = require('urlsafe-base64')
const fs = require('fs')
const cloudinary = require('cloudinary')

export const upload = async (canvas, fileName) => {
  let b64 = canvas.toDataURL().split(',')
  let img = base64.decode(b64[1])
  fs.writeFileSync(fileName, img)
  const response = await cloudinary.uploader.upload(fileName, {
    tags: 'sample',
  })
  return response.secure_url
}

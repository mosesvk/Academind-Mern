const multer = require('multer')

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {},
    filename: (req, file, cb) => {}
  })
})

module.exports = fileUpload
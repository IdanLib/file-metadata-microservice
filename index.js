const express = require('express');
const cors = require('cors');
// require('dotenv').config();
const multer = require('multer');
const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

const storageObj = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

const uploadModule = multer({ storage: storageObj });

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post("/api/fileanalyse", uploadModule.single("upfile"), (req, res) => {
  return res.status(200).json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const pool = require('./db/conn')
const authRoute = require('./routes/auth')
const adminRoute = require('./routes/admin')
const mainRoute = require('./routes/main')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {authenticateToken} = require('./middleware/checkAuthToken')


require('dotenv/config');

const PORT = 8000

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true,}))
app.use(cookieParser());
app.use('/auth', authRoute)
app.use('/admin', adminRoute)
app.use('/', mainRoute)

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


//set up file upload functions
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
      const originalname = path.parse(file.originalname);
      const timestamp = Date.now();
      const newFilename = `${originalname.name}-${timestamp}${originalname.ext}`;
      cb(null, newFilename);
    },
  });
  
const upload = multer({ storage: storage });


app.get('/upload', authenticateToken, (request, response) => {
    return response.render('fileUpload.ejs', {status:"", message:""})
})

app.post('/upload', authenticateToken,  upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    res.send('File uploaded successfully!');
});

app.get('/uploads',authenticateToken, (req, res) => {
    fs.readdir('./public/uploads', (err, files) => {
      if (err) {
        return res.status(500).send('Error reading uploaded files.');
      }
      res.render('uploads', { files });
    });
});

app.get('/delete/:filename',authenticateToken, (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'public', 'uploads', filename);
  
    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).send('File not found.');
      }
  
      // Delete the file
      fs.unlink(filePath, (err) => {
        if (err) {
          return res.status(500).send('Error deleting the file.');
        }
  
        res.send('File deleted successfully. <br><a href="/uploads">Back</a>');
      });
    });
});


//app.get('/CHANGELOG', authenticateToken, async(request, response) => {
//    return response.send(`1. Set up /auth endpoints. 2. Deployed postgres for backend db 3. Implemented jwt decoding for verifying user identity. 4. Set up file endpoints 5. Set up panel for new the admin`)
//})


app.get('*', (request, response) => {
    return response.status(404).render('404.ejs')
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`)
})


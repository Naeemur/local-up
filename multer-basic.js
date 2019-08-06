let fs = require('fs');
let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let multer = require('multer');

let app = express();
let port = process.env.PORT;
let upload = multer({ dest: path.join(__dirname, 'uploads') });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// multiple files upload
app.post('/upload-route', upload.array('file'), (req, res) => {
	if(req.files) for(let f in req.files) fs.renameSync(path.join(__dirname, 'uploads', req.files[f].filename), path.join(__dirname, 'uploads', req.files[f].originalname));
	res.send('Upload completed successfully');
});

let server = app.listen(port, () => {
	console.log(`Serving on port ${port} ...`);
});
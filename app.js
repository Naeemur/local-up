let fs = require('fs');
let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let multer = require('multer');

let app = express();
let port = process.env.PORT;
let upload = multer({ dest: path.join(__dirname, 'uploads') });

// app.use(express.static('public/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

let css = `
body {
	font-family: sans-serif;
}
p, form {
	display: block;
	padding: 10px;
	margin: 5px;
	background: #ddd;
	border-radius: 5px;
	text-align: center;
	overflow-x: hidden;
}
p:empty { display: none; }
form {
	background: none;
}
input {
	display: inline-block;
	outline: none;
	border: none;
	border-radius: 5px;
	box-shadow: 0 0 3px #0af;
	background: #0af;
	color: #fff;
	padding: 10px 30px;
	margin: 10px;
	box-sizing: border-box;
}
input[type="file"] {
	padding: 30px 0;
	border: 2px dashed #0af;
	background: none;
	box-shadow: none;
	color: #222;
}
p br, p span, p input[type="checkbox"] {
	display: none;
}
p input[type="checkbox"]:checked~br,
p input[type="checkbox"]:checked~span {
	display: initial;
}
input[type="checkbox"]+label {
	position: absolute;
	right: 18px;
	top: 13px;
	background: #0af;
    padding: 5px;
	border-radius: 5px;
}
input[type="checkbox"]+label::before {
	content: 'Show';
	cursor: pointer;
}
input[type="checkbox"]:checked+label::before {
	content: 'Hide';
}
`;

app.get('/', (req, res) => {
	// fs.writeFileSync(path.join(__dirname, 'uploads'), F.json2html({ tagname: "naeem", nodes: [{ tagname: 'sss' }, 'texxxxx'] }));
	res.send(`
	<html>
	<head>
	<meta charset="UTF-8">
	<meta name="theme-color" content="#00AAFF">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>UPLOAD FILE</title>
	<style>${css}</style>
	</head>
	<body>
	<form action="/" method="POST" enctype="multipart/form-data">
	<input type="file" name="file" multiple><br>
	<input type="submit" value="UPLOAD">
	</form>
	</body>
	</html>
	`);
});

app.post('/', upload.array('file'), (req, res) => {
	console.log('@ ' + req.files.length + ' Files:');
	if(req.files) for(let f in req.files) fs.renameSync(path.join(__dirname, 'uploads', req.files[f].filename), path.join(__dirname, 'uploads', req.files[f].originalname)) & console.log(req.files[f].originalname+' // '+req.files[f].size);
	let htm = `
	<html>
	<head>
	<meta charset="UTF-8">
	<meta name="theme-color" content="#00AAFF">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>UPLOAD FILE</title>
	<style>${css}</style>
	</head>
	<body>
	<p>${ req.files ? '<b>'+req.files.length+' files uploaded: </b><input type="checkbox" id="show"><label for="show"></label><br>' : 'ERROR: No file specified.' }`;
	if(req.files) for(let f in req.files) htm+='<br><span>'+req.files[f].originalname+' // '+req.files[f].size+'</span>';
	htm+=`</p>
	<form action="/" method="POST" enctype="multipart/form-data">
	<input type="file" name="file" multiple><br>
	<input type="submit" value="UPLOAD">
	</form>
	</body>
	</html>
	`;
	res.send(htm);
});

let server = app.listen(port, () => {
	console.log(`Serving on port ${port} ...`);
});
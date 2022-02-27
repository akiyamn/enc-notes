// start web server
const express = require('express');
var bodyParser = require('body-parser');
const fs = require('fs');
const app = module.exports = express();
const {encrypt, decrypt} = require('./crypto');

app.use(bodyParser.json()); 

// Access Control Allow Origin
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

const apiPrefix = '/api';
const dataDir = './data';
const fileExt = 'txt';

// Serve static files on the root
app.use(express.static('public'));

app.get('/', (req, res) => {
    // Send static content
    res.sendFile(__dirname + 'public');
});


// API endpoint which takes a string and saves it to a text file
app.post(apiPrefix + '/save', (req, res) => {
    // get data from request
    const data = req.body.data;
    const filename = req.body.filename;
    const key = req.body.key;
    // check that filename contains no illegal characters
    if (!filename.match(/^[a-zA-Z0-9_\-]+$/)) {
        res.status(400).send('Filename contains illegal characters');
        return;
    }

    const newFilePath = dataDir + "/" + filename + '.' + fileExt

    // check if file exists
    if (fs.existsSync(newFilePath)) {
        res.status(400).send('File already exists');
        return;
    }

    const encryptedData = JSON.stringify(encrypt(data, key));

    // save data to file
    fs.writeFile(newFilePath, encryptedData, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

    res.status(201).send("Created");
});


//API endpoint which takes a filename and returns the contents of the file
app.post(apiPrefix + '/load', (req, res) => {
    console.log(req.body)
    // get data from request
    const filename = req.body.filename;
    const key = req.body.key;
    // check that filename contains no illegal characters
    if (!filename.match(/^[a-zA-Z0-9_\-]+$/)) {
        res.status(400).send('Filename contains illegal characters');
        return;
    }
    const fullFilePath = dataDir + '/' + filename + '.' + fileExt

    // Fail if file doesn't exist
    if (!fs.existsSync(fullFilePath)) {
        res.status(404).send('File does not exist');
        return;
    }    

    //read contents of file
    fs.readFile(fullFilePath, 'utf8', (err, data) => {
        if (err) throw err;
        const fileJson = JSON.parse(data);
        const decryptedData = decrypt(fileJson.encryptedData, fileJson.iv, key);
        if (decryptedData === null) {
            res.status(401).send('Failed to decrypt');
            return;
        }
        res.send(decryptedData);
    });
});

// API endpoint which lists all files in the data directory
app.get(apiPrefix + '/list', (req, res) => {
    fs.readdir(dataDir, (err, files) => {
        if (err) throw err;
        // filter out files that don't end with the correct file extension
        const filteredFiles = files.filter(file => file.endsWith('.' + fileExt));
        const fileList = filteredFiles.map(file => {
            return {
                filename: file.split('.')[0],
                extension: file.split('.')[1],
                created: fs.statSync(dataDir + '/' + file).birthtimeMs
            }
        });
        // Sort by created date
        fileList.sort((a, b) => b.created - a.created);
        res.send(fileList);
    });
});


// API endpoint which tells the user that I am a teapot
app.post('/teapot', (req, res) => {
    res.status(418).send(req.body);
});

// Start listening
app.listen(3000);
console.log('listening on port 3000');

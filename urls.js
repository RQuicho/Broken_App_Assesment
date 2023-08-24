const fs = require('fs');
const axios = require('axios');
const sanitize = require('sanitize-filename');


const urls = (path) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        // console.log(data); // output: four urls in urls.txt file
        const urlList = data.trim().split('\n'); // creates an array of the four urls
        for (let url of urlList) {
            webUrl(url);
        }
    });
};
urls(process.argv[2]); // run: node urls.js urls.txt


const writeFile = (fileName, data) => {
    fs.writeFile(fileName, data, 'utf8', (err) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        console.log(`Wrote to ${fileName}`);
    });
};


async function webUrl (url) {
    try {
        let res = await axios.get(url);
        const fileName = url.replace(/^(https?:\/\/)?/i, '').replace(/[^a-zA-Z0-9-_]/g, '.');
        writeFile(fileName, res.data);
    } catch (err) {
        console.log(err);
        console.log(`Couldn't download ${url}`);
        // console.log(err);
        // process.exit(1);
    }
};
// webUrl(process.argv[2]); // run: node urls.js http://rithmschool.com


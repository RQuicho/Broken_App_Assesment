const fs = require('fs');
const axios = require('axios');


const writeFile = (data) => {
    fs.writeFile("rithmschool.com", data, 'utf8', (err) => {
        if (err) {
            console.log(err);
            process.kill(1);
        }
        console.log('Wrote to rithmschool.com');
    })
}


const urls = (path) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            process.kill(1);
        }
        console.log(data);
    });
    console.log(data);
}
// urls(process.argv[2]); // run: node urls.js urls.txt



async function webUrl (url) {
    try {
        let res = await axios.get(url);
        // console.log(res.data);
        writeFile(res.data);
    } catch (err) {
        console.log(err);
        process.kill(1);
    }
}
webUrl(process.argv[2]); // run: node urls.js http://rithmschool.com


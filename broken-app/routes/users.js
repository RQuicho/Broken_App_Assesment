const express = require('express');
const axios = require('axios');
const router = new express.Router();
const ExpressError = require('../expressError');
const users = require('../fakeDb');

router.get('/', (req, res) => {
    res.json({ users });
});


router.post('/', async (req, res, next) => {
    try {
        if (!req.body.developers) {
            throw new ExpressError('Please include login username', 404);
        }
        let developers = req.body.developers;
        let devData = await Promise.all(developers.map(async d => {
            const res = await axios.get(`https://api.github.com/users/${d}`);
            return res.data;
        }));
        
        let devInfo = devData.map(d => ({ bio: d.bio, name: d.name }));
        users.push(devInfo);

        console.log('developers..', developers);
        console.log('devData..', devData);
        console.log('devData[0].bio..', devData[0].bio);
        console.log('devInfo..', devInfo);
        
        return res.status(201).json({ devInfo });
    } catch(err) {
        console.log(err);
        return next(err);
    }
});



module.exports = router;




// POST request: {"developers": ["joelburton", "elie"]}
// Return: 
// [
//   {
//     "bio": "Open source developer. Former dev at Apple...",
//     "name": "Joel Burton"
//   },
//   {
//     "bio": "Co-founder + Lead Instructor @rithmschool ",
//     "name": "Elie Schoppik"
//   }
// ]



///////////// Original starter code ////////////////////

// app.post('/', function(req, res, next) {
//   try {
//     let results = req.body.developers.map(async d => {
//       return await axios.get(`https://api.github.com/users/${d}`);
//     });
//     let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

//     return res.send(JSON.stringify(out));
//   } catch {
//     next(err);
//   }
// });

// app.listen(3000);
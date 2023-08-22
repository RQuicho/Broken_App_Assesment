const express = require('express');
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
        const baseURL = 'https://api.github.com/users/';
        let res = req.body.developers.map(async d => {
            return await axios.get(`https://api.github.com/users/${d}`);
        });
        const existingUser = { "bio": `${res.bio}`, "name": `${res.name}` };
        return res.status(201).json({ existingUser });
    } catch(err) {
        return next(err);
    }
});












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
const express = require('express');
const app = express();
const ExpressError = require('./expressError');
const userRoutes = require('./routes/users');

app.use(express.json());
app.use('/users', userRoutes); // routes are prefixed with 'users'

// 404 handler
app.use((req, res, next) => {
  return new ExpressError('Not found', 404);
});

// General error handler
app.use((error, req, res, next) => {
  let status = error.status || 500;
  let message = error.message;
  return res.status(status).json({
    error: { message, status }
  });
});

app.listen(3000, () => {
  console.log('Sever starting on port 3000');
});


module.exports = app;






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
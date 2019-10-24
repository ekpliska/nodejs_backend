const express = require('express');
const app = express();

app.get('/test', function (req, res) {
    console.log(req.params);
    return res.send('Start...');
});

app.listen(5000, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('Server is working');
});
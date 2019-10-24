const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const { PatientController } = require('./controllers');

app.use(bodyParser.json());
app.use(cors());

app.get('/patients', PatientController.all);
app.post('/patients', PatientController.create);

app.listen(5000, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('Server is working');
});
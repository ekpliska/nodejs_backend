const express = require('express');
const cors = require('cors');

const db = require('./core/db');

const {patientValidators, appointmentValidators} = require('./utils/validator');

const { PatientCtrt, AppointmentCtrt } = require('./controllers');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/patients', PatientCtrt.all);
app.post('/patients', patientValidators.create, PatientCtrt.create);
app.get('/patients/:id', PatientCtrt.show);
app.patch('/patients/:id', patientValidators.create, PatientCtrt.update);
app.delete('/patients/:id', PatientCtrt.remove);

app.get('/appointments', AppointmentCtrt.all);
app.post('/appointments', appointmentValidators.create, AppointmentCtrt.create);
app.patch('/appointments/:id', appointmentValidators.update, AppointmentCtrt.update);
app.delete('/appointments/:id', AppointmentCtrt.remove);

app.listen(5000, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('Server is working');
});

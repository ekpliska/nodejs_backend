const PatientController = require('./PatientController');
const AppointmentContoller = require('./AppointmentContoller');

module.exports = {
    PatientCtrt: new PatientController(),
    AppointmentCtrt: new AppointmentContoller(),
}
const PatientController = require('./PatientController');
const AppointmentContoller = require('./AppointmentContoller');

module.exports = {
    PatientController: new PatientController(),
    AppointmentContoller: new AppointmentContoller(),
}
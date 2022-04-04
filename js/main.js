function Appointment(time, date, type, location) {
  this.time = time;
  this.date = date;
  this.type = type;
  this.location = location;
  this.qrCode = "media/qr-code.png";
}

// build appointment listings
var apptListings = [new Appointment("8:50 AM", "Sunday, February 27, 2022", "Asymptomatic COVID-19 Test", "TCS Hall"),
                    new Appointment("9:00 AM", "Monday, February 28, 2022", "Asymptomatic COVID-19 Test", "TCS Hall"),
                    new Appointment("8:50 AM", "Tuesday, March 1, 2022", "Asymptomatic COVID-19 Test", "TCS Hall"),
                    new Appointment("8:55 AM", "Tuesday, March 1, 2022", "Asymptomatic COVID-19 Test", "TCS Hall"),
                    new Appointment("3:20 PM", "Tuesday, March 1, 2022", "Asymptomatic COVID-19 Test", "TCS Hall"),
                    new Appointment("2:30 PM", "Thursday, March 3, 2022", "Asymptomatic COVID-19 Test", "TCS Hall"),
                    new Appointment("2:40 PM", "Thursday, March 3, 2022", "Asymptomatic COVID-19 Test", "TCS Hall")]

// loads all the appointment listings as buttons
function loadAppointmentListings() {
  for(let i = 0; i < apptListings.length; i++) {
    document.getElementById("slots").innerHTML += 
      '<a href="appointment-details.html" class="button" onclick="saveNewAppt('+i+')">' + apptListings[i].time + '</a>'
  }
}

// when a time slot is selected, this button alerts the user of the new appointment
// and saves the appointment to upcoming appointments
function saveNewAppt(selected_id) {
  var upcomingAppts = JSON.parse(localStorage.getItem("upcoming"));
  if (upcomingAppts === null) {
    upcomingAppts = [];
  }
  upcomingAppts.push(apptListings[selected_id]);
  var time = apptListings[selected_id].time;
  alert("New appointment for: " + time + ". Now have " + upcomingAppts.length + " upcoming appointments.");

  // save appointment
  localStorage.setItem("upcoming", JSON.stringify(upcomingAppts));
}

// called anytime appointment details needs to be shown
function displayAppointmentDetails() {
  var upcoming = JSON.parse(localStorage.getItem("upcoming"));
  var appt = upcoming[upcoming.length-1];
  document.getElementById("type").innerHTML = appt.type;
  document.getElementById("date-time").innerHTML = appt.date + " at " + appt.time;
  document.getElementById("location").innerHTML = appt.location;
}


// Loads the cart (i.e. upcoming appointments) on Appointments page
function loadCart() {
  var upcomingAppts = JSON.parse(localStorage.getItem("upcoming"));
  if (upcomingAppts === null) {
    upcomingAppts = [];
  }
  var upcomingTable = document.getElementById("upcoming-listings");
  upcomingTable.innerHTML = ''; // clear the cart
  var row, appt;
  document.getElementById("num-in-cart").innerHTML = upcomingAppts.length;
  for(let i = 0; i < upcomingAppts.length; i++) {
    row = upcomingTable.insertRow(0);
    appt = upcomingAppts[i];
    row.insertCell(0).innerHTML = appt.time + ' | ' + appt.date + 
      ' - ' + appt.type + ' <button class="left-aligned delete button" onclick="cancelAppointment('+i+')">Cancel</button>';
  }
}

// cancel an appointment on the Upcoming Appointments page and reload the cart
function cancelAppointment(selected_id) {
  var upcomingAppts = JSON.parse(localStorage.getItem("upcoming"));
  upcomingAppts.pop(selected_id);
  localStorage.setItem("upcoming", JSON.stringify(upcomingAppts));
  loadCart();
}
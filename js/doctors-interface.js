var Doctor = require('./../js/doctors.js').doctorModule;

var displayDoctors = function(firstName, lastName, title, picture, specialties, education, gender, openPractices, closedPractices, insurances) {
  if (gender === 'female') {
    icon = '<i class="fa fa-female" aria-hidden="true"></i>';
  } else if (gender === 'male'){
    icon = '<i class="fa fa-male" aria-hidden="true"></i>';
  }
  if (openPractices.length > 0 && closedPractices.length > 0) {
    practice = openPractices.join(", ") + ' <span class="newpts">TAKING new patients</span><br>' + closedPractices.join(", ") + '<span class="nopts">CLOSED to new patients</span>';
  } else if (openPractices.length > 0 || closedPractices.length > 0) {
    if (openPractices.length > 0) {
      practice = openPractices.join(", ") + ' <span class="newpts">TAKING new patients</span>';
    } else if (closedPractices.length > 0) {
      practice = closedPractices.join(", ") + '<span class="nopts">CLOSED to new patients</span>';
    }
  } else {
    practice = 'Unknown';
  }

  if (insurances) {
    docInsurance = insurances.join(", ");
  } else {
    docInsurance = 'Unknown';
  }

  $('#found-doctors').append('<li class="doctor-entry"><img src="' + picture + '" class="doctor-picture"><span class="doctor-name">' + firstName + ' ' + lastName + ', ' + title + ' ' + icon + '</span> ' + '<br>' + '<span class="doctor-bold">Specialties</span>: ' + specialties.join(", ") + '<br><span class="doctor-bold">Education</span>: ' + education.join(", ") + '<br><span class="doctor-bold">Practices</span>: ' +  practice + '<br><span class="doctor-bold">Insurances Accepted</span>:' + docInsurance + '</li><br>');
};

var displayError = function() {
  $('#found-doctors').append('Your search was unsuccessful, please try again with another wording or specialty!');
}

$(document).ready(function() {
var newDoctor = new Doctor();
var startFrom = 1;

  $('#search-form').submit(function(event) {
    event.preventDefault();
    $('#found-doctors').empty();
    condition = $('#condition').val();
    newDoctor.searchBySymptom(condition, displayDoctors, displayError);
  });

  $('#browse-form').submit(function(event) {
    event.preventDefault();
    $('#found-doctors').empty();
    var specialty = $('#specialty-search').val();
    newDoctor.searchBySpecialty(specialty, displayDoctors, displayError);
  });

  $(window).scroll(function() {
    var searchAmount = 25;
    if($(window).scrollTop() + $(window).height() === $(document).height()) {
      startFrom = startFrom + searchAmount;
      newDoctor.updateSearch(startFrom, searchAmount, condition, displayDoctors);
    }
  });

});

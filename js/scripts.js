function LogBook() {
  this.entries = [],
  this.currentId = 0
}

LogBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

LogBook.prototype.addEntry = function(entry){
  entry.id = this.assignId();
  this.entries.push(entry);
}

LogBook.prototype.deleteEntry = function(id) {
  for (var i=0; i< this.entries.length; i++) {
    if (this.entries[i]) {
      if (this.entries[i].id == id) {
        delete this.entries[i];
        return true;
      }
    }
  };
  return false;
}


LogBook.prototype.findEntry = function(id) {
  for (var i=0; i< this.entries.length; i++) {
    if (this.entries[i]) {
      if (this.entries[i].id == id) {
        return this.entries[i];
      }
    }
  };
  return false;
}

function Place(city, country, date, duration, landmark, note) {
  this.city = city,
  this.country = country,
  this.date = date,
  this.duration = duration,
  this.landmark = landmark,
  this.note = note
}

Place.prototype.fullDestination = function() {
  return this.date + " " + this.country + " " + this.city;
}

var logBook = new LogBook();

function displayEntryDetails(logBookToDisplay) {
  var entryList = $("ul#places");
  var htmlForEntryInfo = "";
  logBookToDisplay.entries.forEach(function(place) {
    htmlForEntryInfo += "<li id=" + place.id + ">" + place.country + "</li>";
  });
  entryList.html(htmlForEntryInfo)
};

function attachEntryListeners() {
  $("ul#places").on("click", "li", function() {
    showEntries(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    logBook.deleteEntry(this.id);
    $("#show-places").hide();
    displayEntryDetails(logBook);
  });
};

function showEntries(entriesId) {
  var entry = logBook.findEntry(entriesId);
  $("show-places").show();
  $(".city-destination").html(place.city);
  $(".country-destination").html(place.country);
  $(".date-travel").html(place.date);
  $(".duration-trip").html(place.duration);
  $(".landmark").html(place.landmark);
  $(".notes").html(place.note);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + entries.id + ">Delete</button>")
};

$(document).ready(function() {
  attachEntryListeners();
  $("form#new-log").submit(function(event) {
    event.preventDefault();
    var inputtedCity = $("#new-city-destination").val();
    var inputtedCountry = $("#new-country-destination").val();
    var inputtedDate = $("#new-date-travel").val();
    var inputtedDuration = $("#new-duration-trip").val();
    var inputtedLandmark = $("#new-landmark").val();
    var inputtedNote = $("#new-notes").val();

    $("#new-city-destination").val("");
    $("#new-country-destination").val("");
    $("#new-date-travel").val("");
    $("#new-duration-trip").val("");
    $("#new-landmark").val("");
    $("#new-notes").val("");

    var newEntry = new Place(inputtedCity, inputtedCountry, inputtedDate, inputtedDuration, inputtedLandmark, inputtedNote);
    logBook.addEntry(newEntry);
    displayEntryDetails(logBook);
    console.log(newEntry);

  });
});

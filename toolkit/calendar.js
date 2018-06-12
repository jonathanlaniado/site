// validates the form
var wrapper = hyperform(window);

// instantiates document.getElementById()
var id = function (id) {
    return document.getElementById(id);
};

// initializes some necessary variables
function getFormVals() {
    var selectedTimeZone = id('time-zone').options[id('time-zone').selectedIndex];

    var formVals = {
        'title': id('title').value,
        'location': id('location').value,
        'details': id('details').value,

        'timeZone': id('time-zone').value,
        'tz': selectedTimeZone.getAttribute('tz'),
        'tzid': selectedTimeZone.getAttribute('tzid'),
        'dtstartStandard': selectedTimeZone.getAttribute('dtstart-standard'),
        'tzoffsetfromStandard': selectedTimeZone.getAttribute('tzoffsetfrom-standard'),
        'tzoffsettoStandard': selectedTimeZone.getAttribute('tzoffsetto-standard'),
        'rruleStandard': selectedTimeZone.getAttribute('rrule-standard'),
        'dtstartDaylight': selectedTimeZone.getAttribute('dtstart-daylight'),
        'tzoffsetfromDaylight': selectedTimeZone.getAttribute('tzoffsetfrom-daylight'),
        'tzoffsettoDaylight': selectedTimeZone.getAttribute('tzoffsetto-daylight'),
        'rruleDaylight': selectedTimeZone.getAttribute('rrule-daylight'),

        'startYear': parseInt(id('start-year').value),
        'startMonth': parseInt(id('start-month').value),
        'startDay': parseInt(id('start-day').value),
        'startHour': parseInt(id('start-hour').value),
        'startMinutes': parseInt(id('start-minutes').value),

        'endYear': parseInt(id('end-year').value),
        'endMonth': parseInt(id('end-month').value),
        'endDay': parseInt(id('end-day').value),
        'endHour': parseInt(id('end-hour').value),
        'endMinutes': parseInt(id('end-minutes').value)
    };
    return formVals;
}

// rounds the given number to the nearest increment of 15
function round(n) {
    return Math.floor(n / 15) * 15;
}

// determines which merediem the given hour is in
function meridiem(n) {
    if (n > 12) {
        return "PM";
    } else {
        return "AM";
    }
}

// sets the date and time form field values
window.onload = function setFormVals() {
    var form = getFormVals();
    var date = new Date();

    id('start-year').value = date.getFullYear();
    id('start-month').value = date.getMonth();
    id('start-day').value = date.getDate();

    id('start-hour').value = date.getHours() % 12;
    id('start-minutes').value = round(date.getMinutes());
    id('start-meridiem').value = meridiem(date.getHours());

    id('end-year').value = date.getFullYear();
    id('end-month').value = date.getMonth();
    id('end-day').value = date.getDate();

    id('end-hour').value = date.getHours() % 12;
    id('end-minutes').value = round(date.getMinutes());
    id('end-meridiem').value = meridiem(date.getHours());
}

// pads a single zero to the given integer
function pad(n) {
    if (n.toString().length < 2) {
        return "0" + n;
    } else {
        return n;
    }
}

// parses the month to a MMM format
function parseMonth(month) {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[parseInt(month)];
}

// determines whether PM is selected
function parseMeridiem(fieldID, n) {
    if (id(fieldID).value == "PM") {
        return n += 12;
    } else {
        return n;
    }
}

// creates the Google Calendar URL string
function buildGoogleURL() {
    var form = getFormVals();

    var title = encodeURIComponent(form.title).replace(/([\s]|[\n]){1,}/g, '+');
    var location = encodeURIComponent(form.location).replace(/([\s]|[\n]){1,}/g, '+');
    var details = encodeURIComponent(form.details).replace(/[\n]/g, '%0A').replace(/[\s]{1,}/g, '+');

    var startHour = parseMeridiem('start-meridiem', form.startHour);
    var endHour = parseMeridiem('end-meridiem', form.endHour);

    var startDate = new Date(form.startYear, form.startMonth, form.startDay, startHour, form.startMinutes);
    var endDate = new Date(form.endYear, form.endMonth, form.endDay, endHour, form.endMinutes);

    var startOffset = startDate - new Date(startDate.toLocaleString("en-US", {
        timeZone: form.tz
    }));
    var endOffset = endDate - new Date(endDate.toLocaleString("en-US", {
        timeZone: form.tz
    }));
    
    var startDate = new Date(startDate.getTime() + startOffset);
    var endDate = new Date(endDate.getTime() + endOffset);

    var startYear = startDate.getUTCFullYear();
    var startMonth = pad(startDate.getUTCMonth() + 1);
    var startDay = pad(startDate.getUTCDate());
    var startHour = pad(startDate.getUTCHours());
    var startMinutes = pad(startDate.getUTCMinutes());
    var endYear = endDate.getUTCFullYear();
    var endMonth = pad(endDate.getUTCMonth() + 1);
    var endDay = pad(endDate.getUTCDate());
    var endHour = pad(endDate.getUTCHours());
    var endMinutes = pad(endDate.getUTCMinutes());

    return "https://www.google.com/calendar/render?action=TEMPLATE&text=" + title + "&location=" + location + "&details=" + details + "&dates=" + startYear + startMonth + startDay + "T" + startHour + startMinutes + "00Z%2F" + endYear + endMonth + endDay + "T" + endHour + endMinutes + "00Z";
}

// builds the ICS file string
function buildICSString() {
    var form = getFormVals();

    var details = form.details.replace(/\n/g, '\\n');

    var startHour = parseMeridiem('start-meridiem', form.startHour);
    var endHour = parseMeridiem('end-meridiem', form.endHour);

    var startDate = new Date(form.startYear, form.startMonth, form.startDay, startHour, form.startMinutes);
    var endDate = new Date(form.endYear, form.endMonth, form.endDay, endHour, form.endMinutes);

    var startYear = startDate.getFullYear();
    var startMonth = pad(startDate.getMonth() + 1);
    var startDay = pad(startDate.getDate());
    var startHour = pad(startDate.getHours());
    var startMinutes = pad(startDate.getMinutes());
    var endYear = endDate.getFullYear();
    var endMonth = pad(endDate.getMonth() + 1);
    var endDay = pad(endDate.getDate());
    var endHour = pad(endDate.getHours());
    var endMinutes = pad(endDate.getMinutes());

    var icsData = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:Microsoft Exchange Server 2010",
        "BEGIN:VTIMEZONE",
        "TZID:" + form.tzid,
        "BEGIN:STANDARD",
        "DTSTART:" + form.dtstartStandard,
        "TZOFFSETFROM:" + form.tzoffsetfromStandard,
        "TZOFFSETTO:" + form.tzoffsettoStandard,
        "RRULE:" + form.rruleStandard,
        "END:STANDARD",
        "BEGIN:DAYLIGHT",
        "DTSTART:" + form.dtstartDaylight,
        "TZOFFSETFROM:" + form.tzoffsetfromDaylight,
        "TZOFFSETTO:" + form.tzoffsettoDaylight,
        "RRULE:" + form.rruleDaylight,
        "END:DAYLIGHT",
        "END:VTIMEZONE",
        "BEGIN:VEVENT",
        "UID:" + Math.random().toString().substring(2),
        "DTSTAMP:" + startYear + startMonth + startDay + "T" + startHour + startMinutes + "00",
        "SUMMARY:" + form.title,
        "LOCATION:" + form.location,
        "DESCRIPTION:" + details,
        "DTSTART;TZID=" + form.timeZone + ":" + startYear + startMonth + startDay + "T" + startHour + startMinutes + "00",
        "DTEND;TZID=" + form.timeZone + ":" + endYear + endMonth + endDay + "T" + endHour + endMinutes + "00",
        "END:VEVENT",
        "END:VCALENDAR\r\n"
    ];

    if (form.rruleStandard === "") {
        icsData.splice(9, 1);
        icsData.splice(14, 1);
    }

    console.log(icsData.join('\r\n'));

    return icsData.join('\r\n');
}

// creates an ICS file
function createICS(icsData, filename) {
    id('tooltip-download').setAttribute('href', 'data:text/calendar;charset=utf-8,' + encodeURIComponent(icsData));
    id('tooltip-download').setAttribute('download', filename);
}

// generates the calendar link based upon the form fields
function generate() {
    var form = getFormVals();

    var googleURL = buildGoogleURL();
    var icsData = buildICSString();

    var titleFile = form.title.replace(/[\W]{1,}/g, '-');
    var monthFile = parseMonth(form.startMonth);
    var filename = "EV_" + titleFile + "_" + monthFile + "-" + form.startYear + ".ics";

    createICS(icsData, filename);

    id('google-calendar-output').value = googleURL;
    id('tooltip-tab').href = googleURL;
    id('ics-output').value = filename;
    id('results').style.display = 'block';

    scrollDown();

    return false;
}

// scrolls down to the bottom of the page
function scrollDown() {
    var documentHeight = document.documentElement.offsetHeight;
    var viewportHeight = window.innerHeight;
    window.scrollTo(0, documentHeight - viewportHeight);
}

// copies the output to the user's clipboard
function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}

// resets the fields by reloading the page
function resetter() {
    location.reload(true);
}

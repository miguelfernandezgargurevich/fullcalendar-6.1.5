var arrayBirthdays = [{
    id: 2000,
    title  : 'Cumple Miguel',
    start  : 'YYYY-06-25',
    color: '#14A44D', 
    textColor: 'white', 
    type: "birthday",
    allDay: true
  },
  {
    id: 2001,
    title  : 'Cumple Juan',
    start  : 'YYYY-08-06',
    color: '#14A44D', 
    textColor: 'white',
    type: "birthday",
    allDay: true
  }];

  var today = new Date();
  var year = today.getFullYear();
  arrayBirthdays.forEach(element => element.start = element.start.replace('YYYY',year));
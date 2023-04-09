var arrayHolidays = [{
    id: 1000,
    title  : 'Año Nuevo',
    start  : 'YYYY-01-01',
    color: '#DC4C64', 
    textColor: 'white', 
    type: "holiday",
    allDay: true
  },
  {
    id: 1001,
    title  : 'Jueves Santo',
    start  : 'YYYY-04-06',
    color: '#DC4C64', 
    textColor: 'white',
    type: "holiday",
    allDay: true 
  },
  {
    id: 1002,
    title  : 'Viernes Santo',
    start  : 'YYYY-04-07',
    color: '#DC4C64', 
    textColor: 'white',
    type: "holiday",
    allDay: true 
  },
  {
    id: 1003,
    title  : 'Domingo de Pascua',
    start  : 'YYYY-04-09',
    color: '#DC4C64', 
    textColor: 'white',
    type: "holiday",
    allDay: true 
  },
  {
    id: 1004,
    title  : 'Día del Trabajo',
    start  : 'YYYY-05-01',
    color: '#DC4C64', 
    textColor: 'white',
    type: "holiday",
    allDay: true 
  },
  {
    id: 1005,
    title  : 'San Pedro y San Pablo',
    start  : 'YYYY-06-29',
    color: '#DC4C64', 
    textColor: 'white',
    type: "holiday",
    allDay: true 
  },
  {
    id: 1006,
    title  : 'Día de la Independencia',
    start  : 'YYYY-07-28',
    color: '#DC4C64', 
    textColor: 'white',
    type: "holiday",
    allDay: true
  },
  {
    id: 1007,
    title  : 'Celebración del Día de la Independencia',
    start  : 'YYYY-07-29',
    color: '#DC4C64', 
    textColor: 'white',
    type: "holiday",
    allDay: true 
  },
  {
    id: 1008,
    title  : 'Batalla de Junín',
    start  : 'YYYY-08-06',
    color: '#DC4C64', 
    textColor: 'white',
    type: "holiday",
    allDay: true 
  },
  {
    id: 1009,
    title  : 'Santa Rosa de Lima',
    start  : 'YYYY-08-30',
    color: '#DC4C64', 
    textColor: 'white',
    type: "holiday",
    allDay: true 
  },
  {
    id: 1010,
    title  : 'Combate de Angamos',
    start  : 'YYYY-10-08',
    color: '#DC4C64', 
    textColor: 'white',
    type: "holiday",
    allDay: true 
  },
  {
    id: 1011,
    title  : 'Día de Todos los Santos',
    start  : 'YYYY-11-01',
    color: '#DC4C64', 
    textColor: 'white',
    type: "holiday",
    allDay: true 
  },
  {
    id: 1012,
    title  : 'Inmaculada Concepción',
    start  : 'YYYY-12-08',
    color: '#DC4C64', 
    textColor: 'white',
    type: "holiday",
    allDay: true 
  },
  {
    id: 1013,
    title  : 'Batalla de Ayacucho',
    start  : 'YYYY-12-09',
    color: '#DC4C64', 
    textColor: 'white',
    type: "holiday",
    allDay: true 
  },
  {
    id: 1014,
    title  : 'Navidad',
    start  : 'YYYY-12-25',
    color: '#DC4C64', 
    textColor: 'white',
    type: "holiday",
    allDay: true 
  }];

  var today = new Date();
  var year = today.getFullYear();
  arrayHolidays.forEach(element => element.start = element.start.replace('YYYY',year));
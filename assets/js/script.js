document.addEventListener('DOMContentLoaded', function() {

    var arrayData = arrayBirthdays.concat(arrayHolidays).concat(arrayVacations);
    //console.log(arrayData);

    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {

      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,dayGridYear,listYear'
      },
      buttonText: {
        multiMonthYear: 'year',
        dayGridMonth: 'month',
        timeGridWeek: 'week',
        timeGridDay: 'day',
        dayGridYear: 'full',
        listYear: "list"
   },
      initialView: "multiMonthYear",
      //initialDate: '2023-01-12',
      weekends: true,

      eventAdd: function (){
        //alert("debe agregar el elemento al array y la BD");
      },
      eventChange: function (arg){
        //alert("debe modificar el elemento del array y la BD");
        //console.log(arg.event);
        var dias = 1; 
        if (arg.event._def.hasEnd)
          dias = 0;

        eventColor = arg.event._def.ui.backgroundColor; 
        id = arg.event._def.publicId;
        title = arg.event._def.title;
        start = arg.event._instance.range.start;
        end = arg.event._instance.range.end
        allDay = arg.event._def.allDay;
        type= arg.event._def.extendedProps.type;
        
        //console.log(type);

        arrayData.forEach((element,index) => {   //remove from initial array (concat) 
          if (element.id == id){
            //arrayData.splice (index, 1);
            //var startStrFormat = moment(start).format();
            //var endStrFormat = moment(end).format();
          
            var fechaStart = new Date(start);
            var fechaEnd = new Date(end);
            
            fechaEnd.setDate(fechaEnd.getDate()); // + dias);
            //console.info(fechaEnd)
            element.color = eventColor;
            element.title = title;
            element.start = start;
            element.end = end;
            element.allDay = allDay;

            if (eventColor == '#14A44D') //birthday
              element.type  = "birthday";
            
            if (eventColor == '#DC4C64') //holiday
              element.type  = "holiday";

            if (eventColor == '#54B4D3') //vacation
              element.type  = "vacation";

            return;
          }
        });

        calendar.render();

      },
      eventRemove: function (){
        //alert("debe remover el elemento del array y la BD");
      },
     
      navLinks: true, // can click day/week names to navigate views
      selectable: true,
      selectMirror: true,
      select: function(arg) { //add event, click empty space --NEW

        $('#new-event').modal('show'); 

        if (arg.event == undefined) {
          var startStrFormat = moment(arg.startStr).format('DD/MM/YYYY h:mm:ss a');
          var endStrFormat = moment(arg.endStr).format('DD/MM/YYYY h:mm:ss a');

          //console.log(arg);

          var startStr = arg.startStr;
          var endStr = arg.endStr;

          document.getElementById("new-event--title").value = "";
          document.getElementById("new-event--start").value = startStrFormat 
          document.getElementById("new-event--start-test").value = arg.start 
          document.getElementById("new-event--start-h").value = startStr 
          document.getElementById("new-event--end").value = endStrFormat 
          document.getElementById("new-event--end-h").value = endStr 
          document.getElementById("new-event--allDay").value = arg.allDay

          var endNew = endStr;
          var divEndDate= document.getElementById("divEndDateNew");

          if (endNew == '')
            divEndDate.style.display='none';
          else
            divEndDate.style.display='';

        }
        /*
        calendar.unselect()
        */
      },
      eventClick: function(arg) { //select event --EDIT
        $('#edit-event').modal('show'); 

        let colorValue = arg.event._def.ui.backgroundColor;

        $("input[name=event-tag][value=" + colorValue + "]").prop('checked', true);

        document.getElementById("edit-event--id").value = arg.event._def.publicId;
        document.getElementById("edit-event--title").value = arg.event._def.title //startStr fecha str
        //document.getElementById("edit-event--allDay").value = arg.event.allDay
        document.getElementById("edit-event--start-h").value = arg.event.startStr; //fecha str
        document.getElementById("edit-event--end-h").value = arg.event.endStr //startStr fecha str\

        var startStrFormat = moment(arg.event.startStr).format('DD/MM/YYYY h:mm:ss a');
        var endStrFormat = moment(arg.event.endStr).format('DD/MM/YYYY h:mm:ss a');

        document.getElementById("edit-event--start").value = startStrFormat;
        document.getElementById("edit-event--end").value = endStrFormat;

        var endEdit = arg.event.endStr;
        var divEndDate= document.getElementById("divEndDateEdit");
        
        if (endEdit == '')
          divEndDate.style.display='none';
        else
          divEndDate.style.display='';

      },
      editable: false,
      dayMaxEvents: true, // allow "more" link when too many events
        
    });

    function evalCheckedTypes(){
      let isCheckedHolidays = $('#event-tag-chk-holidays')[0].checked;
      let isCheckedBirthdays = $('#event-tag-chk-birthdays')[0].checked;
      let isCheckedVacations = $('#event-tag-chk-vacations')[0].checked;
      //console.log(calendar.getEvents());  

      //var events = calendar.getEvents();

      var data_arrHolidays = arrayData.filter(function(x) { return x.type == "holiday"; });
      var data_arrBirthdays= arrayData.filter(function(x) { return x.type == "birthday"; });
      var data_arrVacations = arrayData.filter(function(x) { return x.type == "vacation"; });

      // remove all events
      calendar.getEvents().forEach(event => event.remove());
     
      if (isCheckedHolidays == true)
      {
        calendar.batchRendering(() => {
          data_arrHolidays.forEach(event => calendar.addEvent(event));
        });
      }

      if (isCheckedBirthdays == true)
      {
        calendar.batchRendering(() => {
          data_arrBirthdays.forEach(event => calendar.addEvent(event));
        });
      }

      if (isCheckedVacations== true)
      {
        calendar.batchRendering(() => {
          data_arrVacations.forEach(event => calendar.addEvent(event));
        });
      }

    }
    
    $('#event-tag-chk-holidays').change(function() {
      evalCheckedTypes();
    });

    $('#event-tag-chk-birthdays').change(function() {
      evalCheckedTypes();
    });

    $('#event-tag-chk-vacations').change(function() {
      evalCheckedTypes();
    });


    $('#btnEliminar').click(function(){
        var myId = document.getElementById("edit-event--id").value;
        var event = calendar.getEventById(myId);
        //console.log(event);

        if (confirm('Are you sure you want to delete this event?')) {
          event.remove(); //remove from calendar

          arrayData.forEach((element,index) => {   //remove from initial array (concat) 
            if (element.id == myId){
              arrayData.splice (index, 1);
              return;
            }
          });
          
        }
       
        //call ajax
        calendar.render();
    }); 

    $('#btnAgregar').click(function(){
      var start_f = document.getElementById("new-event--start").value;
      var start = document.getElementById("new-event--start-h").value;
      var end = document.getElementById("new-event--end-h").value;
      var allDay = document.getElementById("new-event--allDay").value;
      var allDayBoolean = (allDay === 'true');
      var title = document.getElementById("new-event--title").value;

      var eventColor = "";
      if($("input[type='radio'].radioBtnClass").is(':checked')) 
        eventColor = $("input[type='radio'].radioBtnClass:checked").val();
        
      let parsedDateStart = moment(start, 'DD/MM/YYYY h:mm:ss a')
      let parsedDateEnd = moment(end, 'DD/MM/YYYY h:mm:ss a')
      //new Date("05 October 2011 14:48 UTC");

      let max = 0;
      arrayData.forEach(character => {
        if (character.id > max) {
          max = character.id;
        }
      });
      //console.log(max);

      var id = max+1;

      var type = '';

      if (eventColor == '#14A44D') //birthday
        type = 'birthday';
        
      if (eventColor == '#DC4C64') //holiday
        type = 'holiday';

      if (eventColor == '#54B4D3') //vacations
        type = 'vacation';

      
      
      //console.log(start); // lo que esta en el hidden
      //console.log(start_f); // lo que esta en el picker

      //const event = new Date(start_f);
      //console.log(event); // lo que esta en el picker tiene que ser convertido a fecham sale invalid date ahorita

      //console.log(event.toISOString());
      
      //console.log(event.toUTCString());
      //console.log(event.toGMTString());
      //console.log(event.toLocaleDateString());
      //console.log(event.toTimeString());
      
      
      //console.log(parsedDateStart);
      

      arrayData.push({ //add to initial array
        'id': id,
        'title': title,
        'start': start,
        'end': end,
        'allDay': allDayBoolean,
        'color': eventColor,     
        'textColor': 'white',
        'type': type
      });

      calendar.addEvent({  //add to calendar
        id: id,
        title: title,
        start: start,
        end: end,
        allDay: allDayBoolean,
        color: eventColor,      
        textColor: 'white',
        type: type,
        
      });

    });    


    
    $('#btnActualizar').click(function(){

      var myId = document.getElementById("edit-event--id").value;
      var event = calendar.getEventById(myId);

      var title = document.getElementById("edit-event--title").value;

      var eventColor = "";
      if($("input[type='radio'].radioBtnClassEdit").is(':checked')) {
        eventColor = $("input[type='radio'].radioBtnClassEdit:checked").val();
      }

      event.setProp('title', title);
      event.setProp('color',eventColor)
      //event.setStart(start);
      //event.setEnd(end);
      //event.setProp('allDay', allDayBoolean);
      
    }); 

    $('#datetimepicker1').datetimepicker({
      format: 'DD/MM/YYYY hh:mm:ss a'
    });

    $(document).ready(function(){
      $("#new-event").on('shown.bs.modal', function(){
          $(this).find('#new-event--title').focus();
      });

      $("#edit-event").on('shown.bs.modal', function(){
        $(this).find('#edit-event--title').focus();
      });

      //console.log(arrayHolidays);

      // batch every modification into one re-render
      calendar.batchRendering(() => {
        // remove all events
        calendar.getEvents().forEach(event => event.remove());
        //add events from array concat
        arrayData.forEach(event => calendar.addEvent(event));
       
      });

    });


  calendar.render();
});


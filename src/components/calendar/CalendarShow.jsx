import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FaXmark } from "react-icons/fa6";

import { useEffect, useState } from "react";

import './CalendarShow.css';
import QRCodes from "../qrcode/QRCode";
import api from '../../api/axiosConfig';

const event1 = [
  ];

function CalendarShow() {

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [title, setTitle] = useState('');
  const [id, setId] = useState();

  const [events, setEvents] = useState(event1);  
  const [open, setOpen] = useState(false);
  const controlCalendarE = (bool) => {
    setOpen(bool);
  }

  const addEvent = (e) =>{
    setStartTime(e.date);
    setEndTime(e.date);
    setTitle("");
    setId(-1);
    controlCalendarE(!open);
  }

  const managerEvent = (e) => {
    setStartTime(e.start);
    setEndTime(e.end);
    setTitle(e.title);
    setId(e.id);
    controlCalendarE(!open);
  }

  function onEventChange(value){
    setTitle(value);
  }

  function formatTime(time){
    let year = time.getFullYear();
    let month = (time.getMonth() + 1) < 10 ? ("0" + (time.getMonth() + 1)) : (time.getMonth() + 1) ;
    let day = time.getDate();
    let hour = time.getHours() < 10 ? ("0" + time.getHours()) : time.getHours();
    let minutes = time.getMinutes() < 10 ? ("0" + time.getMinutes()) : time.getMinutes();
    return year + "-" + month + "-" + day + "T" + hour + ":" + minutes + ":00";
  }

  const getDataSchedule = async() => {
    try{
      let response = await api.get("/api/v1/core/meeting/teacherCode=6656485");
      setupDataSchedule(response.data);
    }catch(error){
      console.log(error);
    }
  }

  const setupDataSchedule = (response) => {
    let newEvents = [...events];
    for(let i=0; i< response.data.items.length; i++){
      let data = response.data.items[i];

      let startT = data.startEndTime[0].substring(0, data.startEndTime[0].indexOf(".")).replace(" ","T");
      let endT = data.startEndTime[1].substring(0, data.startEndTime[0].indexOf(".")).replace(" ","T");
      
      let event = {
        id: data.id,
        title: data.subjectName + " , " + data.roomName,
        start: startT,
        end: endT
      };
      newEvents.push(event);
    }
    setEvents(newEvents);
  }

  useEffect(() => {
    getDataSchedule();
  }, [])

  const saveEvent = () => {
    if(startTime == null && endTime == null){
      setStartTime(new Date())
      setEndTime(new Date())
    }else if(startTime == null){
      setStartTime(endTime);
    }else if(endTime == null){
      setEndTime(startTime)
    }

    let startT = formatTime(startTime);
    let endT = formatTime(endTime);
    
    if(id != -1){
      const listEvent = events.map((event) => {
      if(event.id == id){
        return {
          ...event,
          title: title,
          start: startT,
          end: endT
        }
      }
      return event;
      });
      setEvents(listEvent);
    }else{
      let newEvent = {
        id: events.length + 1,
        title: title,
        start: startT,
        end: endT
      } 
      setEvents([...events, newEvent]);
    }
    controlCalendarE(false);
  }

  return (
    <div className="calendar">
      <FullCalendar
        data-bs-toggle="collapse" 
        href="#collapseCalendarEvent" 
        role="button" 
        aria-expanded="false" 
        aria-controls="collapseCalendarEvent"

        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="timeGridWeek"
        // initialView="basicWeek"
        headerToolbar={{
          center: 'title',
          left: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}

        buttonText={{
          today: 'Hôm nay',
          month: 'Tháng',
          week: 'Tuần',
          day: 'Ngày',
          list: 'Danh sách'
        }}
        
        eventColor="#008888"
        nowIndicator
        dateClick={(e) => addEvent(e)}
        eventClick={(e) => managerEvent(e.event)}
        events={events}
        timeZoneParam="hh:mm"
      
        // weekNumbers={true}
        weekText="Tuần"
        
        //Time-axis setting
        slotMinTime={'05:00:00'}
        slotMaxTime={'24:00:00'}

        //Locale
        locales={"vi"}
        weekNumberCalculation={'ISO'}
        timeZone={"local"}

        bootstrapFontAwesome={false}

        //Hide cell allday
        allDaySlot={false}

        slotEventOverlap={false}

        dayMaxEventRows={true}
      />

      <div className="calendar_event" style={open ? {height: '50%', width: '40%'} : {}}>
        <div className="calendar_event_header d-flex justify-content-between">
          <div className="calendar_event_header_title">
            <form>
              <input placeholder="Tên sự kiện" type="text" id="calendar_event_header_title" value={title} onChange={e => onEventChange(e.target.value)}/>
            </form>
          </div>
          <div className="calendar_event_header_exit" onClick={() => controlCalendarE(false)} >
            <FaXmark/>
          </div>
        </div>
        <div className="calendar_event_body">
          <div className="calendar_event_body_time d-flex justify-content-between">
            <div className="calendar_event_body_time_clock">
              <span className="calendar_event_body_time_clock_title">Bắt đầu:</span>
              <span>
                <DatePicker
                  selected={startTime}
                  value={startTime}
                  onChange={setStartTime}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="Giờ"
                  dateFormat={" hh:mm aa  -  dd/MM/yyyy"}
                />
              </span>
            </div>
            <div className="calendar_event_body_time_clock">
              <span className="calendar_event_body_time_clock_title">Kết thúc:</span>
              <span>
                <DatePicker
                  selected={endTime}
                  value={endTime}
                  onChange={setEndTime}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="Giờ"
                  dateFormat={" hh:mm aa  -  dd/MM/yyyy"}
                />
              </span>
            </div>
          </div>
          <div className="calendar_event_body_qr">
            <button className="btn btn-outline-primary">Tạo</button>
            <QRCodes/>
          </div>
        </div>
        <div className="calendar_event_footer d-flex justify-content-center">
          <div>
            <button type="button" className="btn btn-outline-success btn-sm" onClick={saveEvent}>Lưu</button>
          </div>
          <div>
            <button type="button" className="btn btn-outline-warning btn-sm">Hủy</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CalendarShow;

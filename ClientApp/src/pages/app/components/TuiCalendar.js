import React, { Component } from 'react';
import Calendar from '@toast-ui/react-calendar';
import { Dropdown, Button } from "react-bootstrap";

import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import '../static/css/move-button.css';

import { AppointmentService } from '../../../services/AppointmentService';
import { theme } from './Calendar/Theme';

export class TuiCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDateRangeText: '',
      selectedView: props.view
    };
    this.calendarRef = React.createRef();
    this.getCalInstance = this.getCalInstance.bind(this);
    this.updateRenderRangeText = this.updateRenderRangeText.bind(this);
    this.onAfterRenderEvent = this.onAfterRenderEvent.bind(this);
    this.onBeforeDeleteEvent = this.onBeforeDeleteEvent.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.onClickDayName = this.onClickDayName.bind(this);
    this.onClickNavi = this.onClickNavi.bind(this);
    this.onClickEvent = this.onClickEvent.bind(this);
    this.onClickTimezonesCollapseBtn = this.onClickTimezonesCollapseBtn.bind(this);
    this.onBeforeUpdateEvent = this.onBeforeUpdateEvent.bind(this);
    this.onBeforeCreateEvent = this.onBeforeCreateEvent.bind(this);
    this.service = new AppointmentService();
  }

  componentDidMount() {
    this.updateRenderRangeText();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.view !== this.props.view) {
      this.setState({ selectedView: this.props.view }, this.updateRenderRangeText);
    }
  }

  getCalInstance() {
    return this.calendarRef.current?.getInstance?.();
  }

  updateRenderRangeText() {
    const calInstance = this.getCalInstance();
    if (!calInstance) {
      this.setState({ selectedDateRangeText: '' });
      return;
    }

    const viewName = calInstance.getViewName();
    const calDate = calInstance.getDate();
    const rangeStart = calInstance.getDateRangeStart();
    const rangeEnd = calInstance.getDateRangeEnd();

    let year = calDate.getFullYear();
    let month = calDate.getMonth() + 1;
    let date = calDate.getDate();
    let dateRangeText;

    switch (viewName) {
      case 'month': {
        dateRangeText = `${year}-${month}`;
        break;
      }
      case 'week': {
        year = rangeStart.getFullYear();
        month = rangeStart.getMonth() + 1;
        date = rangeStart.getDate();
        const endMonth = rangeEnd.getMonth() + 1;
        const endDate = rangeEnd.getDate();

        const start = `${year}-${month < 10 ? '0' : ''}${month}-${date < 10 ? '0' : ''}${date}`;
        const end = `${year}-${endMonth < 10 ? '0' : ''}${endMonth}-${
          endDate < 10 ? '0' : ''
        }${endDate}`;
        dateRangeText = `${start} ~ ${end}`;
        break;
      }
      default:
        dateRangeText = `${year}-${month}-${date}`;
    }

    this.setState({ selectedDateRangeText: dateRangeText });
  }

  onAfterRenderEvent(res) {
    console.group('onAfterRenderEvent');
    console.log('Event Info : ', res.title);
    console.groupEnd();
  }

  onBeforeDeleteEvent(res) {
    console.group('onBeforeDeleteEvent');
    console.log('Event Info : ', res.title);
    console.groupEnd();

    const { id, calendarId } = res;

    this.getCalInstance().deleteEvent(id, calendarId);
  }

  onChangeSelect(ev) {
    this.setState({ selectedView: ev.target.value }, this.updateRenderRangeText);
  }

  onClickDayName = (res) => {
    console.group('onClickDayName');
    console.log('Date : ', res.date);
    console.groupEnd();
  }

  onClickNavi = (ev) => {
    if ((ev.target).tagName === 'BUTTON') {
      const button = ev.target;
      const actionName = (button.getAttribute('data-action') ?? 'month').replace('move-', '');
      this.getCalInstance()[actionName]();
      this.updateRenderRangeText();
    }
  }

  onClickEvent = (res) => {
    console.group('onClickEvent');
    console.log('MouseEvent : ', res.nativeEvent);
    console.log('Event Info : ', res.event);
    console.groupEnd();
  }

  onClickTimezonesCollapseBtn = (
    timezoneCollapsed
  ) => {
    console.group('onClickTimezonesCollapseBtn');
    console.log('Is Timezone Collapsed?: ', timezoneCollapsed);
    console.groupEnd();

    const newTheme = {
      'week.daygridLeft.width': '100px',
      'week.timegridLeft.width': '100px',
    };

    this.getCalInstance().setTheme(newTheme);
  };

  onBeforeUpdateEvent = (updateData) => {
    console.group('onBeforeUpdateEvent');
    console.log(updateData);
    console.groupEnd();

    const targetEvent = updateData.event;
    const changes = { ...updateData.changes };

    if (changes) {
      this.service
        .updateAppointment(targetEvent.id, changes)
        .then(res => console.log(res));
    }

    this.getCalInstance().updateEvent(targetEvent.id, targetEvent.calendarId, changes);
  };

  onBeforeCreateEvent = (eventData) => {
    console.log(eventData);
    const event = {
      calendarId: eventData.calendarId || '',
      id: String(Math.random()),
      title: eventData.title,
      isAllday: eventData.isAllday,
      start: eventData.start,
      end: eventData.end,
      category: eventData.isAllday ? 'allday' : 'time',
      dueDateClass: '',
      location: eventData.location,
      state: eventData.state,
      isPrivate: eventData.isPrivate,
    };

    this.service
      .createAppointment(event.title, event.calendarId, event.location, event.start.d.d, event.end.d.d, true, [])
      .then(res => console.log(res));

    this.getCalInstance().createEvents([event]);
  };

  render () {
    const { initialCalendars, initialEvents, viewModeOptions } = this.props;

    return (
        <>
            <div className="d-flex align-items-center">
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-viewmode">
                  {viewModeOptions.find((option) => option.value === this.state.selectedView).title}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {viewModeOptions.map((option, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => this.onChangeSelect({ target: { value: option.value } })}
                    >
                      {option.title}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <span>
                <Button
                  variant="default"
                  size="sm"
                  className="move-today"
                  data-action="move-today"
                  onClick={this.onClickNavi}
                >
                  Today
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="move-day"
                  data-action="move-prev"
                  onClick={this.onClickNavi}
                >
                  Prev
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="move-day"
                  data-action="move-next"
                  onClick={this.onClickNavi}
                >
                  Next
                </Button>
              </span>
              <span className="render-range">{this.state.selectedDateRangeText}</span>
            </div>
            <Calendar
              height="900px"
              calendars={initialCalendars}
              month={{ startDayOfWeek: 1 }}
              events={initialEvents}
              template={{
                milestone(event) {
                  return `<span style="color: #fff; background-color: ${event.backgroundColor};">${event.title}</span>`;
                },
                allday(event) {
                  return `[All day] ${event.title}`;
                },
              }}
              theme={theme}
              timezone="Asia/Ho_Chi_Minh"
              useDetailPopup={true}
              useFormPopup={true}
              view={this.state.selectedView}
              week={{
                showTimezoneCollapseButton: true,
                timezonesCollapsed: false,
                eventView: true,
                taskView: true,
              }}
              ref={this.calendarRef}
              onAfterRenderEvent={this.onAfterRenderEvent}
              onBeforeDeleteEvent={this.onBeforeDeleteEvent}
              onClickDayname={this.onClickDayName}
              onClickEvent={this.onClickEvent}
              onClickTimezonesCollapseBtn={this.onClickTimezonesCollapseBtn}
              onBeforeUpdateEvent={this.onBeforeUpdateEvent}
              onBeforeCreateEvent={this.onBeforeCreateEvent}
            />
        </>
    );
  }
}
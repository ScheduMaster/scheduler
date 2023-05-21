import React, { Component } from "react";
import { PageHeader } from "../../components/PageHeader";
import { TuiCalendar } from "../../components/TuiCalendar";
import { Progress } from "../../../../components/Progress";

// Services
import { AppointmentService } from "../../../../services/AppointmentService";
import { CalendarService } from "../../../../services/CalendarService";

// Static data
import { viewModeOptions } from "../../data/calendar";

export class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialCalendars: [],
      initialEvents: [],
      loading: true,
      error: '',
    };
    this.appointment = new AppointmentService();
    this.calendar = new CalendarService();
  }

  componentDidMount() {
    // Call getProfileData to fetch data
    this.fetchData()
      .then(() => {
        // Set loading state to false after data is fetched or async operations are completed
        this.setState({ loading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message });
        // Set loading state to false if an error occurs
        this.setState({ loading: false });
      });
  }
  
  async fetchData() {
    // Make API call to retrieve appointment and calendar data
    const appointments = await this.appointment.getAppointments();
    const calendars = await this.calendar.getCalendars();

    console.group('appointments');
    console.log(appointments);
    console.groupEnd();
    
    console.group('calendars');
    console.log(calendars);
    console.groupEnd();

    this.setState({
      initialCalendars: calendars ?? this.state.initialCalendars,
      initialEvents: appointments ?? this.state.initialEvents
    });
  }

  render () {
    const { initialCalendars, initialEvents, loading } = this.state;

    // Display the progress component while loading
    if (loading) {
      return <Progress />;
    }

    return (
      <>
        <PageHeader preTitle="Overview" title="Calendar"/>
        <div className="page-body">
          <div className="container-xl">
            <TuiCalendar 
              view={"month"}
              initialCalendars={initialCalendars}
              initialEvents={initialEvents}
              viewModeOptions={viewModeOptions}
            />
          </div>
        </div>
      </>
    )
  }
}
import React, { Component } from "react";
import { PageHeader } from "../../components/PageHeader";
import { TuiCalendar } from "../../components/TuiCalendar";
import { Progress } from "../../../../components/Progress";

// Services
import { AppointmentService } from "../../../../services/AppointmentService";
import { CalendarService } from "../../../../services/CalendarService";

// Static data
import { viewModeOptions, viewRangeOptions } from "../../data/calendar";

export class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialCalendars: [],
      initialEvents: [],
      isAll: true,
      loading: true,
      error: '',
    };
    this.appointment = new AppointmentService();
    this.calendar = new CalendarService();
    this.updateRenderAppointment = this.updateRenderAppointment.bind(this);
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
  
  // Called automatically after the state isAll updates
  componentDidUpdate(prevProps, preState) {
    if (preState.isAll !== this.state.isAll) {
      this.setState({ selectedView: this.props.view }, this.updateRenderAppointment);
    }
  }

  // Update appointment/event data every change range of appointment (all/own)
  updateRenderAppointment = async () => {
    const { isAll } = this.state;
    const appointments = await this.appointment.getAppointments(isAll);

    console.log('updateRenderAppointment: ', isAll);
    this.setState({
      initialEvents: appointments ?? this.state.initialEvents
    });
  } 

  // Change state isAll from child component
  onChangeRange = (isAll) => {
    console.log('Change state isAll from child component: ', isAll)
    this.setState({ isAll: isAll });
  }

  async fetchData() {
    // Make API call to retrieve appointment and calendar data
    const appointments = await this.appointment.getAppointments(true);
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
              range={"all"}
              initialCalendars={initialCalendars}
              initialEvents={initialEvents}
              viewModeOptions={viewModeOptions}
              viewRangeOptions={viewRangeOptions}
              onChangeRange={this.onChangeRange}
            />
          </div>
        </div>
      </>
    )
  }
}
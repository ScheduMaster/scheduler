import React, { Component } from "react";
import { withRouter, Redirect, Link } from 'react-router-dom';
import { Form, Button, Toast } from 'react-bootstrap';
import { Progress } from "../../../components/Progress";
import { ErrorList } from "../../../components/ErrorList";

// Services
import { AppointmentService } from "../../../services/AppointmentService";
import { CalendarService } from "../../../services/CalendarService";

class UpdateAppointmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      initiator: '',
      calendarId: '',
      calendarInfo: {
        name: '',
        backgroundColor: ''
      },
      changes: {},
      location: '',
      start: '',
      end: '',
      editable: false,
      attendees: [],
      calendars: [],
      loading: false,
      error: '',
      showToast: false,
      redirectToReferrer: false
    };
    this.appointmentId = this.props.match.params.id;
    this.appointment = new AppointmentService();
    this.calendar = new CalendarService();
  }
  
  componentDidMount() {
    // Call getProfileData to fetch data
    this.getAppoingmentData(this.appointmentId)
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

  async getAppoingmentData(appointmentId) {
    try {
      const appointment = await this.appointment.getAppointment(appointmentId);

      this.setState({
        title: appointment.title ?? this.state.title,
        initiator: appointment.initiator ?? this.state.initiator,
        location: appointment.location ?? this.state.location,
        calendarId: appointment.calendarId ?? this.state.calendarId,
        editable: appointment.editable ?? this.state.editable,
        start: appointment.start ?? this.state.start,
        end: appointment.end ?? this.state.end
      });
  
      const calendar = await this.calendar.getCalendar(appointment.calendarId);
      const calendars = await this.calendar.getCalendars();

      this.setState({ 
        calendarInfo: calendar,
        calendars: calendars
      });

    } catch (error) {
      console.log(error);
    }
  }

  handleFormSubmit = async (event) => {
    // Make API call to update appointment data
    event.preventDefault();
    try {
      this.setState({ loading: true });
      const { title, location, calendarId, start, end, editable } = this.state;
      const data = await this.appointment.updateAppointmentByFrom(this.appointmentId, title, location, calendarId, start, end, editable);

      console.log(data);
      this.setState({ 
        loading: false,
        showToast: true,
        redirectToReferrer: true
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render () {
    const { title, location, calendarId, start, end, editable, attendees, calendarInfo,
      error, loading, showToast, redirectToReferrer, calendars, initiator } = this.state;

    // Display the progress component while loading
    if (loading) {
      return <Progress />;
    }

    if (redirectToReferrer) {
      return <Redirect to={`/app/appointment/view/${this.appointmentId}`} />;
    }

    return (
      <>
        <Toast 
          show={showToast}
          autohide={true}
          onClose={this.handleCloseToast} 
          delay={2000}
          style={{
            position: 'absolute',
            top: 0,
            right: 0
          }}
        >
          <Toast.Header>
            <strong className="mr-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Appoitment data successfully updated.</Toast.Body>
        </Toast>
        {!loading && (
        <Form className="card" onSubmit={this.handleFormSubmit}>
          <div className="card-body">
            <h3 className="card-title">View Appointment</h3>
            <div className="row row-cards">
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={title}
                    onChange={event => this.setState({ title: event.target.value })}
                  />
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <Form.Label>Calendar</Form.Label>
                  <Form.Select
                      className="form-select tomselected ts-hidden-accessible"
                      value={calendarId}
                      onChange={event => this.setState({ calendarId: event.target.value })}
                    >
                      {calendars.map((calendar, index) => (
                        <option 
                          value={calendar.id} 
                          key={index}
                          style={{ 
                            color: calendar.backgroundColor,
                            fontWeight: 'bold'
                          }}
                        >
                          {calendar.name}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <Form.Label>Editable</Form.Label>
                  <Form.Select
                      value={editable}
                      onChange={event => this.setState({ editable: event.target.value })}
                    >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Initiator</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Initiator"
                    value={initiator}
                    onChange={event => this.setState({ initiator: event.target.value })}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Location"
                      value={location}
                      onChange={event => this.setState({ location: event.target.value })}
                    />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Start</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    placeholder="Start"
                    value={start}
                    onChange={event => this.setState({ start: event.target.value })}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>End</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    placeholder="End"
                    value={end}
                    onChange={event => this.setState({ end: event.target.value })}
                  />
                </Form.Group>
              </div>
            </div>
          </div>
          <div className="card-footer text-end">
            {error ? <ErrorList errors={error}/> : ''}
            <Button variant="primary" type="submit">Update appointment</Button>
          </div>
        </Form>
        )}
      </>
    );
  }
}

1
export default withRouter(UpdateAppointmentForm);
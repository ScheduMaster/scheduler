import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button, Toast } from 'react-bootstrap';
import { Progress } from "../../../components/Progress";
import { ErrorList } from "../../../components/ErrorList";

// Services
import { AppointmentService } from '../../../services/AppointmentService';
import { CalendarService } from '../../../services/CalendarService';

export class CreateAppointmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      calendarId: '',
      location: '',
      start: '',
      end: '',
      editable: false,
      attendees: [],
      calendars: [],
      error: '',
      showToast: false,
      redirectToReferrer: false
    };
    this.appointment = new AppointmentService();
    this.calendar = new CalendarService();
  }

  componentDidMount() {
    // Call getProfileData to fetch data
    this.getCalendars()
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

  async getCalendars() {
    // Make API call to retrieve user profile data
    const data = await this.calendar.getCalendars();
    console.log(data);

    this.setState({
      calendars: data ?? this.state.calendars
    });
  }

  handleFormSubmit = async (event) => {
    // Make API call to update user profile data
    event.preventDefault();
    try {
      this.setState({ loading: true });
      const { name, calendarId, location, start, end, editable, attendees } = this.state;
      await this.appointment.createAppointment(name, calendarId, location, start, end, editable, attendees);

      this.setState({ 
        loading: false,
        showToast: true,
        redirectToReferrer: true
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  handleCloseToast = () => {
    this.setState({ showToast: false })
  };

  render () {
    const { name, location, calendarId, start, end, editable, attendees, error, loading, showToast, redirectToReferrer, calendars } = this.state;

    // Display the progress component while loading
    if (loading) {
      return <Progress />;
    }

    if (redirectToReferrer) {
      return <Redirect to="/app" />;
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
          <Toast.Body>Appointment successfully created.</Toast.Body>
        </Toast>
        {!loading && (
          <Form className="card" onSubmit={this.handleFormSubmit}>
            <div className="card-body">
              <h3 className="card-title">Create Appointment</h3>
              <div className="row row-cards">
                <div className="col-md-4">
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={event => this.setState({ name: event.target.value })}
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
                    <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={event => this.setState({ location: event.target.value })}
                      />
                  </Form.Group>
                </div>
                <div className="col-md-4">
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
                <div className="col-md-4">
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
              </div>
            </div>
            <div className="card-footer text-end">
              {error ? <ErrorList errors={error}/> : ''}
              <Button variant="primary" type="submit">Create new appointment</Button>
            </div>
          </Form>
        )}
      </>
    );
  }
}

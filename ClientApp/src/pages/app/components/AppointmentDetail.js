import React, { Component } from "react";
import { withRouter, Redirect, Link } from 'react-router-dom';
import { Form, Button, Toast } from 'react-bootstrap';
import { Progress } from "../../../components/Progress";
import { ErrorList } from "../../../components/ErrorList";

// Services
import { AppointmentService } from "../../../services/AppointmentService";
import { CalendarService } from "../../../services/CalendarService";

class AppointmentDetail extends Component {
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
      location: "N/A",
      start: '',
      end: '',
      editable: false,
      attendees: [],
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
      this.setState({ calendarInfo: calendar });
    } catch (error) {
      console.log(error);
    }
  }

  handleFormSubmit = async (event) => {
    // Make API call to update calendar data
    event.preventDefault();
    try {
      this.setState({ loading: true });
      await this.service.deleteCalendar(this.calendarId,);

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
      return <Redirect to="/app/calendar/list" />;
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
          <Toast.Body>Appoitment data successfully deleted.</Toast.Body>
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
                    readOnly={true}
                  />
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <Form.Label>Calendar</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Calendar"
                    value={calendarInfo.name ? calendarInfo.name : "N/A"}
                    readOnly={true}
                  />
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <Form.Label>Editable</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Editable"
                    value={editable ? "Yes" : "No"}
                    readOnly={true}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Initiator</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Initiator"
                    value={initiator}
                    readOnly={true}
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
                      readOnly={true}
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
                    readOnly={true}
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
                    readOnly={true}
                  />
                </Form.Group>
              </div>
            </div>
          </div>
          <div className="card-footer d-flex justify-content-between">
            {error ? <ErrorList errors={error}/> : ''}
            <Button className="mx-2" variant="primary" type="submit">Delete appointment</Button>
            <Link to={`/app/appointment/update/${this.appointmentId}`}>
              <Button className="mx-2" variant="primary">Update appointment</Button>
            </Link>
          </div>
        </Form>
        )}
      </>
    );
  }
}

1
export default withRouter(AppointmentDetail);
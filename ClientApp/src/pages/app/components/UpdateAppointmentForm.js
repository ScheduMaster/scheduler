import React, { Component } from "react";
import { withRouter, Redirect } from 'react-router-dom';
import { Form, Button, Toast, InputGroup } from 'react-bootstrap';
import { Progress } from "../../../components/Progress";
import { ErrorList } from "../../../components/ErrorList";
import { SearchUserPopup } from "./SearchUserPopup";
import TagsInput from 'react-tagsinput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// Services
import { AppointmentService } from "../../../services/AppointmentService";
import { CalendarService } from "../../../services/CalendarService";
import { UserService } from "../../../services/UserService";

// Style css
import "../static/css/react-tagsinput.css"

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
      attendeeIdList: [],
      attendeeNameList: [],
      calendars: [],
      pendingResponses: [],
      loading: false,
      error: '',
      toast: {
        show: false,
        message: '',
        title: ''
      },
      showPopup: false,
      redirectToReferrer: false
    };
    this.appointmentId = this.props.match.params.id;
    this.appointment = new AppointmentService();
    this.calendar = new CalendarService();
    this.user = new UserService();
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

      const attendeeIdList = appointment.attendees.map(attendee => attendee.userId);
      const attendeeNameList = appointment.attendees.map(attendee => attendee.name);
      const pendingResponses = appointment.pendingResponses.map(pendingResponse => pendingResponse.name);
      
      this.setState({
        title: appointment.title ?? this.state.title,
        initiator: appointment.initiator ?? this.state.initiator,
        location: appointment.location ?? this.state.location,
        calendarId: appointment.calendarId ?? this.state.calendarId,
        editable: appointment.editable ?? this.state.editable,
        start: appointment.start ?? this.state.start,
        end: appointment.end ?? this.state.end,
        attendees: appointment.attendees ?? this.state.attendees,
        attendeeIdList: attendeeIdList ?? this.state.attendeeIdList,
        attendeeNameList: attendeeNameList ?? this.state.attendeeNameList,
        pendingResponses: pendingResponses ?? this.state.pendingResponses
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
      this.setState({ loading: true });
      const { title, location, calendarId, start, end, editable, attendeeIdList } = this.state;
      this.appointment
        .updateAppointmentByFrom(this.appointmentId, title, location, calendarId, start, end, editable, attendeeIdList)
        .then((data) => {
          console.log(data);
          this.setState({ 
            loading: false,
            toast: { 
              show: true,
              title: 'Success',
              message: data.message
            },
            redirectToReferrer: true
          });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  handleCloseToast = () => {
    this.setState({ toast: {
      show: false,
      title: '',
      message: ''
    }});
  };

  onClosePopup = () => {
    this.setState({ showPopup: false });
  };

  onInviteAttendee = (userId) => {
    let { attendees, attendeeIdList } = this.state;

    // Check if user has already in attendeeIdList
    if (attendeeIdList.includes(userId)) {
      this.setState({ 
        toast: {
          show: true,
          title: "Fail",
          message: "You invited this user before."
        }
      });

      return;
    }

    this.user
      .getUser(userId)
      .then((data) => {
        const updatedAttendees = [...attendees, {
          userId: userId,
          name: `${data.firstName} ${data.lastName}`,
          email: data.email
        }];
        const updatedAttendeeIdList = [...attendeeIdList, userId];
        const updatedAttendeeNameList = updatedAttendees.map(attendee => attendee.name);

        // Update state
        this.setState({ 
          attendees: updatedAttendees,
          attendeeIdList: updatedAttendeeIdList,
          attendeeNameList: updatedAttendeeNameList,
          toast: {
            show: true,
            title: "Success",
            message: "You have successfully added a new attendee."
          }
        });
      })
      .catch((error) => {
        this.setState({ 
          error: error.message,
          toast: {
            show: true,
            title: "Fail",
            message: "You added this user before."
          }
        });
      });
  };

  handleChangeAttendees = (attendees) => {
    console.log(attendees);
    this.setState({ attendees });
  }

  handleChangePendingResponse = (pendingResponses) => {
    this.setState({ pendingResponses });
  }
  
  handleOpenPopup = () => {
    this.setState({ showPopup: true });
  }

  render () {
    const { title, location, calendarId, start, end, editable, error, loading, attendeeNameList,
      toast, redirectToReferrer, calendars, initiator, showPopup, pendingResponses } = this.state;

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
          bg={toast.title === "Fail" ? "warning" : "default"}
          show={toast.show}
          autohide={true}  
          onClose={this.handleCloseToast}
          delay={2000}    
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            zIndex: 2 
          }}
        >
          <Toast.Header>
            <strong className="mr-auto">{toast.title}</strong>
          </Toast.Header>
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
        {!loading && (
        <>
          <SearchUserPopup 
            showPopup={showPopup} 
            onClosePopup={this.onClosePopup}
            onInviteAttendee={this.onInviteAttendee}
          />
          <Form className="card" onSubmit={this.handleFormSubmit} style={{ zIndex: 1 }}>
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
                <div className="col-md-12">
                  <Form.Group className="mb-3">
                    <Form.Label>Attendees</Form.Label>
                    <InputGroup>
                      <TagsInput
                        className="form-control attendees"
                        value={attendeeNameList}
                        onChange={this.handleChangeAttendees}
                      />
                      <Button variant="outline-primary" onClick={this.handleOpenPopup}>
                        <FontAwesomeIcon icon={faPlus} />
                      </Button>
                    </InputGroup>
                  </Form.Group>
                </div>
                {
                  pendingResponses.length > 0
                    ? <div className="col-md-12">
                        <Form.Group className="mb-3">
                          <Form.Label>Pending responses</Form.Label>
                          <InputGroup>
                            <TagsInput
                              className="form-control pendings"
                              value={pendingResponses}
                              onChange={this.handleChangePendingResponse}
                            />
                          </InputGroup>
                        </Form.Group>
                      </div>
                    : <></>
                }
              </div>
            </div>
            <div className="card-footer text-end">
              {error ? <ErrorList errors={error}/> : ''}
              <Button variant="primary" type="submit">Update appointment</Button>
            </div>
          </Form>
        </>
        )}
      </>
    );
  }
}

export default withRouter(UpdateAppointmentForm);
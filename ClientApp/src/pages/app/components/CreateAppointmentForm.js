import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button, Toast, InputGroup } from 'react-bootstrap';
import { Progress } from "../../../components/Progress";
import { ErrorList } from "../../../components/ErrorList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchUserPopup } from "./SearchUserPopup";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TagsInput from 'react-tagsinput'

// Services
import { AppointmentService } from '../../../services/AppointmentService';
import { CalendarService } from '../../../services/CalendarService';
import { UserService } from '../../../services/UserService';

// Style css
import "../static/css/react-tagsinput.css"

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
      attendeeIdList: [],
      attendeeNameList: [],
      calendars: [],
      error: '',
      showPopup: false,
      toast: {
        show: false,
        message: '',
        title: ''
      },
      redirectToReferrer: false
    };
    this.appointment = new AppointmentService();
    this.calendar = new CalendarService();
    this.user = new UserService();
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
      calendars: data ?? this.state.calendars,
    });

    if (data && data.length) {
      this.setState({
        calendarId: data ? data[0].id : this.state.calendarId
      });
    }
  }

  handleFormSubmit = async (event) => {
    // Make API call to update user profile data
    event.preventDefault();
    try {
      this.setState({ loading: true });
      const { name, calendarId, location, start, end, editable, attendeeIdList } = this.state;
      const data = await this.appointment.createAppointment(name, calendarId, location, start, end, editable, attendeeIdList);

      this.setState({ 
        loading: false,
        toast: { 
          show: true,
          title: "Success",
          message: data.message
        },
        redirectToReferrer: true
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  handleCloseToast = () => {
    this.setState({ toast: {
      show: false,
      title: "",
      message: ""
    }});
  };

  handleChange = (attendeeNameList) => {
    let { attendeeIdList, attendees } = this.state;

    // Update state
    this.setState({ attendeeNameList: attendeeNameList });

    // Update attendeeNameList and attendees
    if (attendeeNameList.length == 0) {
      this.setState({
        attendees: [],
        attendeeNameList: []
      });
    } else {
      attendees = attendees.filter(attendee => !attendeeNameList.includes(attendee.name));
      attendeeIdList = attendees.map(attendee => attendee.userId);
 
      this.setState({ 
        attendees: attendees,
        attendeeIdList: attendeeIdList
      });
    }
  }
  
  handleOpenPopup = () => {
    this.setState({ showPopup: true });
  }

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
          message: "You added this user before."
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
  

  render () {
    const { name, location, calendarId, start, end, editable, error, loading, 
      attendeeNameList, toast, redirectToReferrer, calendars, showPopup } = this.state;

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
                  <div className="col-md-12">
                    <Form.Group className="mb-3">
                      <Form.Label>Guest</Form.Label>
                      <InputGroup>
                        <TagsInput
                          className="form-control pendings"
                          value={attendeeNameList}
                          onChange={this.handleChange}
                        />
                        <Button variant="outline-primary" onClick={this.handleOpenPopup}>
                          <FontAwesomeIcon icon={faPlus} />
                        </Button>
                      </InputGroup>
                    </Form.Group>
                  </div>
                </div>
              </div>
              <div className="card-footer text-end">
                {/* {error ? <ErrorList errors={error}/> : ''} */}
                <Button variant="primary" type="submit">Create new appointment</Button>
              </div>
            </Form>
          </>  
        )}
      </>
    );
  }
}

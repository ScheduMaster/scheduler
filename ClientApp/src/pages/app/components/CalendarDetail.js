import React, { Component } from "react";
import { withRouter, Redirect } from 'react-router-dom';
import { Form, Button, Toast } from 'react-bootstrap';
import { Progress } from "../../../components/Progress";
import { ErrorList } from "../../../components/ErrorList";
import { CalendarService } from "../../../services/CalendarService";

class CalendarDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      backgroundColor: '#000000',
      borderColor: '#000000',
      dragBackgroundColor: '#000000',
      loading: false,
      error: '',
      showToast: false,
      redirectToReferrer: false
    };
    this.calendarId = this.props.match.params.id;
    this.service = new CalendarService();
  }
  
  componentDidMount() {
    // Call getProfileData to fetch data
    this.getCalendarData(this.calendarId)
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

  async getCalendarData(calendarId) {
    // Make API call to retrieve user profile data
    const data = await this.service.getCalendar(calendarId);
    console.log(data);

    this.setState({
      name: data.name ?? this.state.name,
      backgroundColor: data.backgroundColor ?? this.state.backgroundColor,
      borderColor: data.borderColor ?? this.state.borderColor,
      dragBackgroundColor: data.dragBackgroundColor ?? this.state.dragBackgroundColor
    });
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
    const { name, backgroundColor, borderColor, dragBackgroundColor, loading, showToast, error, redirectToReferrer } = this.state;

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
          <Toast.Body>Calendar data successfully updated.</Toast.Body>
        </Toast>
        {!loading && (
          <Form className="card" onSubmit={this.handleFormSubmit}>
            <div className="card-body">
              <h3 className="card-title">Update Calendar</h3>
              <div className="row row-cards">
                <div className="col-md-12">
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
                    <Form.Label>Background Color</Form.Label>
                    <Form.Control
                      type="color"
                      placeholder="Background Color"
                      value={backgroundColor}
                      readOnly={true}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-4">
                  <Form.Group className="mb-3">
                    <Form.Label>Border Color</Form.Label>
                    <Form.Control
                      type="color"
                      placeholder="Border Color"
                      value={borderColor}
                      readOnly={true}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-4">
                  <Form.Group className="mb-3">
                    <Form.Label>Drag Background Color</Form.Label>
                    <Form.Control
                      type="color"
                      placeholder="Drag Background Color"
                      value={dragBackgroundColor}
                      readOnly={true}
                    />
                  </Form.Group>
                </div>
              </div>
            </div>
            <div className="card-footer text-end">
              {error ? <ErrorList errors={error}/> : ''}
              <Button variant="primary" type="submit">Delete calendar</Button>
            </div>
          </Form>
        )}
      </>
    );
  }
}

1
export default withRouter(CalendarDetail);
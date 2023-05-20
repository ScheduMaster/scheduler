import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button, Toast } from 'react-bootstrap';
import { Progress } from "../../../components/Progress";
import { ErrorList } from "../../../components/ErrorList";

// Services
import { CalendarService } from '../../../services/CalendarService';

export class CreateCalendarFrom extends Component {
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
    this.service = new CalendarService();
  }

  handleFormSubmit = async (event) => {
    // Make API call to update user profile data
    event.preventDefault();
    try {
      this.setState({ loading: true });
      const { name, backgroundColor, borderColor, dragBackgroundColor } = this.state;
      await this.service.createCalendar(name, backgroundColor, borderColor, dragBackgroundColor);

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
    const { name, backgroundColor, borderColor, dragBackgroundColor, error, loading, showToast, redirectToReferrer } = this.state;

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
          <Toast.Body>Calendar successfully created.</Toast.Body>
        </Toast>
        {!loading && (
          <Form className="card" onSubmit={this.handleFormSubmit}>
            <div className="card-body">
              <h3 className="card-title">Create Calendar</h3>
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
                      onChange={event => this.setState({ backgroundColor: event.target.value })}
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
                      onChange={event => this.setState({ borderColor: event.target.value })}
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
                      onChange={event => this.setState({ dragBackgroundColor: event.target.value })}
                    />
                  </Form.Group>
                </div>
              </div>
            </div>
            <div className="card-footer text-end">
              {error ? <ErrorList errors={error}/> : ''}
              <Button variant="primary" type="submit">Create new calendar</Button>
            </div>
          </Form>
        )}
      </>
    );
  }
}

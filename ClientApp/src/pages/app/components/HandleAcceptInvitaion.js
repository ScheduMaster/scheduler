import React, { Component } from "react";
import { withRouter, Redirect } from 'react-router-dom';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { Progress } from "../../../components/Progress";
import { ErrorList } from "../../../components/ErrorList";

// Services
import { InvitationService } from "../../../services/InvitationService";
import { AppointmentService } from "../../../services/AppointmentService";

class HandleAcceptInvitaion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accept: false,
      loading: false,
      inititor: '',
      start: '',
      end: '',
      name: '',
      message: '',
      error: '',
      appointmentId: '',
      showPopup: false,
      redirectToReferrer: false
    };
    this.invitationId = this.props.match.params.id;
    this.invitation = new InvitationService();
    this.appointment = new AppointmentService();
  }
  
  async componentDidMount() {
    try {
      this.checkInvitation().then(() => this.setState({ showPopup: true }));
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.accept !== this.state.accept) {
      setTimeout(() => {
        this.setState({ showPopup: false, redirectToReferrer: true });
      }, 2000); // 2 seconds timeout
    }
  }
  
  async checkUserInAppointment(appointmentId) {
    const data = await this.appointment.isInAppointment(appointmentId);
    if (data.isInAppointment || data.isInitiator) {
      await this.invitation.acceptInvitation(this.invitationId);
      window.location.href = `/app/appointment/view/${appointmentId}`;
    }
  }  

  async checkInvitation() {
    // Make API call to retrieve invitation data
    const { message, appointmentId, name, inititor, start, end } = this.state;

    // Check invitation and fetch data
    const data = await this.invitation.checkInvitation(this.invitationId);

    // Check if user is in attendance list -> redirect to view
    await this.checkUserInAppointment(data.appointmentId)

    this.setState({
      message: data.message ?? message,
      appointmentId: data.appointmentId ?? appointmentId,
      name: data.name ?? name,
      inititor: data.inititor ?? inititor,
      start: data.start ?? start,
      end: data.end ?? end
    });
  }

  handleAccept = async () => {
    const data = await this.invitation.acceptInvitation(this.invitationId);

    this.setState({
      message: data.message ?? this.state.message,
      accept: true
    });
  }

  render () {
    const { message, accept, appointmentId, loading, redirectToReferrer,
      name, inititor, start, end, error, showPopup } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={`/app/appointment/view/${appointmentId}`} />;
    }

    return (
      <>
        <Modal show={showPopup}>
          <Modal.Header closeButton>
            <Modal.Title>Accept Invitation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {loading ? (
              <Progress />
            ) : (
              <>
                <h5 style={{ textAlign: "center" }}>{message}</h5><hr/>
                <Form>
                  <Form.Group as={Row} controlId="name" className="mb-3">
                    <Form.Label column sm="2" className="bold-label">
                      <b>Name</b>
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control type="text" value={name} readOnly />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="inititor" className="mb-3">
                    <Form.Label column sm="2" className="bold-label">
                      <b>Initiator</b>
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control type="text" value={inititor} readOnly/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="start" className="mb-3">
                    <Form.Label column sm="2" className="bold-label">
                      <b>Start</b>
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control type="datetime-local" value={start} readOnly/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="end" className="mb-3">
                    <Form.Label column sm="2" className="bold-label">
                      <b>End</b>
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control type="datetime-local" value={end} readOnly/>
                    </Col>
                  </Form.Group>
                </Form>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            {
              error 
                ? <ErrorList errors={error}/>
                : !accept 
                  ? <Button variant="primary" onClick={this.handleAccept}>
                      Accept Invitation
                    </Button>
                  : <h6>Waiting for redirect</h6>
            }
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withRouter(HandleAcceptInvitaion);
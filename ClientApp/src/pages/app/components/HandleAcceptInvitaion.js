import React, { Component } from "react";
import { withRouter, Redirect } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';
import { Progress } from "../../../components/Progress";
import { ErrorList } from "../../../components/ErrorList";
import { InvitationService } from "../../../services/InvitationService";

class HandleAcceptInvitaion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accept: false,
      loading: false,
      message: '',
      error: '',
      appointmentId: '',
      showPopup: true,
      redirectToReferrer: false
    };
    this.invitationId = this.props.match.params.id;
    this.service = new InvitationService();
  }
  
  componentDidMount() {
    // Call getProfileData to fetch data
    this.checkInvitation()
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.accept !== this.state.accept) {
      setTimeout(() => {
        this.setState({ showPopup: false, redirectToReferrer: true });
      }, 2000); // 2 seconds timeout
    }
  }
  
  async checkInvitation() {
    // Make API call to retrieve invitation data
    const data = await this.service.checkInvitation(this.invitationId);
    console.log(data);

    this.setState({
      message: data.message ?? this.state.message,
      appointmentId: data.appointmentId ?? this.state.appointmentId,
    });
  }

  handleAccept = async () => {
    const data = await this.service.acceptInvitation(this.invitationId);
    console.log(data);

    this.setState({
      message: data.message ?? this.state.message,
      accept: true
    });
  }

  render () {
    const { message, accept, appointmentId, loading, 
      error, redirectToReferrer, showPopup } = this.state;

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
              <Form.Control
                type="text"
                value={message}
                readOnly={true}
              />
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
import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { InvitationService } from '../../../services/InvitationService';

export class PopupModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invitation: '',
      copied: false,
      loading: false,
      error: false,
    };
    this.service = new InvitationService();
  }

  componentDidMount() {
    if (this.props.showPopup) {
      this.fetchInvitation();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.showPopup && !prevProps.showPopup) {
      this.fetchInvitation();
    }
  }

  fetchInvitation() {
    const appointmentId = this.props.id;
    this.setState({ loading: true });
    this.service
      .getInvitation(appointmentId)
      .then((data) => {
        this.setState({
          invitation: data.invitation ?? this.state.invitation,
          loading: false,
        });
      })
      .catch((error) => {
        const message = JSON.parse(error.message).message;
        this.setState({ 
          invitation: message,
          loading: false,
          error: true
        });
      });
  }

  handleGenerate = () => {
    const appointmentId = this.props.id;
    this.setState({ loading: true });
    this.service
      .generateInvitation(appointmentId)
      .then((data) => {
        this.setState({
          invitation: data.invitation ?? this.state.invitation,
          loading: false,
          error: false
        });
      })
      .catch((error) => {
        const message = JSON.parse(error.message).message;
        this.setState({ 
          invitation: message,
          loading: false,
          error: true
        });
      });
  } 

  handleCopy = () => {
    this.setState({ copied: true });
  };

  handleClose = () => {
    this.setState({ invitation: '', copied: false });
    this.props.onClosePopup();
  };

  render() {
    const { invitation, copied, loading, error } = this.state;
    const { showPopup } = this.props;

    return (
      <Modal show={showPopup} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Invitation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Form.Control
              type="text"
              value={invitation}
              readOnly={true}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          {
            error 
              ? <Button variant="primary" onClick={this.handleGenerate}>
                  Generate invitation
                </Button>
              :
              <CopyToClipboard text={invitation} onCopy={this.handleCopy}>
                { 
                  <Button variant="primary">
                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                  </Button>
                }
              </CopyToClipboard>
          }
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


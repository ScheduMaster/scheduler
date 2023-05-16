import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button, Toast } from 'react-bootstrap';
import { Progress } from "../../../components/Progress";
import { ErrorList } from "../../../components/ErrorList";

// Services
import { UserService } from "../../../services/UserService";

export class CreateAccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      passWord: '',
      role: 'Client',
      loading: false,
      error: '',
      showToast: false,
      redirectToReferrer: false
    };
    this.service = new UserService();
  }

  handleFormSubmit = async (event) => {
    // Make API call to update user profile data
    event.preventDefault();
    try {
      this.setState({ loading: true });
      const { email, firstName, lastName, address, phoneNumber, passWord, role } = this.state;
      await this.service.createUser(firstName, lastName, email, passWord, role, address, phoneNumber);

      this.setState({ loading: false });
      this.setState({ showToast: true });
      this.setState({ redirectToReferrer: true });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  handleCloseToast = () => {
    this.setState({ showToast: false })
  };

  render () {
    const { firstName, lastName, email, address, error, phoneNumber, loading, showToast, role, passWord, redirectToReferrer } = this.state;

    // Display the progress component while loading
    if (loading) {
      return <Progress />;
    }

    if (redirectToReferrer) {
      return <Redirect to="/app/user/list" />;
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
          <Toast.Body>Account successfully created.</Toast.Body>
        </Toast>
        {!loading && (
          <Form className="card" onSubmit={this.handleFormSubmit}>
            <div className="card-body">
              <h3 className="card-title">Edit Profile</h3>
              <div className="row row-cards">
                <div className="col-sm-6 col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={event => this.setState({ firstName: event.target.value })}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-6 col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={event => this.setState({ lastName: event.target.value })}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-6 col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={event => this.setState({ email: event.target.value })}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-6 col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={event => this.setState({ phoneNumber: event.target.value })}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-6 col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                      value={role}
                      onChange={event => this.setState({ role: event.target.value })}
                    >
                      <option value="Admin">Admin</option>
                      <option value="Client">Client</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-sm-6 col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Phone Number"
                      value={passWord}
                      onChange={event => this.setState({ passWord: event.target.value })}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-12">
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Home Address"
                      value={address}
                      onChange={event => this.setState({ address: event.target.value })}
                    />
                  </Form.Group>
                </div>
              </div>
            </div>
            <div className="card-footer text-end">
              {error ? <ErrorList errors={error}/> : ''}
              <Button variant="primary" type="submit">Create account</Button>
            </div>
          </Form>
        )}
      </>
    );
  }
}

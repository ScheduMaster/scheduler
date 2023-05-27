import React from "react";
import { UpdateProfileForm } from "./UpdateProfileForm";
import { withRouter } from 'react-router-dom';
import { Form, Button, Toast } from 'react-bootstrap';
import { Progress } from "../../../components/Progress";
import { ErrorList } from "../../../components/ErrorList";

class ResetPasswordForm extends UpdateProfileForm {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      loading: false,
      error: '',
      showToast: false,
      redirectToReferrer: false,
      passWord: '',
    };
    this.userId = this.props.match.params.id;
  }

  componentDidMount() {
    // Call getProfileData to fetch data
    this.getUserData(this.userId)
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

  async getUserData(userId) {
    // Make API call to retrieve user profile data
    const data = await this.service.getUser(userId);
    console.log(data);

    this.setState({
      email: data.email ?? this.state.email,
      firstName: data.firstName ?? this.state.firstName,
      lastName: data.lastName ?? this.state.lastName,
      phoneNumber: data.phoneNumber ?? this.state.phoneNumber,
      role: data.role ?? this.state.role
    });
  }

  handleFormSubmit = async (event) => {
    // Make API call to update user password
    event.preventDefault();
    try {
      const { passWord } = this.state;

      if (passWord) {
        this.setState({ loading: true });
        await this.service.resetUserPassword(this.userId, passWord);
      }

      this.setState({ loading: false });
      this.setState({ showToast: true });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render () {
    const { firstName, lastName, email, phoneNumber, error, loading, showToast, passWord } = this.state;

    // Display the progress component while loading
    if (loading) {
      return <Progress />;
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
          <Toast.Body>New password successfully updated.</Toast.Body>
        </Toast>
        {!loading && (
          <Form className="card" onSubmit={this.handleFormSubmit}>
            <div className="card-body">
              <h3 className="card-title">Update Password</h3>
              <div className="row row-cards">
              <div className="col-sm-6 col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      readOnly={true}
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
                      readOnly={true}
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
                      readOnly={true}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-6 col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Phone Number"
                      autoComplete="off"
                      value={phoneNumber}
                      readOnly={true}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-6 col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      autoComplete="off"
                      placeholder="New password"
                      value={passWord}
                      required={true}
                      onChange={event => this.setState({ passWord: event.target.value })}
                    />
                  </Form.Group>
                </div>
              </div>
            </div>
            <div className="card-footer text-end">
              {error ? <ErrorList errors={error}/> : ''}
              <Button variant="primary" type="submit">Update user password</Button>
            </div>
          </Form>
        )}
      </>
    );
  }
}

export default withRouter(ResetPasswordForm);
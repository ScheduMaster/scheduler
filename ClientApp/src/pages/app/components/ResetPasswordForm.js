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
      loading: false,
      error: '',
      showToast: false,
      redirectToReferrer: false,
      passWord: '',
    };
    this.userId = this.props.match.params.id;
  }

  handleFormSubmit = async (event) => {
    // Make API call to update user password
    event.preventDefault();
    try {
      const { passWord } = this.state;

      if (passWord) {
        this.setState({ loading: true });
        await this.service.updateUserPassword(this.userId, passWord);
      }

      this.setState({ loading: false });
      this.setState({ showToast: true });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render () {
    const { error, loading, showToast, passWord } = this.state;

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
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Phone Number"
                      value={passWord}
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

1
export default withRouter(ResetPasswordForm);
import React, { Component } from "react";
import { PageHeader } from "../../components/PageHeader";
import { CreateAppointmentForm } from "../../components/CreateAppointmentForm";
import { SearchUserPopup } from "../../components/SearchUserPopup";

// Service
import { AppointmentService } from "../../../../services/AppointmentService";

export class CreateAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      showPopup: false,
      loading: true,
      entryId: '',
      error: '',
    };
    this.service = new AppointmentService();
  }

  onClosePopup = () => {
    this.setState({ showPopup: false });
  };

  render () {
    const { showPopup } = this.state;

    return (
      <>
        <SearchUserPopup showPopup={showPopup} onClosePopup={this.onClosePopup}/>
        <PageHeader preTitle="Appointment" title="Create new appointment"/>
        <div className="page-body">
          <div className="container-xl">
            <CreateAppointmentForm />
          </div>
        </div>
      </>
    )
  }
}
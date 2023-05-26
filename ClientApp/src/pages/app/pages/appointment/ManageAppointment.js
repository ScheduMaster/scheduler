import React, { Component } from "react";
import { PageHeader } from "../../components/PageHeader";
import { CrudDataTable } from "../../components/CrudDataTable";
import { Progress } from "../../../../components/Progress";
import { PopupModel } from "../../components/PopupModel";

// Services
import { AppointmentService } from "../../../../services/AppointmentService";


export class ManageAppointment extends Component {
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

  componentDidMount() {
    // Call getProfileData to fetch data
    this.getAppointmensData()
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
  
  async getAppointmensData() {
    // Make API call to retrieve users data
    const data = await this.service.getUpcommingAppointments();
    console.log(data);

    this.setState({
      entries: data ?? this.state.entries
    });
  };

  onClosePopup = () => {
    console.log("close");
    this.setState({ showPopup: false });
  }

  handleView = (id) => {
    window.location.href = `/app/appointment/view/${id}`;
  };

  handleUpdate = (id) => {
    window.location.href = `/app/appointment/update/${id}`;
  };

  handleInvitation = (id) => {
    this.setState({ showPopup: true, entryId: id });
  };

  render () {
    const { entries, loading, showPopup, entryId } = this.state;

    // Display the progress component while loading
    if (loading) {
      return <Progress />;
    }

    return (
      <>
        <PopupModel showPopup={showPopup} id={entryId} onClosePopup={this.onClosePopup}/>
        <PageHeader preTitle="Upcoming appointments" title="Scheduler"/>
        <div className="page-body">
          <div className="container-xl">
            <CrudDataTable 
              entries={entries}
              onView={this.handleView}
              onUpdate={this.handleUpdate}
              onAnother={this.handleInvitation}
            />
          </div>
        </div>
      </>
    )
  }
}
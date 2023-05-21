import React, { Component } from "react";
import { PageHeader } from "../../components/PageHeader";
import { DataTable } from "../../components/DataTable";
import { Progress } from "../../../../components/Progress";

// Services
import { AppointmentService } from "../../../../services/AppointmentService";

export class Scheduler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      loading: true,
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
    const data = await this.service.getAppointments();
    console.log(data);

    this.setState({
      entries: data ?? this.state.entries
    });
  }

  render () {
    const { entries, loading } = this.state;

    const actions = [
      {
        href: '/app/appointment/update',
        name: 'Update appointment'
      },
      {
        href: '/app/appointment/view',
        name: 'View appointment'
      }
    ];

    // Display the progress component while loading
    if (loading) {
      return <Progress />;
    }

    return (
      <>
        <PageHeader preTitle="Upcoming appointments" title="Scheduler"/>
        <div className="page-body">
          <div className="container-xl">
            <DataTable entries={entries} actions={actions}/>
          </div>
        </div>
      </>
    )
  }
}
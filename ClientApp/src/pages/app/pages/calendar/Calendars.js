import React, { Component } from "react";
import { PageHeader } from "../../components/PageHeader";
import { DataTable } from "../../components/DataTable";
import { Progress } from "../../../../components/Progress";

// Services
import { CalendarService } from "../../../../services/CalendarService";

export class Calendars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendars: [],
      loading: true,
      error: '',
    };
    this.service = new CalendarService();
  }

  componentDidMount() {
    // Call getProfileData to fetch data
    this.getUsersData()
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
  
  async getUsersData() {
    // Make API call to retrieve users data
    const data = await this.service.getCalendars();
    console.log(data);

    this.setState({
      calendars: data ?? this.state.calendars
    });
  }

    render () {
      const { calendars, loading } = this.state;
      const actions = [
        {
          href: '/app/calendar/update',
          name: 'Update calendar'
        },
        {
          href: '/app/calendar/view',
          name: 'View calendar'
        }
      ]

      // Display the progress component while loading
      if (loading) {
        return <Progress />;
      }

      return (
        <>
          <PageHeader preTitle="User management" title="Users"/>
          <div className="page-body">
            <div className="container-xl">
              <DataTable entries={calendars} actions={actions} color={true}/>
            </div>
          </div>
        </>
      )
    }
}
import React, { Component } from "react";
import { PageHeader } from "./components/PageHeader";
import { DataTable } from "./components/DataTable";
import { Progress } from "../../components/Progress";

// Services
import { UserService } from "../../services/UserService";

// Static data
import { actions } from "./data/calendar";

export class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      error: '',
    };
    this.service = new UserService();
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
    const data = await this.service.getUsers();
    console.log(data);

    this.setState({
      users: data ?? this.state.users
    });
  }

    render () {
      const { users, loading } = this.state;

      // Display the progress component while loading
      if (loading) {
        return <Progress />;
      }

      return (
        <>
          <PageHeader preTitle="User management" title="Users"/>
          <div className="page-body">
            <div className="container-xl">
              <DataTable entries={users} actions={actions}/>
            </div>
          </div>
        </>
      )
    }
}
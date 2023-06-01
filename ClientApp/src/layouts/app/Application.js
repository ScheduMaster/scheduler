import React, { Component } from "react";

// Components
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Narbar";

// Services
import { UserService } from "../../services/UserService";
import { NotificationService } from "../../services/NotificationService";

// Styles
import '@tabler/core/dist/css/tabler.min.css';

// Data Header
import { shortcutsData } from "./data/shortcut";
// import { notificationsData } from "./data/notification";
import { logo } from "./data/logo";

// Data Navbar
import { navbarsData } from "./data/navbar";

// Data footer
import { footersData } from "./data/footer";

export class Application extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      avatar: {
        role: "Loading...", 
        name: "Loading..."
      },
      notifications: [],
      loading: false 
    };
    this.user = new UserService();
    this.notification = new NotificationService();
  }
  
  async componentDidMount() {
    this.setState({ loading: true });

    try {
      await this.getAvatarData();
      await this.getNotification();
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  }
  
  async getAvatarData() {
    const data = await this.user.getInfo();
    this.setState({ avatar: data });
  }
  
  async getNotification() {
    const data = await this.notification.getNotification();
    console.log(data);
    this.setState({ notifications: data });
  }
  

  render () {
    const { children } = this.props;
    const { notifications, avatar } = this.state;

    return (
      <> 
        <Header 
          shortcutsData={shortcutsData} 
          notificationsData={notifications}
          logo={logo}
          avatar={avatar}
        />
        <Navbar navbarsData={navbarsData}/>
        <div className="page-wrapper">
          {children}
          <Footer footersData={footersData}/>
        </div>
      </>
    ) 
  }
}
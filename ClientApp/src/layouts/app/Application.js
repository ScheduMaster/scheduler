import React, { Component } from "react";

// Components
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Narbar";

// Services
import { UserService } from "./services/UserService";

// Styles
import '@tabler/core/dist/css/tabler.min.css';

// Data Header
import { shortcutsData } from "./data/shortcut";
import { notificationsData } from "./data/notification";
import { logo } from "./data/logo";
import { avatar } from "./data/avatar";

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
            loading: true 
        };
        this.service = new UserService();
    }
    
    componentDidMount() {
        this.getAvatarData();
    }

    async getAvatarData() {
        const data = await this.service.getInfo();
        console.log(data);
        this.setState({ avatar: data, loading: false });
    }

    render () {
        const { children } = this.props;
        
        return (
            <> 
                <Header 
                    shortcutsData={shortcutsData} 
                    notificationsData={notificationsData}
                    logo={logo}
                    avatar={this.state.avatar}
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
import React, { Component } from "react";

// Components
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Narbar";

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
    render () {
        const { children } = this.props;
        
        return (
            <>
                <Header 
                    shortcutsData={shortcutsData} 
                    notificationsData={notificationsData}
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
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import "./MainNavigation.css";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import BackDrop from '../UIElements/Backdrop';


const MainNavigation = (props) => {
    
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const toogleDrawer = event =>{
        event.preventDefault();
        
        setDrawerIsOpen(!drawerIsOpen);
    }

    return (
        <React.Fragment>
            {
                drawerIsOpen && <BackDrop onClick = {toogleDrawer} />
            }

            <SideDrawer show = {drawerIsOpen} onClick = {toogleDrawer}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>
            
            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={toogleDrawer}>
                    <span />
                    <span />
                    <span />
                </button>

                <h1 className="main-navigation__title">
                    <Link to="/">Look A Location</Link>
                </h1>

                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>

        </React.Fragment>
    );
    
};

export default MainNavigation;

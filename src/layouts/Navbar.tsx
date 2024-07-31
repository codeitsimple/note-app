import React from "react";
import { Container, Menu } from "semantic-ui-react";
import { observer } from "mobx-react";
import { NotesStore } from "../api/NotesStore";

interface props {
    store: NotesStore
  };
const NavBar = observer(({store}: props ) => {
    return (
        <div className="navbar-container">
        <Menu inverted fixed="top">
            <Container >
                <Menu.Item header>
                    <img src="../logo512.png" alt="logo" style={{marginRight: '10px'}}/>
                    My Notes app
                </Menu.Item>
                <Menu.Item name="Notes"/>
                {
                    
                }
            </Container>
        </Menu>
        </div>
    )
});

export default NavBar;
import React from "react";
import NotesList from "../features/NotesList/NotesList";
import { Container, Grid, GridColumn, GridRow } from "semantic-ui-react";
import Folders from "../features/Folders/Folders";
import NoteForm from "../features/CreateNote/NoteForm";
import { noteStore } from "../api/NotesStore";
import NavBar from "./Navbar";

const Dashboard  = () => {
    
    return(
        <div className="notesContainer">
        <NavBar store={noteStore}></NavBar>
        <Container fluid>
            <Grid stackable columns={3} divided>
                <GridRow>
                    <GridColumn  width={4} >
                        <Folders/>
                    </GridColumn>
                    <GridColumn width={12}>
                            <Grid stackable columns={2} >
                            <GridRow>
                                <GridColumn width={8}>
                                    <NotesList/>
                                </GridColumn>
                                <GridColumn width={7}>
                                    <NoteForm store={noteStore}/>
                                </GridColumn>
                            </GridRow>
                        </Grid>    
                    </GridColumn>
                </GridRow>
            </Grid>
        </Container>
        </div>
    );
};
export default Dashboard; 
import React from "react";
import "./NotesList.css";

import {
    FeedEvent,
    CardHeader,
    CardContent,
    Card,
    Feed,
    Container,
    Button,
    FeedSummary,
    FeedContent,
    FeedDate,
    FeedExtra,
    Segment,
    Loader,
    Image
} from "semantic-ui-react";
import { NotesStore, noteStore } from "../../api/NotesStore";
import { Note } from "../../model/notesModel";
import { observer } from "mobx-react";
interface props {
    store: NotesStore
};
const NotesList  = observer(({store}: props) => {

    return (
        <Container fluid id="note-list-container">
            <Card  fluid >
                <CardContent>
                <CardHeader>Recent Notes {  } </CardHeader>
                </CardContent>
                
                <CardContent>
                {
                    store.loading && <Segment>
                        <Loader disabled />
                        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    </Segment>
                }
                        <Feed>
                            {
                                noteStore.notesList.map( (note: Note) => 
                                    <FeedEvent icon='sticky note' key={note.id}>
                                        <FeedContent>
                                            <FeedSummary>
                                            {note.title}
                                            <FeedDate>3 days ago</FeedDate>
                                            </FeedSummary>
                                            <FeedExtra text>
                                            <div  className={note.weight + "-note " + note.align + "-note note-container" } >{note.description} </div>
                                            </FeedExtra>
                                        </FeedContent>
                                        <Button type="button" icon="pencil" circular={true} onClick={ () => noteStore.setEditing(note) } 
                                                        active={note.id === noteStore.selectedNote.id}></Button>
                                    </FeedEvent>
                                )
                            }
                        </Feed>
                        
                </CardContent>
            </Card>
        </Container>
    );

});

export default NotesList;
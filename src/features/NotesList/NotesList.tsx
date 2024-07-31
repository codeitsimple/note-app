import React from "react";

import {
    FeedEvent,
    CardHeader,
    CardContent,
    Card,
    Feed,
    Container,
    Button
} from "semantic-ui-react";
import { noteStore } from "../../api/NotesStore";
import { Note } from "../../model/notesModel";
import { observer } from "mobx-react";

const NotesList  = observer(() => {

    return (
        <Container fluid>
            <Card  fluid >
                <CardContent>
                <CardHeader>Recent Notes {  } </CardHeader>
                </CardContent>
                <CardContent>
                    <Feed>
                        {
                            noteStore.notesList.map( (note: Note) => 
                                <FeedEvent
                                    icon='sticky note'
                                    date={note.title}
                                    summary={note.description} key={note.id}
                                    >
                                        
                                        <Button type="button" icon="pencil" circular={true} onClick={ () => noteStore.setEditing(note) }></Button>

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
import React, { ChangeEvent, useState } from "react";
import { Button, ButtonGroup, Card, CardContent, CardHeader, Container, Form, FormField } from "semantic-ui-react";
import { Note } from "../../model/notesModel";
import { observer } from "mobx-react";
import { NotesStore } from "../../api/NotesStore";

interface props {
  store: NotesStore
};

const NoteForm = observer( ({store}: props ) => {

  const initialState: Note  =  {
    id: '', 
    title: '',
    description: '',
    date: '',
  }; 

  const [note, setNote ]  =  useState(initialState);
  const [submitting, setSubmitFlag] = useState(false);

  function handleInputChange(event: ChangeEvent<HTMLInputElement| HTMLTextAreaElement>){
    const {name, value} =  event.target;
    setNote({...note, [name]: value});
  };

  function handleSubmit (){
    createOrEdit();
  }

  function createOrEdit (){
    setSubmitFlag(true);
    store.createNote(note);
    setNote(initialState);
    setSubmitFlag(false);
  }

  function closeForm(){
    setNote(initialState);
    setSubmitFlag(false);
  }

  return (
    <Container fluid>
    <Card fluid  >
      <CardContent>
        <CardHeader>Add Note</CardHeader>
      </CardContent>
      <CardContent>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <FormField>
          <label>Title</label>
          <Form.Input  placeholder='Title' value={note.title}  name='title' onChange={handleInputChange} required={true}/>
        </FormField>
        <FormField>
          <label>Detail</label>
          <div>
            <ButtonGroup
              buttons={[
                { key: 'align left active', icon: 'align left '},
                { key: 'align center', icon: 'align center' },
                { key: 'align right', icon: 'align right' },
                { key: 'align justify', icon: 'align justify' },
              ]}
            />{' '}
            <ButtonGroup
              buttons={[
                { key: 'bold', icon: 'bold' },
                { key: 'underline', icon: 'underline' },
                { key: 'text width', icon: 'text width' },
              ]}
            />
          </div>
          <Form.TextArea placeholder='Description' value={note.description}  name='description' onChange={handleInputChange} required={true}/>

          <Button loading={submitting}  floated="right" positive type="submit" content='Submit' onClick={ () => createOrEdit}/>
          <Button  floated="right" type="button" content='Cancel' onClick={closeForm}/>

          
        </FormField>
      </Form>
      </CardContent>
    </Card>
    </Container>
  );
});

export default NoteForm; 

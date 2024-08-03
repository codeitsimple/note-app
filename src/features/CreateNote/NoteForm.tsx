import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, ButtonGroup, Card, CardContent, CardHeader, Container, Form, FormField } from "semantic-ui-react";
import { Note } from "../../model/notesModel";
import { observer } from "mobx-react";
import { NotesStore } from "../../api/NotesStore";

interface props {
  store: NotesStore,
  editing: boolean
};

const NoteForm = observer( ({store, editing}: props ) => {

  const initialState: Note  =  {
    id: '', 
    title: '',
    description: '',
    date: '',
    weight: '',
    align: ''
  }; 

  

  const [note, setNote ]  =  useState(initialState);

  useEffect(()=>{
    setNote(store.selectedNote);  
    
  },[store.selectedNote]);
  useEffect( () => {
    setAlign( note.align);
    setWeight(note.weight);

  },[note]);
  
  const [submitting, setSubmitFlag] = useState(false);
  const [align, setAlign ] = useState( note.align);
  const [weight, setWeight ] = useState(note.weight);


  function handleInputChange(event: ChangeEvent<HTMLInputElement| HTMLTextAreaElement>){
    const {name, value} =  event.target;
    setNote({...note, [name]: value});
  };

  function createOrEdit (){
    if(!note.title || !note.description){
      return; 
    }
    setSubmitFlag(true);
    store.createNote(note);
    setNote(initialState);
    setSubmitFlag(false);
    
  }

  function closeForm(){
    setNote(initialState);
    setSubmitFlag(false);
    store.setEditing(initialState);
  }

  const handleAlignClick = function(property: string){
    setAlign(property);
    note.align = property; 
  };
  const handleWeightClick = function(property: string){

    setWeight(property);
    note.weight =  property; 
  };
  
  return (
    <Container fluid>
    <Card fluid  >
      <CardContent>
        <CardHeader>{ note.id?'Update Note':'Add Note' }</CardHeader>
      </CardContent>
      <CardContent>
      <Form autoComplete='off' >
        <FormField>
          <label>Title</label>
          <Form.Input  placeholder='Title' value={note.title}  name='title' onChange={handleInputChange} required={true}/>
        </FormField>
        <FormField>
          <label>Detail</label>
          <div>
            <ButtonGroup 
              buttons={[
                { key: 'align left active', icon: 'align left'  , onClick: () => handleAlignClick('left') , active: (align === 'left') },
                { key: 'align center', icon: 'align center' , onClick: () => handleAlignClick('center') , active: (align === 'center') },
                { key: 'align right', icon: 'align right' , onClick: () => handleAlignClick('right') , active: (align === 'right') },
                { key: 'align justify', icon: 'align justify' , onClick: () => handleAlignClick('justify') , active: (align === 'justify')},
              ]}
            />{' '}
            <ButtonGroup
              buttons={[
                { key: 'bold', icon: 'bold' , onClick: () => handleWeightClick('bold') , active: (weight === 'bold') },
                { key: 'text width', icon: 'italic', onClick: () => handleWeightClick('italic') , active: (weight === 'italic')  },
                { key: 'underline', icon: 'underline', onClick: () => handleWeightClick('underline')   , active: (weight === 'underline')}
                
              ]}
              />
          </div>
          <Form.TextArea placeholder='Description' value={note.description}  name='description' onChange={handleInputChange} required={true}/>

          <Button loading={submitting}  floated="right" positive type="submit" content='Submit' onClick={ () => createOrEdit()}/>
          <Button  floated="right" type="button" content='Cancel' onClick={closeForm}/>

          
        </FormField>
      </Form>
      </CardContent>
    </Card>
    </Container>
  );
});

export default NoteForm; 

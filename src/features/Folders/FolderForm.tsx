import { observer } from "mobx-react"
import { ChangeEvent, useState } from "react";
import { Button, Form, FormField } from "semantic-ui-react";
import { Folder } from "../../model/notesModel";
import { NotesStore } from "../../api/NotesStore";

const initialState: Folder =  {
    id:'',
    name: ''
}; 

interface props{
  openOrCloseForm: any,
  store: NotesStore
}
const FolderForm = observer( ({openOrCloseForm, store}: props) => {


  const [folder, setFolder]  = useState(initialState);
  function handleSubmit (){
      createOrEdit();
  }
    
  function createOrEdit (){

    store.createFolder(folder);
      //setSubmitFlag(true);
      openOrCloseForm();
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement| HTMLTextAreaElement>){
      const {name, value} =  event.target;
      setFolder({...folder, [name]: value});
  };

  function closeForm(){
    openOrCloseForm();
  }

  return (
      <Form onSubmit={handleSubmit} autoComplete='off'>
          <FormField>
              <label>Folder Name</label>
              <Form.Input  placeholder='Name'  name='name' onChange={handleInputChange} required={true}/>
              <Button  floated="right" positive type="submit" content='Submit' onClick={ () => createOrEdit}/>
              <Button  floated="right" type="button" content='Cancel' onClick={closeForm}/>
          </FormField>

      </Form>
)});

export default FolderForm;
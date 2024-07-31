import { observer } from "mobx-react"
import { ChangeEvent, useState } from "react";
import { Button, Form, FormField } from "semantic-ui-react";
import { Folder } from "../../model/notesModel";
import { noteStore } from "../../api/NotesStore";

const initialState: Folder =  {
    id:'',
    name: ''
}; 

interface props{
  openOrCloseForm: any
}
const FolderForm = observer( ({openOrCloseForm}: props) => {


  const [folder, setFolder]  = useState(initialState);
  function handleSubmit (){
      createOrEdit();
  }
    
  function createOrEdit (){

      noteStore.createFolder(folder);
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
              <Form.Input  placeholder='Name'  name='name' onChange={handleInputChange}/>
              <Button  floated="right" positive type="submit" content='Submit' onClick={ () => createOrEdit}/>
              <Button  floated="right" type="button" content='Cancel' onClick={closeForm}/>
          </FormField>

      </Form>
)});

export default FolderForm;
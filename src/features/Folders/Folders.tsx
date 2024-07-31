import React, { ChangeEvent, useState } from "react";
import { 
    CardHeader,
    CardContent,
    Card,
    ListList,
    ListItem,
    ListIcon,
    ListHeader,
    ListDescription,
    ListContent,
    List,
    Container,
    Button,
} from "semantic-ui-react";
import { observer } from "mobx-react";
import FolderForm from "./FolderForm";
import { noteStore } from "../../api/NotesStore";


const Folders  =  observer(() => {

    const [newfolderFlag, setNewFolderFlag] =  useState(false);
    const openOrCloseForm = () => {
        setNewFolderFlag(!newfolderFlag);
    };
    
    return (
        <Container>
            <Card fluid >
                <CardContent>
                <CardHeader>Folders</CardHeader>
                </CardContent>
                <CardContent>
                <List>
                    <ListItem>
                        <ListIcon name='folder' />
                        <ListContent>
                            <ListHeader>All Folders</ListHeader>
                            <ListDescription>Organise your notes</ListDescription>
                            <ListList>

                                {
                                   noteStore.folderList.map( (folder) =>  
                                    <ListItem as={ noteStore.selectedFolder === folder.id? '':'a'}  key={folder.id} onClick={() => noteStore.setSelectedFolder(folder.id)}>
                                        <ListIcon name='folder' />
                                        <ListContent>
                                        <ListHeader>{folder.name}</ListHeader>
                                        </ListContent>
                                    </ListItem>
                                    
                                   )

                                }
                            </ListList>
                        </ListContent>
                        </ListItem>
                    </List>
                    
                </CardContent>
            </Card>
            <Button type="button" icon="plus" onClick={openOrCloseForm} ></Button>
            {
                newfolderFlag &&  <FolderForm openOrCloseForm={openOrCloseForm} />
            }
        </Container>
    );

});

export default Folders;
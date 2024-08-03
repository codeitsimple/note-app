import React, { useState } from "react";
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
    Segment,
    Loader,
    Image,
} from "semantic-ui-react";
import { observer } from "mobx-react";
import FolderForm from "./FolderForm";
import { NotesStore } from "../../api/NotesStore";

interface props {
    store: NotesStore
};
const Folders  =  observer( ({store}: props ) => {

    const [newfolderFlag, setNewFolderFlag] =  useState(false);
    const openOrCloseForm = () => {
        setNewFolderFlag(!newfolderFlag);
    };
    
    return (
        <>
        
        <Container>
            <Card fluid >
                <CardContent>
                <CardHeader>Folders</CardHeader>
                </CardContent>
                <CardContent>
                {
                store.loading && <Segment>
                        <Loader disabled />
                        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    </Segment>
                }
                {
                !store.loading && <List>
                    <ListItem>
                        <ListIcon name='folder' />
                        <ListContent>
                            <ListHeader>All Folders</ListHeader>
                            <ListDescription>Organise your notes</ListDescription>
                            <ListList>

                                {
                                   store.folderList.map( (folder) =>  
                                    <ListItem as={ store.selectedFolder === folder.id? '':'a'}  key={folder.id} onClick={() => store.setSelectedFolder(folder.id)}>
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
                    }
                    
                </CardContent>
            </Card>
            <Button type="button" icon="plus" onClick={openOrCloseForm} ></Button>
            {
                newfolderFlag &&  <FolderForm store={store} openOrCloseForm={openOrCloseForm} />
            }
        </Container>
        </>
    );

});

export default Folders;
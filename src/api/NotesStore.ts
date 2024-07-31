import { action, autorun, computed, makeObservable, observable } from "mobx";
import { Folder, Note, User } from "../model/notesModel";
import { db } from "./firebaseConfig";
import Cookies from 'js-cookie';


import {collection,
    getDocs,
    addDoc,
    doc,
    query,
    where,
    setDoc,
    orderBy
    } from "firebase/firestore";

export class NotesStore  {

    notes: any[] = [];
    folders:any[] = [];
    selectedFolder = 'default';
    selectedFolderName = 'Default';
    currentUser = '';
    selectedNote: Note = {
        date:'',
        description: '',
        id: '',
        title:''
    };
    editing: boolean = false; 
    disposer1;
    constructor() {
        console.log('Store init ..');
        makeObservable(this, {
            setCurrentUserSession: action, 

            notes: observable,
            notesList: computed,
            createNote: action,
            getNotes: action,
            resetData: action,
            setEditing: action,
            selectedNote: observable,
            editing: observable,
            isEditing: computed,

            folders: observable,
            selectedFolder: observable,
            setSelectedFolder: action,
            selectedFolderName: observable,

            createFolder: action,
            getFolders: action,
            folderList: computed

        });
        this.getCurrentUser();
        this.disposer1 = autorun(() => {
            this.getFolders();
            this.getNotes();
            
            
        });
        
    }

    public async setCurrentUserSession(user: User){

        const userCollectionRef =  collection(db,'accounts');
        const q = query(userCollectionRef, where("id", "==", user.id));

        const querySnapshot = await getDocs(q);

        this.currentUser = user.id; 

        if(querySnapshot.size === 0 ){
            await setDoc( doc(db,'accounts', user.id), user);
        }

        // Create default folder for the user 
        const folderRef =  collection(db, `accounts/${this.currentUser}/folders`);
        const fq = query(folderRef, where("name", "==", "default"));

        const folderDocs  = await getDocs(fq);
        if(folderDocs.size === 0 ){
            await setDoc( doc(db, `accounts/${this.currentUser}/folders`, 'default' ), {name:'default'});
        }

        this.setCurrentUserCookie(user.id);

        this.getFolders();
        this.getNotes();
    }

    dispose(){
        this.disposer1();
    }

    get notesList (){
        return this.notes;
    }
    setCurrentUserCookie(nuid: string) {
        Cookies.set('nuid', nuid,  { expires: 7 });
    }

    getCurrentUser(){
        return this.currentUser = Cookies.get('nuid') || '';
    }


    public createNote(note: Note){
        const notesColletionRef =  collection(db,`accounts/${this.currentUser}/folders/${this.selectedFolder}/notes`);
        addDoc(notesColletionRef, note);
        this.getNotes();
    }

    public setEditing(note:Note){
        this.editing =  true;
        this.selectedNote =  note; 
    }

    get isEditing(){
        return this.editing;
    }

    public async getNotes(){
        if(!this.currentUser)  return; 

        const notesColletionRef =  collection(db,`accounts/${this.currentUser}/folders/${this.selectedFolder}/notes`);
        const data = (await getDocs(notesColletionRef));
        this.notes =  data.docs.map( (doc: any) => {
            return {...doc.data(),id: doc.id};
        });
    }
    public setSelectedFolder(folder: string) {
        this.selectedFolder =  folder; 
        this.getNotes();
    };
    public async createFolder(folder:Folder){
        const folderCollectionRef =  collection(db,`accounts/${this.currentUser}/folders`);
        const folderref = await addDoc(folderCollectionRef, folder);
        this.selectedFolder = folderref.id;

        this.getFolders();
        this.getNotes();

    }

    public async getFolders(){
        if(!this.currentUser)  return; 
        const folderCollectionRef =  collection(db,`accounts/${this.currentUser}/folders`);
        const q =  query(folderCollectionRef,orderBy("name", "asc"));
        const data = (await getDocs(q));

        this.folders =  data.docs.map( (doc: any) => {
            return {...doc.data(),id: doc.id};
        });
    }
    
    public resetData(){
        this.notes = [];
        this.folders = [];
    }

    get folderList(){
        return this.folders;
    }
}

export const noteStore  = new NotesStore() ;
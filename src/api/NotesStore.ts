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
    orderBy,
    updateDoc
    } from "firebase/firestore";

export class NotesStore  {

    loading: boolean =  false;
    notes: any[] = [];
    folders:any[] = [];
    selectedFolder = 'default';
    currentUser = '';
    selectedNote: Note = {
        date:'',
        description: '',
        id: '',
        title:'',
        align:'',
        weight:''
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

            folders: observable,
            selectedFolder: observable,
            setSelectedFolder: action,

            createFolder: action,
            getFolders: action,
            folderList: computed,
            loading: observable

        });
        this.getCurrentUser();
        this.disposer1 = autorun(() => {
            this.getFolders();
            this.getNotes();
            
            
        });
        
    }

    public async setCurrentUserSession(user: User){

        this.setCurrentUserCookie(user.id);

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
        this.currentUser = Cookies.get('nuid') || '';
        return this.currentUser;
    }

    get isUserAuthenticated (){
        const user  =  Cookies.get('nuid') || '';
        return user ?true: false; 
    }


    public createNote(note: Note){
        const notesColletionRef =  collection(db,`accounts/${this.currentUser}/folders/${this.selectedFolder}/notes`);
        if(note.id)
        {
            const documentReference  = doc(db, `accounts/${this.currentUser}/folders/${this.selectedFolder}/notes/${note.id}`);
            updateDoc(documentReference, note);

        }else{
            addDoc(notesColletionRef, note);
        }
        
        
        this.getNotes();
    }

    public setEditing(note:Note){
        this.editing =  true;
        this.selectedNote = Object.assign({}, note); 
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
        this.selectedNote = {
            date:'',
            description: '',
            id: '',
            title:'',
            align:'',
            weight:''
        };
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
        this.loading = true ;
        const folderCollectionRef =  collection(db,`accounts/${this.currentUser}/folders`);
        const q =  query(folderCollectionRef,orderBy("name", "asc"));
        const data = (await getDocs(q));

        this.folders =  data.docs.map( (doc: any) => {
            return {...doc.data(),id: doc.id};
        });
        this.loading = false;
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
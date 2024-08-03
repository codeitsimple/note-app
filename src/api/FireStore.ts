import { Note } from "../model/notesModel";
import { db } from "./firebaseConfig";

import {collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    } from "firebase/firestore";

    const usersCollectionRef = collection(db, "users");

export const NotesApi = {
    create: async (note: Note, user: string ) => { 

        await addDoc(usersCollectionRef,note)
    },
    list: async (user: string ) => {
        await getDocs(usersCollectionRef)
    } ,
    delete: async (id: string, collectionName: string ) => {
        const docObject = doc(db, collectionName, id);
        await deleteDoc(docObject);
    },
    update: async () => {
    }
};

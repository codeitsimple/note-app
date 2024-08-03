import React from 'react'
import {Navigate, useLocation} from "react-router-dom"
import { noteStore } from '../api/NotesStore';
import { observer } from 'mobx-react';

const ProtectedRoute = observer(({children}: any) => {
        
    let location = useLocation();

    if(!noteStore.isUserAuthenticated) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
    return children

});

export default ProtectedRoute;
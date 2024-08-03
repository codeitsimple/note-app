import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../api/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { noteStore } from '../api/NotesStore';
import Cookies from 'js-cookie';



const LoginForm = observer(() => {

    const initialState =  {
        email: '',
        password: ''
    };
    const navigate = useNavigate();
    const [user, setUser]  = useState(initialState);
    useEffect( () => {
        Cookies.remove('nuid');
        noteStore.resetData();

    },[]);

    const doLogin = () => {
        
        signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential:any) => {
            // Signed in
            const user = userCredential.user;
            noteStore.setCurrentUserSession(
                    {
                        id: user.uid, 
                        displayName: user.displayName || ''
                    }
                );

            
        }).then( ()=>{
            navigate("/home");
        })
        .catch((error:any) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    };
    
    const handleInputChange = (event: ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
        const {name, value} =  event.target;
        setUser({...user, [name]: value});
    };
    

    return (
        
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
            <img src="../logo512.png" alt="logo" style={{marginRight: '10px'}}/> Log-in to your account
            </Header>
            <Form size='large' onSubmit={doLogin} autoComplete='off'>
                <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' name="email"  placeholder='E-mail address' onChange={handleInputChange} />
                <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password' onChange={handleInputChange}
                    name="password"
                />

                <Button color='teal' fluid size='large' onClick={doLogin}>
                    Login
                </Button>
                </Segment>
            </Form>
            <Message>
                New to us? <a href='#'>Sign Up</a>
            </Message>
            </Grid.Column>
        </Grid>)  ;
});

export default LoginForm
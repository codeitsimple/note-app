import './App.css';
import { Container } from 'semantic-ui-react';
import Dashboard from './layouts/Dashboard';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import LoginForm from './layouts/Login';
import ProtectedRoute from './layouts/ProtectedRoute';


function App() {

  return (
    <Router>
      <Container>
        <section>                              
            <Routes>                                                                        
              <Route path="/" element={<LoginForm/>}/>
              <Route path="/login" element={<LoginForm/>}/>
              <Route path="/home" element={
                 <ProtectedRoute >
                  <Dashboard/>
                 </ProtectedRoute> } />
            </Routes>                    
        </section>
      </Container>
    </Router>
  );
}

export default App;

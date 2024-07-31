import './App.css';
import { Container } from 'semantic-ui-react';
import Dashboard from './layouts/Dashboard';
import NavBar from './layouts/Navbar';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import LoginForm from './layouts/Login';

function App() {
  return (

    <Router>
      <Container>
        <section>                              
            <Routes>                                                                        
              <Route path="/" element={<LoginForm/>}/>
              <Route path="/home" element={<Dashboard/>}/>
            </Routes>                    
        </section>
      </Container>
    </Router>


      // <>
      // 
      // <Container>
      //   <Dashboard/>
      // </Container>
      // </>    
  );
}

export default App;

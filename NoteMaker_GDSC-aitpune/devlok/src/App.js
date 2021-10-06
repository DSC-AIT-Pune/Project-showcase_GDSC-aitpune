import './App.css';
import React,{useState} from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Lobby from './components/Lobby';
import Notes from './components/Notes';
import Resources from './components/Resources';
import { BrowserRouter as Router , Switch, Route  } from 'react-router-dom';
import SignIn from './components/signIn';
import LogIn from './components/login';

function App() {
  const [token, setToken] = useState({
    flag:""
  });
  return (
      <Router>
          <div className="main">
          
 
                  <Navbar setToken={setToken} flag={token.flag}/>
                  <Switch>
                  <Route   exact path='/' ><Dashboard/></Route>
                  <Route   exact path='/notes'><Notes/></Route>
                  <Route   exact path='/Lobby'><Lobby/></Route>
                  <Route   exact path='/Resources'><Resources/></Route>
                  <Route   exact path='/signIn'><SignIn/></Route>
                  <Route   exact path='/logIn' setToken={token,setToken}><LogIn/></Route>
                      
                    
                  </Switch>
          </div>
      </Router>
        
   
  );
}
//mukesh
export default App;

import Navbar from './components/Navbar'
import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/Signin'
import MyList from './components/screens/MyList'
import Signup from './components/screens/Signup'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/signin'>
          <Signin />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/mylist'>
          <MyList />
        </Route>
      </BrowserRouter>
      
    </div>
  );
}

export default App;

import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import CreateActivity from './components/CreateActivity';
import Details from './components/Details';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path='/' element={<LandingPage />}/>
        <Route  path='/home' element={<Home />}/>
        <Route  path='/activity' element={<CreateActivity />}/>
        <Route  path='/countries/:id' element={<Details />}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

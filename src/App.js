import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Header from './Components/Header'
import Dictionary from './Pages/Dictionary';
import Games from './Pages/Games'
function App() {
  return (
  
<Router>
  <Header/>
<Routes>
  <Route exact path="/" element={<Dictionary/>}></Route>
  <Route exact path='/games' element={<Games/>}></Route>
</Routes>

</Router>

  );
}

export default App;
//Header component
//route->pages
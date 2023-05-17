import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Header } from './components/Header/Header';

function App() {
  return (
    <Router>
      <Header/>  
      <Routes>
        <Route element={<Home />} path="/"/>
      </Routes>
    </Router>
   
  );
}

export default App;
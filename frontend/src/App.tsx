import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Header } from './components/Header/Header';
import { Calculator } from './pages/Calculator/Calculator';

function App() {
  return (
    <Router>
      <Header/>  
      <Routes>
        <Route element={<Home />} path="/"/>
        <Route element={<Calculator />} path="/calculadora"/>
      </Routes>
    </Router>
   
  );
}

export default App;
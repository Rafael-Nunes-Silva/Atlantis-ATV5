import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Base from './pages/Base';
import CadastroUsuario from './pages/CadastroUsuario';
import ListagemUsuario from './pages/ListagemUsuario';
import EdicaoUsuario from './pages/EdicaoUsuario';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Base />}>
          <Route path="/" element={<CadastroUsuario />} />
          <Route path="/CadastroUsuario" element={<CadastroUsuario />} />
          <Route path="/ListagemUsuario" element={<ListagemUsuario />} />
          <Route path="/EdicaoUsuario" element={<EdicaoUsuario />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
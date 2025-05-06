import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ClienteForm } from './ClienteForm'
import { ClienteTable } from './ClienteTable'
import './App.css'

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/cadastrarCliente">Cadastrar Cliente</Link>
        <Link to="/listarClientes">Listar Clientes</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ClienteForm />} />
        <Route path="/cadastrarCliente" element={<ClienteForm />} />
        <Route path="/listarClientes" element={<ClienteTable />} />
      </Routes>
    </div>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ClienteForm } from './ClienteForm'
import { ClienteTable } from './ClienteTable'
import './App.css'

function App() {
  return (
    <>
      <div className="App">
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/cadastrarCliente" style={{ marginRight: "10px" }}>Cadastrar Cliente</Link>
          <Link to="/listarClientes">Listar Clientes</Link>
        </nav>

        <Routes>
          {/* Página inicial redireciona para cadastro */}
          <Route path="/" element={<ClienteForm />} />
          <Route path="/cadastrarCliente" element={<ClienteForm />} />
          <Route path="/listarClientes" element={<ClienteTable />} />
        </Routes>
      </div>
    </>
  )
}

export default App

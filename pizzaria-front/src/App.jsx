import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ClienteForm } from './ClienteForm'
import { ClienteTable } from './ClienteTable'
import { PizzaForm } from './PizzaForm'
import { PizzaTable } from './PizzaTable'
import './App.css'

function App() {
  return (
    <>
      <div className="App">
        <nav>
          <h2>Clientes</h2>
          <Link to="/cadastrarCliente">Cadastrar Cliente</Link>
          <Link to="/listarClientes">Listar Clientes</Link>
          
          <h2>Pizzas</h2>
          <Link to="/cadastrarPizza">Cadastrar Pizza</Link>
          <Link to="/listarPizzas">Listar Pizzas</Link>
        </nav>

        <Routes>
          {/* Rotas de Cliente */}
          <Route path="/cadastrarCliente" element={<ClienteForm />} />
          <Route path="/listarClientes" element={<ClienteTable />} />
          
          {/* Rotas de Pizza */}
          <Route path="/cadastrarPizza" element={<PizzaForm />} />
          <Route path="/listarPizzas" element={<PizzaTable />} />

          {/* Rota padrão (opcional) */}
          <Route path="/" element={<h1>Bem-vindo ao Sistema de Pizzaria</h1>} />
        </Routes>
      </div>
    </>
  )
}

export default App

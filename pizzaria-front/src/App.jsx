import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ClienteForm } from './ClienteForm'
import { ClienteTable } from './ClienteTable'
import { PizzaForm } from './PizzaForm'
import { PizzaTable } from './PizzaTable'
import { PagamentoTable } from './PagamentoTable'
import { PagamentoForm } from './PagamentoForm'

import './App.css'

function App() {
  return (
    <>
      <div className="App">
        {/* TÍTULO NO TOPO */}
        <h1 className="titulo-principal">Bem-vindo ao Sistema de Pizzaria</h1>

        <nav>
          <h2>Clientes</h2>
          <Link to="/cadastrarCliente">Cadastrar Cliente</Link>
          <Link to="/listarClientes">Listar Clientes</Link>

        
          <h2>Pizzas</h2>
          <Link to="/cadastrarPizza">Cadastrar Pizza</Link>
          <Link to="/listarPizzas">Listar Pizzas</Link>

          <h2>Pagamentos</h2>
          <Link to="/cadastrarPagamentos">Cadastrar Pagamentos</Link>
          <Link to="/listarPagamentos">Listar Pagamentos</Link>

        </nav>

        <Routes>
          <Route path="/" element={<div />} />
          <Route path="/cadastrarCliente" element={<ClienteForm />} />
          <Route path="/listarClientes" element={<ClienteTable />} />
          <Route path="/cadastrarPizza" element={<PizzaForm />} />
          <Route path="/listarPizzas" element={<PizzaTable />} />
          <Route path="/listarPagamentos" element={<PagamentoTable />} />
          <Route path="/cadastrarPagamentos" element={<PagamentoForm />} />

          
        </Routes>
      </div>
    </>
  )
}

export default App

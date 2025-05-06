import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ClienteForm } from './ClienteForm'
import { ClienteTable } from './ClienteTable'
import { PizzaForm } from './PizzaForm'
import { PizzaTable } from './PizzaTable'
import { PedidoForm } from './PedidoForm'
import { PedidoTable } from './PedidoTable'

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

          <h2>Pedidos</h2>
          <Link to="/cadastrarPedido">Cadastrar Pedido</Link>
          <Link to="/listarPedidos">Listar Pedidos</Link>
        
          <h2>Pizzas</h2>
          <Link to="/cadastrarPizza">Cadastrar Pizza</Link>
          <Link to="/listarPizzas">Listar Pizzas</Link>

          <h2>Entregas</h2>
          <Link to="/cadastrarEntrega">Cadastrar Entrega</Link>
          <Link to="/listarEntregas">Listar Entregas</Link>
        </nav>

        <Routes>
          <Route path="/" element={<div />} />
          <Route path="/cadastrarCliente" element={<ClienteForm />} />
          <Route path="/listarClientes" element={<ClienteTable />} />
          <Route path="/cadastrarPizza" element={<PizzaForm />} />
          <Route path="/listarPizzas" element={<PizzaTable />} />
          <Route path="/cadastrarPedido" element={<PedidoForm />} />
          <Route path="/listarPedidos" element={<PedidoTable />} />
          
        </Routes>
      </div>
    </>
  )
}

export default App

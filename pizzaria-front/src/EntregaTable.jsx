import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"

export function EntregaTable() {
  const [entregas, setEntregas] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/entregas', { method: 'GET' })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar entregas")
        return res.json()
      })
      .then((data) => {
        const lista = Array.isArray(data) ? data : data.content || []
        const entregasComId = lista.map((e) => ({
          id: e.id,
          pedidoId: e.pedido?.id,
          status: e.status,
          entregador: e.entregador?.nome
        }))
        setEntregas(entregasComId)
      })
      .catch((error) => {
        console.error("Erro ao carregar entregas:", error)
      })
  }, [])

  const columns = [
    { field: 'pedidoId', headerName: 'Pedido ID', width: 120 },
    { field: 'status', headerName: 'Status', width: 200 },
    { field: 'entregador', headerName: 'Entregador', width: 200 }
  ]

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={entregas}
        columns={columns}
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 }
          }
        }}
      />
    </div>
  )
}

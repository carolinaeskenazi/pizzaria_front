import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"

export function PedidoTable() {
  const [pedidos, setPedidos] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/pedidos")
      .then((res) => res.json())
      .then((data) => {
        const lista = Array.isArray(data) ? data : data.content || []
        const pedidosComId = lista.map((p) => ({
          id: p.id,
          cliente: p.cliente?.nome || "Desconhecido"
        }))
        setPedidos(pedidosComId)
      })
      .catch((err) => {
        console.error("Erro ao carregar pedidos:", err)
      })
  }, [])

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'cliente', headerName: 'Cliente', width: 300 }
  ]

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={pedidos}
        columns={columns}
        pageSizeOptions={[5, 10]}
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
      />
    </div>
  )
}

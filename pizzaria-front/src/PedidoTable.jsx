import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"

export function PedidoTable() {
  const [pedidos, setPedidos] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/pedidos', { method: 'GET' })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar pedidos")
        return res.json()
      })
      .then((data) => {
        const lista = Array.isArray(data) ? data : data.content || []
        const pedidosComId = lista.map((p) => ({
          id: p.id,
          clienteId: p.cliente?.id || "Desconhecido",
          cozinha: p.cozinha || ""
        }))
        setPedidos(pedidosComId)
      })
      .catch((error) => {
        console.error("Erro ao carregar pedidos:", error)
      })
  }, [])

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'clienteId', headerName: 'ID do Cliente', width: 150 },
    { field: 'cozinha', headerName: 'Cozinha', width: 300 }
  ]

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={pedidos}
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

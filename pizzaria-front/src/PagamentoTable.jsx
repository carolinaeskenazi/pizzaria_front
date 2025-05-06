import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"

export function PagamentoTable() {
  const [pagamentos, setPagamentos] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/pagamentos", { method: "GET" })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao buscar pagamentos")
        return res.json()
      })
      .then(data => {
        const lista = Array.isArray(data.content) ? data.content : []
        const pagamentosComId = lista.map(p => ({
          id: p.id,
          ...p
        }))
        setPagamentos(pagamentosComId)
      })
      .catch(error => {
        console.error("Erro ao carregar pagamentos:", error)
      })
  }, [])

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "valor", headerName: "Valor", width: 130 },
    {
      field: "pago",
      headerName: "Pago",
      width: 130,
    }
  ]

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={pagamentos}
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

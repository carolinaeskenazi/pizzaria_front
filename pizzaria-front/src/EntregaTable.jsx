import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"

export function EntregaTable() {
  const [entregadores, setEntregadores] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/entregador', { method: 'GET' })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar entregadores");
        return res.json();
      })
      .then((data) => {
        const lista = Array.isArray(data) ? data : data.content || []
        const comId = lista.map((e, index) => ({
          id: e.id || index, // fallback se não houver id
          ...e
        }))
        setEntregadores(comId)
      })
      .catch((error) => {
        console.error("Erro ao carregar entregadores:", error);
      })
  }, [])

  const columns = [
    { field: 'nome', headerName: 'Nome', width: 200 },
    { field: 'telefone', headerName: 'Telefone', width: 200 },
    { field: 'veiculo', headerName: 'Veículo', width: 200 }
  ]

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={entregadores}
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

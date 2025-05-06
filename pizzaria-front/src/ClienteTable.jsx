import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"

export function ClienteTable() {
  const [clientes, setClientes] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/clientes/', {
    method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        const clientesComId = data.content.map((c, index) => ({
          id: index, // ou c.cpf, se preferir
          ...c
        }))
        setClientes(clientesComId)
      })
  }, [])

  const columns = [
    { field: 'nome', headerName: 'Nome', width: 150 },
    { field: 'cpf', headerName: 'CPF', width: 150 },
    { field: 'telefone', headerName: 'Telefone', width: 150 },
    { field: 'endereco', headerName: 'Endereço', width: 200 }
  ]

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={clientes}
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

import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"

export function MenuTable() {
  const [itens, setItens] = useState([])

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8080/cardapio/bebidas').then(res => res.json()),
      fetch('http://localhost:8080/cardapio/acompanhamentos').then(res => res.json())
    ])
      .then(([bebidas, acompanhamentos]) => {
        const bebidasComTipo = bebidas.map(b => ({ id: `b${b.id}`, tipo: 'Bebida', ...b }))
        const acompanhamentosComTipo = acompanhamentos.map(a => ({ id: `a${a.id}`, tipo: 'Acompanhamento', ...a }))
        setItens([...bebidasComTipo, ...acompanhamentosComTipo])
      })
      .catch(error => {
        console.error("Erro ao carregar o menu:", error)
      })
  }, [])

  const columns = [
    { field: 'tipo', headerName: 'Tipo', width: 150 },
    { field: 'nome', headerName: 'Nome', width: 200 },
    { field: 'preco', headerName: 'Preço', width: 130 }
  ]

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={itens}
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

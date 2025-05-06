import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"

export function PizzaTable() {
  const [pizzas, setPizzas] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/pizza', { method: 'GET' })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar pizzas");
        return res.json();
      })
      .then((data) => {
        const lista = Array.isArray(data) ? data : data.content || []
        const pizzasComId = lista.map((p) => ({
          id: p.id,
          ...p
        }))
        setPizzas(pizzasComId)
      })
      .catch((error) => {
        console.error("Erro ao carregar pizzas:", error);
      })
  }, [])

  const columns = [
    { field: 'sabor', headerName: 'Sabor', width: 200 },
    { field: 'preco', headerName: 'Preço', width: 130 },
    { field: 'ingredientes', headerName: 'Ingredientes', width: 400, valueGetter: (params) => params.row.ingredientes?.join(", ") }
  ]

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={pizzas}
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

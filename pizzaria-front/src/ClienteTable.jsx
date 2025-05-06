import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

export function ClienteTable() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/clientes', { method: 'GET' })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar clientes");
        return res.json();
      })
      .then((data) => {
        // Verifica se 'content' existe ou se data é uma lista diretamente
        const lista = Array.isArray(data) ? data : data.content || []; // Usando 'content' ou um array vazio
        const clientesComId = lista.map((c, index) => ({
          id: c.cpf, // Usando CPF como id, caso exista, ou index se não houver
          ...c
        }));
        setClientes(clientesComId);
      })
      .catch((error) => {
        console.error("Erro ao carregar clientes:", error);
      });
  }, []);

  const columns = [
    { field: 'nome', headerName: 'Nome', width: 150 },
    { field: 'cpf', headerName: 'CPF', width: 150 },
    { field: 'telefone', headerName: 'Telefone', width: 150 },
    { field: 'endereco', headerName: 'Endereço', width: 200 }
  ];

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
  );
}

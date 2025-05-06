import { useState, useEffect } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Snackbar, TextField, MenuItem } from "@mui/material"
import { useNavigate } from "react-router-dom"

export function PedidoForm() {
  const [clienteId, setClienteId] = useState("")
  const [clientes, setClientes] = useState([])

  const [openDialog, setOpenDialog] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:8080/clientes")
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch(() => setMessage("Erro ao carregar clientes"))
  }, [])

  const handleClickOpen = () => setOpenDialog(true)
  const handleCloseDialog = () => setOpenDialog(false)
  const handleCloseSnackbar = () => setOpenSnackbar(false)

  const cadastrar = () => {
    const pedido = {
      cliente: { id: parseInt(clienteId) }
    }

    fetch('http://localhost:8080/pedido', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido)
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao salvar pedido")
        return res.text()
      })
      .then(() => navigate("/listarPedidos"))
      .catch(() => {
        setMessage("Erro ao cadastrar pedido")
        setOpenSnackbar(true)
      })

    handleCloseDialog()
  }

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Cadastro de Pedido</DialogTitle>
        <DialogContent>
          <DialogContentText>Deseja confirmar o cadastro do pedido?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={cadastrar} autoFocus>Confirmar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={message} />

      <Grid container spacing={2} padding={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Cliente"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
          >
            {clientes.map((c) => (
              <MenuItem key={c.id} value={c.id}>{c.nome}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleClickOpen}>Cadastrar Pedido</Button>
        </Grid>
      </Grid>
    </>
  )
}

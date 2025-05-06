import { useState, useEffect } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Snackbar, TextField, MenuItem } from "@mui/material"
import { useNavigate } from "react-router-dom"

export function EntregaForm() {
  const [pedidoId, setPedidoId] = useState("")
  const [status, setStatus] = useState("")
  const [entregadorId, setEntregadorId] = useState("")
  const [entregadores, setEntregadores] = useState([])

  const [openDialog, setOpenDialog] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:8080/entregadores')
      .then(res => res.json())
      .then(data => setEntregadores(data))
      .catch(() => {
        setMessage("Erro ao carregar entregadores")
        setOpenSnackbar(true)
      })
  }, [])

  const handleClickOpen = () => setOpenDialog(true)
  const handleCloseDialog = () => setOpenDialog(false)

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return
    setOpenSnackbar(false)
  }

  const cadastrar = () => {
    const entrega = {
      pedido: { id: parseInt(pedidoId) },
      status,
      entregador: { id: parseInt(entregadorId) }
    }

    fetch('http://localhost:8080/entregas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entrega)
    })
      .then(response => {
        if (!response.ok) throw new Error("Erro ao salvar entrega")
        return response.json()
      })
      .then(() => navigate('/listarEntregas'))
      .catch(() => {
        setMessage("Erro ao cadastrar entrega")
        setOpenSnackbar(true)
      })

    handleCloseDialog()
  }

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Cadastro de Entrega</DialogTitle>
        <DialogContent>
          <DialogContentText>Deseja confirmar o cadastro da entrega?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={cadastrar} autoFocus>Confirmar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={message} />

      <Grid container spacing={2} padding={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="ID do Pedido"
            type="number"
            value={pedidoId}
            onChange={e => setPedidoId(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Status"
            value={status}
            onChange={e => setStatus(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            variant="outlined"
            label="Entregador"
            value={entregadorId}
            onChange={e => setEntregadorId(e.target.value)}
          >
            {entregadores.map((e) => (
              <MenuItem key={e.id} value={e.id}>{e.nome}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleClickOpen}>Cadastrar</Button>
        </Grid>
      </Grid>
    </>
  )
}

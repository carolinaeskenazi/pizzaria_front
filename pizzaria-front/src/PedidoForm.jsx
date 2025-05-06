import { useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Snackbar, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"

export function PedidoForm() {
  const [cliente, setCliente] = useState("")
  const [cozinha, setCozinha] = useState("")

  const [openDialog, setOpenDialog] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  const handleClickOpen = () => setOpenDialog(true)
  const handleCloseDialog = () => setOpenDialog(false)

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return
    setOpenSnackbar(false)
  }

  const cadastrar = () => {
    const pedido = {
      cliente: {
        id: parseInt(cliente)
      },
      
    }

    fetch('http://localhost:8080/pedido', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido)
    })
      .then(response => {
        if (!response.ok) throw new Error("Erro ao salvar pedido")
        return response.json()
      })
      .then(() => navigate('/listarPedidos'))
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
      <div className="form-container">
        <Grid container spacing={4} padding={0}>
          <Grid size={6} item xs={6}>
            <TextField fullWidth variant="outlined" label="ID do Cliente" type="number" value={cliente} onChange={e => setCliente(e.target.value)} />
          </Grid>
          <Grid size={12} item xs={12}>
            <Button variant="contained" onClick={handleClickOpen}>Cadastrar</Button>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

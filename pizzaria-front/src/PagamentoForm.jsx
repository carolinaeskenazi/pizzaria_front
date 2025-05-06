import './PagamentoForm.css'


import { useState } from "react"
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Grid, Snackbar, TextField
} from "@mui/material"
import { useNavigate } from "react-router-dom"

export function PagamentoForm() {
  const [id, setId] = useState("")
  const [valor, setValor] = useState("")
  const [pago, setPago] = useState(false)

  const [openDialog, setOpenDialog] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  const handleClickOpen = () => setOpenDialog(true)
  const handleCloseDialog = () => setOpenDialog(false)

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return
    setOpenSnackbar(false)
  }

  const cadastrar = () => {
    const pagamento = {
      id,
      valor: parseFloat(valor),
      pago
    }

    fetch("http://localhost:8080/pagamentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pagamento)
    })
      .then(response => {
        if (!response.ok) throw new Error("Erro ao salvar pagamento")
        return response.json()
      })
      .then(() => navigate("/cadastrarPagamentos"))
      .catch(() => {
        setMessage("Erro ao cadastrar pagamento")
        setOpenSnackbar(true)
      })

    handleCloseDialog()
  }

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Cadastro de Pagamento</DialogTitle>
        <DialogContent>
          <DialogContentText>Deseja confirmar o cadastro do pagamento?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={cadastrar} autoFocus>Confirmar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={message} />
      <div className="pagamento-form-container">
        <Grid container spacing={4} padding={2}>
          <Grid size={6} item xs={6}>
            <TextField fullWidth variant="outlined" label="ID" value={id} onChange={e => setId(e.target.value)} />
          </Grid>
          <Grid size={6} item xs={6}>
            <TextField fullWidth variant="outlined" label="Valor" type="number" value={valor} onChange={e => setValor(e.target.value)} />
          </Grid>
          <Grid size={6} item xs={12}>
            <Button variant="contained" onClick={() => setPago(!pago)}>
              {pago ? "Marcado como Pago" : "Marcar como Pago"}
            </Button>
          </Grid>
          <Grid size={6} item xs={12}>
            <Button variant="contained" onClick={handleClickOpen}>Cadastrar</Button>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

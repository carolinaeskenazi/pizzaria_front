import { useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Snackbar, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"

export function EntregaForm() {
  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("")
  const [veiculo, setVeiculo] = useState("")

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
    const entregador = {
      nome,
      telefone,
      veiculo
    }

    fetch('http://localhost:8080/entregador', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entregador)
    })
      .then(response => {
        if (!response.ok) throw new Error("Erro ao salvar entregador")
        return response.json()
      })
      .then(() => navigate('/listarEntregas'))
      .catch(() => {
        setMessage("Erro ao cadastrar entregador")
        setOpenSnackbar(true)
      })

    handleCloseDialog()
  }

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Cadastro de Entregador</DialogTitle>
        <DialogContent>
          <DialogContentText>Deseja confirmar o cadastro do entregador?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={cadastrar} autoFocus>Confirmar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={message} />

      <Grid container spacing={2} padding={2}>
        <Grid item xs={6}>
          <TextField fullWidth variant="outlined" label="Nome" value={nome} onChange={e => setNome(e.target.value)} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth variant="outlined" label="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth variant="outlined" label="Veículo" value={veiculo} onChange={e => setVeiculo(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleClickOpen}>Cadastrar</Button>
        </Grid>
      </Grid>
    </>
  )
}

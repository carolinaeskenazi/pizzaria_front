import './ClienteForm.css'

import { useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Snackbar, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"

export function ClienteForm() {
  const [nome, setNome] = useState("")
  const [cpf, setCpf] = useState("")
  const [telefone, setTelefone] = useState("")
  const [endereco, setEndereco] = useState("")

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
    const cliente = { nome, cpf, telefone, endereco }
    console.log(cliente) 

    fetch('http://localhost:8080/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente)
    })
      .then(response => {
        if (!response.ok) throw new Error("Erro ao salvar cliente")
        return response.json()
      })
      .then(() => navigate('/listarClientes'))
      .catch(() => {
        setMessage("Erro ao cadastrar cliente")
        setOpenSnackbar(true)
      })

    handleCloseDialog()
  }

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Cadastro de Cliente</DialogTitle>
        <DialogContent>
          <DialogContentText>Deseja confirmar o cadastro do cliente?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={cadastrar} autoFocus>Confirmar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={message} />

      <Grid container spacing={4} padding={4} className="form-container">
        <Grid item xs={12} sm={6}>
          <TextField fullWidth variant="outlined" label="Nome" value={nome} onChange={e => setNome(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth variant="outlined" label="CPF" value={cpf} onChange={e => setCpf(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth variant="outlined" label="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth variant="outlined" label="Endereço" value={endereco} onChange={e => setEndereco(e.target.value)} />
        </Grid>
        <Grid size={6.5} item xs={12} style={{ textAlign: 'right' }}>
          <Button variant="contained" onClick={handleClickOpen}>CADASTRAR</Button>
        </Grid>
      </Grid>


    </>
  )
}

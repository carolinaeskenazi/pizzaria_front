import './MenuForm.css'

import { useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Snackbar, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"

export function MenuForm() {
  const [nome, setNome] = useState("")
  const [preco, setPreco] = useState("")
  const [tipo, setTipo] = useState("bebida")

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
    const item = {
      nome,
      preco: parseFloat(preco)
    }

    const endpoint = tipo === "bebida" ? "bebida" : "acompanhamento"

    fetch(`http://localhost:8080/cardapio/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
      .then(response => {
        if (!response.ok) throw new Error("Erro ao salvar item do cardápio")
        return response.json()
      })
      .then(() => navigate('/listarMenu'))
      .catch(() => {
        setMessage("Erro ao cadastrar item")
        setOpenSnackbar(true)
      })

    handleCloseDialog()
  }

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Cadastro de Item do Cardápio</DialogTitle>
        <DialogContent>
          <DialogContentText>Deseja confirmar o cadastro do item?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={cadastrar} autoFocus>Confirmar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={message} />
      <div className="menu-form-container">
        <Grid container spacing={4} padding={1}>
          <Grid item xs={6}>
            <TextField fullWidth variant="outlined" label="Nome" value={nome} onChange={e => setNome(e.target.value)} />
          </Grid>
          <Grid size ={4}item xs={6}>
            <TextField fullWidth variant="outlined" label="Preço" type="number" value={preco} onChange={e => setPreco(e.target.value)} />
          </Grid>
          <Grid size={4 } item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Tipo (bebida ou acompanhamento)"
              value={tipo}
              onChange={e => setTipo(e.target.value)}
            />
          </Grid>
          <Grid size ={12} item xs={12}>
            <Button variant="contained" onClick={handleClickOpen}>Cadastrar</Button>
          </Grid>
        </Grid>
        </div>
    </>
  )
}

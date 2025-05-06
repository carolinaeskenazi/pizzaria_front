import './PizzaForm.css'


import { useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Snackbar, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"

export function PizzaForm() {
  const [sabor, setSabor] = useState("")
  const [preco, setPreco] = useState("")
  const [ingredientes, setIngredientes] = useState("")

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
    const pizza = {
      sabor,
      preco: parseFloat(preco),
      ingredientes: ingredientes
    }

    fetch('http://localhost:8080/pizza', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pizza)
    })
      .then(response => {
        if (!response.ok) throw new Error("Erro ao salvar pizza")
        return response.json()
      })
      .then(() => navigate('/cadastrarPizzas'))
      .catch(() => {
        setMessage("Erro ao cadastrar pizza")
        setOpenSnackbar(true)
      })

    handleCloseDialog()
  }

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Cadastro de Pizza</DialogTitle>
        <DialogContent>
          <DialogContentText>Deseja confirmar o cadastro da pizza?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={cadastrar} autoFocus>Confirmar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={message} />

      <Grid container spacing={2} padding={5} className="pizza-form-container">
        <Grid item xs={6}>
          <TextField fullWidth variant="outlined" label="Sabor" value={sabor} onChange={e => setSabor(e.target.value)} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth variant="outlined" label="Preço" type="number" value={preco} onChange={e => setPreco(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Ingredientes (separados por vírgula)"
            value={ingredientes}
            onChange={e => setIngredientes(e.target.value)}
          />
        </Grid>
        <Grid size={12} item xs={12}>
          <Button variant="contained" onClick={handleClickOpen}>Cadastrar</Button>
        </Grid>
      </Grid>
    </>
  )
}

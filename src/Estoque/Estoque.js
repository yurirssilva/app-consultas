import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  CircularProgress,
  Snackbar,
  Grid,
} from "@material-ui/core";
import { AddShoppingCart, CloseOutlined } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import React from "react";
import Footer from "../Footer";
import useFetch from "../hooks/useFetch";
import ModalProduto from "./ModalProduto";
import ProdutoItem from "./ProdutoItem";

const Estoque = () => {
  const [open, setOpen] = React.useState(false);
  const { request, data, loading, error } = useFetch();
  const [estoque, setEstoque] = React.useState([]);
  const [produto, setProduto] = React.useState(null);

  const [openError, setOpenError] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  async function fetchData() {
    const { response, json } = await request("produtos/");
    if (response.ok) setEstoque(json);
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleClose = (success) => {
    if (success) setOpenSuccess(true);
    setOpen(false);
    setProduto(null);
    fetchData();
  };

  React.useEffect(() => {
    if (produto) setOpen(true);
  }, [produto]);
  return (
    <React.Fragment>
      <Snackbar
        open={openSuccess}
        autoHideDuration={2000}
        onClose={() => setOpenSuccess(false)}
      >
        <Alert variant="filled" severity="success">
          Produto cadastrado com sucesso
        </Alert>
      </Snackbar>
      <Dialog open={loading ? loading : false}>
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </Dialog>
      <Snackbar
        open={error && !openError}
        autoHideDuration={4000}
        onClose={() => {
          setOpenError(true);
        }}
      >
        <Alert
          variant="filled"
          severity="error"
          onClose={() => {
            setOpenError(true);
          }}
        >
          Ocorreu um erro, verifique sua conexão e tente novamente.
        </Alert>
      </Snackbar>

      {data && (
        <React.Fragment>
          <Grid container spacing={2}>
            {estoque.map((produto) => (
              <Grid item md={4} xs={12} key={produto._id}>
                <ProdutoItem produto={produto} setProduto={setProduto} />
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
      )}
      <Dialog open={open} onClose={() => handleClose(false)} maxWidth="xs">
        <DialogTitle style={{ paddingBottom: "0px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0px",
            }}
          >
            <Typography
              variant="h5"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              Cadastrar Produto
            </Typography>
            <IconButton aria-label="fechar" onClick={() => handleClose(false)}>
              <CloseOutlined />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <ModalProduto handleClose={handleClose} produto={produto} />
        </DialogContent>
      </Dialog>
      <Footer>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            startIcon={<AddShoppingCart />}
            onClick={handleOpenModal}
          >
            Adicionar Produto
          </Button>
        </div>
      </Footer>
    </React.Fragment>
  );
};

export default Estoque;

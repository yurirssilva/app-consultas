import { Button, Snackbar, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import useFetch from "../hooks/useFetch";
import useForm from "../hooks/useForm";

const ModalProduto = (props) => {
  const [
    { values, loadingForm },
    handleChange,
    handleSubmit,
    setValues,
  ] = useForm();
  const { request, data, loading, error } = useFetch();
  const [openError, setOpenError] = React.useState(false);

  const enviar = () => {
    async function fetchData() {
      const { response, json } = await request(
        values._id ? "produtos/" + values._id : "produtos/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      if (response.ok) {
        props.handleClose();
      }
    }
    fetchData();
  };

  React.useEffect(() => {
    if (props.produto) setValues(props.produto);
  }, []);

  return (
    <React.Fragment>
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

      <form autoComplete="off" onSubmit={handleSubmit(enviar)}>
        <TextField
          id="nome"
          name="nome"
          label="Nome"
          value={values.nome}
          fullWidth
          required
          onChange={handleChange}
        ></TextField>
        <TextField
          id="descricao"
          name="descricao"
          label="Descrição"
          value={values.descricao}
          fullWidth
          required
          multiline
          rows={4}
          onChange={handleChange}
        ></TextField>
        <TextField
          id="quantidade"
          name="quantidade"
          label="Quantidade"
          value={values.quantidade}
          type="number"
          fullWidth
          required
          onChange={handleChange}
        ></TextField>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "1rem" }}
        >
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </form>
    </React.Fragment>
  );
};

export default ModalProduto;

import {
  Button,
  MenuItem,
  TextField,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import useFetch from "../hooks/useFetch";
import useForm from "../hooks/useForm";

let setores = [
  "ADMINISTRAÇÃO",
  "ARQUIVO",
  "ESTAGIÁRIO",
  "AUDITÓRIA PRON.",
  "AUTORIZAÇÃO",
  "AUDITÓRIO",
  "BIOIMAGEM",
  "CENTRO CIRÚRG.",
  "COLONOSCOPIA",
  "COMERCIAL",
  "CONTABIL.  RH",
  "ELETROCARD.",
  "COOR. ENFERM.",
  "FARMÁCIA",
  "FATURAMENTO",
  "FINANCEIRO",
  "INTERNAMENTO",
  "LABORATÓRIO",
  "LECO",
  "MANUTENÇÃO",
  "HOTELARIA",
  "MARKET. QUAL.",
  "MÉDICOS",
  "PABX",
  "PORTARIA",
  "POSTO ENFERM.",
  "RECEPÇÃO",
  "MARCAÇÃO",
  "SND",
  "ULTRASSOM",
  "URODINÃMICA",
  "UROFLUXO",
  "TI",
  "SERVIDORES",
];

const ModalFuncionario = (props) => {
  const { request, data, loading, error } = useFetch();
  const [openError, setOpenError] = React.useState(false);

  const [{ values, loadingForm }, handleChange, handleSubmit, setValues] = useForm();

  const enviar = () => {
    async function fetchData() {
      const { response, json } = await request("funcionarios/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        props.handleClose();
      }
    }
    fetchData();
  };

  return (
    <React.Fragment>
      <Snackbar open={data} autoHideDuration={2000}>
        <Alert variant="filled" severity="success">
          Funcionário cadastrado com sucesso
        </Alert>
      </Snackbar>
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
          fullWidth
          required
          onChange={handleChange}
        ></TextField>
        <TextField
          id="matricula"
          name="matricula"
          label="Matricula"
          required
          fullWidth
          onChange={handleChange}
        ></TextField>
        <TextField
          id="tipo"
          name="tipo"
          select
          fullWidth
          required
          label="Tipo"
          value={values.tipo ? values.tipo : ""}
          onChange={handleChange}
          helperText="Selecione o tipo de funcionário"
        >
          <MenuItem value="TI">TI</MenuItem>
          <MenuItem value="Outros">Outros</MenuItem>
        </TextField>
        <TextField
          id="setor"
          name="setor"
          select
          fullWidth
          label="Setor"
          required
          value={values.setor ? values.setor : ""}
          onChange={handleChange}
          helperText="Selecione o setor do funcionário"
        >
          {setores.map((setor, index) => (
            <MenuItem key={index + setor} value={setor}>
              {setor}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="senha"
          name="senha"
          label="Senha"
          required
          type="password"
          fullWidth
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

export default ModalFuncionario;

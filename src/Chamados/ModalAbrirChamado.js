import {
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar,
} from "@material-ui/core";
import { CloseOutlined, Person } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import React from "react";
import DialogTitleDefault from "../components/DialogTitleDefault";
import ModalBuscarFuncionario from "../Funcionarios/ModalBuscarFuncionario";
import useFetch from "../hooks/useFetch";
import useForm from "../hooks/useForm";

let servicos = [
  { nome: "ALTERAR CPS", prioridade: "Baixa" },
  { nome: "AVISO DE LENTIDÃO", prioridade: "Alta" },
  { nome: "DESTRAVAR SAÍDA", prioridade: "Baixa" },
  { nome: "GERENCIAR USUÁRIO", prioridade: "Media" },
  { nome: "MANUT. DE CÃMERAS", prioridade: "Media" },
  { nome: "MANUT. DE COMPUTADOR", prioridade: "Alta" },
  { nome: "MANUT. DE EMAIL", prioridade: "Media" },
  { nome: "MANUT. DE IMP/SCAN.", prioridade: "Alta" },
  { nome: "MANUT. DE INTERNET", prioridade: "Alta" },
  { nome: "MANUT. OUTROS EQUIP.", prioridade: "Baixa" },
  { nome: "MANUT. OUTROS PROG.", prioridade: "Baixa" },
  { nome: "MANUT.DE TEL/RAMAL", prioridade: "Baixa" },
  { nome: "MANUT. CALL CENTER", prioridade: "Alta" },
  { nome: "MANUT. DO ECG/MAPA", prioridade: "Alta" },
  { nome: "MANUT. SISTEMA CPC", prioridade: "Alta" },
  { nome: "MANUT. SIS. DE PONTO", prioridade: "Alta" },
  { nome: "MANUT. SIS. DO SUS", prioridade: "Baixa" },
  { nome: "MANUT. SIS. DOMÍNIO", prioridade: "Alta" },
  { nome: "MANUT. UROFLUXO MICA", prioridade: "Alta" },
  { nome: "RETIRAR ALTA", prioridade: "Baixa" },
  { nome: "SOLICI. DESBLOQUEIOS", prioridade: "Baixa" },
  { nome: "SOLICI.EQUIPAMENTOS", prioridade: "Baixa" },
  { nome: "SUPORTE AO USUÁRIO", prioridade: "Baixa" },
  { nome: "TROCA DE TONER", prioridade: "Alta" },
  { nome: "UNIFICAR CADASTRO", prioridade: "Baixa" },
];
const ModalAbrirChamado = (props) => {
  const { request, data, loading, error } = useFetch();
  const [openError, setOpenError] = React.useState(false);
  const [{ values, loadingForm }, handleChange, handleSubmit, setValues] = useForm();
  const [openBuscarFuncionario, setOpenBuscarFuncionario] = React.useState(
    false
  );
  const [funcionario, setFuncioario] = React.useState({ nome: "" });

  const enviar = () => {
    let data = values;
    data.tipo_servico = servicos[servicos.findIndex(servico => (servico.nome == values.tipo_servico))]
    console.log("data ==> ", data);
    async function fetchData() {
      const { response, json } = await request("chamados/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          funcionario_matricula: funcionario.matricula,
          funcionario_nome: funcionario.nome,
        }),
      });
      if (response && response.ok) {
        props.handleClose();
      } else{
          setOpenError(true);
      }
    }
    fetchData();
  };

  const handleBuscarFuncionarioClose = (funcionario) => {
    if (funcionario && funcionario._id) {
      console.log("funcionario ==> ", funcionario);
      setFuncioario(funcionario);
    }
    setOpenBuscarFuncionario(false);
  };
  const handlePersonClick = () => {
    console.log("teste");
    setOpenBuscarFuncionario(true);
  };

  return (
    <React.Fragment>
      <Snackbar
        open={error && openError}
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
      <Dialog
        open={openBuscarFuncionario}
        onClose={handleBuscarFuncionarioClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitleDefault
          icon={<CloseOutlined />}
          text="Buscar Funcionário"
          setOpen={() => setOpenBuscarFuncionario(false)}
        />
        <DialogContent>
          <ModalBuscarFuncionario handleClose={handleBuscarFuncionarioClose} />
        </DialogContent>
      </Dialog>
      <form autoComplete="off" onSubmit={handleSubmit(enviar)}>
        <TextField
          id="funcionario_nome"
          name="funcionario_nome"
          label="Funcionário"
          fullWidth
          disabled
          required
          value={funcionario.nome}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handlePersonClick}>
                  <Person />
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
        <TextField
          id="descricao"
          name="descricao"
          label="Descrição"
          fullWidth
          required
          multiline
          rows={4}
          onChange={handleChange}
        ></TextField>
        <TextField
          id="tipo_servico"
          name="tipo_servico"
          select
          fullWidth
          required
          label="Tipo"
          value={values.tipo_servico ? values.tipo_servico : ""}
          onChange={handleChange}
          helperText="Selecione o tipo de serviço"
        >
          {servicos.map((servico, index) => (
            <MenuItem key={index} value={servico.nome}>
              {servico.nome}
            </MenuItem>
          ))}
        </TextField>
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

export default ModalAbrirChamado;

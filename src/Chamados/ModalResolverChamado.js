import {
  CircularProgress,
  Button,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import useFetch from "../hooks/useFetch";
import moment from "moment";
import useForm from "../hooks/useForm";

const ModalResolverChamado = ({ chamado, ...props }) => {
  const [
    { values, loadingForm },
    handleChange,
    handleSubmit,
    setValues,
  ] = useForm();
  const { request, data, loading, error } = useFetch();
  // const [chamado, setChamado ] = React.useEffect(null);
  const enviar = () => {
    async function fetchData() {
      const { response, json } = await request("finalizara/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, id: chamado._id }),
      });
      // if (response.ok) setChamado(json);
    }
    fetchData();
  };

  function retornarData(data) {
    return moment(data).format("YYYY-MM-DDTHH:mm");
  }

  React.useEffect(() => {
    console.log("chamado -", chamado);
    if (!chamado.status == "Aberto")
      setValues({
        status: chamado.status,
        descricao: chamado.resolvido.descricao,
      });
    console.log("values ==>< ", values);
  }, []);

  return (
    <React.Fragment>
      <div>
        <Typography variant="h5">Dados do Chamado</Typography>
        <Divider />
        <TextField
          id="descricaoView"
          name="descricaoView"
          label="Descrição"
          value={chamado.descricao}
          fullWidth
          aria-readonly
        ></TextField>
        <TextField
          id="tipo_servico"
          name="tipo_servico"
          label="Tipo de Serviço"
          value={chamado.tipo_servico.nome}
          fullWidth
          aria-readonly
        ></TextField>
        <TextField
          id="prioridade"
          name="prioridade"
          label="Prioridade do Serviço"
          value={chamado.tipo_servico.prioridade}
          fullWidth
          aria-readonly
        ></TextField>
        <TextField
          id="data_abertura"
          name="data_abertura"
          label="Data de Abertura"
          value={retornarData(chamado.data_hora_abertura)}
          fullWidth
          type="datetime-local"
          aria-readonly
        ></TextField>
      </div>
      <Typography variant="h5" style={{ paddingTop: "20px" }}>
        Resolução do Chamado
      </Typography>
      <Divider />
      <form autoComplete="off" onSubmit={handleSubmit(enviar)}>
        <TextField
          id="descricao"
          name="descricao"
          label="Descrição da Resolução"
          multiline
          rows={2}
          fullWidth
          value={values.descricao ? values.descricao : ""}
          onChange={handleChange}
          disabled={!chamado.status == "Aberto"}
        ></TextField>
        <TextField
          id="status"
          name="status"
          select
          fullWidth
          required
          label="Status"
          value={values.status ? values.status : ""}
          onChange={handleChange}
          helperText="Selecione o status da resolução"
          disabled={!chamado.status == "Aberto"}
        >
          <MenuItem value="Cancelado">Cancelado</MenuItem>
          <MenuItem value="Resolvido">Resolvido</MenuItem>
        </TextField>
        {chamado.status == "Aberto" && (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "1rem" }}
          >
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        )}
      </form>
    </React.Fragment>
  );
};

export default ModalResolverChamado;

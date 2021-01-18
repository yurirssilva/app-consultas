import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  Snackbar,
} from "@material-ui/core";
import {
  Assignment,
  AssignmentTurnedIn,
  CloseOutlined,
} from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import React from "react";
import DialogTitleDefault from "../components/DialogTitleDefault";
import Footer from "../Footer";
import useFetch from "../hooks/useFetch";
import ChamadoItem from "./ChamadoItem";
import ModalAbrirChamado from "./ModalAbrirChamado";
import ModalResolverChamado from "./ModalResolverChamado";

const Chamados = (props) => {
  const [openAbrir, setAbrirOpen] = React.useState(false);
  const [chamados, setChamados] = React.useState([]);
  const [chamado, setChamado] = React.useState(null);
  const [dataError, setDataError] = React.useState(false);
  const [openResolver, setResolverOpen] = React.useState(false);
  const { request, data, loading, error } = useFetch();

  async function fetchData() {
    const { response, json } = await request("chamados/");
    if (response.ok) setChamados(json);
    else setDataError(true);
  }

  React.useEffect(() => {
    fetchData();
  }, []);
  const handleDelete = () => {};

  const handleAbrirOpenModal = () => {
    setAbrirOpen(true);
  };

  const handleAbrirClose = () => {
    setAbrirOpen(false);
    // fetchData();
  };
  const handleResolverOpenModal = () => {
    setResolverOpen(true);
  };

  const chamadoAction = (chamado, action) => {
    setChamado(chamado);
    if (action == "ver") {
      handleResolverOpenModal();
    }
    if (action == "deletar") {
      handleDelete();
    }
  };

  return (
    <React.Fragment>
      <Dialog open={loading ? loading : false}>
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </Dialog>
      <Snackbar
        open={dataError}
        autoHideDuration={4000}
        onClose={() => {
          setDataError(false);
        }}
      >
        <Alert
          variant="filled"
          severity="error"
          onClose={() => {
            setDataError(false);
          }}
        >
          Ocorreu um erro, verifique sua conexão e tente novamente.
        </Alert>
      </Snackbar>
      <Dialog open={openAbrir} onClose={handleAbrirClose} maxWidth="xs">
        <DialogTitleDefault
          icon={<CloseOutlined />}
          text="Abrir Chamado"
          setOpen={() => setAbrirOpen(false)}
        />
        <DialogContent>
          <ModalAbrirChamado handleClose={handleAbrirClose} />
        </DialogContent>
      </Dialog>
      <Dialog
        open={openResolver}
        onClose={handleResolverOpenModal}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitleDefault
          icon={<CloseOutlined />}
          text="Ficha do Chamado"
          setOpen={() => setResolverOpen(false)}
        />
        <DialogContent>
          <ModalResolverChamado
            handleClose={handleResolverOpenModal}
            chamado={chamado}
          />
        </DialogContent>
      </Dialog>
      {data && (
        <React.Fragment>
          <Grid container spacing={2}>
            {chamados.map((chamado) => (
              <Grid item md={4} xs={12} key={chamado._id}>
                <ChamadoItem chamado={chamado} handleAction={chamadoAction} />
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
      )}
      <Footer>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            startIcon={<Assignment />}
            onClick={handleAbrirOpenModal}
          >
            Abrir Chamado
          </Button>
          <Button
            variant="contained"
            style={{ marginLeft: "1.5rem" }}
            startIcon={<AssignmentTurnedIn />}
            onClick={handleResolverOpenModal}
          >
            Resolver Chamado
          </Button>
        </div>
      </Footer>
    </React.Fragment>
  );
};

export default Chamados;

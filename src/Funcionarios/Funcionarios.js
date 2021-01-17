import {
  Button,
  Dialog,
  Grid,
  DialogContent,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import { CloseOutlined, PersonAddRounded } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import React from "react";
import DialogTitleDefault from "../components/DialogTitleDefault";
import Footer from "../Footer";
import useFetch from "../hooks/useFetch";
import FuncionarioItem from "./FuncionarioItem";
import ModalFuncionario from "./ModalFuncionario";

const Funcionarios = () => {
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [funcionarios, setFuncionarios] = React.useState([]);
  const { request, data, loading, error } = useFetch();

  async function fetchData() {
    const { response, json } = await request("funcionarios/");
    if (response.ok) setFuncionarios(json);
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    fetchData();
  };

  return (
    <div>
      {/* Teste */}
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
            {funcionarios.map((funcionario) => (
              <Grid item md={4} xs={12} key={funcionario._id}>
                <FuncionarioItem funcionario={funcionario} />
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="xs">
        <DialogTitleDefault
          icon={<CloseOutlined />}
          text="Cadastrar Funcionário"
          setOpen={() => setOpen(false)}
        />
        <DialogContent>
          <ModalFuncionario handleClose={handleClose} />
        </DialogContent>
      </Dialog>
      <Footer>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            startIcon={<PersonAddRounded />}
            onClick={handleOpenModal}
          >
            Adicionar Funcionário
          </Button>
        </div>
      </Footer>
    </div>
  );
};

export default Funcionarios;

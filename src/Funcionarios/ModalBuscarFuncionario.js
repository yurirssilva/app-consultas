import { CircularProgress, Grid } from "@material-ui/core";
import React from "react";
import useFetch from "../hooks/useFetch";
import FuncionarioItem from "./FuncionarioItem";

const ModalBuscarFuncionario = (props) => {
  const [funcionarios, setFuncionarios] = React.useState([]);
  const { request, data, loading, error } = useFetch();
  async function fetchData() {
    const { response, json } = await request("funcionarios/");
    if (response.ok) setFuncionarios(json);
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  const select = (funcionario) => {
    props.handleClose(funcionario);
    // console.log(funcionario);
  };
  return (
    <div style={{minHeight:"75px", maxHeight:"400px", overflow:"auto" }}>
      {loading && <div style={{display:"flex", justifyContent: "center", margin:"5px"}}><CircularProgress /></div>}
      {data && (
        <React.Fragment>
          <Grid container>
            {funcionarios.map((funcionario) => (
              <Grid
                item
                style={{padding:"5px"}}
                xs={12}
                key={funcionario._id}
                onClick={() => select(funcionario)}
              >
                <FuncionarioItem funcionario={funcionario} />
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
      )}
    </div>
  );
};

export default ModalBuscarFuncionario;

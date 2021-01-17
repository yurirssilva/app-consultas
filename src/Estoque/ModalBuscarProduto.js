import { CircularProgress, Grid } from "@material-ui/core";
import React from "react";
import useFetch from "../hooks/useFetch";
import ProdutoItem from "./ProdutoItem";

const ModalBuscarProduto = (props) => {
  const [produtos, setProdutos] = React.useState([]);
  const { request, data, loading, error } = useFetch();
  async function fetchData() {
    const { response, json } = await request("produtos/");
    if (response.ok) setProdutos(json);
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  const select = (produto) => {
    props.handleClose(produto);
  };
  return (
    <div style={{ minHeight: "75px", maxHeight: "400px", overflow: "auto" }}>
      {loading && (
        <div
          style={{ display: "flex", justifyContent: "center", margin: "5px" }}
        >
          <CircularProgress />
        </div>
      )}
      {data && (
        <React.Fragment>
          <Grid container>
            {produtos.map((produto) => (
              <Grid
                item
                style={{ padding: "5px" }}
                xs={12}
                key={produto._id}
                onClick={() => select(produto)}
              >
                <ProdutoItem produto={produto} />
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
      )}
    </div>
  );
};

export default ModalBuscarProduto;

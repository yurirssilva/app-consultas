import { Avatar, Grid, Paper, Typography } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import React from "react";

const FuncionarioItem = ({ funcionario }) => {
  return (
    <Paper style={{ padding: "1rem", display: "flex" }}>
      <Grid
        item
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Avatar>
          <Person />
        </Avatar>
      </Grid>
      <Grid item style={{ paddingLeft: "10px" }}>
        <Typography variant="subtitle1">
          <b>{funcionario.nome}</b> - {funcionario.matricula}
        </Typography>
        <Typography variant="body1">{funcionario.setor}</Typography>
      </Grid>
    </Paper>
  );
};

export default FuncionarioItem;

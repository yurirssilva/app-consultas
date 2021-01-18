import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React from "react";
import Footer from "../Footer";

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

const Setores = () => {
  return (
    <React.Fragment>
      <React.Fragment>
        <Grid container spacing={2}>
          {setores.map((setor, index) => (
            <Grid item md={4} xs={12} key={index}>
              <Paper style={{ padding: "10px" }}>
                <Typography>
                  Setor {index + 1} - {setor}
                </Typography>
              </Paper>
              {/* <ChamadoItem chamado={chamado} handleAction={chamadoAction} /> */}
            </Grid>
          ))}
        </Grid>
      </React.Fragment>
      <Footer>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            style={{ marginLeft: "1.5rem" }}
            startIcon={<Add />}
          >
            Adicionar Setor
          </Button>
        </div>
      </Footer>
    </React.Fragment>
  );
};

export default Setores;

import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React from "react";
import Footer from "../Footer";

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

const Servicos = () => {
    return (
        <React.Fragment>
        <React.Fragment>
          <Grid container spacing={2}>
            {servicos.map((servico, index) => (
              <Grid item md={4} xs={12} key={index}>
                <Paper style={{ padding: "10px" }}>
                  <Typography>
                    Serviço {index + 1} - {servico.nome}
                  </Typography>
                  <Typography variant="subtitle2">
                      Prioridade: {servico.prioridade}
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
              Cadastrar Serviço
            </Button>
          </div>
        </Footer>
      </React.Fragment>
    )
}

export default Servicos

import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import React from "react";

const Home = () => {
  return (
    <div>
      <Card variant="outlined">
        <CardHeader subheader="Bem Vindo!" title="Centro de Chamados" />
        <CardContent>
          <Typography paragraph>
            Os hospitais prestam diversos serviços aos seus pacientes, e para
            atender sua demanda possui muitas máquinas hospitalares e de
            informática, que precisam estar sempre em bom funcionamento para que
            os procedimentos sejam executados corretamente. Visto que, há uma
            grande demanda para o setor de TI que é responsável por gerir as
            ocorrências de erros com os equipamentos tecnológicos, surgiu a
            necessidade de um sistema que controle os chamados.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;


import * as styles from "./styles.css.ts";
import TabelasRateioPremiacoes from "../../../components/TabelasRateioPremiacoes/index.tsx";
import { rateiosStore } from "../../../stores/rateiosStore.ts";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Bolao, bolaoStore } from "../../../stores/bolaoStore.ts";
import { BolaoRoles } from "../../../models/BolaoCopaDefault.tsx";
import { Heading } from "@chakra-ui/react";

function BolaoRateioPremiacoes() {

  const { rateio, carregarRateio } = rateiosStore();
  const { participanteBolaoLogado } = bolaoStore();
  const { bolao } = useOutletContext<{ bolao: Bolao }>();

  useEffect(() => {
    carregarRateio(bolao.id);
  }, [bolao.id, carregarRateio]);

  const adminOuGerente = participanteBolaoLogado?.roleBolao === BolaoRoles.CRIADOR || 
                          participanteBolaoLogado?.roleBolao === BolaoRoles.GERENTE;
  
  return (
    <div className={styles.tableRateioContainer}>
      <Heading mt={4} size="lg" mb={6}>
        Simulação de Rateio e Premiações - {bolao.nome}
      </Heading>
      <TabelasRateioPremiacoes 
        rateioEditavel={adminOuGerente}
        bolaoId={bolao.id}
        rateio={rateio}
      />
    </div>
  );
};

export default BolaoRateioPremiacoes;

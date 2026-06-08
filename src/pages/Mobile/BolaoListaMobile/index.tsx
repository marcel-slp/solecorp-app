import { Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import * as styles from "./styles.css";
import { retornaUserId } from "../../../utils/Utils";
import { bolaoStore } from "../../../stores/bolaoStore";
import BolaoTableMobile from "../../../components/BolaoTableMobile";

export default function BolaoListaMobile() {
  const { boloes, carregarBoloesPorUserId } = bolaoStore();

  useEffect(() => {
    carregarBoloesPorUserId(retornaUserId());
  }, [carregarBoloesPorUserId]);

  return (
    <div className={styles.tableBolaoContainer}>
      <Heading size="md" mb={6}>
        Bolões Cadastrados/Convidados
      </Heading>
      <BolaoTableMobile boloes={boloes} />
    </div>
  );
}

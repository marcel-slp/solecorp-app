import { Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as styles from "./styles.css";
import { retornaUserId } from "../../../utils/Utils";
import { bolaoStore } from "../../../stores/bolaoStore";
import BolaoTableMobile from "../../../components/BolaoTableMobile";

export default function BolaoListaMobile() {
  const navigate = useNavigate();
  const { boloes, carregarBoloesPorUserId } = bolaoStore();

  useEffect(() => {
    carregarBoloesPorUserId(retornaUserId());
  }, [carregarBoloesPorUserId]);

  return (
    <div className={styles.tableBolaoContainer}>
      <Heading mt={4}>Bolão Copa do Mundo 2026</Heading>
          <Heading size="md" my={4}>Bolões Cadastrados/Convidados</Heading>
          <BolaoTableMobile
            boloes={boloes}
            onEnter={(id) => navigate(`/mobile/bolao-mobile/${id}/palpite-mobile`)}
 
          />
    </div>
  );
}
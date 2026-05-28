//import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import HeaderNavMobile from "../../../components/HeaderNavMobile";
import { Bolao, bolaoStore } from "../../../stores/bolaoStore";
import { retornaUserId } from "../../../utils/Utils";
import * as styles from "./styles.css";

interface BolaoLayoutProps {
  bolao: Bolao;
  children?: React.ReactNode;
}

export function BolaoLayoutMobile({ bolao, children }: BolaoLayoutProps) {

  const { carregarParticipanteBolaoLogado } = bolaoStore();
  const userId = retornaUserId();

  useEffect(() => {
    carregarParticipanteBolaoLogado(bolao.id, userId);
  }, [bolao.id, carregarParticipanteBolaoLogado, userId]);
  
  return (
    <>
      <HeaderNavMobile />
      <div className={styles.content}>
        {children}
      </div>
    </>
  );
}
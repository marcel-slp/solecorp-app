import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import HeaderNavMobile from "../../../components/HeaderNavMobile";
import { Bolao, bolaoStore } from "../../../stores/bolaoStore";
import { retornaUserId } from "../../../utils/Utils";

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
      <Box as="main" flex="1" p={2} bg="white" minH="calc(100vh - 140px)">
        {children}
      </Box>
    </>
  );
}
import { Box } from "@chakra-ui/react";
import HeaderNav from "../../../components/HeaderNav";
import { Bolao, 
  bolaoStore 
} from "../../../stores/bolaoStore";
import { retornaUserId } from "../../../utils/Utils";
import { useEffect } from "react";

interface BolaoLayoutProps {
  bolao: Bolao;
  children?: React.ReactNode;
}

export function BolaoLayout({ bolao, children }: BolaoLayoutProps) {

  const { carregarParticipanteBolaoLogado } = bolaoStore();
  const userId = retornaUserId();

  useEffect(() => {
    carregarParticipanteBolaoLogado(bolao.id, userId);
  }, [bolao.id, carregarParticipanteBolaoLogado, userId]);
  
  return (
    <>
      <HeaderNav bolao={bolao} modoBolao/>
      <Box as="main" flex="1" p={6} bg="white" minH="calc(100vh - 140px)">
        {children}
      </Box>
    </>
  );
}
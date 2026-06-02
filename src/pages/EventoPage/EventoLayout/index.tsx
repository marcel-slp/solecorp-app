import { Box } from "@chakra-ui/react";
//import EventoHeaderTop from "../../../components/EventoHeaderTop";
// import HeaderNav from "../../../components/HeaderNav";
import MenuFaseGrupo from "../../../components/MenuFaseGrupo/MenuFaseGrupo";
import { useLocation } from "react-router-dom";
import { Evento } from "../../../stores/eventosStore";


interface EventoLayoutProps {
  evento: Evento;
  children?: React.ReactNode;
}

export function EventoLayout({ evento, children }: EventoLayoutProps) {
  const location = useLocation();

  const paginaAtual = location.pathname.split("/").pop() || "inicio";

  return (
    <>
      {/* <HeaderNav nome={evento.nome} imagem={String(evento.imagemEvento)}/> */}
      <MenuFaseGrupo paginaAtual={paginaAtual} evento={evento}/>
      <Box as="main" flex="1" p={6} bg="white" minH="calc(100vh - 140px)">
        {children}
      </Box>
    </>
  );
}
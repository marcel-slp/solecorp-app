import { useParams, useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Evento, eventosStore } from "../../stores/eventosStore";
import { Button, Box, Spinner, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { EventoNavigationProvider } from "../../context/EventoNavigationContext";
import { EventoLayout } from "./EventoLayout";

export function EventoPage() {
  const { eventoId } = useParams<{ eventoId: string }>();
  const { buscarEvento } = eventosStore();
  const [evento, setEvento] = useState<Evento | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarEvento() {
      setLoading(true);
      setError(null);

      if (!eventoId) {
        setError("ID do evento não informado na URL");
        setLoading(false);
        return;
      }

      const responseEvento = await buscarEvento(eventoId);

      if (!responseEvento) {
        setError("Evento não encontrado");
        setEvento(null);
      } else {
        setEvento(responseEvento);
      }
      setLoading(false);
    }

    carregarEvento();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventoId]);

  if (loading) return <Spinner size="xl" color="blue.500">Carregando...</Spinner>;
  //if (!evento) return <Alert status="error">Evento não encontrado</Alert>;
  if (error || !evento) {
    return (
      <Box textAlign="center" mt={20}>
        <Text fontSize="xl" color="red.500" mb={6}>
          {error || "Evento não encontrado"}
        </Text>
        <Button leftIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
          Voltar
        </Button>
      </Box>
    );
  }

  return (
    <EventoNavigationProvider evento={evento}>
      <EventoLayout evento={evento}>
        <Outlet context={{ evento }}/>
      </EventoLayout>
    </EventoNavigationProvider>
  );
}
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Box, Spinner, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Bolao, bolaoStore } from "../../../stores/bolaoStore";
import { BolaoLayoutMobile } from "../BolaoLayoutMobile";

export function BolaoPageMobile() {
  const { bolaoId } = useParams<{ bolaoId: string }>();
  const { carregarBolaoPorIdUserId } = bolaoStore();
  const [bolao, setBolao] = useState<Bolao | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarBoloesPorUserId() {
      setLoading(true);
      setError(null);

      if (!bolaoId) {
        setError("ID do bolão não informado na URL");
        setLoading(false);
        return;
      }

      const responseBolao = await carregarBolaoPorIdUserId(bolaoId);

      if (!responseBolao) {
        setError("Bolão não encontrado");
        setBolao(null);
      } else {
        setBolao(responseBolao);
      }
      setLoading(false);
    }

    carregarBoloesPorUserId();
  }, [bolaoId, carregarBolaoPorIdUserId]);

  if (loading) return <Spinner size="xl" color="blue.500">Carregando...</Spinner>;
  if (error || !bolao) {
    return (
      <Box textAlign="center" mt={20}>
        <Text fontSize="xl" color="red.500" mb={6}>
          {error || "Bolão não encontrado"}
        </Text>
        <Button leftIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
          Voltar
        </Button>
      </Box>
    );
  }

  return (
    <BolaoLayoutMobile bolao={bolao}>
      <Outlet context={{ bolao }}/>
    </BolaoLayoutMobile>
  );
}
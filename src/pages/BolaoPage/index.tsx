import { useParams, useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Box, Spinner, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Bolao } from "../../stores/bolaoStore";
import { BolaoLayout } from "./BolaoLayout";
import { retornaUserId } from "../../utils/Utils";
import { buscarBolaoPorIdUserId } from "../../api";

export function BolaoPage() {
  const { bolaoId } = useParams<{ bolaoId: string }>();
  const [bolao, setBolao] = useState<Bolao | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarBolao() {
      setLoading(true);
      setError(null);

      if (!bolaoId) {
        setError("ID do bolão não informado na URL");
        setLoading(false);
        return;
      }

      const responseBolao = await buscarBolaoPorIdUserId(bolaoId, retornaUserId());

      if (!responseBolao) {
        setError("Bolão não encontrado");
        setBolao(null);
      } else {
        setBolao(responseBolao.data);
      }
      setLoading(false);
    }

    carregarBolao();
  }, [bolaoId]);

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
    <BolaoLayout bolao={bolao}>
      <Outlet context={{ bolao }}/>
    </BolaoLayout>
  );
}
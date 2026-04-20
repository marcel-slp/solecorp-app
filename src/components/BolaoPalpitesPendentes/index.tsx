// components/BolaoPalpitesPendentes.tsx
import { Box, Heading, VStack, HStack, Text, Badge, Icon } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Palpite } from '../../stores/palpitesStore';
import { Partida } from '../../stores/partidasStore';
import { Bolao } from '../../stores/bolaoStore';
import { IoBarChart } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";

interface BolaoPalpitesPendentesProps {
  boloes: Bolao[];
  palpitesBolao: Record<number, Palpite[]>;
  partidas: Record<number, Partida>;
}

export default function BolaoPalpitesPendentes({ 
  boloes, 
  palpitesBolao, 
  partidas 
}: BolaoPalpitesPendentesProps) {

  const boloesComStatus = useMemo(() => {
    return boloes.map(bolao => {
      const palpitesDoUsuario = palpitesBolao[bolao.userId] || [];

      const totalJogos = Object.keys(partidas).length;
      const palpitesPreenchidos = palpitesDoUsuario.filter(p => 
        p.placarCasa !== null && p.placarFora !== null
      ).length;

      const faltantes = Math.max(0, totalJogos - palpitesPreenchidos);

      return {
        ...bolao,
        palpitesFaltantes: faltantes,
        totalJogos,
        completado: faltantes === 0
      };
    });
  }, [boloes, palpitesBolao, partidas]);

  return (
    <Box>
      <Heading size="md" mb={4} display="flex" alignItems="center" gap={2}>
        <Icon as={IoBarChart } />
        Status dos Meus Bolões
      </Heading>

      <VStack spacing={3} align="stretch">
        {boloesComStatus.map((bolao) => (
          <Box
            key={bolao.id}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
            borderColor={bolao.completado ? "green.200" : "red.200"}
          >
            <HStack justify="space-between">
              <Text fontWeight="semibold">{bolao.nome}</Text>
              
              <Badge 
                colorScheme={bolao.completado ? "green" : "red"}
                fontSize="sm"
                px={3}
                py={1}
              >
                {bolao.completado 
                  ? <Icon color="green" as={FaCircleCheck } /> + "Completo" 
                  : `${bolao.palpitesFaltantes} faltante${bolao.palpitesFaltantes > 1 ? 's' : ''}`}
              </Badge>
            </HStack>

            <Text fontSize="sm" color="gray.600" mt={1}>
              {bolao.palpitesFaltantes === 0 
                ? "Todos os palpites foram preenchidos" 
                : `${bolao.palpitesFaltantes} de ${bolao.totalJogos} jogos pendentes`}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
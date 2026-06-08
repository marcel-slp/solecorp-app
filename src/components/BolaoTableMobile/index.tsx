/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Card,
  CardHeader,
  Heading,
  HStack,
  IconButton,
  SimpleGrid,
  Text
} from "@chakra-ui/react";
import { ArrowForwardIcon, Image } from "@chakra-ui/icons";
import { Bolao, BolaoListaGerenciamento } from "../../stores/bolaoStore";
import { Link } from "react-router-dom";
import { getImagemURL, 
//  retornaUserId
} from "../../utils/Utils";
import { classificacaoStore, PontuacaoParticipanteComPosicao } from "../../stores/classificacaoStore";
import { useEffect, 
//  useState
} from "react";

type BolaoTableProps = {
  boloes: Bolao[] | BolaoListaGerenciamento[];
};

export default function BolaoTableMobile({ boloes }: BolaoTableProps) {
  const { getRankingOrdenado } = classificacaoStore();
  // const [rankingsPorBolao, setRankingsPorBolao] = useState<
  //   Record<string, PontuacaoParticipanteComPosicao[]>
  // >({});

  //const loggedUserId = retornaUserId();

  useEffect(() => {
    const loadAll = async () => {
      const rankingsTemp: Record<string, PontuacaoParticipanteComPosicao[]> =
        {};

      for (const bolao of boloes) {
        const ranking = await getRankingOrdenado(bolao.id);
        rankingsTemp[bolao.id] = ranking;
      }

      //setRankingsPorBolao(rankingsTemp);
    };

    loadAll();
  }, [boloes, getRankingOrdenado]);

  return (
    <Box>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
        spacing={5}
        paddingBottom={4}
      >
        {boloes.map((bolao: any) => {
          // const ranking = rankingsPorBolao[bolao.id] || [];
          // const posicaoIndex = ranking.findIndex(
          //   (r) => r.userId === loggedUserId
          // );
          //const posicao = posicaoIndex !== -1 ? posicaoIndex + 1 : null;

          return (
            <Link
              key={bolao.id}
              to={`/mobile/bolao-mobile/${bolao.id}/palpite-mobile`}
              style={{ textDecoration: "none" }}
            >
              <Card
                key={bolao.id}
                variant="outline"
                borderRadius="xl"
                boxShadow="sm"
                _hover={{
                  boxShadow: "md",
                  transform: "translateY(-4px)",
                  borderColor: "blue.300"
                }}
                transition="all 0.2s"
                height="100%"
              >
                <CardHeader
                  pb={4}
                  height="100%"
                  display="flex"
                  flexDirection="column"
                >
                  <HStack spacing={4} align="center" flex="1">
                    <Image
                      src={String(getImagemURL(String(bolao.imagemBolao)))}
                      alt="Logo"
                      w="38px"
                      h="38px"
                      objectFit="cover"
                      borderRadius="10px"
                    />

                    <Box flex="1">
                      <Heading size="md" noOfLines={1}>
                        {bolao.nome}
                      </Heading>
                      <Text fontSize="xs" color="gray.500">
                        COPA DO MUNDO 2026
                      </Text>
                      {/* <Text fontWeight="bold" w="40px">
                        {bolao.id}
                      </Text> */}
                    </Box>
                    {/* {posicao && (
                      <Text fontWeight="bold" w="40px" color={"yellow.400"}>
                        #{posicao}º
                      </Text>
                    )} */}

                    <IconButton
                      aria-label="Entrar nos Palpites do Bolão"
                      icon={<ArrowForwardIcon />}
                      colorScheme="gray"
                      size="md"
                      variant="solid"
                    />
                  </HStack>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}

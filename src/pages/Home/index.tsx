import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  VStack,
  Text
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { bolaoStore } from "../../stores/bolaoStore";
import { partidasStore } from "../../stores/partidasStore";
import { retornaUserId } from "../../utils/Utils";
import ListaJogosDia from "../../components/ListaJogosDoDia";
import backgroundBlack from "@/assets/images/backbolao.jpg";
import jogadorHome from "@/assets/images/jogador_homebolao.png";
import logoSmall from "@/assets/images/sportsManager.ico";
import NewsFeed from "../../components/NewsFeed";
import BolaoTable from "../../components/BolaoTable";

export function Home() {
  const { boloes, carregarBoloesPorUserId } = bolaoStore();
  const { partidas, carregarPartidas } = partidasStore();

  const navigate = useNavigate();

  useEffect(() => {
    carregarBoloesPorUserId(retornaUserId());
    carregarPartidas(1);
  }, [carregarBoloesPorUserId, carregarPartidas]);

  return (
    <Box
      pl={6}
			pt={2}
      minH="100vh"
      backgroundImage={`url(${backgroundBlack})`}
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Grid templateColumns="60% 40%" gap={6}>
        <GridItem>
          <Flex direction="column" gap={6}>
            <Grid templateColumns="1fr 1fr 1fr" gap={6}>
              <Box bg="whiteAlpha.100">
								<Text fontSize="md" fontWeight="bold" color={"white"}>
									Solecorp
								</Text>

								<Image src={logoSmall} boxSize="40px" alignSelf={"flex-start"}/>

								<Heading size="lg" mt={6} color={"green.400"} fontWeight={"bold"} justifySelf={"center"}>
									Bolão Control
								</Heading>

								<VStack spacing={6} mt={6}>
									<Link
										color="white"
										onClick={() => navigate("/boloes")}
									>
										Criar Bolão
									</Link>

									<Link
										color="white"
										onClick={() => navigate("/boloes")}
									>
										Meus Bolões
									</Link>

									<Link color="white">
										Notificações
									</Link>
								</VStack>
              </Box>

              <Flex align="center" justify="center">
                <Image
                  src={jogadorHome}
                  maxH="220px"
                  objectFit="contain"
                />
              </Flex>

              <Box bg="whiteAlpha.800" p={4} borderRadius="lg">
                <VStack spacing={4} align="center">

									<Heading size="md" mb={4}>
										Bolões Abertos
									</Heading>

									<BolaoTable isHome boloes={boloes} />
                </VStack>
              </Box>
            </Grid>

            <Box bg="whiteAlpha.800" p={2} borderRadius="lg">
              <ListaJogosDia
                partidas={partidas}
                participantesQtd={0}
                mostrarPalpites={false}
              />
            </Box>

          </Flex>
        </GridItem>

        <GridItem>
          <Box
            bg="whiteAlpha.800"
            borderRadius="lg"
            p={6}
            minH="100%"
          >
            <NewsFeed />
          </Box>
        </GridItem>

      </Grid>
    </Box>
  );
}

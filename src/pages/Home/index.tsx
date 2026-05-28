import {
  Box,
  //Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  VStack,
  Text,
  Icon,
  Button,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { bolaoStore } from "../../stores/bolaoStore";
import { partidasStore } from "../../stores/partidasStore";
import { retornaUserId } from "../../utils/Utils";
import ListaJogosDia from "../../components/ListaJogosDoDia";
import jogadorHome from "@/assets/images/jogador_homebolao.png";
import logoSmall from "@/assets/images/logosolecorp-2.jpg";
import NewsFeed from "../../components/NewsFeed";
import { FaBell, FaFileCirclePlus, FaFolder } from "react-icons/fa6";
import BolaoTableHome from "../../components/BolaoTableHome";
import * as styles from "./styles.css";

export function Home() {
  const { carregarBoloesPorUserId } = bolaoStore();
  const { partidas, carregarPartidas } = partidasStore();

  const navigate = useNavigate();

  useEffect(() => {
    carregarBoloesPorUserId(retornaUserId());
    carregarPartidas(1);
  }, [carregarBoloesPorUserId, carregarPartidas]);

  return (
    <Box className={styles.homeContainer}>
      <Grid className={styles.mainGrid}>
        
        <GridItem className={styles.leftColumn}>
          <Grid className={styles.topSection}>
            <Box>
              <Text fontSize="md" fontWeight="bold" color="white">Solecorp</Text>
              <Image src={logoSmall} boxSize="40px" alt="Logo" />

              <Heading size="lg" mt={6} color="green.400" fontWeight="bold">
                Bolão Control
              </Heading>

              <VStack spacing={4} mt={6} alignItems="flex-start" className={styles.buttonsContainer}>
                <Button width="50%" colorScheme="green" onClick={() => navigate("/boloes")}>
                  <Icon as={FaFileCirclePlus} mr={2} />
                  Criar Bolão
                </Button>

                <Button width="50%" colorScheme="green" onClick={() => navigate("/boloes")}>
                  <Icon as={FaFolder} mr={2} />
                  Meus Bolões
                </Button>

                <Button width="50%" colorScheme="green" disabled>
                  <Icon as={FaBell} mr={2} />
                  Notificações
                </Button>
              </VStack>
            </Box>

            <Box className={styles.playerImageContainer}>
              <Image src={jogadorHome} maxH={{ base: "170px", md: "220px" }} objectFit="contain" />
            </Box>

            <Box className={styles.card}>
              <VStack spacing={4} align="center">
                <Heading size="md" mb={4} textAlign="center">Bolões Abertos</Heading>
                <BolaoTableHome />
              </VStack>
            </Box>
          </Grid>

          <Box className={styles.card}>
            <ListaJogosDia
              partidas={partidas}
              mostrarPalpites={false}
            />
          </Box>
        </GridItem>

        <GridItem>
          <Box className={styles.card}>
            <NewsFeed />
          </Box>
        </GridItem>

      </Grid>
    </Box>
  );
}

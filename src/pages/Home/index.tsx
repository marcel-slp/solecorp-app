import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  VStack,
  // Text,
  Icon,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import jogadorHome from "@/assets/images/jogador_homebolao.png";
// import logoSmall from "@/assets/images/logosolecorp-2.jpg";
import NewsFeed from "../../components/NewsFeed";
import { FaBell, FaFileCirclePlus, FaFolder } from "react-icons/fa6";
import * as styles from "./styles.css";

export function Home() {

  const navigate = useNavigate();
  return (
    <Box className={styles.homeContainer}>
      <Grid className={styles.mainGrid}>
        <GridItem className={styles.leftColumn}>
          <Grid className={styles.topSection}>
            <Box>
              {/* <Text fontSize="md" fontWeight="bold" color="white">Solecorp App</Text>
              <Image src={logoSmall} boxSize="40px" alt="Logo" /> */}

              <Heading size="xl" mt={6} color="green.400" fontWeight="bold">
                Sistema Gerenciador de Competições Esportivas
              </Heading>

              <VStack spacing={4} mt={6} alignItems="flex-start" className={styles.buttonsContainer}>
                <Button width="50%" colorScheme="green" onClick={() => navigate("/eventos")}>
                  <Icon as={FaFileCirclePlus} mr={2} />
                  Criar Evento
                </Button>

                <Button width="50%" colorScheme="green" onClick={() => navigate("/eventos")}>
                  <Icon as={FaFolder} mr={2} />
                  Meus Eventos
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
                <Heading size="md" mb={4} textAlign="center">Eventos Abertos</Heading>
              </VStack>
            </Box>
          </Grid>
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

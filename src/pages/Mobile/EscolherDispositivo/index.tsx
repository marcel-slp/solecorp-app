import { Box, Button, Heading, Icon, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { FaDesktop, FaMobileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as styles from "./styles.css";

export default function EscolherDispositivo() {
  const navigate = useNavigate();

  return (
    <Box className={styles.container}>
      <VStack spacing={10} align="center">
        <Heading className={styles.title}>
          Como você quer acessar?
        </Heading>

        <SimpleGrid 
          columns={{ base: 1, md: 2 }} 
          spacing={8} 
          maxW="900px"
        >
          <Button
            className={styles.deviceButton}
            onClick={() => navigate("/home")}
            leftIcon={<Icon as={FaDesktop} fontSize={{ base: "32px", md: "42px" }} />}
            height={{ base: "160px", md: "150px" }} 
            fontSize={{ base: "xs", md: "2xl" }}
            colorScheme="blue"
            variant="solid"
            width="100%"
          >
            <VStack spacing={2}>
              <Text>Versão Desktop</Text>
              <Text fontSize={{ base: "sm", md: "md" }} opacity={0.9}>
                Acesso Completo</Text>
            </VStack>
          </Button>

          <Button
            className={styles.deviceButton}
            onClick={() => navigate("/mobile/boloes-mobile")}
            leftIcon={<Icon as={FaMobileAlt} fontSize="42px" />}
            height={{ base: "160px", md: "150px" }} 
            fontSize={{ base: "xs", md: "2xl" }}
            colorScheme="green"
            variant="solid"
            width="100%"
          >
            <VStack spacing={2}>
              <Text>Versão Celular</Text>
              <Text fontSize="md" opacity={0.9}>Acesso somente para Palpites</Text>
            </VStack>
          </Button>
        </SimpleGrid>
      </VStack>
    </Box>
  );
}
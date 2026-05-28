import { useNavigate, useParams } from "react-router-dom";
import { 
  Button, 
  Checkbox, 
  Heading, 
  Link, 
  Text, 
  useDisclosure, 
  VStack,
  Box,
  Center
} from "@chakra-ui/react";
import { bolaoStore } from "../../stores/bolaoStore";
import { useState } from "react";
import BolaoRegulamento from "../../components/BolaoRegulamento/index.tsx";
import { ModalGenerico } from "../../components/ModalGenerico/index.tsx";

export default function BolaoConvite() {
  const { bolaoId } = useParams<{ bolaoId: string }>();
  const navigate = useNavigate();
  const { aceitarConvite } = bolaoStore();

  const [checkRegulamento, setCheckRegulamento] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const auth = JSON.parse(localStorage.getItem("auth") ?? "{}");
  const isLoggedIn = auth?.userId && auth?.expiresAt && Date.now() < auth.expiresAt;

  const handleAceitarConvite = async () => {
    if (!bolaoId) return;
    
    try {
      const success = await aceitarConvite({ bolaoId, userId: auth.userId });
      if (success) {
        navigate(`/escolher-dispositivo`);
      } else {
        alert("Erro ao aceitar convite");
      }
    } catch (err) {
      alert("Falha ao aceitar convite");
      console.error(err);
    }
  };

  if (!isLoggedIn) {
    return (
      <VStack mt={20} spacing={4}>
        <Heading size="md">Convite para participar do bolão</Heading>
        <Text>Bem- vindo! Você foi convidado para participar do bolão</Text>

        <Button
          colorScheme="blue"
          onClick={() =>
            navigate("/login", {
              state: {
                redirectTo: `/convite/bolao/${bolaoId}`,
              },
            })
          }
        >
          Fazer login para participar
        </Button>

        <Button
          variant="outline"
          onClick={() =>
            navigate("/registro", {
              state: {
                redirectTo: `/convite/bolao/${bolaoId}`,
              },
            })
          }
        >
          Criar conta
        </Button>
      </VStack>
    );
  }

  return (
    <Box p={{ base: 6, md: 10 }} minH="100vh" bg="gray.50">
      <Center>
        <VStack 
          spacing={{ base: 6, md: 8 }} 
          align="center" 
          maxW="500px" 
          w="full"
          textAlign="center"
        >
          <Heading size={{ base: "lg", md: "xl" }}>
            Convite para o Bolão
          </Heading>

          <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
            Você foi convidado para participar do bolão
          </Text>

          <Link 
            onClick={onOpen} 
            color="blue.600" 
            fontWeight="medium"
            fontSize={{ base: "md", md: "lg" }}
            _hover={{ textDecoration: "underline" }}
          >
            Ver Regulamento do Bolão
          </Link>

          <Checkbox
            size={{ base: "lg", md: "lg" }}
            isChecked={checkRegulamento}
            onChange={(e) => setCheckRegulamento(e.target.checked)}
            colorScheme="green"
            fontSize={{ base: "md", md: "lg" }}
          >
            Aceito as condições do regulamento
          </Checkbox>

          <Button 
            colorScheme="green" 
            size={{ base: "lg", md: "xl" }}
            width="full"
            height={{ base: "52px", md: "56px" }}
            fontSize={{ base: "lg", md: "xl" }}
            onClick={handleAceitarConvite} 
            isDisabled={!checkRegulamento}
          >
            Aceitar Convite
          </Button>

          <ModalGenerico 
            isOpen={isOpen} 
            onClose={onClose} 
            titulo="Regulamento do Bolão" 
            conteudo={<BolaoRegulamento />} 
            tamanho="full"
          />
        </VStack>
      </Center>
    </Box>
  );
}

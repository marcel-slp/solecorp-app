import { useNavigate, useParams } from "react-router-dom";
import { Button, Checkbox, Heading, Link, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { bolaoStore } from "../../stores/bolaoStore";
import { useState } from "react";
//import * as styles from "./styles.css.ts";
import BolaoRegulamento from "../../components/BolaoRegulamento/index.tsx";
import { ModalGenerico } from "../../components/ModalGenerico/index.tsx";

export default function BolaoConvite() {
  const { bolaoId } = useParams<{ bolaoId: string }>();
  const navigate = useNavigate();
  const { aceitarConvite } = bolaoStore();

  const [checkRegulamento, setCheckRegulamento] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const auth = JSON.parse(localStorage.getItem("auth") ?? "{}");
  const isLoggedIn =
    auth?.userId && auth?.expiresAt && Date.now() < auth.expiresAt;

  const handleAceitarConvite = async () => {
    try {
      if(bolaoId) {
        const success = await aceitarConvite({bolaoId: bolaoId, userId: auth.userId});

        if (!success) {
          alert("Erro ao aceitar convite");
          return;
        }

        navigate(`/bolao/${bolaoId}/palpite`);
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
    <VStack mt={20} spacing={4}>
      <Heading size="md">Convite para o bolão</Heading>
      <Text>Você foi convidado para participar do bolão</Text>

      <Link
        onClick={() => onOpen()}
        color={'blue'}
      >
        Ver Regulamento do Bolão
      </Link>

      <Checkbox
        style={{paddingRight: '20px'}}
        isChecked={checkRegulamento}
        backgroundColor={'white'}
        onChange={(e) => setCheckRegulamento(e.target.checked)}
      >
        Aceita condições do regulamento?
      </Checkbox>

      <Button colorScheme="green" onClick={handleAceitarConvite} disabled={!checkRegulamento}>
        Aceitar convite
      </Button>
      <ModalGenerico 
        isOpen={isOpen} 
        onClose={onClose} 
        titulo={''} 
        conteudo={<BolaoRegulamento />} 
        tamanho="full"
      />
    </VStack>
  );
}

import {
  Button,
  HamburgerIcon,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SearchIcon,
  useDisclosure
} from "@chakra-ui/icons";
import { Text } from "@chakra-ui/react";
import * as styles from "./styles.css";
import { IoMdCart, IoMdLogOut } from "react-icons/io";
import { BsPersonCircle } from "react-icons/bs";
import { FaHouse } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

export type Props = {
  modoBolao?: boolean;
};

export function HeaderTopMobile({ modoBolao }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [nomeUsuario, setNomeUsuario] = useState<string | null>(null);
  const [emailUsuario, setEmailUsuario] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
    onClose();
  };

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth") ?? "{}");

    if (auth.nome && auth.email && auth.nomePerfil) {
      setNomeUsuario(auth.nome);
      setEmailUsuario(auth.email);
    } else {
      setNomeUsuario(null);
      setEmailUsuario(null);
    }
  }, []);

  return (
    <div className={styles.headerTop}>
      <div className={styles.leftSection}>
        <div className={styles.menuIcon}>
          <HamburgerIcon boxSize={5} />
        </div>

        <div className={styles.titleWrapper}>
          <div className={styles.titleRow}>
            <Text style={{ marginTop: "5px" }}>
              {modoBolao ? "Bolão Control" : "SoleCorp"}
            </Text>

            <Link to="/boloes-mobile" aria-label="Ir para home">
              <Icon as={FaHouse} className={styles.iconSmall} />
            </Link>
            <a
              href="https://www.solecorp.com.br/bolao-help"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ir para ajuda"
            >
              <FaQuestionCircle
                className={styles.iconSmall}
                style={{ marginTop: "5px" }}
              />
            </a>
            <a
              href="https://www.solecorp.com.br/busca"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ir para busca"
            >
              <SearchIcon
                className={styles.iconSmall}
                style={{ marginTop: "5px" }}
              />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.rightSection}>
        <Popover placement="bottom">
          <PopoverTrigger>
            <Icon as={BsPersonCircle} className={styles.iconSmall} />
          </PopoverTrigger>
          <PopoverContent
            color="white"
            bg="blue.800"
            borderColor="blue.800"
            width="fit-content"
          >
            <PopoverBody>
              {nomeUsuario && emailUsuario ? (
                <>
                  <Text fontSize="sm">
                    <strong>Nome:</strong> {nomeUsuario}
                  </Text>
                  <Text fontSize="sm">
                    <strong>Email:</strong> {emailUsuario}
                  </Text>
                  <Text
                    fontSize="sm"
                    onClick={onOpen}
                    style={{ marginTop: "10px" }}
                    cursor="pointer"
                  >
                    Sair
                  </Text>
                </>
              ) : (
                <Text fontSize="sm">Usuário não logado</Text>
              )}
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Icon as={IoMdCart} className={styles.iconSmall} />
        <Icon
          as={IoMdLogOut}
          cursor="pointer"
          className={styles.iconSmall}
          onClick={() => onOpen()}
        />

        {isOpen && (
          <Modal isOpen={!!isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Logout</ModalHeader>
              <ModalCloseButton />
              <ModalBody>Deseja realmente sair?</ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleLogout}>
                  Sim
                </Button>
                <Button onClick={onClose}>Cancelar</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default HeaderTopMobile;

import {
  AddIcon,
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
import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
  Text
} from "@chakra-ui/react";
import * as styles from "./styles.css";
import { IoMdLogOut } from "react-icons/io";
import { BsPersonCircle } from "react-icons/bs";
import { MdEmojiEvents } from "react-icons/md";
import { FaFutbol, FaGear, FaHouse, FaPeopleGroup } from "react-icons/fa6";
import { TbShieldFilled } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PerfilSistema } from "../../models/PerfilSistema";
import { FaQuestionCircle } from "react-icons/fa";
import { configuracoesStore } from "../../stores/configuracoesStore";

export type Props = {
  modoBolao?: boolean;
  publicHeader?: boolean;
  mobile?: boolean;
};

const paginasGerenciamento = [
  {
    label: "Inserir Placares",
    path: "/inserir-placares-copa-2026"
  },
  {
    label: "Gerenciar Perfis",
    path: "/gerenciar-perfil"
  },
  {
    label: "Gerenciar Usuários",
    path: "/gerenciar-usuarios"
  },
  {
    label: "Gerenciar Bolões",
    path: "/gerenciar-boloes"
  },
  {
    label: "Gerenciar Jogadores",
    path: "/gerenciar-jogadores"
  },
  {
    label: "Gerenciar Seleções",
    path: "/gerenciar-selecoes"
  },
  {
    label: "Gerenciar Prêmios Individuais",
    path: "/gerenciar-premios-individuais"
  }
];

export function HeaderTop({ modoBolao, publicHeader = false, mobile }: Props) {
  const { atualizarConfiguracao, getConfig, getValor } = configuracoesStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [nomeUsuario, setNomeUsuario] = useState<string | null>(null);
  const [emailUsuario, setEmailUsuario] = useState<string | null>(null);
  const [perfilUsuario, setPerfilUsuario] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
    onClose();
  };

  const configManutencao = getConfig("modo_manutencao");

  const isModoManutencao = getValor("modo_manutencao") === 1;

  const toggleModoManutencao = async () => {
    const novoValor = isModoManutencao ? 0 : 1;
    if(configManutencao) {
      const sucesso = await atualizarConfiguracao(configManutencao.id, configManutencao?.nome, novoValor);

      if (!sucesso) {
        console.error("Falha ao alterar modo de manutenção");
      }
    } else {
      alert("Não foi possível carregar estado de manutenção");
    }
  };

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth") ?? "{}");

    if (auth.nome && auth.email && auth.nomePerfil) {
      setNomeUsuario(auth.nome);
      setEmailUsuario(auth.email);
      setPerfilUsuario(auth.nomePerfil);
    } else {
      setNomeUsuario(null);
      setEmailUsuario(null);
      setPerfilUsuario(null);
    }
  }, []);

  const esconderIconesBolaoAdmin =
    publicHeader ||
    mobile ||
    (modoBolao && perfilUsuario != PerfilSistema.ADMIN);
  const esconderIconesBolaoUser = publicHeader || !modoBolao || mobile;
  const esconderIconesManager = publicHeader || modoBolao || mobile;

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

            <Link
              to={mobile ? "/mobile/boloes-mobile" : "/home"}
              aria-label="Ir para home"
            >
              <Icon as={FaHouse} className={styles.iconSmall} />
            </Link>
            <Link
              to="/boloes"
              aria-label="Ir para bolões"
              hidden={esconderIconesBolaoUser}
            >
              <Icon as={FaFutbol} className={styles.iconSmall} />
            </Link>

            <Menu>
              <MenuButton as={Box} cursor={"pointer"}>
                {!esconderIconesBolaoAdmin && (
                  <Icon
                    as={FaGear}
                    className={styles.iconAdmin}
                    aria-label="Admin"
                  />
                )}
              </MenuButton>

              <MenuList bg={"whiteAlpha"} zIndex={2000}>
                {paginasGerenciamento.map((pagina) => (
                  <MenuItem
                    key={pagina.path}
                    bg={"green.500"}
                    onClick={() => navigate(pagina.path)}
                  >
                    {pagina.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

            <Link
              to="/eventos"
              aria-label="Ir para eventos"
              hidden={esconderIconesManager}
            >
              <Icon as={MdEmojiEvents} className={styles.iconSmall} />
            </Link>
            <Link
              to="/participantes"
              aria-label="Ir para participantes"
              hidden={esconderIconesManager}
            >
              <Icon as={FaPeopleGroup} className={styles.iconSmall} />
            </Link>
            <Link
              to="/entidades"
              aria-label="Ir para novo evento"
              hidden={esconderIconesManager}
            >
              <Icon as={TbShieldFilled} className={styles.iconSmall} />
            </Link>
            <Link
              to="/novo-participante"
              aria-label="Ir para novo participante"
              hidden={esconderIconesManager}
            >
              <Icon
                as={AddIcon}
                className={styles.iconSmall}
                marginBottom="5px"
              />
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
        <Text marginRight={-2} marginTop={2}>
          Modo Manutenção?
        </Text>
        <Switch
          hidden={esconderIconesBolaoAdmin}
          isChecked={isModoManutencao}
          onChange={toggleModoManutencao}
          colorScheme="orange"
          title="Modo Manutenção"
          marginRight={2}
          marginTop={2}
        />

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

export default HeaderTop;

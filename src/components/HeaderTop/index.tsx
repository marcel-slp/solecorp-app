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
  QuestionOutlineIcon, 
  SearchIcon,
  useDisclosure
} from "@chakra-ui/icons";
import {
  Text
} from "@chakra-ui/react";
import * as styles from "./styles.css";
import {IoMdCart, IoMdHome, IoMdLogOut} from 'react-icons/io';
import { BsPersonCircle } from "react-icons/bs";
import { MdEmojiEvents, MdScoreboard } from "react-icons/md";
import { FaPeopleGroup, FaUsersGear  } from "react-icons/fa6";
import { TbShieldFilled } from "react-icons/tb";
//import { GrConfigure } from "react-icons/gr";
import { GiTrophyCup } from "react-icons/gi";
import { RiUserSettingsFill } from "react-icons/ri";
import { FaClipboardList } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PerfilSistema } from "../../models/PerfilSistema";

export type Props = {
    modoBolao?: boolean;
    publicHeader?: boolean;
};

export function HeaderTop({ modoBolao, publicHeader=false }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [nomeUsuario, setNomeUsuario] = useState<string | null>(null);
  const [emailUsuario, setEmailUsuario] = useState<string | null>(null);
  const [perfilUsuario, setPerfilUsuario] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
    onClose();
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

  // const usuarioLogado = (): boolean => {
  //   const auth = JSON.parse(localStorage.getItem("auth") ?? "{}");
    
  //   if (auth.nome && auth.email && auth.perfilBolao) {
  //     setNomeUsuario(auth.nome);
  //     setEmailUsuario(auth.email);
  //     setPerfilBolaoUsuario(auth.perfilBolao);
  //     return true;
  //   } else {
  //     setNomeUsuario(null);
  //     setEmailUsuario(null);
  //     setPerfilBolaoUsuario(null);
  //     return false;
  //   }
  // };

  const esconderIconesBolaoAdmin = publicHeader || (modoBolao && perfilUsuario != PerfilSistema.ADMIN);
  const esconderIconesBolaoUser = publicHeader || !modoBolao;
  const esconderIconesManager = publicHeader || modoBolao;
  
  return (
    <div className={styles.headerTop}>
      <div className={styles.leftSection}>
        <div className={styles.menuIcon}>
          <HamburgerIcon boxSize={5} />
        </div>

        <div className={styles.titleWrapper}>
          <div className={styles.titleRow}>
            {modoBolao ? "Solecorp Bolão" : "SoleCorp Sports Manager"}

            <Link to="/home" aria-label="Ir para home">
              <Icon as={IoMdHome} className={styles.iconSmall} />
            </Link>
            <Link to="/boloes" aria-label="Ir para bolões" hidden={esconderIconesBolaoUser}>
              <Icon as={MdScoreboard} className={styles.iconSmall} />
            </Link>
            <Link to="/inserir-placares-copa-2026" aria-label="Inserir Placares" hidden={esconderIconesBolaoAdmin}>
              <Icon as={GiTrophyCup} className={styles.iconSmall} />
            </Link>
            <Link to="/gerenciar-perfil" aria-label="Gerenciar Perfis do Sistema" hidden={esconderIconesBolaoAdmin}>
              <Icon as={FaUsersGear } className={styles.iconSmall} />
            </Link>
            <Link to="/gerenciar-usuarios" aria-label="Gerenciar Usuários do Sistema" hidden={esconderIconesBolaoAdmin}>
              <Icon as={RiUserSettingsFill } className={styles.iconSmall} />
            </Link>
            <Link to="/gerenciar-boloes" aria-label="Gerenciar Todos os Bolões do Sistema" hidden={esconderIconesBolaoAdmin}>
              <Icon as={FaClipboardList } className={styles.iconSmall} />
            </Link>
            <Link to="/eventos" aria-label="Ir para eventos" hidden={esconderIconesManager}>
            <Icon as={MdEmojiEvents} className={styles.iconSmall} />
            </Link>
            <Link to="/participantes" aria-label="Ir para participantes" hidden={esconderIconesManager}>
              <Icon as={FaPeopleGroup} className={styles.iconSmall} />
            </Link>
            <Link to="/entidades" aria-label="Ir para novo evento" hidden={esconderIconesManager}>
              <Icon as={TbShieldFilled} className={styles.iconSmall} />
            </Link> 
            <Link to="/novo-participante" aria-label="Ir para novo participante" hidden={esconderIconesManager}>
              <Icon as={AddIcon} className={styles.iconSmall} marginBottom="5px"/>
            </Link>
            <Link to="/help" aria-label="Ir para ajuda">
              <Icon as={QuestionOutlineIcon} className={styles.iconSmall} marginBottom="5px"/>
            </Link>
            <Link to="/search" aria-label="Ir para pesquisa" hidden={publicHeader}>
              <Icon as={SearchIcon} className={styles.iconSmall} marginBottom="5px"/>
            </Link>
          </div>
        </div>
      </div>

      

      <div className={styles.rightSection}>
        <Popover placement='bottom'>
          <PopoverTrigger>
            <Icon as={BsPersonCircle} className={styles.iconSmall}/>
          </PopoverTrigger>
          <PopoverContent color='white' bg='blue.800' borderColor='blue.800' width='fit-content'>
            <PopoverBody>
              {nomeUsuario && emailUsuario ? (
                <>
                  <Text fontSize="sm"><strong>Nome:</strong> {nomeUsuario}</Text>
                  <Text fontSize="sm"><strong>Email:</strong> {emailUsuario}</Text>
                  <Text fontSize="sm" onClick={onOpen} style={{marginTop: '10px'}} cursor='pointer'>Sair</Text>
                </>
              ) : (
                <Text fontSize="sm">Usuário não logado</Text>
              )}
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Icon as={IoMdCart} className={styles.iconSmall}/>
        <Icon 
          as={IoMdLogOut} 
          cursor='pointer' 
          className={styles.iconSmall} 
          onClick={() => onOpen()}
        />

        {isOpen && (
          <Modal
              isOpen={!!isOpen}
              onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Logout</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Deseja realmente sair?
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={handleLogout}>
                  Sim
                </Button>
                <Button onClick={onClose}>
                  Cancelar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default HeaderTop;

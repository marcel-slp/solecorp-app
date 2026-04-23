import { Link, useLocation } from "react-router-dom";
import * as styles from "./styles.css";
import { DownloadIcon, EditIcon, Icon, Image } from "@chakra-ui/icons";
import { IoIosCamera, IoIosMore, IoIosPrint, IoIosSave, IoMdRedo, IoMdShare, IoMdUndo } from "react-icons/io";
import { bolaoStore } from "../../stores/bolaoStore";

interface Props {
  nome: string;
  imagem: string;
  modoBolao?: boolean;
}

export function HeaderNav({ nome, imagem, modoBolao }: Props) {

  const { participanteBolaoLogado } = bolaoStore();

  const location = useLocation();

  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return currentPath.endsWith(path);
  };

  const usuarioLogadoPalpiteHabilitado = participanteBolaoLogado?.habilitarPalpite ?? false;

  return (
    <div className={styles.navigationContainer}>
      <Link to="./inicio" style={{ width: "40px", height: "40px" }}>
        <div className={styles.imageLink}>
          <Image
            src={imagem}
            alt="Logo"
            className={styles.imageLogo}
          />
        </div>
      </Link>

      <div className={styles.nomeEvento}>
        {nome}
      </div>

      <Link
        to="./inicio"
        className={styles.itemLink}
        style={{
          backgroundColor: isActive("/inicio") || currentPath.endsWith(`/evento/${location.pathname.split('/')[2]}`) ? "rgb(5, 98, 39)" : "transparent",
          color: isActive("/inicio") || currentPath.endsWith(`/evento/${location.pathname.split('/')[2]}`) ? "white" : "white",
        }}
      >
        INÍCIO
      </Link>

      <Link
        to="./classificacao"
        className={styles.itemLink}
        style={{
          backgroundColor: isActive("classificacao") ? "rgb(5, 98, 39)" : "transparent",
          color: isActive("classificacao") ? "white" : "white",
        }}
      >
        CLASSIFICAÇÃO
      </Link>

      <Link
        to={modoBolao ? "./palpite" : "./tabela"}
        className={styles.itemLink}
        hidden={!usuarioLogadoPalpiteHabilitado}
        style={{
          backgroundColor: isActive("tabela") || isActive("palpite") ? "rgb(5, 98, 39)" : "transparent",
          color: isActive("tabela") ? "white" : "white",
        }}
      >
        {modoBolao ? 'PALPITE' :'TABELA'}
      </Link>

      {!modoBolao && (
        <>
          <Link
            to="./estatistica"
            className={styles.itemLink}
            style={{
              backgroundColor: isActive("estatistica") ? "rgb(5, 98, 39)" : "transparent",
              color: isActive("estatistica") ? "white" : "white",
            }}
          >
            ESTATÍSTICA
          </Link>

          <Link
            to="./grafico"
            className={styles.itemLink}
            style={{
              backgroundColor: isActive("grafico") ? "rgb(5, 98, 39)" : "transparent",
              color: isActive("grafico") ? "white" : "white",
            }}
          >
            GRÁFICO
          </Link>

          <Link
            to="./resumo"
            className={styles.itemLink}
            style={{
              backgroundColor: isActive("resumo") ? "rgb(5, 98, 39)" : "transparent",
              color: isActive("resumo") ? "white" : "white",
            }}
          >
            RESUMO
          </Link>
      
          <div className={styles.iconBar}>
            <Icon color='white' className={styles.headerIcon} as={IoIosSave}/>
            <EditIcon color='white' className={styles.headerIcon}/>
            <Icon color='white' className={styles.headerIcon} as={IoMdUndo}/>
            <Icon color='white' className={styles.headerIcon} as={IoMdRedo}/>
            <Icon color='white' className={styles.headerIcon} as={IoIosCamera}/>
            <Icon color='white' className={styles.headerIcon} as={IoIosPrint}/>
            <Icon color='white' className={styles.headerIcon} as={IoMdShare}/>
            <DownloadIcon color='white' className={styles.headerIcon}/>
            <Icon color='white' className={styles.headerIcon} as={IoIosMore}/>
          </div>
        </>
      )}
    </div>
  );
}

export default HeaderNav;
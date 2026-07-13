import { Link, useLocation } from "react-router-dom";
import * as styles from "./styles.css";
import { Bolao, bolaoStore } from "../../stores/bolaoStore";
import { useState } from "react";
import { getImagemURL, recordToArray } from "../../utils/Utils";
import { Image } from "@chakra-ui/icons";
import { palpitesStore } from "../../stores/palpitesStore";
import { IconButton } from "@chakra-ui/react";
import { FaSave } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

interface HeaderNavMobileProps {
  bolao: Bolao;
}

export default function HeaderNavMobile({ bolao }: HeaderNavMobileProps) {
  const { participanteBolaoLogado } = bolaoStore();
  const { palpitesUsuario, salvarPalpites } = palpitesStore();
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath.includes(path);

  const usuarioLogadoPalpiteHabilitado =
    participanteBolaoLogado?.habilitarPalpite ?? false;

  const isPalpitesPage = currentPath.includes("palpite");

  const salvarPalpitesHandle = async () => {
    if (!bolao.id)
      return alert("Algo deu errado. Palpite não associado a nenhum bolão");

    setIsSaving(true);
    setIsSaved(false);

    try {
      const okSalvarPalpites = await salvarPalpites(
        recordToArray(palpitesUsuario)
      );

      setIsSaving(false);

      if (okSalvarPalpites) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      }
    } catch (err) {
      alert("Falha ao salvar palpites");
      console.error(err);
    }
  };

  return (
    <div className={styles.navigationContainer}>
      <div className={styles.navLinks}>
        <Link to="/mobile/boloes-mobile" style={{ width: "40px", height: "40px" }}>
          <div className={styles.imageLink}>
            <Image
              src={String(getImagemURL(String(bolao.imagemBolao)))}
              alt="Logo"
              className={styles.imageLogo}
            />
          </div>
        </Link>

        <Link
          to="./classificacao-mobile"
          className={styles.itemLink}
          style={{
            backgroundColor: isActive("classificacao")
              ? "rgb(5, 98, 39)"
              : "transparent"
          }}
        >
          CLASSIFICAÇÃO
        </Link>

        {usuarioLogadoPalpiteHabilitado && (
          <>
            <Link
              to={"./palpite-mobile"}
              className={styles.itemLink}
              style={{
                backgroundColor: isActive("palpite")
                  ? "rgb(5, 98, 39)"
                  : "transparent"
              }}
            >
              PALPITE
            </Link>

            {isPalpitesPage && (
              <IconButton
                aria-label="Salvar Palpites"
                icon={isSaved ? <FaCheck /> : <FaSave />}
                isLoading={isSaving}
                colorScheme="yellow"
                variant="solid"
                size="md"
                onClick={salvarPalpitesHandle}
                className={styles.saveButton}
                _loading={{
                  opacity: 0.85
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

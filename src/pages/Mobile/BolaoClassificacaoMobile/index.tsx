import * as styles from "./styles.css.ts";
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Select,
  Spinner,
  Text
} from "@chakra-ui/react";
import { useOutletContext } from "react-router-dom";
import { Bolao } from "../../../stores/bolaoStore.ts";
import { CRITERIOS_ABAS } from "../../../utils/Utils.ts";
import { useEffect, useRef, useState } from "react";
import { classificacaoStore } from "../../../stores/classificacaoStore.ts";
import { BsFileExcel, BsFillPrinterFill, BsImage } from "react-icons/bs";
import { PDFClassificacao } from "../../../components/PDFClassificacao/index.tsx";
import { PDFDownloadLink } from "@react-pdf/renderer";
import * as htmlToImage from "html-to-image";
import TabelaClassificacaoBolaoMobile from "../../../components/TabelaClassificacaoBolaoMobile/index.tsx";

function BolaoClassificacaoMobile() {
  const { bolao } = useOutletContext<{ bolao: Bolao }>();
  const imageRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showForCapture, setShowForCapture] = useState(false);
  const [exportMode, setExportMode] = useState<"all" | "general">("all");

  const [criterioSelecionado, setCriterioSelecionado] = useState(
    CRITERIOS_ABAS[0].key
  );

  const { loading, error, carregarClassificacao } = classificacaoStore();

  useEffect(() => {
    carregarClassificacao(bolao.id);
  }, [bolao.id, carregarClassificacao]);

  const handleGenerateImage = async (mode: "all" | "general" = "all") => {
    setExportMode(mode);
    setIsGenerating(true);
    setShowForCapture(true);

    setTimeout(async () => {
      try {
        const dataUrl = await htmlToImage.toPng(imageRef.current!, {
          quality: 1,
          pixelRatio: 2,
          backgroundColor: "#ffffff"
        });

        const filename =
          mode === "general"
            ? `Classificacao_Geral_${bolao.nome}.png`
            : `Solecorp_Rankings_${bolao.nome}.png`;

        const link = document.createElement("a");
        link.download = filename;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error(err);
        alert("Erro ao gerar a imagem");
      } finally {
        setShowForCapture(false);
        setIsGenerating(false);
      }
    }, 700);
  };

  const handleExportCSV = () => {
    const { getClassificacaoPorCriterio } = classificacaoStore.getState();

    let csvContent = "Rankings - " + bolao.nome + "\n\n";

    CRITERIOS_ABAS.forEach((aba) => {
      const dados = getClassificacaoPorCriterio(aba.key);

      csvContent += `${aba.label}\n`;
      csvContent += "POS;PARTICIPANTE;PTS\n";

      dados.forEach((item) => {
        csvContent += `${item.posicao};${item.participante};${item.pts}\n`;
      });

      csvContent += "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.download = `Classificacao_${bolao.nome}.csv`;
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" color="blue.500" />
        <Text mt={4}>Calculando pontuações...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={20}>
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <>
      <div className={styles.classificacaoContainer}>
        <div className={styles.tituloImagem}>
          <HStack spacing={2} wrap="wrap" justify="center">
            <Button
              leftIcon={<BsImage />}
              colorScheme="blue"
              onClick={() => handleGenerateImage("general")}
              isLoading={isGenerating}
            >
              Imagem
            </Button>

            <PDFDownloadLink
              document={<PDFClassificacao bolaoNome={bolao.nome} />}
              fileName={`Solecorp_Rankings_${bolao.nome}.pdf`}
            >
              {({ loading }) => (
                <Button
                  leftIcon={<Icon as={BsFillPrinterFill} />}
                  colorScheme="red"
                  isLoading={loading}
                >
                  PDF
                </Button>
              )}
            </PDFDownloadLink>

            <Button
              leftIcon={<BsFileExcel />}
              colorScheme="green"
              onClick={handleExportCSV}
            >
              CSV
            </Button>
          </HStack>
        </div>

        <Box mb={6} px={2}>
          <Text mb={2} fontWeight="medium">
            Selecione o Ranking:
          </Text>
          <Select
            value={criterioSelecionado}
            onChange={(e) => setCriterioSelecionado(e.target.value)}
            size="lg"
            bg="gray.100"
            borderRadius="md"
            fontWeight="medium"
          >
            {CRITERIOS_ABAS.map((aba) => (
              <option key={aba.key} value={aba.key}>
                {aba.label}
              </option>
            ))}
          </Select>
        </Box>

        <div className={styles.folha}>
          <TabelaClassificacaoBolaoMobile
            criterioFiltro={criterioSelecionado}
          />
        </div>
      </div>

      <div
        ref={imageRef}
        style={{
          position: "absolute",
          left: showForCapture ? "0" : "-99999px",
          top: showForCapture ? "0" : "-99999px",
          visibility: showForCapture ? "visible" : "hidden",
          width: "fit-content",
          padding: "30px",
          backgroundColor: "white",
          zIndex: 9999,
          boxShadow: "0 0 10px rgba(0,0,0,0.1)"
        }}
      >
        <Heading
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "28px"
          }}
        >
          {bolao.nome} -{" "}
          {exportMode === "general"
            ? "Classificação Geral"
            : "Classificação Completa"}
        </Heading>

        {exportMode === "general" ? (
          <TabelaClassificacaoBolaoMobile
            criterioFiltro="Geral"
            isGeral={true}
          />
        ) : (
          <div className={styles.imageExportAbas}>
            {CRITERIOS_ABAS.map((aba) => {
              const isGeral = aba.key === "Geral";
              return (
                <div key={aba.key} className={styles.imageExportAbaUnica}>
                  <Text
                    className={styles.imageExportAbaLabel}
                    style={{
                      backgroundColor: isGeral ? "#1e3a8a" : "transparent",
                      color: isGeral ? "white" : "black"
                    }}
                  >
                    {aba.label}
                  </Text>
                  <TabelaClassificacaoBolaoMobile
                    criterioFiltro={aba.key}
                    isGeral={isGeral}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default BolaoClassificacaoMobile;

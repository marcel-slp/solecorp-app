import * as styles from "./styles.css.ts";
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from "@chakra-ui/react";
import TabelaClassificacaoBolao from "../../../components/TabelaClassificacaoBolao/index.tsx";
import { useOutletContext } from "react-router-dom";
import { Bolao } from "../../../stores/bolaoStore.ts";
import { CRITERIOS_ABAS } from "../../../utils/Utils.ts";
import { useEffect, useRef, useState } from "react";
import { classificacaoStore } from "../../../stores/classificacaoStore.ts";
import { BsFileExcel, BsFillPrinterFill, BsImage } from "react-icons/bs";
import { PDFClassificacao } from "../../../components/PDFClassificacao/index.tsx";
import { PDFDownloadLink } from "@react-pdf/renderer";
import * as htmlToImage from "html-to-image";

export interface PontuacaoParticipante {
  userId: number;
  nome: string;
  ptsPlacarCravado: number;
  ptsResultado: number;
  ptsGols: number;
  ptsDiferencaGols: number;
  ptsPenaltis: number;
  ptsTotalExtra2: number;
  ptsClassificacaoFaseGrupos: number;
  ptsClassificacaoPlayoff: number;
  ptsTotalParticipante: number;
  posicao?: number;
}

function BolaoClassificacao() {
  const { bolao } = useOutletContext<{ bolao: Bolao }>();
  const imageRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showForCapture, setShowForCapture] = useState(false);
  const [criterioSelecionado, setCriterioSelecionado] = useState(
    CRITERIOS_ABAS[0].key
  );

  const { loading, error, carregarClassificacao } = classificacaoStore();

  useEffect(() => {
    carregarClassificacao(bolao.id);
  }, [bolao.id, carregarClassificacao]);

  const abaAtual = CRITERIOS_ABAS.find((a) => a.key === criterioSelecionado);

  const handleGenerateImage = async () => {
    if (!imageRef.current) return;

    setIsGenerating(true);
    setShowForCapture(true);

    setTimeout(async () => {
      try {
        const dataUrl = await htmlToImage.toPng(imageRef.current!, {
          quality: 1,
          pixelRatio: 2,
          backgroundColor: "#ffffff"
        });

        const filename = `${abaAtual?.label || criterioSelecionado}_${bolao.nome}.png`;

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
          <HStack spacing={4} align="center">
            <Button
              leftIcon={<BsImage />}
              colorScheme="blue"
              onClick={handleGenerateImage}
              isLoading={isGenerating}
            >
              Baixar Imagem
            </Button>

            <PDFDownloadLink
              document={<PDFClassificacao bolaoNome={bolao.nome} />}
              fileName={`Solecorp_Rankings_${bolao.nome}.pdf`}
              className={styles.pdfLink}
            >
              {({ loading }) => (
                <Button
                  leftIcon={<Icon as={BsFillPrinterFill} />}
                  colorScheme="red"
                  isLoading={loading}
                >
                  Baixar PDF
                </Button>
              )}
            </PDFDownloadLink>

            <Button
              leftIcon={<BsFileExcel />}
              colorScheme="green"
              onClick={handleExportCSV}
            >
              Exportar CSV
            </Button>
          </HStack>
        </div>

        <div className={styles.folha}>
          <Tabs
            variant="soft-rounded"
            width="fit-content"
            onChange={(index) => {
              setCriterioSelecionado(CRITERIOS_ABAS[index].key);
            }}
          >
            <TabList>
              {CRITERIOS_ABAS.map((aba) => (
                <Tab key={aba.key} bgColor={"white"} marginRight={"2"}>
                  {aba.label}
                </Tab>
              ))}
            </TabList>

            <TabPanels>
              {CRITERIOS_ABAS.map((aba) => (
                <TabPanel key={aba.key} width="50%">
                  <TabelaClassificacaoBolao criterioFiltro={aba.key} />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
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
          {bolao.nome} - {abaAtual?.label}
        </Heading>

        <div key={abaAtual?.key} className={styles.imageExportAbaUnica}>
          <Text className={styles.imageExportAbaLabel}>{abaAtual?.label}</Text>
        </div>

        <TabelaClassificacaoBolao criterioFiltro={criterioSelecionado} />
      </div>
    </>
  );
}

export default BolaoClassificacao;

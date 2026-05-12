
import * as styles from "./styles.css.ts";
import { Box, 
  //Button, Icon, 
  Image, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import tituloClassificacao from "@/assets/images/tituloClassificacao.jpg";
import TabelaClassificacaoBolao from "../../../components/TabelaClassificacaoBolao/index.tsx";
import { useOutletContext } from "react-router-dom";
import { Bolao } from "../../../stores/bolaoStore.ts";
import { retornaUserId } from "../../../utils/Utils.ts";
import { useEffect } from "react";
import { classificacaoStore } from "../../../stores/classificacaoStore.ts";
//import { BsFillPrinterFill } from "react-icons/bs";

const CRITERIOS_ABAS = [
  { key: "Geral", label: "Classificação Geral" },
  { key: "Placar Cravado", label: "Placar Cravado" },
  { key: "Diferença", label: "Diferença" },
  { key: "Gols", label: "Gols" },
  { key: "Resultado", label: "Resultado" },
  { key: "Classificação Pênaltis", label: "Pênaltis" },
  { key: "Extra", label: "Extra" },
  { key: "Classificação Fase Grupos", label: "Classificação Fase Grupos" },
  { key: "Classificação Playoff", label: "Classificação Playoff" },
  // { key: "Bônus 1", label: "Líder" },
  // { key: "Bônus 2", label: "Último isolado" },
  // { key: "Bônus 3", label: "Sem pontos no dia" },
];

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
  // //ptsMelhorTime1fase: number;
  // ptsMelhorJogador: number;
  // ptsMelhorGoleiro: number;
  // ptsArtilheiro: number;
  // ptsCampeao: number;
  // ptsViceCampeao: number;
  // ptsTerceiroLugar: number;
  // //ptsConvocacao: number;
  // ptsBonus1: number;
  // ptsBonus2: number;
  // ptsBonus3: number;
  ptsTotalParticipante: number;
  posicao?: number
}

function BolaoClassificacao() {
  const { bolao } = useOutletContext<{ bolao: Bolao }>();
  const loggedUserId = retornaUserId();

  const { loading, error, carregarClassificacao } = classificacaoStore();

  useEffect(() => {
    carregarClassificacao(bolao.id);
  }, [bolao.id, carregarClassificacao]);

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
    <div className={styles.classificacaoContainer}>
      <div className={styles.tituloImagem}>
        <Image src={tituloClassificacao} />
      </div>
      {/* <Button
        leftIcon={<Icon as={BsFillPrinterFill } />}
        colorScheme="blue"
        onClick={() => window.print()}
        width={60}
        left={1080}
        mb={4}
      >
        Imprimir Todos os Rankings
      </Button> */}
      <div className={styles.folha}>
        <Tabs variant="soft-rounded" >
          <TabList>
            {CRITERIOS_ABAS.map((aba) => (
              <Tab key={aba.key} bgColor={'white'} marginRight={'2'}>{aba.label}</Tab>
            ))}
          </TabList>

          <TabPanels>
            {CRITERIOS_ABAS.map((aba) => (
              <TabPanel key={aba.key}>
                <TabelaClassificacaoBolao
                  bolao={bolao}
                  loggedUserId={loggedUserId}
                  criterioFiltro={aba.key}
                />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default BolaoClassificacao;

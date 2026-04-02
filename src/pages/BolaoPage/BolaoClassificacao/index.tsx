
import * as styles from "./styles.css.ts";
import { Image, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import tituloClassificacao from "@/assets/images/tituloClassificacao.jpg";
import TabelaClassificacaoBolao from "../../../components/TabelaClassificacaoBolao/index.tsx";
import { useOutletContext } from "react-router-dom";
import { Bolao, bolaoStore } from "../../../stores/bolaoStore.ts";
import { retornaUserId } from "../../../utils/Utils.ts";
import { partidasStore } from "../../../stores/partidasStore.ts";
import { palpitesStore } from "../../../stores/palpitesStore.ts";
import { criteriosPontuacaoStore } from "../../../stores/criteriosPontuacaoStore.ts";
import { useEffect, useMemo } from "react";
import { calcularPontuacoesParticipantes } from "../../../components/TabelaClassificacaoBolao/scoreParticipantes.ts";

const CRITERIOS_ABAS = [
  { key: "Placar Cravado", label: "Placar Cravado" },
  { key: "Diferença", label: "Diferença" },
  { key: "Gols", label: "Gols" },
  { key: "Resultado", label: "Resultado" },
  { key: "Placar Cravado Pênaltis", label: "Placar Cravado Pênaltis" },
  { key: "Classificação Pênaltis", label: "Classificação Pênaltis" },
  // { key: "Bônus 1", label: "Líder" },
  // { key: "Bônus 2", label: "Último isolado" },
  // { key: "Bônus 3", label: "Sem pontos no dia" },
  { key: "Geral", label: "Classificação Geral" },
];

export interface PontuacaoParticipante {
  userId: number;
  nome: string;
  ptsPlacarCravado: number;
  ptsResultado: number;
  ptsGols: number;
  ptsDiferencaGols: number;
  ptsClassificacaoPenaltis: number;
  ptsPlacarCravadoPenaltis: number;
  // //ptsClassificacaoGrupos: number;
  // //ptsClassificacao2Fase: number;
  // //ptsMelhorTime1fase: number;
  // //ptsAtaqueArtilheiro: number;
  // //ptsMVPs: number;
  // //ptsPodio: number;
  // //ptsConvocacao: number;
  // ptsBonus1: number;
  // ptsBonus2: number;
  // ptsBonus3: number;
  ptsTotalParticipante: number;
}

function BolaoClassificacao() {
  const { bolao } = useOutletContext<{ bolao: Bolao }>();
  const { partidas, carregarPartidas } = partidasStore();
  const { palpitesBolao, carregarPalpitesPorBolao } = palpitesStore();
  const { pontuacaoCriterios, carregarPontuacaoCriterios } = criteriosPontuacaoStore();
  const { participantesBolao, carregarParticipantesBolao } = bolaoStore();

  const loggedUserId = retornaUserId();

  useEffect(() => {
    carregarParticipantesBolao(bolao.id, loggedUserId);
    carregarPalpitesPorBolao(bolao.id);
    carregarPartidas(1);
    carregarPontuacaoCriterios(bolao.id);
  }, [bolao.id, carregarPontuacaoCriterios, carregarPalpitesPorBolao, carregarParticipantesBolao, carregarPartidas, loggedUserId]);

  const pontuacoes = useMemo(() => {
    if (!participantesBolao.length) return [];

    return calcularPontuacoesParticipantes(
      participantesBolao,
      palpitesBolao,
      partidas,
      pontuacaoCriterios
    ) as PontuacaoParticipante[];

  }, [participantesBolao, palpitesBolao, partidas, pontuacaoCriterios]);
  
  return (
    <div className={styles.classificacaoContainer}>
      <div className={styles.tituloImagem}>
        <Image src={tituloClassificacao} />
      </div>
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
                  pontuacoes={pontuacoes}
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

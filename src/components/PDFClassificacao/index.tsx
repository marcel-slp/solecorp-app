import {
  Document,
  Page,
  Text,
  View
} from "@react-pdf/renderer";
import { CRITERIOS_ABAS } from "../../utils/Utils";
import {
  classificacaoStore,
  PontuacaoParticipanteComPosicao
} from "../../stores/classificacaoStore";
import * as styles from "./styles.css.ts";

interface PDFProps {
  bolaoNome: string;
}

export const PDFClassificacao = ({ bolaoNome }: PDFProps) => {
  const { getClassificacaoPorCriterio } = classificacaoStore();

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.default.page}>
        <Text style={styles.default.title}>
          {bolaoNome} - Classificação Completa
        </Text>

        <View style={styles.default.container}>
          {CRITERIOS_ABAS.slice(0, 4).map((aba) => {
            const dados = getClassificacaoPorCriterio(aba.key);
            const isGeral = aba.key === "Geral";

            return (
              <View 
                key={aba.key} 
                style={[styles.default.tableContainer, isGeral ? styles.default.tableContainerGeral : {}]}
              >
                <Text style={[styles.default.tableTitle, isGeral ? styles.default.tableTitleDark : {}]}>
                  {aba.label}
                </Text>

                <View style={styles.default.table}>
                  <View style={[styles.default.tableRow, styles.default.tableHeader, isGeral ? styles.default.tableHeaderDark : {}]}>
                    <Text style={styles.default.cellPos}>POS</Text>
                    <Text style={[styles.default.cellNome, {textAlign: 'center'}]}>NOME</Text>
                    <Text style={styles.default.cellPts}>PTS</Text>
                  </View>

                  {dados.slice(0, 10).map((item: PontuacaoParticipanteComPosicao, i: number) => (
                    <View key={i} style={styles.default.tableRow}>
                      <Text style={styles.default.cellPos}>{item.posicao}</Text>
                      <Text style={styles.default.cellNome}>{item.participante}</Text>
                      <Text style={styles.default.cellPts}>{item.pts}</Text>
                    </View>
                  ))}
                </View>
              </View>
            );
          })}
        </View>
      </Page>

      <Page size="A4" orientation="landscape" style={styles.default.page}>
        <Text style={styles.default.title}>
          {bolaoNome} - Classificação Completa (Continuação)
        </Text>

        <View style={styles.default.container}>
          {CRITERIOS_ABAS.slice(4).map((aba) => {
            const dados = getClassificacaoPorCriterio(aba.key);

            return (
              <View key={aba.key} style={styles.default.tableContainer}>
                <Text style={styles.default.tableTitle}>
                  {aba.label}
                </Text>

                <View style={styles.default.table}>
                  <View style={[styles.default.tableRow, styles.default.tableHeader]}>
                    <Text style={styles.default.cellPos}>POS</Text>
                    <Text style={[styles.default.cellNome, {textAlign: 'center'}]}>NOME</Text>
                    <Text style={styles.default.cellPts}>PTS</Text>
                  </View>

                  {dados.slice(0, 10).map((item: PontuacaoParticipanteComPosicao, i: number) => (
                    <View key={i} style={styles.default.tableRow}>
                      <Text style={styles.default.cellPos}>{item.posicao}</Text>
                      <Text style={styles.default.cellNome}>{item.participante}</Text>
                      <Text style={styles.default.cellPts}>{item.pts}</Text>
                    </View>
                  ))}
                </View>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};
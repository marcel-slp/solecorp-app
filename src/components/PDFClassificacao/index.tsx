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
          {CRITERIOS_ABAS.map((aba) => {
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

                  {dados.map((item: PontuacaoParticipanteComPosicao, i: number) => (
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
    // <Document>
    //   <Page size="A4" orientation="landscape" style={{padding: 30, fontSize: 11, fontFamily: "Helvetica"}}>
    //     <Text style={{fontSize: 18, marginBottom: 20, textAlign: "center", fontWeight: "bold"}}>
    //       {bolaoNome} - Classificação Completa
    //     </Text>

    //     {CRITERIOS_ABAS.map((aba) => {
    //       const classificacao = getClassificacaoPorCriterio(aba.key);

    //       return (
    //         <View key={aba.key} break>
    //           <Text style={{fontSize: 14, marginBottom: 10, marginTop: 25, fontWeight: "bold"}}>
    //             {aba.label}
    //           </Text>
    //           <View>
    //             <View>
    //               <Text>POS</Text>
    //               <Text>PARTICIPANTE</Text>
    //               <Text>PTS</Text>
    //             </View>

    //             {classificacao.map(
    //               (item: PontuacaoParticipanteComPosicao, index: number) => (
    //                 <View key={index}>
    //                   <Text>{item.posicao}</Text>
    //                   <Text>{item.participante}</Text>
    //                   <Text>{item.pts}</Text>
    //                 </View>
    //               )
    //             )}
    //           </View>
    //         </View>
    //       );
    //     })}
    //   </Page>
    // </Document>
  );
}

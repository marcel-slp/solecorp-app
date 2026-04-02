import { useEventoNavigation } from "../../../context/EventoNavigationContext.tsx";
import { JSX } from "react";
import TabelaJogos from "../../../components/TabelaJogos";
import { useOutletContext } from "react-router-dom";
import { Evento } from "../../../stores/eventosStore";
import * as styles from "./styles.css.ts";
import tituloTabela from "@/assets/images/tituloTabela.jpg";

function Tabela() {
  const { 
    faseAtiva, 
    grupoAtivo, 
    modoGeral, 
    letraParaNome, 
    letraParaSimbolo, 
    letraParaNomeEhPlaceholder, 
    tabelaPorGrupo,
    jogoIndicesPorGrupo 
  } = useEventoNavigation();
  const { evento } = useOutletContext<{ evento: Evento }>();

  if (modoGeral) {
    const grupos = tabelaPorGrupo[faseAtiva]
      ? Object.keys(tabelaPorGrupo[faseAtiva])
      : [];
    
    if (grupos.length === 0) {
      return (
        <>
          <div className={styles.folhaContainer}>
            <div className={styles.tituloImagem}>
              <img src={tituloTabela} />
            </div>
            <div className={styles.folha}>
              <p>Tabela não disponível para esta fase.</p>
            </div>
          </div>
        </>
      );
    }

    const maxRodadas = Math.max(
      ...grupos.map((grupo) => tabelaPorGrupo[faseAtiva][grupo].rodadas)
    );

    return (
      <>
        <div className={styles.folhaContainer}>
          <div className={styles.tituloImagem}>
            <img src={tituloTabela} />
          </div>
          <div className={styles.folha}>
            {Array.from({ length: maxRodadas }).map((_, rodadaIndex) => {
              const jogosPorRodada: JSX.Element[] = [];

              grupos.forEach((grupo) => {
                const tabela = tabelaPorGrupo[faseAtiva][grupo];
                if (rodadaIndex < tabela.rodadas) {
                  const linhasPorRodada = tabela.jogos;
                  for (
                    let linhaIndex = 0;
                    linhaIndex < linhasPorRodada;
                    linhaIndex++
                  ) {
                    const idx = linhaIndex * 2;
                    const letra1 = tabela.rodadasDetalhes[rodadaIndex][idx];
                    const letra2 = tabela.rodadasDetalhes[rodadaIndex][idx + 1];
                    const displayedLetra1 = letra1 + grupo;
                    const displayedLetra2 = letra2 + grupo;
                    const numeroJogo =
                      jogoIndicesPorGrupo[faseAtiva][grupo][rodadaIndex][
                        linhaIndex
                      ];

                    jogosPorRodada.push(
                      <TabelaJogos
                        key={`${grupo}-${rodadaIndex}-${linhaIndex}`}
                        letraParaNome={letraParaNome}
                        letraParaSimbolo={letraParaSimbolo}
                        letraParaNomeEhPlaceholder={letraParaNomeEhPlaceholder}
                        numeroJogo={numeroJogo}
                        letra1={letra1}
                        letra2={letra2}
                        fase={faseAtiva}
                        grupo={grupo}
                        displayedLetra1={displayedLetra1}
                        displayedLetra2={displayedLetra2}
                        eventoId={evento.id}
                      />
                    );
                  }
                }
              });

              if (jogosPorRodada.length === 0) return null;

              return (
                <div key={rodadaIndex} className={styles.rodadaBloco}>
                  <h3 className={styles.rodadaTitulo}>Rodada {rodadaIndex + 1}</h3>
                  {jogosPorRodada}
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }

  const tabela = tabelaPorGrupo[faseAtiva]?.[grupoAtivo];
  
  if (!tabela) {
    return (
      <>
        <div className={styles.folhaContainer}>
          <div className={styles.tituloImagem}>
            <img src={tituloTabela} />
          </div>
          <div className={styles.folha}>
            <p>Tabela não disponível para esta fase e grupo.</p>
          </div>
        </div>
      </>
    );
  }

  const linhasPorRodada = tabela.jogos;

  return (
    <>
      <div className={styles.folhaContainer}>
        <div className={styles.tituloImagem}>
          <img src={tituloTabela} />
        </div>
        <div className={styles.folha}>
          {Array.from({ length: tabela.rodadas }).map((_, rodadaIndex) => (
            <div key={rodadaIndex} className={styles.rodadaBloco}>
              <h3 className={styles.rodadaTitulo}>Rodada {rodadaIndex + 1}</h3>
              {Array.from({ length: linhasPorRodada }).map((_, linhaIndex) => {
                const idx = linhaIndex * 2;
                const letra1 = tabela.rodadasDetalhes[rodadaIndex][idx];
                const letra2 = tabela.rodadasDetalhes[rodadaIndex][idx + 1];
                const numeroJogo =
                  jogoIndicesPorGrupo[faseAtiva][grupoAtivo][rodadaIndex][
                    linhaIndex
                  ];

                return (
                  <TabelaJogos
                    key={`${grupoAtivo}-${rodadaIndex}-${linhaIndex}`}
                    letraParaNome={letraParaNome}
                    letraParaSimbolo={letraParaSimbolo}
                    letraParaNomeEhPlaceholder={letraParaNomeEhPlaceholder}
                    numeroJogo={numeroJogo}
                    letra1={letra1}
                    letra2={letra2}
                    fase={faseAtiva}
                    grupo={grupoAtivo}
                    eventoId={evento.id}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Tabela;

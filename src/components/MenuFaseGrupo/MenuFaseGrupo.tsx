import { useState } from "react";
import { useEventoNavigation } from "../../context/EventoNavigationContext";
import { Evento } from "../../stores/eventosStore";
import {
  gabaritoFase1,
  gabaritoFase2,
  gabaritoFase3,
  gabaritoFase4,
  modeloFase1,
  modeloFase2,
  modeloFase3,
  modeloFase4,
} from "../../globalsEventos";
import * as styles from "./styles.css.ts";

type Props = {
  paginaAtual?: string;
  evento: Evento;
};

export function MenuFaseGrupo({ paginaAtual, evento }: Props) {
  const {
    faseAtiva,
    setFaseAtiva,
    grupoAtivo,
    setGrupoAtivo,
    modoGeral,
    setModoGeral,
  } = useEventoNavigation();

  const [modoCompleta, setModoCompleta] = useState(false);
  const letrasGrupo = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const totalGrupos = evento.configuracaoFases[faseAtiva - 1]?.grupos || 0;
  const modoResumo = paginaAtual === "inicio" || paginaAtual === "resumo";
  const mostraBotaoGeral = faseAtiva > 1 && (paginaAtual === "classificacao" || paginaAtual === "estatistica");

  const gabaritos: Record<number, string> = {
    1: gabaritoFase1,
    2: gabaritoFase2,
    3: gabaritoFase3,
    4: gabaritoFase4,
  };

  const modelos: Record<number, string> = {
    1: modeloFase1,
    2: modeloFase2,
    3: modeloFase3,
    4: modeloFase4,
  };

  const corAtiva = "#0e5bebff";

  if (modoResumo) {
    return (
      <div className={styles.container}>
        <div className={styles.resumo}>
          <i />
          Evento composto de {evento.numeroFases} Fases
        </div>
        <div className={styles.linhaDivisoria} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.barra}>
        <div className={styles.fasesWrapper}>
          <i style={{ fontSize: '20px', color: evento.numeroFases === 1 ? 'gold' : 'black' }} />
          <span className={styles.itemSpan}>Fase</span>

          {evento.numeroFases === 1 ? (
            <span style={{ fontSize: '14px' }}>Fase única</span>
          ) : (
            Array.from({ length: evento.numeroFases }, (_, i) => {
              const num = i + 1;
              const ativa = faseAtiva === num;

              return (
                <div
                  key={num}
                  className={styles.botaoFase}
                  data-ativa={ativa || undefined}
                  onClick={() => {
                    setFaseAtiva(num);
                    setGrupoAtivo("A");
                    setModoGeral(false);
                  }}
                >
                  {num}ª Fase
                </div>
              );
            })
          )}
        </div>

        <div className={styles.gruposWrapper}>
          <i style={{ fontSize: '20px' }} />
          <span className={styles.itemSpan}>Grupo</span>

          {Array.from({ length: totalGrupos }, (_, i) => {
            const letra = letrasGrupo[i];
            const ativa = grupoAtivo === letra && !modoGeral;

            return (
              <div
                key={letra}
                className={styles.botaoGrupo}
                data-ativa={ativa || undefined}
                onClick={() => {
                  setGrupoAtivo(letra);
                  setModoGeral(false);
                }}
              >
                {letra}
              </div>
            );
          })}

          {totalGrupos > 1 && (
            <div
              className={styles.botaoEspecial}
              data-ativa={modoGeral || undefined}
              onClick={() => {
                setModoGeral(true);
                setModoCompleta(false);
              }}
            >
              Todos
            </div>
          )}

          {mostraBotaoGeral && (
            <div
              className={styles.botaoEspecial}
              data-ativa={modoCompleta || undefined}
              onClick={() => {
                setModoCompleta(true);
                setModoGeral(false);
              }}
              style={{
                border: `1px solid ${modoCompleta ? corAtiva : "silver"}`,
                backgroundColor: modoCompleta ? corAtiva : "#00a2ffff",
                color: modoCompleta ? "white" : "white",
               }}
            >
              Geral
            </div>
          )}

          <div className={styles.gabaritoInfo}>
            Gabarito Grupos: {gabaritos[faseAtiva]}{" "}
            {modelos[faseAtiva] !== "0000000000" && (
              <>
                | Modelo P-Off: {modelos[faseAtiva]}
              </>
            )}
          </div>

          <div className={styles.botaoSumulas}>Súmulas</div>
        </div>
      </div>

      <div className={styles.linhaDivisoria} />
    </div>
  );
}

export default MenuFaseGrupo;
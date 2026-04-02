import { Evento } from '../../../stores/eventosStore.ts';
import { Image } from '@chakra-ui/react'
import { getImagemURL } from "../../../utils/Utils.ts";
import * as styles from "./styles.css.ts";
import { useOutletContext } from "react-router-dom";
import default_patrocinador1 from "@/assets/images/default_patrocinador1.jpg";
import default_patrocinador2 from "@/assets/images/default_patrocinador2.jpg";
import default_patrocinador3 from "@/assets/images/default_patrocinador3.jpg";
import default_patrocinador4 from "@/assets/images/default_patrocinador4.jpg";

export function Inicio() {
  const { evento } = useOutletContext<{ evento: Evento }>();

  const patrocinadores = [
    evento.imagemPatrocinador1
      ? `${evento.imagemPatrocinador1}`
      : default_patrocinador1,
    evento.imagemPatrocinador2
      ? `${evento.imagemPatrocinador2}`
      : default_patrocinador2,
    evento.imagemPatrocinador3
      ? `${evento.imagemPatrocinador3}`
      : default_patrocinador3,
    evento.imagemPatrocinador4
      ? `${evento.imagemPatrocinador4}`
      : default_patrocinador4,
  ];

  const existeIndiceTecnico = (): boolean => 
    evento.configuracaoFases.some(
      indiceTecnico =>
        indiceTecnico.classificadosIndiceTecnico > 0 ? true : false
  );

  const infoEvento = [
    // { label: "Sigla da Entidade", value: evento.sigla },
    { label: "Nome do Evento", value: evento.nome },
    { label: "Quantidade de Fases", value: evento.numeroFases },
    // { label: "Tipo de Evento", value: evento.tipoEvento },
    { label: "Modalidade Esportiva", value: evento.modalidade },
    // { label: "Tipo de Esporte", value: evento.tipoEsporte },
    { label: "Forma de Sistema", value: evento.formaSistema},
    { label: "Modo de Classificação", value: evento.configuracaoEvento?.eliminacao || 'nao' },
    { label: "Índice Técnico", value: existeIndiceTecnico() ? 'presente' : 'ausente' },
    { label: "Desempate", value: evento.configuracaoEvento?.desempatePlayoff || 'nao' },
    { label: "Definir 3º Lugar", value: evento.configuracaoEvento?.definirTerceiroLugar || 'nao' },
    { label: "Sistema Europeu", value: evento.configuracaoEvento?.tipoPlayoff || 'nao'},
  ];

  return (
    <>
      <div style={{width:"100%"}}>
        <div>
          <div className={styles.folhaContainer}
          >
            <div className={styles.colunaEsquerda}> 
              {/* Parte superior esquerda - Símbolo do torneio */}
              <div className={styles.simboloTorneioContainer}>
                <Image
                  src={String(evento.imagemEvento)}
                  alt="Logotipo"
                  className={styles.simboloTorneio}
                />
                <div className={styles.infoTorneioContainer}>
                  {infoEvento.map((item, index) => {
                    const isNomeEvento = item.label === "Nome do Evento";
                    return (
                      <div
                        key={index}
                        style={{
                          color: isNomeEvento ? "blue" : "black",
                          fontWeight: isNomeEvento ? "bold" : "normal",
                        }}
                      >
                        {item.label}:{" "}
                        {item.value}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Seção de Patrocinadores */}
              <div className={styles.patrocinadoresContainer}>
                {patrocinadores.map((src, index) => (
                  <Image
                    key={index}
                    src={getImagemURL(src)}
                    alt={`Patrocinador ${index + 1}`}
                    className={styles.patrocinadoresItem}
                  />
                ))}
              </div>

              {/* Barra de Título */}
              <div className={styles.tituloConfigEventoContainer}>
                CONFIGURAÇÃO DAS FASES DO EVENTO:
              </div>

            {/* Parte inferior esquerda - Áreas das fases */}
              <div className={styles.areaFasesContainer}>
                {evento.configuracaoFases.map((fase, index) => {
                  return (
                    <div
                      key={index}
                      className={styles.areaFasesItem}
                      style={{
                        backgroundColor: 'vazio' in fase ? "#ccc" : "#333",
                        color: 'vazio' in fase ? "silver" : "white",
                      }}
                    >
                      <div className={styles.areaFasesTitulo}>                      
                        FASE {index + 1}
                      </div>
                      {!('vazio' in fase) && (
                        <div className={styles.areaFasesContainerVazio}>
                          <div style={{ flex: 1 }}>
                            {/* <div>Participantes</div> */}
                            <div>Nº.de.Grupos</div>
                            <div>Nº.de.Turnos</div>
                            <div>Classif.por.Grupo</div>
                            <div>Classif.Índ.Téc.</div>
                            <div>Total.Classif.Fase</div>
                          </div>
                          <div style={{ flex: 1 }}>
                            {/* <div>{fase.participantes}</div> */}
                            <div>{fase.grupos}</div>
                            <div>{fase.turnos}</div>
                            <div>{fase.classificadosPorGrupo}</div>
                            <div>{fase.classificadosIndiceTecnico}</div>
                            <div>{fase.classificadosPorGrupo * fase.grupos}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Coluna Direita */}
            <div className={styles.quadroDireitaContainer}>
              {/* Seção superior direita */}
              <div className={styles.quadroDireitaBoxes}>
                <div className={styles.quadroDireitaBoxSuperior}/>
                <div className={styles.quadroDireitaBoxSuperior}/>
              </div>

              {/* Seção inferior direita */}
              <div className={styles.quadroDireitaBoxes}>
                {["CAMPANHAS", "ARTILHEIROS", "PRÓXIMAS PARTIDAS"].map(
                  (titulo, index) => (
                    <div
                      key={index}
                      className={styles.quadroDireitaBoxSuperior}
                      style={{
                        boxSizing: "border-box"
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "bold",
                          marginBottom: "10px",
                        }}
                      >
                        {titulo}
                      </div>
                      <ol style={{ paddingLeft: "20px", margin: 0 }}>
                        {Array.from({ length: 10 }, (_, i) => (
                          <li
                            key={i}
                            className={styles.quadroDireitaContentItem}
                          >
                            {i + 1}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )
                )}
              </div>

              {/* Área complementar abaixo das listas */}
              <div className={styles.quadroDireitaBoxInferior}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import { useState, useEffect } from "react";
import { Participante } from "../../stores/participantesStore.ts";
import { 
  Text, Input, Select, Button, Heading,
  Alert,
  AlertIcon,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Switch
} from "@chakra-ui/react";
import * as styles from "../EventoForm/styles.css.ts";
import { ConfiguracaoEvento, ConfiguracaoFases, Evento, NovoEvento } from "../../stores/eventosStore.ts";
import { ImageUploader } from "../ImageUploader/ImageUploader.tsx";
import { ParticipanteSelectorDualBox } from "../ParticipanteSelector/ParticipanteSelectorDualBox.tsx";
import { ClassificacaoFinal, ConfiguracaoPlayoff, DesempatePlayoff, Eliminacao, Formacao, FormaSistema, FormatoFase, FormatoTabela, TipoPlayoff } from "../../models/ConfiguracaoEvento.tsx";
import defaultEvento from "@/assets/images/default_evento.jpg";
import default_patrocinador1 from "@/assets/images/default_patrocinador1.jpg";
import default_patrocinador2 from "@/assets/images/default_patrocinador2.jpg";
import default_patrocinador3 from "@/assets/images/default_patrocinador3.jpg";
import default_patrocinador4 from "@/assets/images/default_patrocinador4.jpg";
import { existePlayerNoEvento } from "../../utils/Utils.ts";

const FASE_VAZIA: ConfiguracaoFases = {
  formatoFase: undefined,
  grupos: 1,
  turnos: 1,
  classificadosPorGrupo: 1,
  classificadosIndiceTecnico: 1
};

interface EventoFormProps {
  evento?: Evento | null;
  onSalvar: (dados: NovoEvento, id?: string) => void;
  onCancelar?: () => void;
}

export default function EventoForm({ evento, onSalvar, onCancelar }: EventoFormProps) {
  const [nomeEventoInterno, setNomeEventoInterno] = useState("");
  const [imagemEventoInterno, setImagemEventoInterno] = useState<File|string|null>(null);
  const [imagemPatrocinador1Interno, setImagemPatrocinador1Interno] = useState<File|null>(null);
  const [imagemPatrocinador2Interno, setImagemPatrocinador2Interno] = useState<File|null>(null);
  const [imagemPatrocinador3Interno, setImagemPatrocinador3Interno] = useState<File|null>(null);
  const [imagemPatrocinador4Interno, setImagemPatrocinador4Interno] = useState<File|null>(null);
  const [modalidadeEventoInterno, setModalidadeEventoInterno] = useState<string>("futebol");
  const [tabelaEventoInterno, setTabelaEventoInterno] = useState<string>("padrao");
  const [playoffEventoInterno, setPlayoffEventoInterno] = useState<string>("");
  const [compartilhamentoEventoInterno, setCompartilhamentoEventoInterno] = useState("");
  const [numeroParticipantesInterno, setNumeroParticipantesInterno] = useState<number>(3);
  const [numeroFasesInterno, setNumeroFasesInterno] = useState<number>(1);
  const [eventoParticipantesInterno, setEventoParticipantesInterno] = useState<Participante[]>([]);
  const [mensagemAlerta, setMensagemAlerta] = useState<string|null>(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [configuracaoFasesInterno, setConfiguracaoFasesInterno] = useState<ConfiguracaoFases[]>([FASE_VAZIA]);
  const [configuracaoEventoInterno, setConfiguracaoEventoInterno] = useState<ConfiguracaoEvento>({
    formacao: Formacao.PADRAO,
    eliminacao: Eliminacao.SIMPLES,
    formatoTabela: FormatoTabela.NORMAL,
    configuracaoPlayoff: undefined,
    tipoPlayoff: undefined,
    desempatePlayoff: undefined,
    classificacaoFinal: ClassificacaoFinal.POR_ETAPA,
    definirTerceiroLugar: 'nao'
  });
  const [atribuirPlayer, setAtribuirPlayer] = useState<boolean>(false);

  useEffect(() => {
    if (evento) {
      setNomeEventoInterno(evento.nome);
      setImagemEventoInterno(evento.imagemEvento);
      setImagemPatrocinador1Interno(evento.imagemPatrocinador1);
      setImagemPatrocinador2Interno(evento.imagemPatrocinador2);
      setImagemPatrocinador3Interno(evento.imagemPatrocinador3);
      setImagemPatrocinador4Interno(evento.imagemPatrocinador4);
      setModalidadeEventoInterno(evento.modalidade);
      setTabelaEventoInterno(evento.tabela);
      setPlayoffEventoInterno(evento.playoff);
      setCompartilhamentoEventoInterno(evento.compartilhamento);
      setNumeroParticipantesInterno(evento.numeroParticipantes);
      setNumeroFasesInterno(evento.numeroFases);
      setAtribuirPlayer(existePlayerNoEvento(evento));
      setEventoParticipantesInterno(evento.participantes ?? []);

      if(evento.configuracaoFases && evento.configuracaoFases.length > 0) {
        setConfiguracaoFasesInterno(evento.configuracaoFases);
      }

      if(evento.configuracaoEvento) {
        setConfiguracaoEventoInterno(evento.configuracaoEvento);
      }
    }
  }, [evento]);

  useEffect(() => {
    if (!existeFaseTipoPlayoff()) {
      setConfiguracaoEventoInterno((prev) => ({
        ...prev,
        configuracaoPlayoff: undefined,
        tipoPlayoff: undefined,
        desempatePlayoff: undefined,
      }));
    }
  //TODO: refazer este useEffect sem usar o useEffect
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configuracaoFasesInterno]);

  const handleChangeConfiguracaoFase = (
    e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>,
    faseIdx: number
  ) => {
    const { name, value } = e.target;

    setConfiguracaoFasesInterno((prev) => {
      const copia = [...prev];
      const valorConvertido = isNaN(Number(value)) ? value : Number(value);

      copia[faseIdx] = {
        ...copia[faseIdx],
        [name]: valorConvertido === '' ? undefined : valorConvertido,
      };
      return copia;
    });
  };

  const handleChangeConfiguracaoEvento = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setConfiguracaoEventoInterno((prev) => {
        return {
        ...prev,
        [name]:value || undefined
        };
    });
  };

  const existeFaseTipoPlayoff = (): boolean => 
    configuracaoFasesInterno.some(
      fase =>
        fase.formatoFase === FormatoFase.PLAYOFF
  );

  const definirFormaSistema = () => {
  if (numeroFasesInterno !== 1) {
    return FormaSistema.TORNEIO;
  }

  const formatoPrimeiraFase = configuracaoFasesInterno[0]?.formatoFase;

  return formatoPrimeiraFase === FormatoFase.PLAYOFF
    ? FormaSistema.COPA
    : formatoPrimeiraFase === FormatoFase.GRUPOS
    ? FormaSistema.LIGA
    : FormaSistema.TORNEIO;
};
  
  const camposConfigFasesValidos = (): boolean =>
    configuracaoFasesInterno.every(
      fase =>
        fase.formatoFase !== undefined &&
        fase.grupos !== undefined &&
        fase.turnos !== undefined &&
        fase.classificadosPorGrupo !== undefined &&
        fase.classificadosIndiceTecnico !== undefined
  );

  const handleSubmit = () => {
    if (
      !nomeEventoInterno || 
      !modalidadeEventoInterno || 
      !tabelaEventoInterno || 
      !playoffEventoInterno || 
      !compartilhamentoEventoInterno || 
      !numeroFasesInterno || 
      !numeroParticipantesInterno ||
      !Array.isArray(eventoParticipantesInterno)
    ) {
      setMensagemAlerta("Preencha todos os dados obrigatórios");
      return;
    } else if(eventoParticipantesInterno.length !== numeroParticipantesInterno) {
      setMensagemAlerta("Preencha o número total de participantes");
      return;
    } else if (!camposConfigFasesValidos()) {
      setMensagemAlerta("Preencha a configuração das fases");
      return;
    }

    setMensagemAlerta(null);

    const participantesFinal = atribuirPlayer 
      ? eventoParticipantesInterno 
      : eventoParticipantesInterno.map(p => ({ ...p, nomePlayer: undefined }));

    const novoEvento: NovoEvento = {
      nome: nomeEventoInterno,
      imagemEvento: imagemEventoInterno,
      imagemPatrocinador1: imagemPatrocinador1Interno,
      imagemPatrocinador2: imagemPatrocinador2Interno,
      imagemPatrocinador3: imagemPatrocinador3Interno,
      imagemPatrocinador4: imagemPatrocinador4Interno,
      formaSistema: definirFormaSistema(),
      modalidade: modalidadeEventoInterno,
      tabela: tabelaEventoInterno,
      playoff: playoffEventoInterno,
      compartilhamento: compartilhamentoEventoInterno,
      numeroFases: numeroFasesInterno,
      numeroParticipantes: numeroParticipantesInterno,
      participantes: participantesFinal,
      configuracaoFases: configuracaoFasesInterno ?? undefined,
      configuracaoEvento: configuracaoEventoInterno ?? undefined
    };
    
    onSalvar(novoEvento, evento?.id);
  };
    
  return (
    <>
      <Heading size="md" mb={4} mt={4}>
          {evento ? "Editar Evento" : "Adicionar Evento"}
      </Heading>

      <div className={styles.addEventosContainer}>
        <Text>Nome:</Text>
        <div className={styles.eventoInputs}>
          <Input
            placeholder="Insira o nome do evento"
            value={nomeEventoInterno}
            onChange={(e) => setNomeEventoInterno(e.target.value)}
          />
        </div>

        <Text>Imagem do Evento:</Text>
        <ImageUploader imagem={imagemEventoInterno} imagemDefault={defaultEvento} onChange={setImagemEventoInterno} />

        <Text>Compartilhamento:</Text>
        <div className={styles.eventoDropdown}>
          <Select 
            placeholder="Selecione" 
            value={compartilhamentoEventoInterno} 
            onChange={(e) => setCompartilhamentoEventoInterno(e.target.value)}
            className={styles.eventoInputs}
          >
            <option value="publico">Público</option>
            <option value="privado">Privado</option>
          </Select>
        </div>

        <Text>Patrocinadores:</Text>
        <div className={styles.eventosPatrocinadorContainer}>
          <ImageUploader imagem={imagemPatrocinador1Interno} imagemDefault={default_patrocinador1} onChange={setImagemPatrocinador1Interno} />
          <ImageUploader imagem={imagemPatrocinador2Interno} imagemDefault={default_patrocinador2} onChange={setImagemPatrocinador2Interno} />
          <ImageUploader imagem={imagemPatrocinador3Interno} imagemDefault={default_patrocinador3} onChange={setImagemPatrocinador3Interno} />
          <ImageUploader imagem={imagemPatrocinador4Interno} imagemDefault={default_patrocinador4} onChange={setImagemPatrocinador4Interno} />
        </div>

        <Text>Número de Participantes:</Text>
        <div className={styles.eventoInputNumber}>
          <Input
            size={'md'}
            placeholder="Insira o numero de participantes do evento"
            maxLength={2}
            value={numeroParticipantesInterno}
            onChange={(e) => setNumeroParticipantesInterno(Number(e.target.value))}
          />
        </div>

        <Text>Partipantes:</Text>
        <ParticipanteSelectorDualBox
          selecionados={eventoParticipantesInterno}
          onChange={(selecionados) => {
            setMensagemAlerta(null);
            setEventoParticipantesInterno(selecionados);
          }}
          numeroMaximo={numeroParticipantesInterno}
        />

        <Text>Atribuir Players:</Text>
        <div className={styles.eventoInputs}>
          <Switch 
            size='md' 
            isChecked={atribuirPlayer} 
            onChange={(e) => setAtribuirPlayer(e.target.checked)}
          />
        </div>

        {atribuirPlayer && eventoParticipantesInterno.length > 0 && (
          eventoParticipantesInterno.map((participante, index) => (
                <>
                  <Text key={'txt'+ participante.id}>
                    {index + 1}. {participante.nome}
                  </Text>
                  <Input
                    key={'input' + participante.id}
                    style={{width: '30%'}}
                    value={participante.nomePlayer || ""}
                    onChange={(e) => {
                      const novos = [...eventoParticipantesInterno];
                      novos[index] = {
                        ...novos[index],
                        nomePlayer: e.target.value || undefined,
                      };
                      setEventoParticipantesInterno(novos);
                    }}
                  />
                </>
          ))
        )}

        <Text>Número de Fases:</Text>
        <div className={styles.eventoDropdown}>
          <Select
            value={numeroFasesInterno} 
            onChange={(e) => {
              const novoNumero = Number(e.target.value);
              setNumeroFasesInterno(novoNumero);
              setTabIndex(0);

              setConfiguracaoFasesInterno((prev) => {
                if (prev.length > novoNumero) {
                  return prev.slice(0, novoNumero);
                }
                if (prev.length < novoNumero) {
                  return [
                    ...prev,
                    ...Array.from({ length: novoNumero - prev.length }, () => FASE_VAZIA)
                  ];
                }
                return prev;
              });
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </Select>
        </div>

        <Text>Modalidade:</Text>
        <div className={styles.eventoDropdown}>
          <Select 
            placeholder="Selecione" 
            value={modalidadeEventoInterno} 
            onChange={(e) => setModalidadeEventoInterno(e.target.value)}
          >
            <option value="futebol">Futebol e derivados</option>
          </Select>
        </div>

        <Text>Tabela:</Text>
        <div className={styles.eventoDropdown}>
          <Select 
            placeholder="Selecione" 
            value={tabelaEventoInterno} 
            onChange={(e) => setTabelaEventoInterno(e.target.value)}
          >
            <option value="padrao">Padrão</option>
            <option value="personalizada">Personalizada</option>
          </Select>
        </div>

        <Text>Play-Off:</Text>
        <div className={styles.eventoDropdown}>
          <Select 
            placeholder="Selecione" 
            value={playoffEventoInterno} 
            onChange={(e) => setPlayoffEventoInterno(e.target.value)}
          >
            <option value="padrao">Padrão</option>
            <option value="personalizada">Personalizada</option>
          </Select>
        </div>
      </div>

      <Tabs variant="enclosed" colorScheme="blue" mt={4} index={tabIndex} onChange={(index) => setTabIndex(index)}>
        <TabList>
          {Array.from({ length: numeroFasesInterno }, (_, i) => (
            <Tab key={i}>Fase {i + 1}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {Array.from({ length: numeroFasesInterno }, (_, faseIdx) => {
            const fase = configuracaoFasesInterno[faseIdx] ?? {};

            return (
              <TabPanel key={faseIdx} className={styles.tabPanel}>
                <Text>Formato da Fase:</Text>
                <div className={styles.eventoOpcoesInputNumber}>
                  <Select 
                    placeholder="Selecione"
                    name="formatoFase" 
                    value={fase.formatoFase}
                    onChange={(e) => handleChangeConfiguracaoFase(e, faseIdx)}
                  >
                    <option value={FormatoFase.GRUPOS}>Grupos</option>
                    <option value={FormatoFase.PLAYOFF}>Play-Off</option>
                  </Select>
                </div>

                <Text>Número de Grupos:</Text>
                <div className={styles.eventoOpcoesInputNumber}>
                  <Input
                    value={fase.grupos ?? ''}
                    maxLength={2}
                    name="grupos"
                    onChange={(e) => handleChangeConfiguracaoFase(e, faseIdx)}
                  />
                </div>

                <Text>Número de Turnos:</Text>
                <div className={styles.eventoOpcoesInputNumber}>
                  <Input
                    value={fase.turnos ?? ''}
                    maxLength={2}
                    name="turnos"
                    onChange={(e) => handleChangeConfiguracaoFase(e, faseIdx)}
                  />
                </div>

                <Text>Número de Classificados Por Grupo:</Text>
                <div className={styles.eventoOpcoesInputNumber}>
                  <Input
                    value={fase.classificadosPorGrupo ?? ''}
                    maxLength={2}
                    name="classificadosPorGrupo"
                    onChange={(e) => handleChangeConfiguracaoFase(e, faseIdx)}
                  />
                </div>

                <Text>Número de Classificados Por Índice Técnico:</Text>
                <div className={styles.eventoOpcoesInputNumber}>
                  <Input
                    value={fase.classificadosIndiceTecnico ?? ''}
                    maxLength={2}
                    name="classificadosIndiceTecnico"
                    onChange={(e) => handleChangeConfiguracaoFase(e, faseIdx)}
                  />
                </div>
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>

      <Accordion allowMultiple style={{ width: "40%" }}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left' >
                Configurações Gerais do Evento
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel className={styles.accordionPanel}>
            <Text>Formação das Fases:</Text>
            <div className={styles.eventoAccordionDropdown}>
              <Select
                placeholder="Selecione" 
                value={String(configuracaoEventoInterno.formacao)}
                name="formacao"
                onChange={(e) => handleChangeConfiguracaoEvento(e)}
              >
                <option value={Formacao.PADRAO}>Padrão</option>
                <option value={Formacao.CAMPANHA_GERAL}>Campanha Geral</option>
                <option value={Formacao.PERSONALIZADA}>Personalizada</option>
              </Select>
            </div>

            <Text>Eliminação:</Text>
            <div className={styles.eventoAccordionDropdown}>
              <Select
                placeholder="Selecione" 
                value={String(configuracaoEventoInterno.eliminacao)}
                name="eliminacao"
                onChange={(e) => handleChangeConfiguracaoEvento(e)}
              >
                <option value={Eliminacao.SIMPLES}>Simples</option>
                <option value={Eliminacao.DUPLA}>Dupla</option>
                <option value={Eliminacao.MISTA}>Mista</option>
                <option value={Eliminacao.COMPLEXA}>Complexa</option>
              </Select>
            </div>

            <Text>Formato da Tabela:</Text>
            <div className={styles.eventoAccordionDropdown}>
              <Select
                placeholder="Selecione" 
                value={String(configuracaoEventoInterno.formatoTabela)}
                name="formatoTabela"
                onChange={(e) => handleChangeConfiguracaoEvento(e)}
              >
                <option value={FormatoTabela.NORMAL}>Normal</option>
                <option value={FormatoTabela.ESPELHADA}>Espelhada</option>
              </Select>
            </div>

            <Text>Configuração de Play-Off:</Text>
            <div className={styles.eventoAccordionDropdown}>
              <Select
                placeholder="Selecione" 
                value={String(configuracaoEventoInterno.configuracaoPlayoff)}
                disabled={!existeFaseTipoPlayoff()}
                name="configuracaoPlayoff"
                onChange={(e) => handleChangeConfiguracaoEvento(e)}
              >
                <option value={ConfiguracaoPlayoff.FIXO}>Fixo</option>
                <option value={ConfiguracaoPlayoff.SORTEIO}>Via Sorteio</option>
              </Select>
            </div>

            <Text>Tipo de Play-Off:</Text>
            <div className={styles.eventoAccordionDropdown}>
              <Select
                placeholder="Selecione" 
                value={String(configuracaoEventoInterno.tipoPlayoff)}
                disabled={!existeFaseTipoPlayoff()}
                name="tipoPlayoff"
                onChange={(e) => handleChangeConfiguracaoEvento(e)}
              >
                <option value={TipoPlayoff.NORMAL}>Normal</option>
                <option value={TipoPlayoff.EUROPEU}>Europeu</option>
              </Select>
            </div>

            <Text>Tipo de Desempate em Play-Off:</Text>
            <div className={styles.eventoAccordionDropdown}>
              <Select
                placeholder="Selecione" 
                value={String(configuracaoEventoInterno.desempatePlayoff)}
                disabled={!existeFaseTipoPlayoff()}
                name="desempatePlayoff"
                onChange={(e) => handleChangeConfiguracaoEvento(e)}
              >
                <option value={DesempatePlayoff.POR_SCORE}>Por Score</option>
                <option value={DesempatePlayoff.POR_VANTAGEM}>Por Vantagem</option>
                <option value={DesempatePlayoff.PERSONALIZADA}>Personalizada</option>
              </Select>
            </div>

            <Text>Classificação Final:</Text>
            <div className={styles.eventoAccordionDropdown}>
              <Select
                placeholder="Selecione" 
                value={String(configuracaoEventoInterno.classificacaoFinal)}
                name="classificacaoFinal"
                onChange={(e) => handleChangeConfiguracaoEvento(e)}
              >
                <option value={ClassificacaoFinal.POR_ETAPA}>Por Etapa</option>
                <option value={ClassificacaoFinal.CAMPANHA_GERAL}>Campanha Geral</option>
              </Select>
            </div>

            <Text>Definir 3º Lugar:</Text>
            <div className={styles.eventoAccordionDropdown}>
              <Select
                value={String(configuracaoEventoInterno.definirTerceiroLugar)}
                name="definirTerceiroLugar"
                onChange={(e) => handleChangeConfiguracaoEvento(e)}
              >
                <option value={'sim'}>Sim</option>
                <option value={'nao'}>Não</option>
              </Select>
            </div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      {mensagemAlerta && (
        <div className={styles.mensagemErroValidacao}>
          <Alert status='error'>
            <AlertIcon />
            {mensagemAlerta}
          </Alert>
        </div>
      )}

      <div style={{ marginTop: "20px", marginBottom: "10px" }}>
        <Button onClick={handleSubmit} colorScheme="blue" style={{ marginRight: "20px" }}>
            {evento ? "Salvar Alterações" : "Salvar Evento"}
        </Button>
        <Button onClick={onCancelar}>
          Cancelar
        </Button>
      </div>
    </>
  );
}

import { 
  Box, 
  Button, 
  Flex, 
  Image, 
  useDisclosure } from '@chakra-ui/react'
import * as styles from "./styles.css.ts";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Bolao, bolaoStore } from '../../../stores/bolaoStore.ts';
import { getImagemURL } from '../../../utils/Utils.ts';
import { ReactNode, useState } from 'react';
import TabelaGerenciarParticipantesBolao from '../../../components/TabelaGerenciarParticipantesBolao/index.tsx';
import { ModalGenerico } from '../../../components/ModalGenerico/index.tsx';
import BolaoRegulamento from '../../../components/BolaoRegulamento/index.tsx';
import { BolaoRoles } from '../../../models/BolaoCopaDefault.tsx';

export function InicioBolao() {
  const { bolao } = useOutletContext<{ bolao: Bolao }>();
  const { participanteBolaoLogado } = bolaoStore();
  const [isSaved, setIsSaved] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalTitulo, setModalTitulo] = useState('');
  const [modalConteudo, setModalConteudo] = useState<ReactNode>(null);

  const navigate = useNavigate();

  const abrirModal = (titulo: string, conteudo: ReactNode) => {
    setModalTitulo(titulo);
    setModalConteudo(conteudo);
    onOpen();
  };

  const infoEvento = [
    { label: "Nome do Bolão", value: bolao.nome },
    { label: "Compartilhamento", value: bolao.compartilhamento },
    { label: "Tipo de Convite", value: bolao.tipoConvite },
    { label: "Pontuação", value: bolao.pontuacao},
    { label: "Evento Base", value: bolao.eventoBase },
    { label: "Convocação da Seleção", value: bolao.convocacao ? 'Sim' : 'Não' },
    { label: "Prêmios Indivduais", value: bolao.premiosIndividuais ? 'Sim' : 'Não' },
    { label: "Melhores Por Ranking", value: bolao.melhoresPorRanking ? 'Sim' : 'Não' },
    { label: "Pontuação Bônus", value: bolao.pontuacaoBonus ? 'Sim' : 'Não' },
    { label: "Fase Extra Playoff", value: bolao.faseExtraPlayoff ? 'Sim' : 'Não' },
  ];

  const handleCriarConviteLink = () => {
    const conviteLink = `${window.location.origin}${window.location.pathname}#/convite/bolao/${bolao.id}`;
    navigator.clipboard.writeText(conviteLink);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <>
      <div style={{width:"100%"}}>
          <div className={styles.folhaContainer}>
            <div className={styles.quadroInicial}> 
              <Flex direction="row" gap={4} wrap="nowrap" >
                <Box flex="1" maxWidth="20%">
                  <div className={styles.simboloTorneioContainer}>
                    <Image
                      src={String(getImagemURL(String(bolao.imagemBolao)))}
                      alt="Logotipo"
                      className={styles.simboloTorneio}
                    />
                  </div>
                </Box>

                <Box flex="1">
                  <div className={styles.infoTorneioContainer}>
                      {infoEvento.map((item, index) => {
                        const isNomeBolao = item.label === "Nome do Evento";
                        return (
                          <div
                            key={index}
                            style={{
                              color: isNomeBolao ? "blue" : "black",
                              fontWeight: isNomeBolao ? "bold" : "normal",
                            }}
                          >
                            {item.label}:{" "}
                            {item.value}
                          </div>
                        );
                      })}
                    </div>
                </Box>

                <Box flex="1" maxW="45%" display="flex" flexDirection="column" gap={4}>
                  <Button 
                    className={styles.buttonOpçõesExtras}
                    onClick={() => navigate(`/bolao/${bolao.id}/criterios-pontuacao-copa-2026`)}
                    colorScheme={"blue"}
                  >
                    Ver Critérios de Pontuação
                  </Button>
                  <Button 
                    className={styles.buttonOpçõesExtras}
                    onClick={() => abrirModal('', <BolaoRegulamento />)}
                    colorScheme={"blue"}
                  >
                    Ver Regulamento do Bolão
                  </Button>
                  <Button 
                    className={styles.buttonOpçõesExtras}
                    onClick={() => navigate(`/bolao/${bolao.id}/rateio`)}
                    colorScheme={"blue"}
                  >
                    Simulação de Rateio e Premiação
                  </Button>
                  <Button 
                    className={styles.buttonOpçõesExtras}
                    onClick={() => navigate(`/bolao/${bolao.id}/classificacao`)}
                    colorScheme={"blue"}
                  >
                    Classificação
                  </Button>
                  <Button 
                    className={styles.buttonOpçõesExtras}
                    onClick={() => navigate(`/bolao/${bolao.id}/palpite`)}
                    colorScheme={"blue"}
                  >
                    Palpites
                  </Button>
                </Box>
              </Flex>

              {(participanteBolaoLogado?.roleBolao === BolaoRoles.CRIADOR || participanteBolaoLogado?.roleBolao === 'gerente') && (
                <div className={styles.tituloConfigEventoContainer}>
                  <Button 
                    hidden={bolao.roleBolao === 'jogador'}
                    onClick={handleCriarConviteLink} 
                    colorScheme={isSaved ? "green" : "blue"}
                  >
                    {isSaved ? 
                      "Link copiado para a área de transferência" : 
                      "Criar Convite-Link"
                    }
                  </Button>
                </div>
              )}

              {participanteBolaoLogado?.roleBolao === BolaoRoles.CRIADOR || participanteBolaoLogado?.roleBolao === BolaoRoles.GERENTE && (
                <TabelaGerenciarParticipantesBolao />
              )}

              <ModalGenerico 
                isOpen={isOpen} 
                onClose={onClose} 
                titulo={modalTitulo} 
                conteudo={modalConteudo} 
                tamanho="full"
              />
            </div>
          </div>
      </div>
    </>
  );
};

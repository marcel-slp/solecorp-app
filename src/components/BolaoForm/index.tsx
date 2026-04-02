import { useState, useEffect } from "react";
import { 
  Text, 
  Input, 
  Button, 
  Heading,
  Alert,
  AlertIcon,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Switch
} from "@chakra-ui/react";
import * as styles from "../BolaoForm/styles.css.ts";
import { Bolao, NovoBolao } from "../../stores/bolaoStore.ts";
import { ImageUploader } from "../ImageUploader/ImageUploader.tsx";
import defaultBolao from "@/assets/images/default_bolao.jpg";
import { EventoBase } from "../../models/BolaoCopaDefault.tsx";
import { retornaUserId } from "../../utils/Utils.ts";

const desabilitarConfigExtra = false;

interface BolaoFormProps {
  bolao?: Bolao | null;
  onSalvar: (dados: NovoBolao, id?: string) => void;
  onCancelar?: () => void;
}

export default function BolaoForm({ bolao, onSalvar, onCancelar }: BolaoFormProps) {
  const [nomeBolaoInterno, setNomeBolaoInterno] = useState("");
  const [compartilhamentoBolaoInterno, setCompartilhamentoBolaoInterno] = useState('privado');
  const [tipoConviteBolaoInterno, setTipoConviteBolaoInterno] = useState('fechado');
  const [pontuacaoBolaoInterno, setPontuacaoBolaoInterno] = useState("padrao");
  const [imagemBolaoInterno, setImagemBolaoInterno] = useState<File|string|null>(null);
  const [eventoBaseInterno, setEventoBaseInterno] = useState<EventoBase>(EventoBase.COPA_2026);
  const [convocacaoInterno, setConvocacaoInterno] = useState<boolean>(false);
  const [premiosIndividuaisInterno, setPremiosIndividuaisInterno] = useState<boolean>(false);
  const [melhoresPorRankinInterno, setMelhoresPorRankingInterno] = useState<boolean>(false);
  const [pontuacaoBonusInterno, setPontuacaoBonusInterno] = useState<boolean>(false);
  const [faseExtraPlayoffInterno, setFaseExtraPlayoffInterno] = useState<boolean>(false);
  const [mensagemAlerta, setMensagemAlerta] = useState<string|null>(null);

  useEffect(() => {
    if (bolao) {
      setNomeBolaoInterno(bolao.nome);
      setCompartilhamentoBolaoInterno(bolao.compartilhamento);
      setTipoConviteBolaoInterno(bolao.tipoConvite);
      setPontuacaoBolaoInterno(bolao.pontuacao);
      setImagemBolaoInterno(bolao.imagemBolao);
      setEventoBaseInterno(bolao.eventoBase);
      setConvocacaoInterno(bolao.convocacao);
      setPremiosIndividuaisInterno(bolao.premiosIndividuais);
      setMelhoresPorRankingInterno(bolao.melhoresPorRanking);
      setPontuacaoBonusInterno(bolao.pontuacaoBonus);
      setFaseExtraPlayoffInterno(bolao.faseExtraPlayoff);
    }
  }, [bolao]);

  const handleSubmit = () => {
    if (
      !nomeBolaoInterno || 
      !eventoBaseInterno
    ) {
      setMensagemAlerta("Preencha todos os dados obrigatórios");
      return;
    }

    setMensagemAlerta(null);

    const novoBolao: NovoBolao = {
      nome: nomeBolaoInterno,
      compartilhamento: compartilhamentoBolaoInterno,
      tipoConvite: tipoConviteBolaoInterno,
      pontuacao: pontuacaoBolaoInterno,
      imagemBolao: imagemBolaoInterno,
      eventoBase: EventoBase.COPA_2026,
      userId: retornaUserId(),
      convocacao: convocacaoInterno,
      premiosIndividuais: premiosIndividuaisInterno,
      melhoresPorRanking: melhoresPorRankinInterno,
      pontuacaoBonus: pontuacaoBonusInterno,
      faseExtraPlayoff: faseExtraPlayoffInterno
    };
    
    onSalvar(novoBolao, bolao?.id);
  };

  return (
    <>
      <Heading size="md" mb={4} mt={4}>
          {bolao ? "Editar Bolão" : "Adicionar Bolão"}
      </Heading>

      <div className={styles.addBolaoContainer}>
        <Text>Nome:</Text>
        <div className={styles.bolaoInputs}>
          <Input
            placeholder="Insira o nome do bolão"
            value={nomeBolaoInterno}
            onChange={(e) => setNomeBolaoInterno(e.target.value)}
          />
        </div>

        <Text>Imagem do Bolão:</Text>
        <ImageUploader imagem={imagemBolaoInterno} imagemDefault={defaultBolao} onChange={setImagemBolaoInterno} />

        <Text>Evento:</Text>
        <div className={styles.bolaoDropdown}>
          <Select
            key={"evento"}
            value={eventoBaseInterno} 
            onChange={(e) => setEventoBaseInterno(e.target.value as EventoBase)}
          >
            {Object.values(EventoBase).map((eventoBase) => (
              <option key={eventoBase} value={eventoBase}>{eventoBase}</option>
            ))}
          </Select>
        </div>
      
        <Text>Compartilhamento:</Text>
        <div className={styles.bolaoDropdown}>
          <Select 
            key={"compartilhamento"}
            value={compartilhamentoBolaoInterno} 
            onChange={(e) => setCompartilhamentoBolaoInterno(e.target.value)}
            className={styles.bolaoInputs}
          >
            <option value="publico">Público</option>
            <option value="privado">Privado</option>
          </Select>
        </div>

        <Text>Convidar Participantes:</Text>
        <div className={styles.bolaoDropdown}>
          <Select 
            key={"tipoConvite"}
            value={tipoConviteBolaoInterno} 
            onChange={(e) => setTipoConviteBolaoInterno(e.target.value)}
            className={styles.bolaoInputs}
          >
            <option value="aberto">Aberto</option>
            <option value="fechado">Fechado</option>
          </Select>
        </div>

        <Text>Pontuação:</Text>
        <div className={styles.bolaoDropdown}>
          <Select 
            key={"pontuacao"}
            value={pontuacaoBolaoInterno} 
            onChange={(e) => setPontuacaoBolaoInterno(e.target.value)}
            className={styles.bolaoInputs}
          >
            <option value="padrao">Padrão</option>
            <option value="personalizado">Personalizado</option>
          </Select>
        </div>
      </div>

      <Accordion allowMultiple style={{ width: "40%" }}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left' >
                Configurações Extras do Bolão
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel className={styles.accordionPanel}>
            <Text>Convocação da Seleção:</Text>
            <div className={styles.eventoAccordionDropdown}>
              <Switch
                //placeholder="Selecione"
                key={"convocacao"}
                disabled={desabilitarConfigExtra}
                isChecked={convocacaoInterno}
                name="convocacao"
                onChange={(e) => setConvocacaoInterno(e.target.checked)}
              />
                {/* <option value='sim'>Sim</option>
                <option value='nao'>Não</option>
              </Switch> */}
            </div>

            <Text>Pontuação Prêmios Individuais:</Text>
            <div className={styles.eventoAccordionDropdown}>
              <Switch
                key={"premiosIndividuais"}
                isChecked={premiosIndividuaisInterno}
                disabled={desabilitarConfigExtra}
                name="premiosIndividuais"
                onChange={(e) => setPremiosIndividuaisInterno(e.target.checked)}
              />
                {/* <option value='sim'>Sim</option>
                <option value='nao'>Não</option>
              </Select> */}
            </div>

            <Text>Pontuação Melhores Por Ranking:</Text>
            <div className={styles.eventoAccordionDropdown}>
              <Switch
                //placeholder="Selecione" 
                //value={String(configExtraBolaoInterno.pontuacaoMelhoresPorRanking)}
                key={"melhoresPorRanking"}
                isChecked={melhoresPorRankinInterno}
                disabled={desabilitarConfigExtra}
                name="melhoresPorRanking"
                onChange={(e) => setMelhoresPorRankingInterno(e.target.checked)}
              />
                {/* <option value='sim'>Sim</option>
                <option value='nao'>Não</option>
              </Select> */}
            </div>

            <Text>Pontuação Bônus:</Text>
            <div className={styles.eventoAccordionDropdown}>
              <Switch
                //placeholder="Selecione" 
                //value={String(configExtraBolaoInterno.pontuacaoBonus)}
                key={"pontuacaoBonus"}
                isChecked={pontuacaoBonusInterno}
                disabled={desabilitarConfigExtra}
                name="pontuacaoBonus"
                onChange={(e) => setPontuacaoBonusInterno(e.target.checked)}
              />
                {/* <option value='sim'>Sim</option>
                <option value='nao'>Não</option>
              </Select> */}
            </div>

            <Text>Fase Extra Play-Off:</Text>
            <div className={styles.eventoAccordionDropdown}>
              <Switch
                //placeholder="Selecione" 
                //value={String(configExtraBolaoInterno.faseExtraPlayoff)}
                key={"faseExtraPlayoff"}
                isChecked={faseExtraPlayoffInterno}
                disabled={desabilitarConfigExtra}
                name="faseExtraPlayoff"
                onChange={(e) => setFaseExtraPlayoffInterno(e.target.checked)}
              />
                {/* <option value='sim'>Sim</option>
                <option value='nao'>Não</option>
              </Select> */}
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
            {bolao ? "Salvar Alterações" : "Salvar Bolão"}
        </Button>
        <Button onClick={onCancelar}>
          Cancelar
        </Button>
      </div>
    </>
  )
}

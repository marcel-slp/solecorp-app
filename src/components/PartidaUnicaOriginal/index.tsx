import { Input, Image, Flex, Text } from "@chakra-ui/react";
import * as styles from "./styles.css";
import { Partida, partidasStore } from "../../stores/partidasStore";
import defaultParticipante from "@/assets/images/default_participante.jpeg";
import { useEffect, useState } from "react";

interface PartidaUnicaOriginalProps {
  partida: Partida;
}

export function PartidaUnicaOriginal({ partida }: PartidaUnicaOriginalProps) {
  const { atualizarInfoPartida } = partidasStore();

  const [numeroPartidaInterno, setNumeroPartidaInterno] = useState("");
  const [timeCasaInterno, setTimeCasaInterno] = useState("");
  const [timeForaInterno, setTimeForaInterno] = useState("");
  const [placarCasaInterno, setPlacarCasaInterno] = useState("");
  const [placarForaInterno, setPlacarForaInterno] = useState("");
  const [placarPenaltisCasaInterno, setPlacarPenaltisCasaInterno] = useState("");
  const [placarPenaltisForaInterno, setPlacarPenaltisForaInterno] = useState("");
  const [dataJogoInterno, setDataJogoInterno] = useState<string>("");
  const [horaJogoInterno, setHoraJogoInterno] = useState<string>("");
  const [localJogoInterno, setLocalJogoInterno] = useState("");

  useEffect(() => {
    setPlacarCasaInterno(partida.placarCasa?.toString() ?? "");
    setPlacarForaInterno(partida.placarFora?.toString() ?? "");
    setPlacarPenaltisCasaInterno(partida.placarPenaltisCasa != null ? partida.placarPenaltisCasa.toString() : "");
    setPlacarPenaltisForaInterno(partida.placarPenaltisFora != null ? partida.placarPenaltisFora.toString() : "");
    setNumeroPartidaInterno(partida.numeroPartida.toString());
    setTimeCasaInterno(partida.timeCasa);
    setTimeForaInterno(partida.timeFora);
    setDataJogoInterno(partida.dataJogo ?? "");
    setHoraJogoInterno(partida.horaJogo ?? "");
    setLocalJogoInterno(partida.localJogo ?? "");
  }, [partida.dataJogo, partida.horaJogo, partida.localJogo, partida.numeroPartida, partida.placarCasa, partida.placarFora, partida.placarPenaltisCasa, partida.placarPenaltisFora, partida.timeCasa, partida.timeFora]);

  const validarPenaltis = (): boolean => {

    if (placarPenaltisCasaInterno === "" || placarPenaltisForaInterno === "") return true;

    if (placarPenaltisCasaInterno === placarPenaltisForaInterno) {
      alert("Placar de pênaltis não pode ser empate! Escolha um vencedor.");
      atualizarInfoPartida(partida.id, {placarPenaltisCasa: null, placarPenaltisFora: null});
      return false;
    }
    return true;
  };

  const abrirPenaltis = placarCasaInterno !== "" && placarForaInterno !== "" && placarCasaInterno === placarForaInterno && !!partida.fase;

  return (
    <div className={styles.linhaTabelaJogos}>
      <div className={styles.itemLinha}>
        <Input
          backgroundColor="white"
          textAlign="center"
          type="number"
          value={numeroPartidaInterno}
          onChange={(e) => setNumeroPartidaInterno(e.target.value)}
          onBlur={() => {atualizarInfoPartida(partida.id, {numeroPartida: numeroPartidaInterno})}}
        />
      </div>

      <div className={styles.nomeSimbEsqContainer}>
        <div className={styles.nome} style={{ color: partida.fase ? "silver" : "black" }}>
          <Input
            backgroundColor="white"
            textAlign="center"
            value={timeCasaInterno}
            onChange={(e) => setTimeCasaInterno(e.target.value)}
            onBlur={() => {atualizarInfoPartida(partida.id, {timeCasa: timeCasaInterno})}}
          />
        </div>
        <Image src={partida.simboloCasa} className={styles.simb} fallbackSrc={defaultParticipante} />
      </div>

      <Input
        backgroundColor="white"
        textAlign="center"
        type="number"
        value={placarCasaInterno}
        onChange={(e) => atualizarInfoPartida(partida.id, {placarCasa: e.target.value})}
      />

      <div className={styles.itemLinha}>x</div>

      <Input
        backgroundColor="white"
        textAlign="center"
        type="number"
        value={placarForaInterno}
        onChange={(e) => atualizarInfoPartida(partida.id, {placarFora: e.target.value})}
      />

      <div className={styles.nomeSimbDirContainer}>
        <Image src={partida.simboloFora} className={styles.simb} fallbackSrc="/images/default_participante.jpeg" />
        {/* {modo === 'original' ? (
          <></>
          // <div className={styles.simb}> 
          // <ImageUploader classnameCustom={styles.simb} imagem={simboloForaInterno} imagemSelecao={simboloForaInterno} imagemDefault="/images/default_participante.jpeg" onChange={setSimboloForaInterno} />
          // </div>
        ) : (
          <Image src={simboloFora} className={styles.simb} fallbackSrc="/images/default_participante.jpeg" />
        )} */}
        <div className={styles.nome} style={{ color: partida.fase ? "silver" : "black" }}>
          <Input
            backgroundColor="white"
            textAlign="center"
            value={timeForaInterno}
            onChange={(e) => setTimeForaInterno(e.target.value)}
            onBlur={() => {atualizarInfoPartida(partida.id, {timeFora: timeForaInterno})}}
          />
        </div>
      </div>

      <Input 
        backgroundColor="white" 
        textAlign='center' 
        type="date" 
        value={dataJogoInterno} 
        onChange={(e) => setDataJogoInterno(e.target.value)}
        onBlur={() => {atualizarInfoPartida(partida.id, {dataJogo: dataJogoInterno})}} 
      />
      <Input
        backgroundColor="white" 
        textAlign="center" 
        type="time" 
        value={horaJogoInterno} 
        onChange={(e) => setHoraJogoInterno(e.target.value)}
        onBlur={() => {atualizarInfoPartida(partida.id, {horaJogo: horaJogoInterno})}}
      />
      <Input
        backgroundColor="white" 
        textAlign="center" 
        type="text" 
        placeholder="Inserir local da partida" 
        value={localJogoInterno} 
        onChange={(e) => setLocalJogoInterno(e.target.value)}
        onBlur={() => {atualizarInfoPartida(partida.id, {localJogo: localJogoInterno})}}
      />

      {abrirPenaltis && (
        <Flex 
          align="center" 
          gap={3} 
          ml={'255px'}
          width={'max-content'}
          className={styles.itemLinha}
        >
          <Text fontWeight="bold" color="gray.600">
            Pênaltis:
          </Text>

          <Input
            backgroundColor="white"
            textAlign="center"
            type="number"
            value={placarPenaltisCasaInterno}
            width={'52px'}
            height={'30px'}
            onChange={(e) => setPlacarPenaltisCasaInterno(e.target.value)}
            onBlur={() => {
              if(validarPenaltis()) {
                atualizarInfoPartida(partida.id, {placarPenaltisCasa: placarPenaltisCasaInterno})
              }
            }}
          />

          <div className={styles.xLinhaPenaltis}>x</div>

          <Input
            backgroundColor="white"
            textAlign="center"
            type="number"
            width={'52px'}
            height={'30px'}
            value={placarPenaltisForaInterno}
            onChange={(e) => setPlacarPenaltisForaInterno(e.target.value)}
            onBlur={() => {
              if(validarPenaltis()) {
                atualizarInfoPartida(partida.id, {placarPenaltisFora: placarPenaltisForaInterno})
              }
            }}
          />
        </Flex>
      )}
    </div>
  );
}

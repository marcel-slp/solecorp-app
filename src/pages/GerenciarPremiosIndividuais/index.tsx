import { Heading, Button, Text, Select } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import {
  NovoPremiosIndividuais,
  premiosIndividuaisStore
} from "../../stores/premiosIndividuaisStore";
import * as styles from "./styles.css";
import { jogadoresStore } from "../../stores/jogadoresStore";
import { selecoesStore } from "../../stores/selecoesStore";

export default function GerenciarPremiosIndividuais() {
  const {
    premiosIndividuaisOriginal,
    editarPremiosIndividuaisOriginal,
    carregarPremiosIndividuaisOriginal,
    adicionarPremiosIndividuaisOriginal
  } = premiosIndividuaisStore();
  const { jogadores, carregarJogadores } = jogadoresStore();
  const { selecoes, carregarSelecoes } = selecoesStore();

  const [melhorJogadorInterno, setMelhorJogadorInterno] = useState<
    string | undefined
  >("");
  const [melhorGoleiroInterno, setMelhorGoleiroInterno] = useState<string>("");
  const [artilheiroInterno, setArtilheiroInterno] = useState<string>("");
  const [campeaoInterno, setCampeaoInterno] = useState<string>("");
  const [viceCampeaoInterno, setViceCampeaoInterno] = useState<string>("");
  const [terceiroLugarInterno, setTerceiroLugarInterno] = useState<string>("");
  const [melhor1FaseInterno, setMelhor1FaseInterno] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    carregarJogadores();
    carregarSelecoes();
  }, [carregarJogadores, carregarSelecoes]);

  useEffect(() => {
    if (!premiosIndividuaisOriginal) {
      carregarPremiosIndividuaisOriginal(1);
    } else {
      setMelhorJogadorInterno(premiosIndividuaisOriginal.melhorJogador);
      setMelhorGoleiroInterno(premiosIndividuaisOriginal.melhorGoleiro ?? "");
      setArtilheiroInterno(premiosIndividuaisOriginal.artilheiro ?? "");
      setCampeaoInterno(premiosIndividuaisOriginal.campeao ?? "");
      setViceCampeaoInterno(premiosIndividuaisOriginal.viceCampeao ?? "");
      setTerceiroLugarInterno(premiosIndividuaisOriginal.terceiroLugar ?? "");
      setMelhor1FaseInterno(premiosIndividuaisOriginal.melhor1Fase ?? "");
    }
  }, [premiosIndividuaisOriginal, carregarPremiosIndividuaisOriginal]);

  const jogadoresFiltrados = useMemo(() => {
    const lista = Object.values(jogadores);

    return {
      melhorJogador: lista.filter(j => j.listaMelhorJogador),
      melhorGoleiro: lista.filter(j => j.listaMelhorGoleiro),
      artilheiro: lista.filter(j => j.listaArtilheiro),
    };
  }, [jogadores]);

  const selecoesPodio = useMemo(() => {
    const todasSelecoes = Object.values(selecoes);

    const filtrarSelecoes = (valorAtual: string, bloqueadas: string[]) =>
      todasSelecoes.filter(
        (s) => s.nome === valorAtual || !bloqueadas.includes(s.nome)
      );

    return {
      campeao: filtrarSelecoes(campeaoInterno, [
        viceCampeaoInterno,
        terceiroLugarInterno
      ]),

      vice: filtrarSelecoes(viceCampeaoInterno, [
        campeaoInterno,
        terceiroLugarInterno
      ]),

      terceiro: filtrarSelecoes(terceiroLugarInterno, [
        campeaoInterno,
        viceCampeaoInterno
      ])
    };
  }, [selecoes, campeaoInterno, viceCampeaoInterno, terceiroLugarInterno]);

  const handleSalvar = async () => {
    setIsSaving(true);
    setIsSaved(false);

    const dadosNovoPremiosIndividuais: NovoPremiosIndividuais = {
      campeonatoId: 1,
      melhorJogador: melhorJogadorInterno,
      melhorGoleiro: melhorGoleiroInterno,
      artilheiro: artilheiroInterno,
      campeao: campeaoInterno,
      viceCampeao: viceCampeaoInterno,
      terceiroLugar: terceiroLugarInterno,
      melhor1Fase: melhor1FaseInterno
    };

    let sucesso = false;

    try {
      if (premiosIndividuaisOriginal && premiosIndividuaisOriginal.id) {
        sucesso = await editarPremiosIndividuaisOriginal(
          premiosIndividuaisOriginal.id,
          dadosNovoPremiosIndividuais
        );
        setIsSaving(false);
      } else {
        sucesso = await adicionarPremiosIndividuaisOriginal(
          dadosNovoPremiosIndividuais
        );
        setIsSaving(false);
      }

      if (!sucesso) {
        setIsSaving(false);
        alert(
          "Ocorreu um erro ao salvar premios individuais. Verifique os logs."
        );
      }

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (err) {
      setIsSaving(false);
      alert("Falha ao salvar/editar premios individuais.");
      console.error(err);
    }
  };

  return (
    <div className={styles.tableJoagdorContainer}>
      <Heading mt={4}>Prêmios Individuais da Copa do Mundo 2026</Heading>

      <div className={styles.selectPremiosIndividuaisContainer}>
        <Text>Melhor Jogador:</Text>
        <div className={styles.premiosIndividuaisDropdown}>
          <Select
            key={"melhorJogador"}
            value={melhorJogadorInterno ?? ""}
            //onChange={(e) => setMelhorJogadorInterno(e.target.value)}
            onChange={(e) => {
              const valor = e.target.value;
              setMelhorJogadorInterno(valor ? valor : undefined);
            }}
            className={styles.premiosIndividuaisInputs}
            placeholder="Selecione"
          >
            <option value="" disabled hidden></option>
            {jogadoresFiltrados.melhorJogador.map((jogador) => (
              <option key={jogador.nome} value={jogador.nome}>
                {jogador.nome}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className={styles.selectPremiosIndividuaisContainer}>
        <Text>Melhor Goleiro:</Text>
        <div className={styles.premiosIndividuaisDropdown}>
          <Select
            key={"melhorGoleiro"}
            value={melhorGoleiroInterno}
            onChange={(e) => setMelhorGoleiroInterno(e.target.value)}
            className={styles.premiosIndividuaisInputs}
            placeholder="Selecione"
          >
            <option value="" disabled hidden></option>
            {jogadoresFiltrados.melhorGoleiro.map((goleiro) => (
              <option key={goleiro.nome} value={goleiro.nome}>
                {goleiro.nome}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className={styles.selectPremiosIndividuaisContainer}>
        <Text>Artilheiro:</Text>
        <div className={styles.premiosIndividuaisDropdown}>
          <Select
            key={"artilheiro"}
            value={artilheiroInterno}
            onChange={(e) => setArtilheiroInterno(e.target.value)}
            className={styles.premiosIndividuaisInputs}
            placeholder="Selecione"
          >
            <option value="" disabled hidden></option>
            {jogadoresFiltrados.artilheiro.map((jogador) => (
              <option key={jogador.nome} value={jogador.nome}>
                {jogador.nome}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className={styles.selectPremiosIndividuaisContainer}>
        <Text>Campeão:</Text>
        <div className={styles.premiosIndividuaisDropdown}>
          <Select
            key={"campeao"}
            className={styles.premiosIndividuaisInputs}
            value={campeaoInterno}
            onChange={(e) => setCampeaoInterno(e.target.value)}
            placeholder="Selecione"
          >
            <option value="" disabled hidden></option>
            {selecoesPodio.campeao.map((selecao) => (
              <option key={selecao.nome}>{selecao.nome}</option>
            ))}
          </Select>
        </div>
      </div>

      <div className={styles.selectPremiosIndividuaisContainer}>
        <Text>Vice Campeão:</Text>
        <div className={styles.premiosIndividuaisDropdown}>
          <Select
            key={"viceCampeao"}
            value={viceCampeaoInterno}
            onChange={(e) => setViceCampeaoInterno(e.target.value)}
            className={styles.premiosIndividuaisInputs}
            placeholder="Selecione"
          >
            <option value="" disabled hidden></option>
            {selecoesPodio.vice.map((selecao) => (
              <option key={selecao.nome} value={selecao.nome}>
                {selecao.nome}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className={styles.selectPremiosIndividuaisContainer}>
        <Text>Terceiro Lugar:</Text>
        <div className={styles.premiosIndividuaisDropdown}>
          <Select
            key={"terceiroLugar"}
            value={terceiroLugarInterno}
            onChange={(e) => setTerceiroLugarInterno(e.target.value)}
            className={styles.premiosIndividuaisInputs}
            placeholder="Selecione"
          >
            <option value="" disabled hidden></option>
            {selecoesPodio.terceiro.map((selecao) => (
              <option key={selecao.nome} value={selecao.nome}>
                {selecao.nome}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className={styles.selectPremiosIndividuaisContainer}>
        <Text>Melhor 1ª Fase:</Text>
        <div className={styles.premiosIndividuaisDropdown}>
          <Select
            key={"melhor1Fase"}
            value={melhor1FaseInterno}
            onChange={(e) => setMelhor1FaseInterno(e.target.value)}
            className={styles.premiosIndividuaisInputs}
            placeholder="Selecione"
          >
            <option value="" disabled hidden></option>
            {Object.values(selecoes).map((selecao) => (
              <option key={selecao.nome} value={selecao.nome}>
                {selecao.nome}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <Button
        mt={4}
        mb={4}
        colorScheme={isSaved ? "green" : "blue"}
        //colorScheme="blue"
        onClick={() => handleSalvar()}
        isLoading={isSaving}
      >
        {isSaved ? "Salvo!" : "Salvar Prêmios Individuais"}
      </Button>
    </div>
  );
}

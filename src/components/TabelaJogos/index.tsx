  import { useMemo } from "react";
import * as styles from "./styles.css";
import { getImagemURL } from "../../utils/Utils";
import { placarStore } from "../../stores/placarStore";
import { Icon, Image, Input } from "@chakra-ui/react";
import { IoIosMore, IoMdFootball } from "react-icons/io";
import { TbCardsFilled  } from "react-icons/tb";
import { FaAdn  } from "react-icons/fa6";

interface Props {
  letraParaNome: Record<number, Record<string, string>>;
  letraParaSimbolo: Record<number, Record<string, string>>;
  letraParaNomeEhPlaceholder: Record<number, Record<string, boolean>>;
  numeroJogo: number;
  letra1: string;
  letra2: string;
  fase: number;
  grupo: string;
  displayedLetra1?: string;
  displayedLetra2?: string;
  eventoId: string;
}

function TabelaJogos({
  letraParaNome,
  letraParaSimbolo,
  letraParaNomeEhPlaceholder,
  numeroJogo,
  letra1,
  letra2,
  fase,
  grupo,
  displayedLetra1,
  displayedLetra2,
  eventoId
}: Props) {
  const imagemPadrao = "/images/default_participante.jpeg";

  const { getPlacar, setPlacar } = placarStore();

  const key1 = useMemo(() => grupo + letra1, [grupo, letra1]);
  const key2 = useMemo(() => grupo + letra2, [grupo, letra2]);

  const nome1 = letraParaNome[fase]?.[key1] || `Participante ${letra1}`;
  const nome2 = letraParaNome[fase]?.[key2] || `Participante ${letra2}`;

  const isPlaceholder1 = letraParaNomeEhPlaceholder[fase]?.[key1] ?? false;
  const isPlaceholder2 = letraParaNomeEhPlaceholder[fase]?.[key2] ?? false;

  const simboloCasa = letraParaSimbolo[fase]?.[key1]
    ? getImagemURL(letraParaSimbolo[fase][key1])
    : imagemPadrao;

  const simboloFora = letraParaSimbolo[fase]?.[key2]
    ? getImagemURL(letraParaSimbolo[fase][key2])
    : imagemPadrao;

  const display1 = displayedLetra1 || letra1;
  const display2 = displayedLetra2 || letra2;

  const placar = getPlacar(eventoId, fase, grupo, numeroJogo);
  
  const placarCasa = placar?.placarCasa?.toString() ?? "";
  const placarFora = placar?.placarFora?.toString() ?? "";

  const atualizarPlacar = (campo: "placarCasa" | "placarFora", valor: string) => {
    const atual = getPlacar(eventoId, fase, grupo, numeroJogo);

    setPlacar(eventoId, fase, grupo, numeroJogo, {
      participante1: nome1,
      participante2: nome2,
      placarCasa: campo === "placarCasa"
        ? (valor === "" ? null : Number(valor))
        : atual?.placarCasa ?? null,
      placarFora: campo === "placarFora"
        ? (valor === "" ? null : Number(valor))
        : atual?.placarFora ?? null
    });
  };
  
  return (
    <div className={styles.linhaTabelaJogos}>

      <div className={styles.itemLinha}>{numeroJogo}</div>

      <div className={styles.itemLinha}>
        {display1} x {display2}
      </div>

      <div className={styles.nomeSimbEsqContainer}>
        <div
          className={styles.nome}
          style={{ color: isPlaceholder1 ? "silver" : "black" }}
        >
          {nome1}
        </div>
        <Image src={simboloCasa} className={styles.simb} />
      </div>

      <Input
        backgroundColor='white'
        textAlign='center'
        type="number"
        value={placarCasa}
        onChange={(e) => atualizarPlacar("placarCasa", e.target.value)}
      />

      <div className={styles.itemLinha}>x</div>

      <Input
        backgroundColor='white'
        textAlign='center'
        type="number"
        value={placarFora}
        onChange={(e) => atualizarPlacar("placarFora", e.target.value)}
      />

      <div className={styles.nomeSimbDirContainer}>
        <Image src={simboloFora} className={styles.simb} />
        <div
          className={styles.nome}
          style={{ color: isPlaceholder2 ? "silver" : "black" }}
        >
          {nome2}
        </div>
      </div>

      <Input backgroundColor='white' textAlign='center' type="date" placeholder="DD/MM/AAAA" />
      <Input backgroundColor='white' textAlign='center' type="time" placeholder="HH:MM" />
      <Input backgroundColor='white' textAlign='center' type="text" placeholder="LOCAL" />

      <div className={styles.iconGroup}>
        <Icon as={IoMdFootball} />
        <Icon as={FaAdn} />
        <Icon as={TbCardsFilled} />
        <Icon as={IoIosMore}/>
      </div>

    </div>
  );
}

export default TabelaJogos;

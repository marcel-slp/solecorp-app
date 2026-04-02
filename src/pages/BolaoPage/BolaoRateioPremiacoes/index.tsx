
import * as styles from "./styles.css.ts";
import TabelasRateioPremiacoes from "../../../components/TabelasRateioPremiacoes/index.tsx";
import { rateiosStore } from "../../../stores/rateiosStore.ts";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Bolao } from "../../../stores/bolaoStore.ts";
import { Button } from "@chakra-ui/react";

function BolaoRateioPremiacoes() {

  const { rateio, carregarRateio, editarRateio, salvarRateio } = rateiosStore();
  const { bolao } = useOutletContext<{ bolao: Bolao }>();

  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    carregarRateio(bolao.id);
  }, [bolao.id, carregarRateio]);

  const handleSalvar = async () => {
    setIsSaving(true);
    setIsSaved(false);

    let sucesso;
    try {
      if (rateio?.id) {
        sucesso = await editarRateio(rateio);
        setIsSaving(false);
        if (sucesso) {
          setIsSaved(true);
          setTimeout(() => setIsSaved(false), 2000);
        } else {
          alert("Erro ao editar rateio");
        }
      } else {
        sucesso = await salvarRateio({ 
          bolaoId: bolao.id,
          cota: rateio?.cota || 0,
          qtdParticipantes: rateio?.qtdParticipantes || 0,
          taxaAdm: rateio?.taxaAdm || 0, 
          ...rateio 
        });

        setIsSaving(false);
        
        if (sucesso) {
          setIsSaved(true);
          setTimeout(() => setIsSaved(false), 2000);
        } else { 
          alert("Erro ao salvar rateio");
        }
      }
    } catch (err) {
      setIsSaving(false);
      alert("Falha ao salvar/editar partida.");
      console.error(err);
    }
  };

  return (
    <div className={styles.tableRateioContainer}>
      <TabelasRateioPremiacoes 
        rateioEditavel
        bolao={bolao}
        
      />
      <Button
        //mt={10}
        colorScheme={isSaved ? "green" : "blue"}
        isLoading={isSaving}
        size="md"
        onClick={handleSalvar}
      >
        {isSaved ? "Salvo!" : "Salvar Configuração de Rateio"}
      </Button>
    </div>
  );
};

export default BolaoRateioPremiacoes;

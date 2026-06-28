import { useEffect } from "react";
import { configuracoesStore } from "../../stores/configuracoesStore";

export default function AppInitializer() {
  const { carregarConfiguracoes } =
    configuracoesStore();

  useEffect(() => {
    carregarConfiguracoes();
  }, [carregarConfiguracoes]);

  return null;
}
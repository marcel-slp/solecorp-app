import { useEffect, useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import * as styles from "./styles.css.ts";

type BuscaUsuarioProps = {
  onBuscar: (texto: string) => void;
  delay?: number;
};

export default function BuscaUsuario({
  onBuscar,
  delay = 400,
}: BuscaUsuarioProps) {
  const [valor, setValor] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onBuscar(valor.trim());
    }, delay);

    return () => clearTimeout(handler);
  }, [valor, delay, onBuscar]);

  return (
    <div className={styles.buscaUsuarioContainer}>
      <Input
        placeholder="Buscar por nome ou e-mail"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        maxW="300px"
      />

      <Button
        variant="ghost"
        onClick={() => setValor("")}
        isDisabled={!valor}
      >
        Limpar
      </Button>
    </div>
  );
}

import {
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { BolaoListaGerenciamento } from "../../stores/bolaoStore";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { useEffect, useState } from "react";
import { buscarTodosBoloes } from "../../api";

export default function BolaoTableHome() {
  const [boloesTodos, setBoloesTodos] = useState<
    BolaoListaGerenciamento[] | null
  >(null);

  useEffect(() => {
    async function carregarTodosOsBoloes() {
      const response = await buscarTodosBoloes();

      if (response.data) {
        setBoloesTodos(response.data);
      } else {
        alert("Nenhum bolão encontrado");
      }
    }

    carregarTodosOsBoloes();
  }, []);

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th textAlign={"center"}>Acesso</Th>
            <Th textAlign={"center"}>Nome</Th>
          </Tr>
        </Thead>

        <Tbody>
          {boloesTodos &&
            boloesTodos.slice(0, 5).map((bolao: BolaoListaGerenciamento) => (
              <Tr key={bolao.id}>
                <Td textAlign={"center"}>
                  {bolao.compartilhamento === "privado" ? (
                    <Icon as={FaLock} mr={2} />
                  ) : (
                    <Icon as={FaLockOpen} mr={2} />
                  )}
                </Td>
                <Td textAlign={"center"}>{bolao.nome}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

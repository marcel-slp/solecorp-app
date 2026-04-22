/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Bolao, BolaoListaGerenciamento } from "../../stores/bolaoStore";
import { ArrowForwardIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { BolaoRoles } from "../../models/BolaoCopaDefault";

type BolaoTableProps = {
  boloes: Bolao[] | BolaoListaGerenciamento[];
  isAdmin?: boolean;
  isHome?: boolean;
  onEdit?: (bolao: any) => void;
  onDelete?: (id: string) => void;
  onEnter?: (id: string) => void;
};

export default function BolaoTable({
  boloes,
  isAdmin = false,
  isHome = false,
  onEdit,
  onDelete,
  onEnter
}: BolaoTableProps) {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th textAlign={isAdmin || isHome ? "center" : "start"}>ID</Th>
            <Th textAlign={isAdmin || isHome  ? "center" : "start"}>Nome</Th>

            {isAdmin && (
              <>
                <Th textAlign="center">Criador</Th>
                <Th textAlign="center">Participantes</Th>
                <Th textAlign="center">Palpites</Th>
                <Th textAlign="center">Data de Criação</Th>
              </>
            )}

            {!isHome && (
              <Th textAlign="center">Ações</Th>
            )}
          </Tr>
        </Thead>

        <Tbody>
          {boloes.map((bolao: any) => (
            <Tr key={bolao.id}>
              <Td textAlign={isAdmin ? "center" : "start"}>{bolao.id}</Td>
              <Td textAlign={isAdmin ? "center" : "start"}>{bolao.nome}</Td>

              {isAdmin && (
                <>
                  <Td textAlign="center">{bolao.criador}</Td>
                  <Td textAlign="center">{bolao.numeroParticipantes}</Td>
                  <Td textAlign="center">{bolao.palpitesRealizados}</Td>
                  <Td textAlign="center">{bolao.dataCriacao}</Td>
                </>
              )}

              {!isHome && (
                <Td textAlign="center">
                  <IconButton
                    aria-label="Entrar"
                    icon={<ArrowForwardIcon />}
                    mr={2}
                    onClick={() => onEnter?.(bolao.id)}
                  />

                  {onEdit && (
                    <IconButton
                      aria-label="Editar"
                      icon={<EditIcon />}
                      mr={2}
                      hidden={bolao.roleBolao !== BolaoRoles.CRIADOR}
                      onClick={() => onEdit(bolao)}
                    />
                  )}

                  {onDelete && (
                    <IconButton
                      aria-label="Excluir"
                      icon={<DeleteIcon />}
                      hidden={bolao.roleBolao !== BolaoRoles.CRIADOR}
                      onClick={() => onDelete(bolao.id)}
                    />
                  )}
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

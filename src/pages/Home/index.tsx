import { Box, Divider, Heading, SimpleGrid, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Bolao, bolaoStore } from '../../stores/bolaoStore';
import { useEffect } from 'react';
import { retornaUserId } from '../../utils/Utils';
import NewsFeed from '../../components/NewsFeed';
import NotificationPanel from '../../components/NotificationPanel';

export function Home() {
  const { boloes, carregarBoloesPorUserId } = bolaoStore();

  useEffect(() => {
    carregarBoloesPorUserId(retornaUserId());
  }, [carregarBoloesPorUserId]);

   return (
		<Box p={4} mx="auto">
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
				<NewsFeed />

				<Box position="relative" pl={{ base: 0, lg: 8 }}>
					<Divider
						orientation="vertical"
						position="absolute"
						left={0}
					/>			
					<NotificationPanel />
				</Box>
			</SimpleGrid>
			<Divider mt={"10"} mb={"10"}/>
			<Heading mt={4} ml={4} size="lg">Bolões Abertos</Heading>
			<TableContainer width={"fit-content"}>
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th>ID</Th>
							<Th>Nome</Th>
						</Tr>
					</Thead>
					<Tbody>
						{boloes.map((bolao: Bolao) => (
								<Tr key={bolao.id}>
									<Td>{bolao.id}</Td>
									<Td>{bolao.nome}</Td>
								</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</Box>
  )
}
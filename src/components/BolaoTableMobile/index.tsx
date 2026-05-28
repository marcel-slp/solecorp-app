/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  Box, 
  Card,
  CardHeader, 
  Heading, 
  HStack, 
  IconButton, 
  SimpleGrid, 
  Text, 
  VStack 
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Bolao, BolaoListaGerenciamento } from "../../stores/bolaoStore";

type BolaoTableProps = {
  boloes: Bolao[] | BolaoListaGerenciamento[];
  onEnter?: (id: string) => void;
};

export default function BolaoTableMobile({
  boloes,
  onEnter
}: BolaoTableProps) {
  return (
    <Box>
      <SimpleGrid 
        columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4 }} 
        spacing={5}
        paddingBottom={4}
      >
        {boloes.map((bolao: any) => (
          <Card 
            key={bolao.id}
            variant="outline"
            borderRadius="xl"
            boxShadow="sm"
            _hover={{ 
              boxShadow: "md", 
              transform: "translateY(-4px)",
              borderColor: "blue.300"
            }}
            transition="all 0.2s"
            height="100%"
          >
            <CardHeader pb={4} height="100%" display="flex" flexDirection="column">
              <HStack justify="space-between" align="center" w="full" flex="1">
                <VStack align="start" spacing={0} flex="1">
                  <Text fontSize="xs" color="gray.500">ID: {bolao.id}</Text>
                  <Heading size="md" noOfLines={2}>{bolao.nome}</Heading>
                </VStack>

                <IconButton
                  aria-label="Entrar nos Palpites do Bolão"
                  icon={<ArrowForwardIcon />}
                  colorScheme="gray"
                  size="md"
                  variant="solid"
                  onClick={() => onEnter?.(bolao.id)}
                />
              </HStack>
            </CardHeader>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}
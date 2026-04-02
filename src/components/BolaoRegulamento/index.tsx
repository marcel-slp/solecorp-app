import { Box, Heading, Text, VStack, Divider } from '@chakra-ui/react';
import * as styles from './styles.css'; // Seu arquivo de estilos (opcional)

export default function RegulamentoBolao() {
  return (
    <Box
      p={{ base: 4, md: 8 }}
      bg="white"
      borderRadius="md"
      boxShadow="md"
      maxW="900px"
      mx="auto"
      className={styles.regulamentoContainer}
    >
      <VStack spacing={10} align="stretch">
        <Heading
          as="h1"
          size="lg"
          textAlign="center"
          color="blue.700"
          mb={6}
          textTransform="uppercase"
          letterSpacing="wide"
        >
          REGULAMENTO DO BOLÃO SOLECORP
        </Heading>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            CAPÍTULO I – DO BOLÃO
          </Heading>
          <Text textAlign="justify" lineHeight="tall">
            1. O presente bolão será regido por este regulamento, sem exceções ou limitações. Ao se inscrever para participar do bolão, o participante concorda expressamente com todas as cláusulas aqui presentes, inclusive a que prevê sua desclassificação sem direito a ressarcimento. A organização pode encerrar o bolão até o fim da 1ª fase mediante reembolso.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            CAPÍTULO II – DOS PARTICIPANTES
          </Heading>
          <Text textAlign="justify" lineHeight="tall">
            2. Os participantes do bolão deverão pagar a quantia de R$ 50,00 (cinquenta Reais) para terem suas inscrições homologadas. Se até a data limite informada pela organização o participante não enviar o comprovante de depósito de sua inscrição, a mesma será cancelada e sua vaga destinada a outro participante.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            CAPÍTULO III – DAS OBRIGAÇÕES DOS PARTICIPANTES
          </Heading>
          <Text textAlign="justify" lineHeight="tall">
            3. Cabe aos participantes verificarem o canal oficial da FIGA para informações acerca de resultados, classificações, rankings, premiações e datas. Os participantes que desbloquearem e editarem as planilhas do bolão serão desclassificados. Os desistentes ou excluídos por descumprimento deste regulamento não serão ressarcidos.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            CAPÍTULO IV – DOS PALPITES DE CONVOCAÇÃO
          </Heading>
          <Text textAlign="justify" lineHeight="tall">
            4. Os participantes deverão enviar suas convocações e palpites de cada etapa do torneio real (1ª Fase + Play-Off) até as datas informadas pela organização em seu canal oficial. Palpites enviados fora do prazo não serão validados pela organização.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            CAPÍTULO V – DAS DISPOSIÇÕES GERAIS
          </Heading>
          <VStack spacing={4} align="stretch">
            <Text textAlign="justify" lineHeight="tall">
              5. A Classificação Geral do bolão será o resultado da soma das pontuações com convocação, diferença de gols dos jogos, gols de cada time nos jogos, resultado de vitória ou empate, placar cravado, pontuações extras e bônus.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              6. A premiação será dividida conforme os critérios aqui estabelecidos: 1º ao 10º colocado da Classificação Geral; Pódios de cada Play-Off entre participantes; 1º colocado nos rankings de Diferença de Gols no Jogo, Gols de Cada Time, Resultado de Vitória ou Empate, Placar Cravado, 1ª e 2ª Fases; e 1º colocado nos rankings de cada Grupo de Participantes.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              7. Em caso de empate nas pontuações dos rankings que definam posições de premiação, conforme as Cláusulas 4 e 5 deste Regulamento, as premiações serão divididas em partes iguais entre os participantes que ficaram em posição de igualdade.
            </Text>
          </VStack>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            CAPÍTULO VI – DOS TIPOS DE PONTUAÇÃO
          </Heading>
          <VStack spacing={4} align="stretch">
            <Text textAlign="justify" lineHeight="tall">
              8. A pontuação da convocação será atribuída na relação de pontos da tabela acima para cada jogador relacionado pelo participante e de fato convocado pelo técnico da seleção brasileira para a competição. É responsabilidade do participante grafar corretamente o nome dos jogadores, de acordo com a nomenclatura da CBF.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              9. A pontuação de cada partida será computada na relação de pontos por critérios específicos, conforme a tabela de pontuação acima, com pontos para acerto de Diferença de Gols do Jogo, Gols dos Times, Resultado de Vitória ou Empate, acerto do Placar Cravado, resultado e placares das decisões por pênaltis (quando houver).
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              10. A pontuação extra será computada na relação de pontos por critérios específicos, conforme tabela acima, com pontos para acerto dos times classificados, acerto da ordem dos times nos grupos, acerto dos palpites de melhor ataque, melhor defesa, artilharia, Bola de Ouro, Luva de Ouro, pódio e melhor time da 1ª Fase.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              11. A pontuação de bonificação será computada na relação de pontos da tabela acima, conforme as condições de liderança, lanterna isolada, manutenção de posição e perda de posição por 3 datas consecutivas de partidas e data sem pontos. A pontuação de bonificação será computada na data seguinte à sua obtenção e não contempla a final da competição.
            </Text>
          </VStack>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            CAPÍTULO VII – DAS DISPUTAS SECUNDÁRIAS À CLASSIFICAÇÃO GERAL
          </Heading>
          <VStack spacing={4} align="stretch">
            <Text textAlign="justify" lineHeight="tall">
              12. O Play-Off de participantes será disputado com os 48 melhores da classificação geral do bolão (após o fim da 1ª Fase), que serão dispostos em 3 chaves, onde disputarão eliminatórias entre si, com as pontuações de cada etapa do torneio (critério de desempate do confronto: melhor ranking geral antes do início da etapa, melhor ranking 1ª Fase e sorteio).
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              13. A disputa de Grupos de participantes será realizada com divisão de todos os participantes em 5 (cinco) grupos distintos, onde concorrerão entre si dentro dos grupos com as pontuações gerais do bolão para fins de classificação. A distribuição dos participantes nos grupos se dará por critério da organização divulgado previamente.
            </Text>
          </VStack>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            CAPÍTULO VIII – DOS RANKINGS
          </Heading>
          <VStack spacing={4} align="stretch">
            <Text textAlign="justify" lineHeight="tall">
              14. A pontuação dos rankings do bolão (salvo as exceções) leva sempre em conta os placares finais das partidas do torneio real, considerando-se o resultado obtido no tempo normal + prorrogação (quando ocorrer), independente do resultado das eventuais decisões por pênaltis (exceto nos casos dos bônus previstos justamente para as decisões por pênaltis).
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              15. O Ranking de Diferença de Gols computa os pontos feitos conforme o acerto da diferença de gols entre os times, palpitada em cada partida, de modo que pontue se acertou a diferença de gols, mesmo errando os placares (ex: palpitou que o Time A faria 3 gols e o time B 1 gol, e o resultado foi A 2x0 B, então acertou a diferença de 2 gols a favor do A).
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              16. O Ranking de Gols Marcados computa os pontos feitos conforme o acerto dos gols dos dois times, palpitada em cada partida, de modo que o participante pontue se acertou o placar de um dos times, mesmo errando o resultado final (ex: palpitou que o Time A faria 3 gols e o time B 1 gol, e o resultado foi A 0x1 B, então acertou os gols do time B).
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              17. O Ranking de Resultados Certos computa os pontos feitos conforme o acerto do resultado da partida, de modo que o participante pontue se acertou quem venceu (ou o empate), mesmo errando os placares (ex: palpitou que o Time A faria 3 gols e o time B 1 gol, e o resultado foi A 1x0 B, então acertou que o time A venceria, mesmo errando os placares).
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              18. O Ranking de Placar Cravado computa os pontos feitos conforme o acerto total do resultado final da partida (com os placares), de modo que o participante pontue se acertou quem venceu (ou se foi empate), e os placares dos dois times (ex: palpitou que o Time A faria 3 gols e o time B 1 gol, e o resultado foi A 3x1 B).
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              19. O Ranking da 1ª Fase computa os pontos do Ranking Geral de cada participante do bolão, levando-se em conta apenas as partidas do torneio real que contem para a 1ª Fase do torneio real, sem a pontuação do Ranking Convocação e sem a pontuação do Ranking Extra.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              20. O Ranking da 2ª Fase computa os pontos do Ranking Geral de cada participante do bolão, levando-se em conta apenas as partidas do torneio real que contem para a 2ª Fase (play-offs) do torneio real, sem a pontuação do Ranking Convocação e sem a pontuação do Ranking Extra.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              21. O Ranking da Convocação computa os pontos dos participantes conforme os nomes de jogadores da Seleção Brasileira palpitados como constantes na convocação oficial real do time brasileiro que disputará a Copa do Mundo de 2022 a ser divulgada em 7 de Novembro de 2022.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              22. O Ranking de Pontuação Extra computa os pontos relativos aos palpites extras de: posições das seleções dentro dos grupos; quais seleções se classificaram; seleção de melhor campanha na 1ª Fase; pódio final; melhor jogador (Bola de Ouro); melhor goleiro (Luva de Ouro); artilheiro; e seleção com melhor ataque, em comparação com o torneio real.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              23. O Ranking de Bônus computa os pontos obtidos por situação relacionada ao ranking geral do dia (e não após cada partida): ter alcançado a liderança; ter mantido a posição por 3 dias consecutivos; ter terminado 1 dia na lanterna isolada; ter caído de posição por 3 dias consecutivos; e ter zerado pontuação no dia.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              24. O Ranking Geral (para fins da premiação principal) computa os pontos de todos os rankings do bolão (os 4 rankings de critérios, os Rankings de Bônus, o Ranking de Pontuação Extra e o Ranking de Convocação), não computando os Rankings dos Grupos, pois estes é que utilizam o Ranking Geral como parâmetro.
            </Text>
          </VStack>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            CAPÍTULO IX – DOS GRUPOS DE PARTICIPANTES
          </Heading>
          <Text textAlign="justify" lineHeight="tall">
            25. A classificação dos grupos de participantes computa os pontos do Ranking Geral de cada um, dentro dos grupos estabelecidos após a homologação da inscrição dos participantes. A composição inicial dos grupos será feita por ordem alfabética corrida (A -&gt; B -&gt; C -&gt; D -&gt; E, E -&gt; D -&gt; C -&gt; B -&gt; A, e assim sucessivamente) entre todos os participantes do bolão.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            CAPÍTULO X – DO PLAY-OFF DE PARTICIPANTES
          </Heading>
          <VStack spacing={4} align="stretch">
            <Text textAlign="justify" lineHeight="tall">
              26. Os Play-Offs do bolão serão formados após o fim da 1ª Fase do torneio real, conforme o Ranking Geral do bolão, de modo que os 16 primeiros entrem na chave Ouro, os 16 seguintes na chave Prata e os últimos 16 na chave Bronze. Em cada etapa do torneio real (Oitavas, Quartas, Semi, 3º Lugar e Final), os Play-Offs terão uma etapa equivalente no bolão.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              27. Em cada etapa dos Play-Offs do bolão, os participantes disputarão confrontos eliminatórios entre si, aos pares, em cada chave, com eliminação simples, e o vencedor avançará para a próxima etapa. A disputa em cada confronto com um par de participantes será pelo resultado final da pontuação obtida por cada um naquela etapa do bolão, sem os bônus.
            </Text>
          </VStack>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            CAPÍTULO XI – DAS DISPOSIÇÕES FINAIS
          </Heading>
          <VStack spacing={4} align="stretch">
            <Text textAlign="justify" lineHeight="tall">
              28. Se o participante notar algum erro na tabela ou no cálculo da pontuação obtida em uma partida, deve comunicar a organização pelos canais de comunicação disponíveis no mesmo dia em que detectar a inconsistência no cálculo, para que o eventual erro seja corrigido antes da publicação da próxima classificação geral do dia.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              29. Eventuais problemas nas engines de cálculo das pontuações, que venham a impedir a continuidade do bolão, podem ser motivo de suspensão ou cancelamento do mesmo, e ressarcimento dos valores de inscrição dos participantes, sem direito a qualquer tipo de indenização. Desistentes não serão ressarcidos.
            </Text>
          </VStack>
        </Box>

        <Divider my={8} borderColor="gray.400" />
      </VStack>
    </Box>
  );
}
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import * as styles from './styles.css';

export default function BolaoRegulamento() {
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
          REGULAMENTO DO SOLECORP BOLÃO CONTROL
        </Heading>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            CAPÍTULO I – DO BOLÃO
          </Heading>
          <Text textAlign="justify" lineHeight="tall">
            1. O presente bolão será regido por este regulamento, sem exceções ou limitações. Ao se inscrever para participar do bolão, ou aceitar o convite para tal, o participante concorda expressamente com todas as cláusulas aqui presentes, inclusive a que prevê sua desclassificação por infração ao regulamento.
          </Text>
          <Text textAlign="justify" lineHeight="tall">
            2. A organização do bolão está a cargo do usuário participante que criou o bolão e enviou o convite para os demais participantes, ou que abriu o bolão permitindo a participação livre. A SoleCorp não organiza bolões de nenhum tipo, mas apenas e tão somente disponibiliza a plataforma para que usuários cadastrados possam criar seus bolões e organizá-los livremente, por sua conta e responsabilidade total, conforme os Termos de Uso.
          </Text>
          <Text textAlign="justify" lineHeight="tall">
            3. A SoleCorp não se responsabiliza pelos atos dos usuários na organização dos seus bolões, nem pelos atos dos demais participantes dos bolões, incluindo os atos de bloqueio e banimento dos participantes, salvo os atos realizados pela própria plataforma. 
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            CAPÍTULO II – DAS DISPOSIÇÕES GERAIS
          </Heading>
          <Text textAlign="justify" lineHeight="tall">
            4. A Classificação Geral do bolão será o resultado da soma das pontuações com diferença de gols dos jogos, gols de cada time nos jogos, resultado da partida (vitória ou empate), placares cravados, pontuações extras e bônus (se disponíveis).   
          </Text>
          <Text textAlign="justify" lineHeight="tall">
            5. A SoleCorp não fornece premiação de qualquer tipo para os bolões criados em sua plataforma, mas disponibiliza um simulador de sugestão rateio de premiação para os casos em que os usuários, por sua conta e por fora da plataforma, decidam distribuir premiação por meio de arrecadação dos participantes e amigos, seguindo a tradição cultural de premiar os maiores pontuadores de bolões.
          </Text>
          <Text textAlign="justify" lineHeight="tall">
            6. Além de não fornecer premiação, a SoleCorp não fornece sistema de apostas, jogos, bets e afins. A plataforma caracteriza-se por ser de entretenimento puramente lúdico de bolão de futebol para fins de ranking de melhores previsões de resultados.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            CAPÍTULO III – DOS PARTICIPANTES
          </Heading>
          <Text textAlign="justify" lineHeight="tall">
            7. Os participantes do bolão deverão aceitar o convite para participação ou se inscrever em bolões de livre inscrição, usando a plataforma da SoleCorp e concordando tanto com os Termos de Uso da mesma quanto com o presente Regulamento do Bolão, não havendo garantia de que não será excluído do bolão, visto que a gestão do mesmo pertence ao usuário que o criou e os gerentes por ele delegados.
          </Text>
          <Text textAlign="justify" lineHeight="tall">
            8. Eventuais denúncias de má conduta de usuários serão analisadas pela SoleCorp e podem resultar em banimento dos mesmos, independente de anuência dos criadores do bolão.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            CAPÍTULO IV – DAS OBRIGAÇÕES DOS PARTICIPANTES  
          </Heading>
          <Text textAlign="justify" lineHeight="tall">
            9. Cabe aos participantes verificarem os canais oficiais da SoleCorp, ou sua plataforma, ou seu aplicativo mobile, para informações acerca de resultados, classificações, rankings e datas de inscrições, palpites, etc.; além de manter a boa educação e cortesia nas comunicações e no uso da plataforma.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            CAPÍTULO V – DOS PRAZOS DOS PALPITES
          </Heading>
          <VStack spacing={4} align="stretch">
            <Text textAlign="justify" lineHeight="tall">
              10. Os participantes deverão preencher seus palpites de cada partida do torneio real até 1 (uma) hora antes do início das mesmas, valendo o mesmo critério para a convocação da seleção, se habilitada em bolão. Palpites preenchidos além do prazo não serão validados pela plataforma.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              11. Os participantes deverão preencher seus palpites extras de seleções do pódio, melhor jogador, melhor goleiro e artilheiro do torneio, e de melhor seleção da 1ª Fase, até 1 (uma) hora antes do início da primeira partida real da competição.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              12. A plataforma utiliza o horário de Brasília como padrão. Após o horário limite informado nas cláusulas anteriores, o sistema não permitirá mais edição de palpites, e disponibilizará aos participantes a lista com todos os palpites preenchidos para aquela partida, ou os palpites extras, tornando-os públicos.
            </Text>
          </VStack>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            CAPÍTULO VI – DOS TIPOS DE PONTUAÇÃO DO BOLÃO
          </Heading>
          <VStack spacing={4} align="stretch">
            <Text textAlign="justify" lineHeight="tall">
              13. As pontuações de cada critério aplicado ao bolão são padronizadas, sendo possível aos usuários Prime a edição dos pontos conforme sua vontade.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              14. A pontuação padrão de cada partida será aquela constante na relação de critério de pontuação específica constante no link dentro do bolão com pontos para acerto de Diferença de Gols do Jogo, Gols dos Times, Resultado de Vitória, Derrota ou Empate, acerto do Placar Cravado, e resultado e placares das decisões por pênaltis (quando acontecerem).
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              15. A pontuação extra será aquela constante na relação de critérios de pontuações extras da tabela própria constante no link dentro do bolão com pontos para acerto dos palpites de artilheiro, Bola e Ouro, Luva de Ouro, melhor seleção da fase de grupos e pódio do torneio real.
            </Text>
          </VStack>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            CAPÍTULO VII – DOS RANKINGS DE PONTUAÇÃO
          </Heading>
          <VStack spacing={4} align="stretch">
            <Text textAlign="justify" lineHeight="tall">
              16. A pontuação dos rankings do bolão considera os placares finais das partidas do torneio real, levando-se em conta o resultado obtido no tempo normal mais prorrogação (quando ocorrer), independente do resultado das eventuais decisões por pênaltis (exceto nos casos dos pontos separados apenas para as decisões por pênaltis).
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              17. O ranking de Diferença de Gols computa os pontos feitos conforme o acerto da diferença de gols entre os times, palpitada em cada partida, de modo que o participante pontue se acertou a diferença de gols, mesmo eventualmente errando os placares (ex: palpitou que o Time A faria 3 gols e o time B faria 1 gol, e o resultado foi A 2x0 B, então o participante acertou a diferença de 2 gols a favor do A).
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              18. O ranking de Gols Marcados computa os pontos feitos conforme o acerto dos gols dos dois times, palpitada em cada partida, de modo que o participante pontue se acertou o placar de um dos times, mesmo errando o resultado final (ex: palpitou que o Time A faria 3 gols e o time B 1 gol, e o resultado foi A 0x1 B, então o participante acertou os gols do time B).
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              19. O ranking de Resultados da Partida computa os pontos feitos conforme o acerto do resultado final de vitória/derrota ou empate, de modo que o participante pontue se acertou quem venceu o jogo, ou acertou um empate, mesmo errando os placares (ex: palpitou que o Time A faria 3 gols e o time B 1 gol, e o resultado foi A 1x0 B, então o participante acertou que o time A venceria, mesmo errando os placares).
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              20. O ranking de Placar Cravado computa os pontos feitos conforme o acerto total do resultado final da partida (com os placares), de modo que o participante pontue se acertou o resultado exato da partida (ex: palpitou que o Time A faria 3 gols e o time B 1 gol, e o resultado final foi A 3x1 B, então o participante cravou o resultado).
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              21. O ranking da 1ª Fase, se habilitado, computa os pontos do Ranking Geral de cada participante do bolão, levando-se em conta apenas as partidas do torneio real válidas pela fase de grupos do torneio real, sem a pontuação do Ranking Convocação (caso habilitado) e sem as pontuações dos rankings de Pênaltis e Extra.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              22. O ranking da 2ª Fase, se habilitado, computa os pontos do Ranking Geral de cada participante do bolão, levando-se em conta apenas as partidas do torneio real válidas pela 2ª Fase (mata-mata) do torneio real, sem a pontuação do Ranking Convocação e sem a pontuação do Ranking Extra, mas incluindo a pontuação do Ranking de Pênaltis.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              23. O ranking de Pontuação Extra computa os pontos relativos aos palpites extras de: pódio final do torneio real; melhor jogador (Bola de Ouro); melhor goleiro (Luva de Ouro); artilheiro; e melhor seleção da 1ª Fase do torneio real.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              24. O ranking Geral (para fins da premiação principal) soma os pontos de todos os outros rankings principais do bolão (os 4 Rankings de critérios, os Rankings de Bônus e o Ranking de Pontuação Extra).
            </Text>
          </VStack>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            CAPÍTULO VIII – DAS DISPOSIÇÕES FINAIS
          </Heading>
          <VStack spacing={4} align="stretch">
            <Text textAlign="justify" lineHeight="tall">
              25. Se o usuário notar algum erro na tabela ou no cálculo da pontuação obtida em uma partida, deve comunicar a plataforma pelos canais de comunicação disponíveis no mesmo dia em que detectar a inconsistência no cálculo, para que o eventual erro seja corrigido antes da publicação da próxima classificação geral do dia.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              26. Não são permitidos usos de algoritmos, IAs ou outros mecanismos eletrônicos que sugiram palpites, bem como não são permitidos palpites padronizados ou idênticos entre si, sem observância das características individuais de cada partida ou qualquer outro subterfúgio que dirija os palpites ou que permita a burla do sistema ou de qualquer cláusula deste regulamento ou de uso do sistema. Em caso de detecção de infração a esta cláusula, o participante será banido pelo sistema, de forma definitiva e irrevogável, sem direito a ressarcimento de qualquer tipo.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              27. Casos omissos deste regulamento serão analisados e julgados pela plataforma SoleCorp e sua decisão será soberana e irrecorrível.
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
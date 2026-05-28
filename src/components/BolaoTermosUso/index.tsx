import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import * as styles from './styles.css';

export default function BolaoTermosUso() {
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
          TERMOS DE USO DO SOLECORP BOLÃO CONTROL
        </Heading>

        <Box>
          <Text textAlign="justify" lineHeight="tall">
            Antes de iniciar o uso da plataforma SOLECORP BOLÃO CONTROL, certifique-se de ter lido na integralidade estes Termos de Uso, para saber se estão de acordo com o que você espera e permite em uma condição de usuário de aplicativo eletrônico como o que oferecemos.
          </Text>
          <Text textAlign="justify" lineHeight="tall">
            Nos Termos de Uso, Política de Privacidade e Regulamento do Bolão explicamos quais são as obrigações das partes, como tratamos os dados dos usuários e da sua navegação no site, como funciona a plataforma e quais são as informações necessárias para que você compreenda o funcionamento do aplicativo e das informações que ele armazena e registra.
          </Text>
          <Text textAlign="justify" lineHeight="tall">
            Se, após a leitura de ambos os textos, você não concordar e não aceitar nossas condições, que são obrigatórias e vinculativas ao uso da plataforma, então você não deve clicar em “ACEITO” e não deve criar um usuário na plataforma, para criar ou participar de bolões.
          </Text>
        </Box>
        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            1. DO ACEITE DOS TERMOS DE USO
          </Heading>
          <Text textAlign="justify" lineHeight="tall">
            Ao clicar em “ACEITO” e passar a utilizar a plataforma SOLECORP BOLÃO CONTROL, o usuário declara expressamente ter lido, compreendido e aceito integralmente estes Termos de Uso, bem como nossa Política de Privacidade e do Regulamento do Bolão, sem ressalvas ou exceções, bem como concorda com a coleta de dados para fins de métricas de audiência, publicidade e afins (ver Item 5).
          </Text>
          <Text textAlign="justify" lineHeight="tall">
            O usuário também concorda que estes Termos poderão ser atualizados periodicamente pela plataforma, mediante aviso. Cabe ao usuário acompanhar eventuais alterações. A continuidade do uso da plataforma após essas atualizações será considerada como aceitação dos novos termos.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            2. DA NATUREZA E FINALIDADE DA PLATAFORMA
          </Heading>
          <Text textAlign="justify" lineHeight="tall">
            O BOLÃO CONTROL é uma plataforma digital destinada à criação e gestão de bolões esportivos entre usuários, não se configurando meio de apostas, nem intermediando ou realizando pagamentos entre usuários, e muito menos atuando como casa de apostas ou de promoção de apostas, não se enquadrando como site de “bets” e afins.
          </Text>
          <Text textAlign="justify" lineHeight="tall">
            Qualquer arrecadação ou premiação entre participantes é de responsabilidade exclusiva dos organizadores do bolão e realizada informalmente, por fora da plataforma, sem qualquer ciência ou vínculo com o BOLÃO CONTROL.
          </Text>
          <Text textAlign="justify" lineHeight="tall">
            Nosso objetivo é proporcionar aos amantes do futebol uma experiência única, onde você pode viver a intensidade dos torneios de futebol mais importantes do mundo enquanto compete com seus amigos para ver quem previu melhor os resultados dos jogos e dos torneios em geral.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            3. DAS EVENTUAIS ATUALIZAÇÕES DOS TERMOS
          </Heading>
          <Text textAlign="justify" lineHeight="tall">
            O BOLÃO CONTROL poderá atualizar estes Termos de Uso periodicamente para refletir melhorias na plataforma, adequações legais ou novas funcionalidades. As atualizações serão comunicadas mediante avisos na plataforma.
          </Text>
          <Text textAlign="justify" lineHeight="tall">
            Ao continuar utilizando a plataforma após eventuais atualizações, o usuário declara estar ciente e concordar com a versão vigente dos termos.
          </Text>
          <Text textAlign="justify" lineHeight="tall">
            A versão atual dos termos estará sempre disponível na plataforma.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            4. DO CADASTRO E RESPONSABILIDADES DO USUÁRIO  
          </Heading>
          <Text textAlign="justify" lineHeight="tall">
            Para utilização da plataforma, o usuário deverá cadastrar-se com email e senha pessoal secreta, ou via SSO (Login Social), utilizando conta Google ou Meta. Ao optar pela segunda modalidade de registro, o usuário autoriza que o BOLÃO CONTROL receba, por meio da API do provedor escolhido, os dados básicos necessários para criação ou acesso à conta (nome e e-mail).
          </Text>
          <Text textAlign="justify" lineHeight="tall">
            Em ambas as modalidades de cadastro, os dados obtidos têm como única finalidade autenticar o usuário e preencher seu perfil na plataforma. Nenhum dado adicional além dos descritos acima será acessado. Nenhum dos dados cadastrais, de ambas as modalidades, será disponibilizado a terceiros por nenhum meio.
          </Text>
          <Text textAlign="justify" lineHeight="tall">
            É de inteira e única responsabilidade do usuário, ao cadastrar-se: fornecer informações verdadeiras; manter a segurança de sua conta e senha e/ou e das credenciais do provedor SSO utilizado; utilizar a plataforma de forma lícita; não invadir, hackear ou obter indevidamente dados e informações da plataforma e do bolão – sobretudo de palpites de outros usuários.
          </Text>
          <Text textAlign="justify" lineHeight="tall">
            Para utilizar a plataforma é obrigatório que o usuário cadastre um nome ou apelido de identificação, que não pode ser ofensivo de maneira alguma e será exibido em seu perfil e nos rankings da plataforma. A imagem/foto de perfil não pode ser ofensiva de maneira alguma, nem representar entidades ou pessoas jurídicas de nenhum tipo, nem pertencer a menores de idade.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            5. DO USO DA PLATAFORMA
          </Heading>
          <VStack spacing={4} align="stretch">
            <Text textAlign="justify" lineHeight="tall">
              O usuário compromete-se a utilizar o BOLÃO CONTROL exclusivamente para fins lícitos e lúdicos, sendo proibido: uso fraudulento da plataforma; tentativa de acesso indevido ao sistema ou seu código; uso para fins ilegais ou contrários à legislação vigente; utilizar nossos espaços ou ferramentas para fazer publicidade de terceiros ou transformá-los em canais de venda ou agenciamento de qualquer tipo.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              Os usuários não podem promover ou difundir mensagens ofensivas ou discriminatórias de qualquer tipo em mensagens dentro da plataforma, ou em comentários em notícias ou outras ferramentas da plataforma.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              Os usuários não podem explorar eventuais bugs, falhas ou inconsistências da plataforma; não podem usar vírus ou outros tipos de programas maliciosos em nossa plataforma, nem IA para qualquer fim operacional ou no uso em geral da plataforma, incluindo o preenchimento dos palpites.
            </Text>
            
            <Text textAlign="justify" lineHeight="tall">
              A plataforma poderá suspender ou excluir contas que violem estas regras.
            </Text>
          </VStack>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            6. DA DISPONIBILIDADE DA PLATAFORMA
          </Heading>
          <VStack spacing={4} align="stretch">
            <Text textAlign="justify" lineHeight="tall">
              O BOLÃO CONTROL busca manter a plataforma estável e disponível, porém não se responsabiliza por interrupções decorrentes de: falhas de internet; serviços de terceiros; APIs externas; eventos de força maior, incluindo falhas no host de hospedagem da plataforma e dos seus bancos de dados.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              Em caso de interrupções na estabilidade da plataforma, assim que a situação se normalizar, a atualização de eventuais placares de bolões ativos será realizada.
            </Text>
          </VStack>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            7. DOS EVENTUAIS PAGAMENTOS E DA POLÍTICA DE NÃO-REEMBOLSO
          </Heading>
          <VStack spacing={4} align="stretch">
            <Text textAlign="justify" lineHeight="tall">
              O BOLÃO CONTROL disponibiliza serviços pagos que ampliam ou aprimoram a experiência na plataforma.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              A plataforma realizará cobranças automática ao final de eventuais períodos de contratação, se devidamente autorizado pelo usuário.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              Os valores eventualmente pagos NÃO são reembolsáveis em todo ou em parte. Ao realizar a compra de planos pagos, o usuário declara estar ciente desta política e concorda expressamente com a impossibilidade de reembolso dos valores pagos. A plataforma deixará de cobrar pelos planos pagos assim que o usuário requisitar o cancelamento dos mesmos.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              Esta condição não afasta direitos do consumidor previstos em lei, quando aplicáveis.
            </Text>
          </VStack>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            8. DA LIMITAÇÃO DE RESPONSABILIDADE
          </Heading>
          <VStack spacing={4} align="stretch">
            <Text textAlign="justify" lineHeight="tall">
              O BOLÃO CONTROL não se responsabiliza por: acordos financeiros entre participantes; pagamentos ou premiações de bolões acertados informalmente por fora da plataforma (já que nela não existe essa funcionalidade); eventuais disputas entre usuários, por quaisquer motivos, incluindo desinteligência física ou psíquica e discordâncias relativas ao gerenciamento dos bolões de que participam.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              A plataforma não está relacionada com jogos de sorte ou azar, nem com sorteios e/ou espetáculos, em com apostas ou distribuição de prêmios de qualquer tipo. A responsabilidade da plataforma limita-se ao fornecimento da engine digital para gestão dos bolões.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              O BOLÃO CONTROL não será responsável por danos indiretos, lucros cessantes, perda de oportunidade ou quaisquer outros prejuízos decorrentes do uso da plataforma, ainda que a mesma apresente falhas, erros ou interrupções, e até mesmo cancelamento de disponibilização das ferramentas.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              Em qualquer hipótese, a responsabilidade total do BOLÃO CONTROL ficará limitada ao valor eventualmente pago pelo usuário pelo uso da plataforma, quando aplicável.
            </Text>
          </VStack>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            9. DOS DADOS, PRIVACIDADE E SERVIÇOS DE TERCEIROS
          </Heading>
          <VStack spacing={4} align="stretch">
            <Text textAlign="justify" lineHeight="tall">
              Para funcionamento da plataforma, são coletados apenas os dados estritamente necessários para seu funcionamento, como: nome, e-mail, senha e dados de navegação para uso de cookies (ver Política de Privacidade). Caso o cadastro tenha sido realizado por meio de SSO, coletaremos ainda seu nome de usuário/login da plataforma Google ou Meta utilizada.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              O BOLÃO CONTROL não coleta dados sensíveis. Todos os dados são utilizados exclusivamente para autenticação e identificação na plataforma.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              Serviços de terceiros ativos durante o uso da plataforma:
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              Google Analytics: coleta dados de uso (páginas, cliques, sessão) para melhoria contínua do serviço. Base legal: legítimo interesse (LGPD Art. 7, IX).
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              Google AdSense: exibe anúncios para usuários não-premium, viabilizando a oferta gratuita da plataforma. Base legal: consentimento (LGPD Art. 7, I). Usuários premium não recebem anúncios.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              Google Identity Services: script funcional carregado na tela de login para viabilizar autenticação via Google. Base legal: execução do serviço solicitado (LGPD Art. 7, V).
            </Text>
          </VStack>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            10. DO USO INADEQUADO DA PLATAFORMA
          </Heading>
          <VStack spacing={4} align="stretch">
            <Text textAlign="justify" lineHeight="tall">
              O usuário compromete-se a utilizar a plataforma apenas para participação legítima em bolões esportivos.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              O BOLÃO CONTROL poderá suspender ou encerrar contas, grupos ou acessos que apresentem indícios de uso abusivo, incluindo, mas não se limitando a: uUtilização da plataforma exclusivamente para recebimento de notificações sem participação efetiva nos bolões; criação de grupos ou bolões com finalidade de copiar funcionalidades ou estrutura da plataforma; utilização para atividades ilícitas, fraudulentas ou que violem estes Termos de Uso.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              Nessas situações, o BOLÃO CONTROL poderá suspender ou encerrar o acesso sem necessidade de aviso prévio.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              É vedado utilizar a plataforma com finalidade de replicação, engenharia reversa, criação de produtos concorrentes ou exploração comercial não autorizada do modelo de funcionamento do BOLÃO CONTROL.
            </Text>
          </VStack>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            11. DA PROPRIEDADE INTELECTUAL
          </Heading>
          <VStack spacing={4} align="stretch">
            <Text textAlign="justify" lineHeight="tall">
              Todo o conteúdo, código-fonte, design, marca, identidade visual, layout, fluxos de navegação, telas, interfaces, textos, ilustrações, ícones, mecânicas de pontuação (incluindo, mas não se limitando, aos modelos de planos pagos, os critérios de pontuação, funcionalidades de simulador de rateio, play-off de participantes), integração com WhatsApp, Google ou Meta para autenticação e notificação, sistemas de bolões corporativos e demais elementos da plataforma BOLÃO CONTROL são de propriedade exclusiva da SOLECORP ou de seus licenciantes.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              Esses elementos são protegidos pela legislação brasileira aplicável, incluindo:
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              Lei nº 9.610/1998 (Lei de Direitos Autorais)
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              Lei nº 9.609/1998 (Lei do Software)
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              Lei nº 9.279/1996 (Lei da Propriedade Industrial)
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              Marco Civil da Internet (Lei nº 12.965/2014)
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              É expressamente vedado, sem autorização prévia, expressa e por escrito do BOLÃO CONTROL: copiar, reproduzir, modificar, traduzir, adaptar ou distribuir, no todo ou em parte, qualquer elemento da plataforma; realizar engenharia reversa, descompilação ou desmontagem do software; reutilizar layouts, fluxos, estruturas de telas ou mecânicas de bolão da plataforma em produtos próprios ou de terceiros; utilizar as marcas “SOLECORP” e "BOLÃO CONTROL", logotipo ou identidade visual sem autorização; criar produtos, serviços ou plataformas similares que se baseiem na estrutura, fluxos ou funcionalidades do BOLÃO CONTROL.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              O uso da plataforma não concede ao usuário qualquer licença, cessão ou direito sobre a propriedade intelectual do BOLÃO CONTROL, exceto o direito de uso não exclusivo, intransferível e revogável necessário para participar dos bolões conforme estes Termos de Uso.
            </Text>
          </VStack>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            12. DA PROIBIÇÃO DE COLETA AUTOMATIZADA E ACESSO NÃO AUTORIZADO
          </Heading>
          <VStack spacing={4} align="stretch">
            <Text textAlign="justify" lineHeight="tall">
              É expressamente proibido, sem autorização prévia e por escrito do BOLÃO CONTROL, utilizar quaisquer meios automatizados para acessar, extrair, coletar, armazenar ou reproduzir dados, conteúdos ou estrutura da plataforma, incluindo: bots, crawlers, spiders, scrapers ou qualquer ferramenta de automação; scripts, extensões de navegador ou softwares que simulem interação humana; acesso programático às APIs da plataforma fora dos canais oficiais autorizados; inteligência artificial, modelos de linguagem (LLMs) ou agentes autônomos para extração de dados, treinamento de modelos ou clonagem de funcionalidades; qualquer mecanismo que contorne autenticação, rate limits, captchas ou outras proteções técnicas.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              O BOLÃO CONTROL monitora ativamente padrões de uso anômalo e poderá bloquear imediatamente contas, endereços IP, dispositivos ou números de telefone identificados nessas práticas, sem necessidade de aviso prévio.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              Tais práticas podem configurar, conforme o caso, crime previsto no Art. 154-A do Código Penal (invasão de dispositivo informático) e ato ilícito civil, sujeitando o infrator às sanções legais cabíveis.
            </Text>
          </VStack>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            13. DA INDENIZAÇÃO POR VIOLAÇÃO
          </Heading>
          <VStack spacing={4} align="stretch">
            <Text textAlign="justify" lineHeight="tall">
              O usuário que descumprir estes Termos de Uso - em especial as cláusulas relativas a uso inadequado, propriedade intelectual e proibição de coleta automatizada - responderá por perdas e danos causados ao BOLÃO CONTROL, seus parceiros, demais usuários ou terceiros.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              A indenização abrange, sem se limitar a: danos materiais diretos comprovados; lucros cessantes decorrentes da concorrência desleal ou perda de usuários; danos morais e à imagem da plataforma; custos de defesa judicial e administrativa, incluindo honorários advocatícios; custos de remediação técnica, jurídica e de comunicação.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              O usuário se compromete, ainda, a isentar e indenizar o BOLÃO CONTROL de quaisquer reclamações, ações judiciais ou administrativas movidas por terceiros em decorrência do uso indevido da plataforma pelo próprio usuário.
            </Text>
          </VStack>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            14. DO ACEITE ELETRÔNICO
          </Heading>
          <VStack spacing={4} align="stretch">
            <Text textAlign="justify" lineHeight="tall">
              O aceite destes Termos de Uso é realizado por meio eletrônico e registrado pelo sistema, incluindo data, hora e versão do documento aceito pelo usuário.
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              Esse registro possui validade jurídica. O usuário concorda, ao aceitar estes Termos de Uso, que não poderá alegar desconhecimento do seu conteúdo, nem poderá alegar que “clicou sem ler” para fins de obter descaracterização de suas responsabilidades como usuário.
            </Text>
          </VStack>
        </Box>

        <Box>
          <Heading as="h2" size="md" fontWeight="bold" mb={4} color="gray.800" textAlign='center'>
            15. DA LEI APLICÁVEL E FORO ELEITO PARA DISPUTAS
          </Heading>
          <VStack spacing={4} align="stretch">
            <Text textAlign="justify" lineHeight="tall">
              Estes Termos de Uso são regidos e interpretados de acordo com as leis da República Federativa do Brasil, em especial o Código Civil (Lei nº 10.406/2002), o Código de Defesa do Consumidor (Lei nº 8.078/1990), o Marco Civil da Internet (Lei nº 12.965/2014) e a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
            </Text>

            <Text textAlign="justify" lineHeight="tall">
              Fica eleito o foro da Comarca de Ubatuba, Estado de São Paulo, como competente para dirimir quaisquer controvérsias decorrentes destes Termos, com renúncia expressa a qualquer outro, por mais privilegiado que seja, nos termos da legislação aplicável.
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
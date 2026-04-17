import { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  Text,
  Link,
  Badge,
  HStack,
  Spinner
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { buscarFeedNoticias } from '../../api';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
}

export default function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await buscarFeedNoticias();

        if (!response.data) throw new Error('Falha ao carregar notícias');

        const data = await response.data;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const normalizedNews = (data.articles || data).map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description || item.summary || '',
          url: item.url,
          publishedAt: item.publishedAt || item.pubDate,
          source: typeof item.source === 'object' ? item.source.name : item.source || 'Desconhecido',
        }));

        setNews(normalizedNews);
      } catch (err) {
        console.error(err);
        setError('Não foi possível carregar as notícias no momento.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (error) {
    return (
      <Box height="fit-content" p={4} bg="red.50" borderRadius="md" mb={8}>
        <Text color="red.600">{error}</Text>
      </Box>
    );
  }

  return (
    <Box mb={10} display={"grid"}>
      <Heading size="lg" mb={5} display="flex" alignItems="center" gap={2}>
        📰 Últimas Notícias do Esporte
      </Heading>

      <VStack spacing={4} align="stretch">
        {loading ? (
          <>
          <Spinner size="xl" color="blue.500" />
            <Text fontSize="lg" color="gray.600">
              Carregando notícias da Copa do Mundo 2026...
            </Text>
          </>
        ) : (
          news.slice(0,3).map((item) => (
            <Box
              key={item.id}
              p={5}
              borderWidth="1px"
              borderRadius="lg"
              //bg="white"
              _hover={{ shadow: 'md', borderColor: 'blue.300' }}
              //transition="all 0.2s"
            >
              <HStack justify="space-between" mb={3} key={item.id}>
                <Badge colorScheme="blue" fontSize="xs" px={3} py={1} key={item.id}>
                  {item.source}
                </Badge>
                <Text fontSize="sm" color="gray.500" key={item.id}>
                  {new Date(item.publishedAt).toLocaleDateString('pt-BR')}
                </Text>
              </HStack>

              <Heading size="md" mb={2} lineHeight="1.4" key={item.id}>
                <Link href={item.url} isExternal color="blue.700" _hover={{ color: 'blue.500' }} key={item.id}>
                  {item.title}
                </Link>
              </Heading>

              <Text color="gray.600" noOfLines={3} key={item.id}>
                {item.description}
              </Text>

              <Link
                href={item.url}
                key={item.id}
                isExternal
                color="blue.500"
                fontSize="sm"
                mt={3}
                display="inline-flex"
                alignItems="center"
                gap={1}
              >
                Ler notícia completa <ExternalLinkIcon />
              </Link>
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
}
import { useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  Text,
  Badge,
  HStack,
  IconButton
} from '@chakra-ui/react';
import { BellIcon, CloseIcon } from '@chakra-ui/icons';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  date: string;
  read: boolean;
}

export default function NotificationPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Novo Bolão Disponível',
      message: 'O bolão "Copa 2026 - Fase de Grupos" foi criado e está aberto para inscrições.',
      type: 'success',
      date: '2026-04-06 14:30',
      read: false,
    },
    {
      id: '2',
      title: 'Lembrete',
      message: 'Você tem 3 palpites pendentes para a próxima rodada.',
      type: 'warning',
      date: '2026-04-05 09:15',
      read: true,
    },
    {
      id: '3',
      title: 'Atualização de Ranking',
      message: 'Você subiu 2 posições no ranking geral!',
      type: 'info',
      date: '2026-04-04 18:45',
      read: false,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Box>
      <HStack justify="space-between" mb={4}>
        <Heading size="lg" display="flex" alignItems="center" gap={2}>
          <BellIcon /> Notificações
          {unreadCount > 0 && (
            <Badge colorScheme="red" borderRadius="full" px={2}>
              {unreadCount}
            </Badge>
          )}
        </Heading>
      </HStack>

      <VStack spacing={3} align="stretch">
        {notifications.length === 0 ? (
          <Text color="gray.500" textAlign="center" py={8}>
            Nenhuma notificação no momento.
          </Text>
        ) : (
          notifications.map((notif) => (
            <Box
              key={notif.id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              bg={notif.read ? "white" : "blue.50"}
              borderColor={notif.read ? "gray.200" : "blue.200"}
              position="relative"
            >
              <HStack justify="space-between" mb={2}>
                <Badge
                  colorScheme={
                    notif.type === 'success' ? 'green' :
                    notif.type === 'warning' ? 'orange' : 'blue'
                  }
                >
                  {notif.type.toUpperCase()}
                </Badge>
                <Text fontSize="xs" color="gray.500">
                  {notif.date}
                </Text>
              </HStack>

              <Text fontWeight="semibold" mb={1}>
                {notif.title}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {notif.message}
              </Text>

              {!notif.read && (
                <IconButton
                  aria-label="Marcar como lida"
                  icon={<CloseIcon />}
                  size="xs"
                  position="absolute"
                  top={3}
                  right={3}
                  onClick={() => markAsRead(notif.id)}
                />
              )}
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
}
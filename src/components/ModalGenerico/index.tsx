import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, 
  ModalFooter, 
  Button 
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ModalGenericoProps {
  isOpen: boolean;
  onClose: () => void;
  titulo: string;
  conteudo: ReactNode;
  tamanho?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  footer?: ReactNode;
}

export function ModalGenerico({ isOpen, onClose, titulo, conteudo, tamanho = 'xl', footer 
}: ModalGenericoProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={tamanho}>
      <ModalOverlay />
      <ModalContent maxWidth="90%" height="50%" overflow="auto">
        <ModalHeader>{titulo}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {conteudo}
        </ModalBody>
        <ModalFooter>
          {footer || <Button onClick={onClose}>Fechar</Button>}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
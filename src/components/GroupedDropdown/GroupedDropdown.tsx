import {
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Continentes, Paises } from "../../models/GruposParticipantesDefault";
import * as styles from "./styles.css";
import { ChevronDownIcon } from "@chakra-ui/icons";

type OptionValue = Paises | Continentes;
type Props = {
  value: OptionValue | null;
  onChange: (value: OptionValue) => void;
  placeholder?: string;
};

export default function GroupedDropdown({ value, onChange, placeholder = "Selecione" }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSelect = (v: OptionValue) => {
    onChange(v);
    onClose();
  };

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement="bottom-start">
      <PopoverTrigger>
        <Button className={styles.popoverTriggerButton}>
          {value ?? placeholder} <ChevronDownIcon boxSize={5} marginRight='-1.5'/>
        </Button>
      </PopoverTrigger>

      <PopoverContent className={styles.popoverContent}>
        <PopoverBody p={2}>
          <Accordion allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left">🌎 Países</Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel className={styles.accordionPanel}>
                <VStack align="stretch" spacing={0}>
                  {Object.values(Paises).map((pais) => (
                    <button
                      key={pais}
                      className={styles.groupButton}
                      onClick={() => handleSelect(pais)}
                    >
                      {pais}
                    </button>
                  ))}
                </VStack>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left">🌍 Continentes</Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel className={styles.accordionPanel}>
                <VStack align="stretch" spacing={0}>
                  {Object.values(Continentes).map((c) => (
                    <button
                      key={c}
                      className={styles.groupButton}
                      onClick={() => handleSelect(c)}
                    >
                      {c}
                    </button>
                  ))}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

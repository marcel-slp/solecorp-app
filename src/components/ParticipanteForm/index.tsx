import { useState, useEffect } from "react";
import { Atleta, NovoParticipante, Participante } from "../../stores/participantesStore.ts";
import { 
  Text, Input, Select, Button, Heading, Table, TableContainer, Tbody, Tr, Td, Th, Thead, 
  IconButton,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import * as styles from "./styles.css.ts";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Continentes, Paises } from "../../models/GruposParticipantesDefault.tsx";
import GroupedDropdown from "../GroupedDropdown/GroupedDropdown.tsx";
import { ImageUploader } from "../ImageUploader/ImageUploader.tsx";
import defaultParticipante from "@/assets/images/default_participante.jpeg";
import defaultAtleta from "@/assets/images/default_atleta.jpeg";

interface ParticipanteFormProps {
  participante?: Participante | null;
  onSalvar: (dados: NovoParticipante, id?: string) => void;
  onCancelar?: () => void;
}

const MAX_ATLETAS = 50;

export default function ParticipanteForm({ participante, onSalvar, onCancelar }: ParticipanteFormProps) {
    const [nomeInterno, setNomeInterno] = useState("");
    const [tipoInterno, setTipoInterno] = useState("");
    const [grupoInterno, setGrupoInterno] = useState<Paises|Continentes|null>(null);
    const [imagemParticipanteInterno, setImagemParticipanteInterno] = useState<File|string|null>(null);
    const [imagemAtletasInterno, setImagemAtletasInterno] = useState<File|null>(null);
    const [atletasInterno, setAtletasInterno] = useState<Atleta[]>([]);
    const [editandoAtleta, setEditandoAtleta] = useState<Atleta>({
        id: "",
        nome: "",
        camisa: null,
        nacionalidade: "",
        dataID: ""
    });
    const [mensagemAlertaParticipante, setMensagemAlertaParticipante] = useState<string|null>(null);
    const [mensagemAlertaAtleta, setMensagemAlertaAtleta] = useState<string|null>(null);

    useEffect(() => {        
        if (participante) {
            setNomeInterno(participante.nome);
            setTipoInterno(participante.tipo);
            setGrupoInterno(participante.grupo);
            setImagemParticipanteInterno(participante.imagemParticipante);
            if(participante.tipo === 'Equipe') {
                setImagemAtletasInterno(participante.imagemAtletas);
            }
            setAtletasInterno(participante.atletas ?? []);
        }
    }, [participante]);

    //Input pode ser um evento de componente HTML ou uma imagem do tipo File ou imagem nula - regra é que imagem nula é a imagem padrão
    //TODO: verificar se posso retirar o conceito de imagem nula e fazer somente a imagem padrão
    const handleChangeEditandoAtleta = (e: React.ChangeEvent<HTMLInputElement>) => {
        //Se for File ou nula, é considerado uma mudança de imagem    
        // if(e instanceof File || e == null) {
        //     setEditandoAtleta((prev) => {
        //         return {
        //         ...prev,
        //         imagem: e
        //     }});
        // } else if(e !== null) {
            const { name, value } = e.target;

            setEditandoAtleta((prev) => {
                return {
                ...prev,
                [name]:
                    name === "camisa"
                    ? parseInt(value) || 0
                    : value
                };
            });
        //}
    };

    const handleSalvarAtleta = () => {
        if (!editandoAtleta?.nome || !editandoAtleta?.nacionalidade || !editandoAtleta?.camisa || !editandoAtleta.dataID) {
            setMensagemAlertaAtleta("Preencha todos os campos do atleta");
            return;
        }

        if (atletasInterno.length >= MAX_ATLETAS && !atletasInterno.find(a => a.id === editandoAtleta.id)) {
            setMensagemAlertaAtleta(`Máximo de ${MAX_ATLETAS} atletas atingido.`);
            return;
        }

        setMensagemAlertaAtleta(null);

        setAtletasInterno((prev) => {
            if (editandoAtleta.id && prev.some(a => a.id === editandoAtleta.id)) {
                return prev.map(a => (a.id === editandoAtleta.id ? editandoAtleta : a));
            }

            const novo = {
                ...editandoAtleta,
                id: crypto.randomUUID().slice(0, 5)
            };
            return [...prev, novo];
        });

        setEditandoAtleta({ id: "", nome: "", camisa: null, nacionalidade: "", dataID: "" });
    };

    const handleSubmit = () => {
        if (!nomeInterno || !tipoInterno || !grupoInterno) {
            setMensagemAlertaParticipante("Preencha todos os dados obrigatórios");
            return;
        }

        setMensagemAlertaParticipante(null);

        const dados: NovoParticipante = {
            nome: nomeInterno,
            tipo: tipoInterno,
            grupo: grupoInterno,
            imagemParticipante: imagemParticipanteInterno,
            imagemAtletas: tipoInterno === 'Equipe' ? imagemAtletasInterno : null,
            atletas: atletasInterno.length > 0 ? atletasInterno : undefined
        };
        
        onSalvar(dados, participante?.id);
    };

    const handleEntrarEditModeAtleta = (atleta: Atleta) => {
        setEditandoAtleta({
            ...atleta,
            dataID: new Date(atleta.dataID).toISOString().substring(0, 10)
        });
    };

    const handleRemoverAtleta = (id: string) => {
        setAtletasInterno((prev) => prev.filter((a) => a.id !== id));
    };
    
    return (
        <div className={styles.tableParticipanteContainer}>
            <Heading size="md" mb={4} mt={4}>
                {participante ? "Editar Participante" : "Adicionar Participante"}
            </Heading>

            <div className={styles.addParticipantesContainer}>
                <Text>Nome:</Text>
                <Input
                    placeholder="Insira o nome do participante"
                    value={nomeInterno}
                    onChange={(e) => setNomeInterno(e.target.value)}
                />

                <Text>Imagem do Participante:</Text>
                <ImageUploader imagem={imagemParticipanteInterno} imagemDefault={defaultParticipante} onChange={setImagemParticipanteInterno} />

                <Text>Tipo:</Text>
                <Select placeholder="Selecione" value={tipoInterno} onChange={(e) => setTipoInterno(e.target.value)}>
                    <option value="Individual">Individual</option>
                    <option value="Equipe">Equipe</option>
                </Select>

                <Text>Grupo:</Text>
                <GroupedDropdown value={grupoInterno} onChange={setGrupoInterno} placeholder="Selecione o grupo" />
            </div>

            {tipoInterno === "Equipe" && (
                <div>
                    <Heading size="md" mb={4} mt={4}>
                        Adicionar Atletas
                    </Heading>
                    <div className={styles.addAtletasContainer}>
                        <div className={styles.formAtletasContainer}>
                            <Text>Nome do atleta:</Text>
                            <Input
                                name="nome"
                                placeholder="Insira o nome do atleta"
                                className={styles.eventoAtletaInputs}
                                value={editandoAtleta?.nome}
                                onChange={handleChangeEditandoAtleta}
                            />

                            <Text>Imagem dos Atletas:</Text>
                            <ImageUploader imagem={imagemAtletasInterno} imagemDefault={defaultAtleta} onChange={setImagemAtletasInterno} />

                            <Text>Número da camisa:</Text>
                            <Input
                                name="camisa"
                                placeholder="Insira o número do atleta"
                                maxLength={2}
                                className={styles.eventoAtletaInputs}
                                value={editandoAtleta?.camisa || ""}
                                onChange={handleChangeEditandoAtleta}
                            />

                            <Text>Nacionalidade:</Text>
                            <Input
                                name="nacionalidade"
                                placeholder="Insira a nacionalidade do atleta"
                                className={styles.eventoAtletaInputs}
                                value={editandoAtleta?.nacionalidade}
                                onChange={handleChangeEditandoAtleta}
                            />

                            <Text>Data de identificação:</Text>
                            <Input
                                name="dataID"
                                type="date"
                                className={styles.eventoAtletaInputs}
                                value={editandoAtleta?.dataID || ""}
                                onChange={handleChangeEditandoAtleta}
                            />
                        </div>

                        <div className={styles.tableAtletasContainer}>
                            <Heading size="md">Atletas</Heading>
                            <TableContainer>
                                <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>ID</Th>
                                        <Th>Nome</Th>
                                        <Th>Camisa</Th>
                                        <Th>Nacionalidade</Th>
                                        <Th>Data de Identificação</Th>
                                        <Th>Ações</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {atletasInterno.map((atleta, index) => (
                                    <Tr key={index}>
                                        <Td>{atleta.id}</Td>
                                        <Td>{atleta.nome}</Td>
                                        <Td>{atleta.camisa}</Td>
                                        <Td>{atleta.nacionalidade}</Td>
                                        <Td>{new Date(atleta.dataID).toLocaleDateString("pt-BR")}</Td>
                                        <Td>
                                            <IconButton
                                            aria-label="Editar Atleta"
                                            icon={<EditIcon />}
                                            mr={2}
                                            onClick={() => handleEntrarEditModeAtleta(atleta)}
                                            />
                                            <IconButton
                                            aria-label="Deletar Atleta"
                                            icon={<DeleteIcon />}
                                            onClick={() => handleRemoverAtleta(atleta.id)}
                                            />
                                        </Td>
                                    </Tr>
                                    ))}
                                </Tbody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>

                    {mensagemAlertaAtleta && (
                        <div className={styles.mensagemErroValidacao}>
                            <Alert status='error'>
                            <AlertIcon />
                                {mensagemAlertaAtleta}
                            </Alert>
                        </div>
                    )}

                    <Button onClick={handleSalvarAtleta} colorScheme="blue" style={{ marginBottom: "20px" }}>
                        Salvar Atleta
                    </Button>
                </div>
            )}

            {mensagemAlertaParticipante && (
                <div className={styles.mensagemErroValidacao}>
                    <Alert status='error'>
                    <AlertIcon />
                        {mensagemAlertaParticipante}
                    </Alert>
                </div>
            )}

            <Button mt={4} mb={4} onClick={handleSubmit} colorScheme="blue" style={{ marginRight: "20px" }}>
                {participante ? "Salvar Alterações" : "Salvar Participante"}
            </Button>
            <Button onClick={onCancelar}>
                Cancelar
            </Button>
        </div>
    );
}

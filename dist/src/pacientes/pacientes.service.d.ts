import { PrismaService } from '../prisma/prisma.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
export declare class PacientesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, data: CreatePacienteDto): Promise<{
        id: string;
        nome: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        cpf: string;
        dataNascimento: Date;
        telefone: string;
        endereco: string | null;
        historico: string | null;
        status: import(".prisma/client").$Enums.StatusPaciente;
        usuarioId: string;
    }>;
    findAll(userId: string): Promise<{
        id: string;
        nome: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        cpf: string;
        dataNascimento: Date;
        telefone: string;
        endereco: string | null;
        historico: string | null;
        status: import(".prisma/client").$Enums.StatusPaciente;
        usuarioId: string;
    }[]>;
    findOne(id: string, userId: string): Promise<{
        tratamentos: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.StatusTratamento;
            usuarioId: string;
            tempoEstimado: string;
            exercicios: string;
            valor: import("@prisma/client-runtime-utils").Decimal;
            dataInicio: Date;
            dataFim: Date | null;
            pacienteId: string;
        }[];
        agendamentos: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.StatusAgendamento;
            usuarioId: string;
            pacienteId: string;
            dataHora: Date;
            lembreteEnviado: boolean;
        }[];
    } & {
        id: string;
        nome: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        cpf: string;
        dataNascimento: Date;
        telefone: string;
        endereco: string | null;
        historico: string | null;
        status: import(".prisma/client").$Enums.StatusPaciente;
        usuarioId: string;
    }>;
    update(id: string, userId: string, data: UpdatePacienteDto): Promise<{
        id: string;
        nome: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        cpf: string;
        dataNascimento: Date;
        telefone: string;
        endereco: string | null;
        historico: string | null;
        status: import(".prisma/client").$Enums.StatusPaciente;
        usuarioId: string;
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        nome: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        cpf: string;
        dataNascimento: Date;
        telefone: string;
        endereco: string | null;
        historico: string | null;
        status: import(".prisma/client").$Enums.StatusPaciente;
        usuarioId: string;
    }>;
}

import { PrismaService } from '../prisma/prisma.service';
import { CreateTratamentoDto } from './dto/create-tratamento.dto';
import { UpdateTratamentoDto } from './dto/update-tratamento.dto';
export declare class TratamentosService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, data: CreateTratamentoDto): Promise<{
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
    }>;
    findAll(userId: string): Promise<({
        paciente: {
            id: string;
            nome: string;
            cpf: string;
        };
        _count: {
            sessoes: number;
        };
    } & {
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
    })[]>;
    findOne(id: string, userId: string): Promise<{
        paciente: {
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
        };
        sessoes: {
            id: string;
            createdAt: Date;
            data: Date;
            peso: import("@prisma/client-runtime-utils").Decimal | null;
            escalaDor: number;
            medidas: import("@prisma/client/runtime/client").JsonValue | null;
            observacoes: string | null;
            tratamentoId: string;
        }[];
        pagamentos: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.StatusPagamento;
            valor: import("@prisma/client-runtime-utils").Decimal;
            tratamentoId: string;
            dataVencimento: Date;
            dataPagamento: Date | null;
            comprovante: string | null;
        }[];
    } & {
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
    }>;
    update(id: string, userId: string, data: UpdateTratamentoDto): Promise<{
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
    }>;
    remove(id: string, userId: string): Promise<{
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
    }>;
}

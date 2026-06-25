import { PrismaService } from '../prisma/prisma.service';
import { CreateSessaoDto } from './dto/create-sessao.dto';
export declare class SessoesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, tratamentoId: string, data: CreateSessaoDto): Promise<{
        id: string;
        createdAt: Date;
        data: Date;
        peso: import("@prisma/client-runtime-utils").Decimal | null;
        escalaDor: number;
        medidas: import("@prisma/client/runtime/client").JsonValue | null;
        observacoes: string | null;
        tratamentoId: string;
    }>;
    findAllByTratamento(userId: string, tratamentoId: string): Promise<{
        id: string;
        createdAt: Date;
        data: Date;
        peso: import("@prisma/client-runtime-utils").Decimal | null;
        escalaDor: number;
        medidas: import("@prisma/client/runtime/client").JsonValue | null;
        observacoes: string | null;
        tratamentoId: string;
    }[]>;
    getDashboard(userId: string, pacienteId: string): Promise<{
        data: Date;
        peso: import("@prisma/client-runtime-utils").Decimal;
        escalaDor: number;
        medidas: import("@prisma/client/runtime/client").JsonValue;
    }[]>;
    remove(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        data: Date;
        peso: import("@prisma/client-runtime-utils").Decimal | null;
        escalaDor: number;
        medidas: import("@prisma/client/runtime/client").JsonValue | null;
        observacoes: string | null;
        tratamentoId: string;
    }>;
}

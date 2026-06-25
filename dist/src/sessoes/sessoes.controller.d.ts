import { SessoesService } from './sessoes.service';
import { CreateSessaoDto } from './dto/create-sessao.dto';
export declare class SessoesController {
    private sessoesService;
    constructor(sessoesService: SessoesService);
    create(req: any, tratamentoId: string, createSessaoDto: CreateSessaoDto): Promise<{
        id: string;
        createdAt: Date;
        data: Date;
        peso: import("@prisma/client-runtime-utils").Decimal | null;
        escalaDor: number;
        medidas: import("@prisma/client/runtime/client").JsonValue | null;
        observacoes: string | null;
        tratamentoId: string;
    }>;
    findAllByTratamento(req: any, tratamentoId: string): Promise<{
        id: string;
        createdAt: Date;
        data: Date;
        peso: import("@prisma/client-runtime-utils").Decimal | null;
        escalaDor: number;
        medidas: import("@prisma/client/runtime/client").JsonValue | null;
        observacoes: string | null;
        tratamentoId: string;
    }[]>;
    getDashboard(req: any, pacienteId: string): Promise<{
        data: Date;
        peso: import("@prisma/client-runtime-utils").Decimal;
        escalaDor: number;
        medidas: import("@prisma/client/runtime/client").JsonValue;
    }[]>;
    remove(id: string, req: any): Promise<{
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

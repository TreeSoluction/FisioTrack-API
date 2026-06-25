"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessoesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SessoesService = class SessoesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, tratamentoId, data) {
        const tratamento = await this.prisma.tratamento.findFirst({
            where: { id: tratamentoId, usuarioId: userId },
        });
        if (!tratamento) {
            throw new common_1.NotFoundException('Tratamento não encontrado');
        }
        return this.prisma.sessao.create({
            data: {
                ...data,
                tratamentoId,
            },
        });
    }
    async findAllByTratamento(userId, tratamentoId) {
        const tratamento = await this.prisma.tratamento.findFirst({
            where: { id: tratamentoId, usuarioId: userId },
        });
        if (!tratamento) {
            throw new common_1.NotFoundException('Tratamento não encontrado');
        }
        return this.prisma.sessao.findMany({
            where: { tratamentoId },
            orderBy: { data: 'desc' },
        });
    }
    async getDashboard(userId, pacienteId) {
        const paciente = await this.prisma.paciente.findFirst({
            where: { id: pacienteId, usuarioId: userId },
        });
        if (!paciente) {
            throw new common_1.NotFoundException('Paciente não encontrado');
        }
        const sessoes = await this.prisma.sessao.findMany({
            where: {
                tratamento: {
                    pacienteId,
                    usuarioId: userId,
                },
            },
            orderBy: { data: 'asc' },
            select: {
                data: true,
                peso: true,
                escalaDor: true,
                medidas: true,
            },
        });
        return sessoes;
    }
    async remove(id, userId) {
        const sessao = await this.prisma.sessao.findFirst({
            where: {
                id,
                tratamento: { usuarioId: userId },
            },
        });
        if (!sessao) {
            throw new common_1.NotFoundException('Sessão não encontrada');
        }
        return this.prisma.sessao.delete({ where: { id } });
    }
};
exports.SessoesService = SessoesService;
exports.SessoesService = SessoesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SessoesService);
//# sourceMappingURL=sessoes.service.js.map
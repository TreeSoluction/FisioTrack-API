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
exports.TratamentosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TratamentosService = class TratamentosService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, data) {
        return this.prisma.tratamento.create({
            data: {
                ...data,
                valor: data.valor,
                usuarioId: userId,
            },
        });
    }
    async findAll(userId) {
        return this.prisma.tratamento.findMany({
            where: { usuarioId: userId },
            include: {
                paciente: {
                    select: { id: true, nome: true, cpf: true },
                },
                _count: {
                    select: { sessoes: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, userId) {
        const tratamento = await this.prisma.tratamento.findFirst({
            where: { id, usuarioId: userId },
            include: {
                paciente: true,
                sessoes: {
                    orderBy: { data: 'desc' },
                },
                pagamentos: true,
            },
        });
        if (!tratamento) {
            throw new common_1.NotFoundException('Tratamento não encontrado');
        }
        return tratamento;
    }
    async update(id, userId, data) {
        await this.findOne(id, userId);
        return this.prisma.tratamento.update({
            where: { id },
            data,
        });
    }
    async remove(id, userId) {
        await this.findOne(id, userId);
        return this.prisma.tratamento.delete({ where: { id } });
    }
};
exports.TratamentosService = TratamentosService;
exports.TratamentosService = TratamentosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TratamentosService);
//# sourceMappingURL=tratamentos.service.js.map
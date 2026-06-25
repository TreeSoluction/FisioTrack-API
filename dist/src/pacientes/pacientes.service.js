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
exports.PacientesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PacientesService = class PacientesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, data) {
        return this.prisma.paciente.create({
            data: {
                ...data,
                usuarioId: userId,
            },
        });
    }
    async findAll(userId) {
        return this.prisma.paciente.findMany({
            where: { usuarioId: userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, userId) {
        const paciente = await this.prisma.paciente.findFirst({
            where: { id, usuarioId: userId },
            include: {
                tratamentos: true,
                agendamentos: true,
            },
        });
        if (!paciente) {
            throw new common_1.NotFoundException('Paciente não encontrado');
        }
        return paciente;
    }
    async update(id, userId, data) {
        await this.findOne(id, userId);
        return this.prisma.paciente.update({
            where: { id },
            data,
        });
    }
    async remove(id, userId) {
        await this.findOne(id, userId);
        return this.prisma.paciente.delete({ where: { id } });
    }
};
exports.PacientesService = PacientesService;
exports.PacientesService = PacientesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PacientesService);
//# sourceMappingURL=pacientes.service.js.map
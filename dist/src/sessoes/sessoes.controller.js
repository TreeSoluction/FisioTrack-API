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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessoesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const sessoes_service_1 = require("./sessoes.service");
const create_sessao_dto_1 = require("./dto/create-sessao.dto");
let SessoesController = class SessoesController {
    constructor(sessoesService) {
        this.sessoesService = sessoesService;
    }
    create(req, tratamentoId, createSessaoDto) {
        return this.sessoesService.create(req.user.id, tratamentoId, createSessaoDto);
    }
    findAllByTratamento(req, tratamentoId) {
        return this.sessoesService.findAllByTratamento(req.user.id, tratamentoId);
    }
    getDashboard(req, pacienteId) {
        return this.sessoesService.getDashboard(req.user.id, pacienteId);
    }
    remove(id, req) {
        return this.sessoesService.remove(id, req.user.id);
    }
};
exports.SessoesController = SessoesController;
__decorate([
    (0, common_1.Post)(':tratamentoId'),
    (0, swagger_1.ApiOperation)({ summary: 'Criar sessão de acompanhamento' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('tratamentoId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_sessao_dto_1.CreateSessaoDto]),
    __metadata("design:returntype", void 0)
], SessoesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('tratamento/:tratamentoId'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar sessões por tratamento' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('tratamentoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SessoesController.prototype, "findAllByTratamento", null);
__decorate([
    (0, common_1.Get)('dashboard/:pacienteId'),
    (0, swagger_1.ApiOperation)({ summary: 'Dashboard de evolução do paciente' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('pacienteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SessoesController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Deletar sessão' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SessoesController.prototype, "remove", null);
exports.SessoesController = SessoesController = __decorate([
    (0, swagger_1.ApiTags)('sessoes'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('sessoes'),
    __metadata("design:paramtypes", [sessoes_service_1.SessoesService])
], SessoesController);
//# sourceMappingURL=sessoes.controller.js.map
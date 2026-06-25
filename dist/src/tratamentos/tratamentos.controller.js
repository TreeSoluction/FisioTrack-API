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
exports.TratamentosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const tratamentos_service_1 = require("./tratamentos.service");
const create_tratamento_dto_1 = require("./dto/create-tratamento.dto");
const update_tratamento_dto_1 = require("./dto/update-tratamento.dto");
let TratamentosController = class TratamentosController {
    constructor(tratamentosService) {
        this.tratamentosService = tratamentosService;
    }
    create(req, createTratamentoDto) {
        return this.tratamentosService.create(req.user.id, createTratamentoDto);
    }
    findAll(req) {
        return this.tratamentosService.findAll(req.user.id);
    }
    findOne(id, req) {
        return this.tratamentosService.findOne(id, req.user.id);
    }
    update(id, req, updateTratamentoDto) {
        return this.tratamentosService.update(id, req.user.id, updateTratamentoDto);
    }
    remove(id, req) {
        return this.tratamentosService.remove(id, req.user.id);
    }
};
exports.TratamentosController = TratamentosController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar tratamento' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_tratamento_dto_1.CreateTratamentoDto]),
    __metadata("design:returntype", void 0)
], TratamentosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar tratamentos' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TratamentosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar tratamento por ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TratamentosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar tratamento' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_tratamento_dto_1.UpdateTratamentoDto]),
    __metadata("design:returntype", void 0)
], TratamentosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Deletar tratamento' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TratamentosController.prototype, "remove", null);
exports.TratamentosController = TratamentosController = __decorate([
    (0, swagger_1.ApiTags)('tratamentos'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('tratamentos'),
    __metadata("design:paramtypes", [tratamentos_service_1.TratamentosService])
], TratamentosController);
//# sourceMappingURL=tratamentos.controller.js.map
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
exports.CreateSessaoDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateSessaoDto {
}
exports.CreateSessaoDto = CreateSessaoDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 75.5 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSessaoDto.prototype, "peso", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, minimum: 0, maximum: 10 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(10),
    __metadata("design:type", Number)
], CreateSessaoDto.prototype, "escalaDor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: { braco: 30, coxa: 55 } }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateSessaoDto.prototype, "medidas", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Paciente relatou melhora na dor' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSessaoDto.prototype, "observacoes", void 0);
//# sourceMappingURL=create-sessao.dto.js.map
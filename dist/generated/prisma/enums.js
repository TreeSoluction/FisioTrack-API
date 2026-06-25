"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusPagamento = exports.StatusAgendamento = exports.StatusTratamento = exports.StatusPaciente = exports.Role = void 0;
exports.Role = {
    ADMIN: 'ADMIN',
    FISIOTERAPEUTA: 'FISIOTERAPEUTA'
};
exports.StatusPaciente = {
    ATIVO: 'ATIVO',
    INATIVO: 'INATIVO'
};
exports.StatusTratamento = {
    EM_ANDAMENTO: 'EM_ANDAMENTO',
    PAUSADO: 'PAUSADO',
    CONCLUIDO: 'CONCLUIDO'
};
exports.StatusAgendamento = {
    PENDENTE: 'PENDENTE',
    CONFIRMADO: 'CONFIRMADO',
    CANCELADO: 'CANCELADO',
    CONCLUIDO: 'CONCLUIDO'
};
exports.StatusPagamento = {
    PENDENTE: 'PENDENTE',
    PAGO: 'PAGO',
    ATRASADO: 'ATRASADO'
};
//# sourceMappingURL=enums.js.map
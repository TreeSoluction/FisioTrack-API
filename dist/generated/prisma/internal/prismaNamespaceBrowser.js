"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.NullableJsonNullValueInput = exports.SortOrder = exports.PagamentoScalarFieldEnum = exports.AgendamentoScalarFieldEnum = exports.SessaoScalarFieldEnum = exports.TratamentoScalarFieldEnum = exports.PacienteScalarFieldEnum = exports.UsuarioScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.Decimal = void 0;
const runtime = __importStar(require("@prisma/client/runtime/index-browser"));
exports.Decimal = runtime.Decimal;
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    Usuario: 'Usuario',
    Paciente: 'Paciente',
    Tratamento: 'Tratamento',
    Sessao: 'Sessao',
    Agendamento: 'Agendamento',
    Pagamento: 'Pagamento'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UsuarioScalarFieldEnum = {
    id: 'id',
    nome: 'nome',
    email: 'email',
    senha: 'senha',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PacienteScalarFieldEnum = {
    id: 'id',
    nome: 'nome',
    cpf: 'cpf',
    dataNascimento: 'dataNascimento',
    telefone: 'telefone',
    email: 'email',
    endereco: 'endereco',
    historico: 'historico',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    usuarioId: 'usuarioId'
};
exports.TratamentoScalarFieldEnum = {
    id: 'id',
    tempoEstimado: 'tempoEstimado',
    exercicios: 'exercicios',
    valor: 'valor',
    status: 'status',
    dataInicio: 'dataInicio',
    dataFim: 'dataFim',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    pacienteId: 'pacienteId',
    usuarioId: 'usuarioId'
};
exports.SessaoScalarFieldEnum = {
    id: 'id',
    data: 'data',
    peso: 'peso',
    escalaDor: 'escalaDor',
    medidas: 'medidas',
    observacoes: 'observacoes',
    createdAt: 'createdAt',
    tratamentoId: 'tratamentoId'
};
exports.AgendamentoScalarFieldEnum = {
    id: 'id',
    dataHora: 'dataHora',
    status: 'status',
    lembreteEnviado: 'lembreteEnviado',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    pacienteId: 'pacienteId',
    usuarioId: 'usuarioId'
};
exports.PagamentoScalarFieldEnum = {
    id: 'id',
    valor: 'valor',
    dataVencimento: 'dataVencimento',
    dataPagamento: 'dataPagamento',
    status: 'status',
    comprovante: 'comprovante',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    tratamentoId: 'tratamentoId'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.NullableJsonNullValueInput = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map
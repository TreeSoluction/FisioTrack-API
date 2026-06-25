import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly Usuario: "Usuario";
    readonly Paciente: "Paciente";
    readonly Tratamento: "Tratamento";
    readonly Sessao: "Sessao";
    readonly Agendamento: "Agendamento";
    readonly Pagamento: "Pagamento";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UsuarioScalarFieldEnum: {
    readonly id: "id";
    readonly nome: "nome";
    readonly email: "email";
    readonly senha: "senha";
    readonly role: "role";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum];
export declare const PacienteScalarFieldEnum: {
    readonly id: "id";
    readonly nome: "nome";
    readonly cpf: "cpf";
    readonly dataNascimento: "dataNascimento";
    readonly telefone: "telefone";
    readonly email: "email";
    readonly endereco: "endereco";
    readonly historico: "historico";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly usuarioId: "usuarioId";
};
export type PacienteScalarFieldEnum = (typeof PacienteScalarFieldEnum)[keyof typeof PacienteScalarFieldEnum];
export declare const TratamentoScalarFieldEnum: {
    readonly id: "id";
    readonly tempoEstimado: "tempoEstimado";
    readonly exercicios: "exercicios";
    readonly valor: "valor";
    readonly status: "status";
    readonly dataInicio: "dataInicio";
    readonly dataFim: "dataFim";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly pacienteId: "pacienteId";
    readonly usuarioId: "usuarioId";
};
export type TratamentoScalarFieldEnum = (typeof TratamentoScalarFieldEnum)[keyof typeof TratamentoScalarFieldEnum];
export declare const SessaoScalarFieldEnum: {
    readonly id: "id";
    readonly data: "data";
    readonly peso: "peso";
    readonly escalaDor: "escalaDor";
    readonly medidas: "medidas";
    readonly observacoes: "observacoes";
    readonly createdAt: "createdAt";
    readonly tratamentoId: "tratamentoId";
};
export type SessaoScalarFieldEnum = (typeof SessaoScalarFieldEnum)[keyof typeof SessaoScalarFieldEnum];
export declare const AgendamentoScalarFieldEnum: {
    readonly id: "id";
    readonly dataHora: "dataHora";
    readonly status: "status";
    readonly lembreteEnviado: "lembreteEnviado";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly pacienteId: "pacienteId";
    readonly usuarioId: "usuarioId";
};
export type AgendamentoScalarFieldEnum = (typeof AgendamentoScalarFieldEnum)[keyof typeof AgendamentoScalarFieldEnum];
export declare const PagamentoScalarFieldEnum: {
    readonly id: "id";
    readonly valor: "valor";
    readonly dataVencimento: "dataVencimento";
    readonly dataPagamento: "dataPagamento";
    readonly status: "status";
    readonly comprovante: "comprovante";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly tratamentoId: "tratamentoId";
};
export type PagamentoScalarFieldEnum = (typeof PagamentoScalarFieldEnum)[keyof typeof PagamentoScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
    readonly AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];

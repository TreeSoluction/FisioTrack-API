export declare const Role: {
    readonly ADMIN: "ADMIN";
    readonly FISIOTERAPEUTA: "FISIOTERAPEUTA";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const StatusPaciente: {
    readonly ATIVO: "ATIVO";
    readonly INATIVO: "INATIVO";
};
export type StatusPaciente = (typeof StatusPaciente)[keyof typeof StatusPaciente];
export declare const StatusTratamento: {
    readonly EM_ANDAMENTO: "EM_ANDAMENTO";
    readonly PAUSADO: "PAUSADO";
    readonly CONCLUIDO: "CONCLUIDO";
};
export type StatusTratamento = (typeof StatusTratamento)[keyof typeof StatusTratamento];
export declare const StatusAgendamento: {
    readonly PENDENTE: "PENDENTE";
    readonly CONFIRMADO: "CONFIRMADO";
    readonly CANCELADO: "CANCELADO";
    readonly CONCLUIDO: "CONCLUIDO";
};
export type StatusAgendamento = (typeof StatusAgendamento)[keyof typeof StatusAgendamento];
export declare const StatusPagamento: {
    readonly PENDENTE: "PENDENTE";
    readonly PAGO: "PAGO";
    readonly ATRASADO: "ATRASADO";
};
export type StatusPagamento = (typeof StatusPagamento)[keyof typeof StatusPagamento];

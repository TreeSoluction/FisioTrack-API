import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AgendamentoModel = runtime.Types.Result.DefaultSelection<Prisma.$AgendamentoPayload>;
export type AggregateAgendamento = {
    _count: AgendamentoCountAggregateOutputType | null;
    _min: AgendamentoMinAggregateOutputType | null;
    _max: AgendamentoMaxAggregateOutputType | null;
};
export type AgendamentoMinAggregateOutputType = {
    id: string | null;
    dataHora: Date | null;
    status: $Enums.StatusAgendamento | null;
    lembreteEnviado: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    pacienteId: string | null;
    usuarioId: string | null;
};
export type AgendamentoMaxAggregateOutputType = {
    id: string | null;
    dataHora: Date | null;
    status: $Enums.StatusAgendamento | null;
    lembreteEnviado: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    pacienteId: string | null;
    usuarioId: string | null;
};
export type AgendamentoCountAggregateOutputType = {
    id: number;
    dataHora: number;
    status: number;
    lembreteEnviado: number;
    createdAt: number;
    updatedAt: number;
    pacienteId: number;
    usuarioId: number;
    _all: number;
};
export type AgendamentoMinAggregateInputType = {
    id?: true;
    dataHora?: true;
    status?: true;
    lembreteEnviado?: true;
    createdAt?: true;
    updatedAt?: true;
    pacienteId?: true;
    usuarioId?: true;
};
export type AgendamentoMaxAggregateInputType = {
    id?: true;
    dataHora?: true;
    status?: true;
    lembreteEnviado?: true;
    createdAt?: true;
    updatedAt?: true;
    pacienteId?: true;
    usuarioId?: true;
};
export type AgendamentoCountAggregateInputType = {
    id?: true;
    dataHora?: true;
    status?: true;
    lembreteEnviado?: true;
    createdAt?: true;
    updatedAt?: true;
    pacienteId?: true;
    usuarioId?: true;
    _all?: true;
};
export type AgendamentoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AgendamentoWhereInput;
    orderBy?: Prisma.AgendamentoOrderByWithRelationInput | Prisma.AgendamentoOrderByWithRelationInput[];
    cursor?: Prisma.AgendamentoWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AgendamentoCountAggregateInputType;
    _min?: AgendamentoMinAggregateInputType;
    _max?: AgendamentoMaxAggregateInputType;
};
export type GetAgendamentoAggregateType<T extends AgendamentoAggregateArgs> = {
    [P in keyof T & keyof AggregateAgendamento]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAgendamento[P]> : Prisma.GetScalarType<T[P], AggregateAgendamento[P]>;
};
export type AgendamentoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AgendamentoWhereInput;
    orderBy?: Prisma.AgendamentoOrderByWithAggregationInput | Prisma.AgendamentoOrderByWithAggregationInput[];
    by: Prisma.AgendamentoScalarFieldEnum[] | Prisma.AgendamentoScalarFieldEnum;
    having?: Prisma.AgendamentoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AgendamentoCountAggregateInputType | true;
    _min?: AgendamentoMinAggregateInputType;
    _max?: AgendamentoMaxAggregateInputType;
};
export type AgendamentoGroupByOutputType = {
    id: string;
    dataHora: Date;
    status: $Enums.StatusAgendamento;
    lembreteEnviado: boolean;
    createdAt: Date;
    updatedAt: Date;
    pacienteId: string;
    usuarioId: string;
    _count: AgendamentoCountAggregateOutputType | null;
    _min: AgendamentoMinAggregateOutputType | null;
    _max: AgendamentoMaxAggregateOutputType | null;
};
export type GetAgendamentoGroupByPayload<T extends AgendamentoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AgendamentoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AgendamentoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AgendamentoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AgendamentoGroupByOutputType[P]>;
}>>;
export type AgendamentoWhereInput = {
    AND?: Prisma.AgendamentoWhereInput | Prisma.AgendamentoWhereInput[];
    OR?: Prisma.AgendamentoWhereInput[];
    NOT?: Prisma.AgendamentoWhereInput | Prisma.AgendamentoWhereInput[];
    id?: Prisma.StringFilter<"Agendamento"> | string;
    dataHora?: Prisma.DateTimeFilter<"Agendamento"> | Date | string;
    status?: Prisma.EnumStatusAgendamentoFilter<"Agendamento"> | $Enums.StatusAgendamento;
    lembreteEnviado?: Prisma.BoolFilter<"Agendamento"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Agendamento"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Agendamento"> | Date | string;
    pacienteId?: Prisma.StringFilter<"Agendamento"> | string;
    usuarioId?: Prisma.StringFilter<"Agendamento"> | string;
    paciente?: Prisma.XOR<Prisma.PacienteScalarRelationFilter, Prisma.PacienteWhereInput>;
    usuario?: Prisma.XOR<Prisma.UsuarioScalarRelationFilter, Prisma.UsuarioWhereInput>;
};
export type AgendamentoOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    dataHora?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    lembreteEnviado?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    pacienteId?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    paciente?: Prisma.PacienteOrderByWithRelationInput;
    usuario?: Prisma.UsuarioOrderByWithRelationInput;
};
export type AgendamentoWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.AgendamentoWhereInput | Prisma.AgendamentoWhereInput[];
    OR?: Prisma.AgendamentoWhereInput[];
    NOT?: Prisma.AgendamentoWhereInput | Prisma.AgendamentoWhereInput[];
    dataHora?: Prisma.DateTimeFilter<"Agendamento"> | Date | string;
    status?: Prisma.EnumStatusAgendamentoFilter<"Agendamento"> | $Enums.StatusAgendamento;
    lembreteEnviado?: Prisma.BoolFilter<"Agendamento"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Agendamento"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Agendamento"> | Date | string;
    pacienteId?: Prisma.StringFilter<"Agendamento"> | string;
    usuarioId?: Prisma.StringFilter<"Agendamento"> | string;
    paciente?: Prisma.XOR<Prisma.PacienteScalarRelationFilter, Prisma.PacienteWhereInput>;
    usuario?: Prisma.XOR<Prisma.UsuarioScalarRelationFilter, Prisma.UsuarioWhereInput>;
}, "id">;
export type AgendamentoOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    dataHora?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    lembreteEnviado?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    pacienteId?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    _count?: Prisma.AgendamentoCountOrderByAggregateInput;
    _max?: Prisma.AgendamentoMaxOrderByAggregateInput;
    _min?: Prisma.AgendamentoMinOrderByAggregateInput;
};
export type AgendamentoScalarWhereWithAggregatesInput = {
    AND?: Prisma.AgendamentoScalarWhereWithAggregatesInput | Prisma.AgendamentoScalarWhereWithAggregatesInput[];
    OR?: Prisma.AgendamentoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AgendamentoScalarWhereWithAggregatesInput | Prisma.AgendamentoScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Agendamento"> | string;
    dataHora?: Prisma.DateTimeWithAggregatesFilter<"Agendamento"> | Date | string;
    status?: Prisma.EnumStatusAgendamentoWithAggregatesFilter<"Agendamento"> | $Enums.StatusAgendamento;
    lembreteEnviado?: Prisma.BoolWithAggregatesFilter<"Agendamento"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Agendamento"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Agendamento"> | Date | string;
    pacienteId?: Prisma.StringWithAggregatesFilter<"Agendamento"> | string;
    usuarioId?: Prisma.StringWithAggregatesFilter<"Agendamento"> | string;
};
export type AgendamentoCreateInput = {
    id?: string;
    dataHora: Date | string;
    status?: $Enums.StatusAgendamento;
    lembreteEnviado?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    paciente: Prisma.PacienteCreateNestedOneWithoutAgendamentosInput;
    usuario: Prisma.UsuarioCreateNestedOneWithoutAgendamentosInput;
};
export type AgendamentoUncheckedCreateInput = {
    id?: string;
    dataHora: Date | string;
    status?: $Enums.StatusAgendamento;
    lembreteEnviado?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pacienteId: string;
    usuarioId: string;
};
export type AgendamentoUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dataHora?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento;
    lembreteEnviado?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    paciente?: Prisma.PacienteUpdateOneRequiredWithoutAgendamentosNestedInput;
    usuario?: Prisma.UsuarioUpdateOneRequiredWithoutAgendamentosNestedInput;
};
export type AgendamentoUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dataHora?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento;
    lembreteEnviado?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pacienteId?: Prisma.StringFieldUpdateOperationsInput | string;
    usuarioId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type AgendamentoCreateManyInput = {
    id?: string;
    dataHora: Date | string;
    status?: $Enums.StatusAgendamento;
    lembreteEnviado?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pacienteId: string;
    usuarioId: string;
};
export type AgendamentoUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dataHora?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento;
    lembreteEnviado?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AgendamentoUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dataHora?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento;
    lembreteEnviado?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pacienteId?: Prisma.StringFieldUpdateOperationsInput | string;
    usuarioId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type AgendamentoListRelationFilter = {
    every?: Prisma.AgendamentoWhereInput;
    some?: Prisma.AgendamentoWhereInput;
    none?: Prisma.AgendamentoWhereInput;
};
export type AgendamentoOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AgendamentoCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    dataHora?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    lembreteEnviado?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    pacienteId?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
};
export type AgendamentoMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    dataHora?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    lembreteEnviado?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    pacienteId?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
};
export type AgendamentoMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    dataHora?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    lembreteEnviado?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    pacienteId?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
};
export type AgendamentoCreateNestedManyWithoutUsuarioInput = {
    create?: Prisma.XOR<Prisma.AgendamentoCreateWithoutUsuarioInput, Prisma.AgendamentoUncheckedCreateWithoutUsuarioInput> | Prisma.AgendamentoCreateWithoutUsuarioInput[] | Prisma.AgendamentoUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?: Prisma.AgendamentoCreateOrConnectWithoutUsuarioInput | Prisma.AgendamentoCreateOrConnectWithoutUsuarioInput[];
    createMany?: Prisma.AgendamentoCreateManyUsuarioInputEnvelope;
    connect?: Prisma.AgendamentoWhereUniqueInput | Prisma.AgendamentoWhereUniqueInput[];
};
export type AgendamentoUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: Prisma.XOR<Prisma.AgendamentoCreateWithoutUsuarioInput, Prisma.AgendamentoUncheckedCreateWithoutUsuarioInput> | Prisma.AgendamentoCreateWithoutUsuarioInput[] | Prisma.AgendamentoUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?: Prisma.AgendamentoCreateOrConnectWithoutUsuarioInput | Prisma.AgendamentoCreateOrConnectWithoutUsuarioInput[];
    createMany?: Prisma.AgendamentoCreateManyUsuarioInputEnvelope;
    connect?: Prisma.AgendamentoWhereUniqueInput | Prisma.AgendamentoWhereUniqueInput[];
};
export type AgendamentoUpdateManyWithoutUsuarioNestedInput = {
    create?: Prisma.XOR<Prisma.AgendamentoCreateWithoutUsuarioInput, Prisma.AgendamentoUncheckedCreateWithoutUsuarioInput> | Prisma.AgendamentoCreateWithoutUsuarioInput[] | Prisma.AgendamentoUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?: Prisma.AgendamentoCreateOrConnectWithoutUsuarioInput | Prisma.AgendamentoCreateOrConnectWithoutUsuarioInput[];
    upsert?: Prisma.AgendamentoUpsertWithWhereUniqueWithoutUsuarioInput | Prisma.AgendamentoUpsertWithWhereUniqueWithoutUsuarioInput[];
    createMany?: Prisma.AgendamentoCreateManyUsuarioInputEnvelope;
    set?: Prisma.AgendamentoWhereUniqueInput | Prisma.AgendamentoWhereUniqueInput[];
    disconnect?: Prisma.AgendamentoWhereUniqueInput | Prisma.AgendamentoWhereUniqueInput[];
    delete?: Prisma.AgendamentoWhereUniqueInput | Prisma.AgendamentoWhereUniqueInput[];
    connect?: Prisma.AgendamentoWhereUniqueInput | Prisma.AgendamentoWhereUniqueInput[];
    update?: Prisma.AgendamentoUpdateWithWhereUniqueWithoutUsuarioInput | Prisma.AgendamentoUpdateWithWhereUniqueWithoutUsuarioInput[];
    updateMany?: Prisma.AgendamentoUpdateManyWithWhereWithoutUsuarioInput | Prisma.AgendamentoUpdateManyWithWhereWithoutUsuarioInput[];
    deleteMany?: Prisma.AgendamentoScalarWhereInput | Prisma.AgendamentoScalarWhereInput[];
};
export type AgendamentoUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: Prisma.XOR<Prisma.AgendamentoCreateWithoutUsuarioInput, Prisma.AgendamentoUncheckedCreateWithoutUsuarioInput> | Prisma.AgendamentoCreateWithoutUsuarioInput[] | Prisma.AgendamentoUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?: Prisma.AgendamentoCreateOrConnectWithoutUsuarioInput | Prisma.AgendamentoCreateOrConnectWithoutUsuarioInput[];
    upsert?: Prisma.AgendamentoUpsertWithWhereUniqueWithoutUsuarioInput | Prisma.AgendamentoUpsertWithWhereUniqueWithoutUsuarioInput[];
    createMany?: Prisma.AgendamentoCreateManyUsuarioInputEnvelope;
    set?: Prisma.AgendamentoWhereUniqueInput | Prisma.AgendamentoWhereUniqueInput[];
    disconnect?: Prisma.AgendamentoWhereUniqueInput | Prisma.AgendamentoWhereUniqueInput[];
    delete?: Prisma.AgendamentoWhereUniqueInput | Prisma.AgendamentoWhereUniqueInput[];
    connect?: Prisma.AgendamentoWhereUniqueInput | Prisma.AgendamentoWhereUniqueInput[];
    update?: Prisma.AgendamentoUpdateWithWhereUniqueWithoutUsuarioInput | Prisma.AgendamentoUpdateWithWhereUniqueWithoutUsuarioInput[];
    updateMany?: Prisma.AgendamentoUpdateManyWithWhereWithoutUsuarioInput | Prisma.AgendamentoUpdateManyWithWhereWithoutUsuarioInput[];
    deleteMany?: Prisma.AgendamentoScalarWhereInput | Prisma.AgendamentoScalarWhereInput[];
};
export type AgendamentoCreateNestedManyWithoutPacienteInput = {
    create?: Prisma.XOR<Prisma.AgendamentoCreateWithoutPacienteInput, Prisma.AgendamentoUncheckedCreateWithoutPacienteInput> | Prisma.AgendamentoCreateWithoutPacienteInput[] | Prisma.AgendamentoUncheckedCreateWithoutPacienteInput[];
    connectOrCreate?: Prisma.AgendamentoCreateOrConnectWithoutPacienteInput | Prisma.AgendamentoCreateOrConnectWithoutPacienteInput[];
    createMany?: Prisma.AgendamentoCreateManyPacienteInputEnvelope;
    connect?: Prisma.AgendamentoWhereUniqueInput | Prisma.AgendamentoWhereUniqueInput[];
};
export type AgendamentoUncheckedCreateNestedManyWithoutPacienteInput = {
    create?: Prisma.XOR<Prisma.AgendamentoCreateWithoutPacienteInput, Prisma.AgendamentoUncheckedCreateWithoutPacienteInput> | Prisma.AgendamentoCreateWithoutPacienteInput[] | Prisma.AgendamentoUncheckedCreateWithoutPacienteInput[];
    connectOrCreate?: Prisma.AgendamentoCreateOrConnectWithoutPacienteInput | Prisma.AgendamentoCreateOrConnectWithoutPacienteInput[];
    createMany?: Prisma.AgendamentoCreateManyPacienteInputEnvelope;
    connect?: Prisma.AgendamentoWhereUniqueInput | Prisma.AgendamentoWhereUniqueInput[];
};
export type AgendamentoUpdateManyWithoutPacienteNestedInput = {
    create?: Prisma.XOR<Prisma.AgendamentoCreateWithoutPacienteInput, Prisma.AgendamentoUncheckedCreateWithoutPacienteInput> | Prisma.AgendamentoCreateWithoutPacienteInput[] | Prisma.AgendamentoUncheckedCreateWithoutPacienteInput[];
    connectOrCreate?: Prisma.AgendamentoCreateOrConnectWithoutPacienteInput | Prisma.AgendamentoCreateOrConnectWithoutPacienteInput[];
    upsert?: Prisma.AgendamentoUpsertWithWhereUniqueWithoutPacienteInput | Prisma.AgendamentoUpsertWithWhereUniqueWithoutPacienteInput[];
    createMany?: Prisma.AgendamentoCreateManyPacienteInputEnvelope;
    set?: Prisma.AgendamentoWhereUniqueInput | Prisma.AgendamentoWhereUniqueInput[];
    disconnect?: Prisma.AgendamentoWhereUniqueInput | Prisma.AgendamentoWhereUniqueInput[];
    delete?: Prisma.AgendamentoWhereUniqueInput | Prisma.AgendamentoWhereUniqueInput[];
    connect?: Prisma.AgendamentoWhereUniqueInput | Prisma.AgendamentoWhereUniqueInput[];
    update?: Prisma.AgendamentoUpdateWithWhereUniqueWithoutPacienteInput | Prisma.AgendamentoUpdateWithWhereUniqueWithoutPacienteInput[];
    updateMany?: Prisma.AgendamentoUpdateManyWithWhereWithoutPacienteInput | Prisma.AgendamentoUpdateManyWithWhereWithoutPacienteInput[];
    deleteMany?: Prisma.AgendamentoScalarWhereInput | Prisma.AgendamentoScalarWhereInput[];
};
export type AgendamentoUncheckedUpdateManyWithoutPacienteNestedInput = {
    create?: Prisma.XOR<Prisma.AgendamentoCreateWithoutPacienteInput, Prisma.AgendamentoUncheckedCreateWithoutPacienteInput> | Prisma.AgendamentoCreateWithoutPacienteInput[] | Prisma.AgendamentoUncheckedCreateWithoutPacienteInput[];
    connectOrCreate?: Prisma.AgendamentoCreateOrConnectWithoutPacienteInput | Prisma.AgendamentoCreateOrConnectWithoutPacienteInput[];
    upsert?: Prisma.AgendamentoUpsertWithWhereUniqueWithoutPacienteInput | Prisma.AgendamentoUpsertWithWhereUniqueWithoutPacienteInput[];
    createMany?: Prisma.AgendamentoCreateManyPacienteInputEnvelope;
    set?: Prisma.AgendamentoWhereUniqueInput | Prisma.AgendamentoWhereUniqueInput[];
    disconnect?: Prisma.AgendamentoWhereUniqueInput | Prisma.AgendamentoWhereUniqueInput[];
    delete?: Prisma.AgendamentoWhereUniqueInput | Prisma.AgendamentoWhereUniqueInput[];
    connect?: Prisma.AgendamentoWhereUniqueInput | Prisma.AgendamentoWhereUniqueInput[];
    update?: Prisma.AgendamentoUpdateWithWhereUniqueWithoutPacienteInput | Prisma.AgendamentoUpdateWithWhereUniqueWithoutPacienteInput[];
    updateMany?: Prisma.AgendamentoUpdateManyWithWhereWithoutPacienteInput | Prisma.AgendamentoUpdateManyWithWhereWithoutPacienteInput[];
    deleteMany?: Prisma.AgendamentoScalarWhereInput | Prisma.AgendamentoScalarWhereInput[];
};
export type EnumStatusAgendamentoFieldUpdateOperationsInput = {
    set?: $Enums.StatusAgendamento;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type AgendamentoCreateWithoutUsuarioInput = {
    id?: string;
    dataHora: Date | string;
    status?: $Enums.StatusAgendamento;
    lembreteEnviado?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    paciente: Prisma.PacienteCreateNestedOneWithoutAgendamentosInput;
};
export type AgendamentoUncheckedCreateWithoutUsuarioInput = {
    id?: string;
    dataHora: Date | string;
    status?: $Enums.StatusAgendamento;
    lembreteEnviado?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pacienteId: string;
};
export type AgendamentoCreateOrConnectWithoutUsuarioInput = {
    where: Prisma.AgendamentoWhereUniqueInput;
    create: Prisma.XOR<Prisma.AgendamentoCreateWithoutUsuarioInput, Prisma.AgendamentoUncheckedCreateWithoutUsuarioInput>;
};
export type AgendamentoCreateManyUsuarioInputEnvelope = {
    data: Prisma.AgendamentoCreateManyUsuarioInput | Prisma.AgendamentoCreateManyUsuarioInput[];
    skipDuplicates?: boolean;
};
export type AgendamentoUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: Prisma.AgendamentoWhereUniqueInput;
    update: Prisma.XOR<Prisma.AgendamentoUpdateWithoutUsuarioInput, Prisma.AgendamentoUncheckedUpdateWithoutUsuarioInput>;
    create: Prisma.XOR<Prisma.AgendamentoCreateWithoutUsuarioInput, Prisma.AgendamentoUncheckedCreateWithoutUsuarioInput>;
};
export type AgendamentoUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: Prisma.AgendamentoWhereUniqueInput;
    data: Prisma.XOR<Prisma.AgendamentoUpdateWithoutUsuarioInput, Prisma.AgendamentoUncheckedUpdateWithoutUsuarioInput>;
};
export type AgendamentoUpdateManyWithWhereWithoutUsuarioInput = {
    where: Prisma.AgendamentoScalarWhereInput;
    data: Prisma.XOR<Prisma.AgendamentoUpdateManyMutationInput, Prisma.AgendamentoUncheckedUpdateManyWithoutUsuarioInput>;
};
export type AgendamentoScalarWhereInput = {
    AND?: Prisma.AgendamentoScalarWhereInput | Prisma.AgendamentoScalarWhereInput[];
    OR?: Prisma.AgendamentoScalarWhereInput[];
    NOT?: Prisma.AgendamentoScalarWhereInput | Prisma.AgendamentoScalarWhereInput[];
    id?: Prisma.StringFilter<"Agendamento"> | string;
    dataHora?: Prisma.DateTimeFilter<"Agendamento"> | Date | string;
    status?: Prisma.EnumStatusAgendamentoFilter<"Agendamento"> | $Enums.StatusAgendamento;
    lembreteEnviado?: Prisma.BoolFilter<"Agendamento"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Agendamento"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Agendamento"> | Date | string;
    pacienteId?: Prisma.StringFilter<"Agendamento"> | string;
    usuarioId?: Prisma.StringFilter<"Agendamento"> | string;
};
export type AgendamentoCreateWithoutPacienteInput = {
    id?: string;
    dataHora: Date | string;
    status?: $Enums.StatusAgendamento;
    lembreteEnviado?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    usuario: Prisma.UsuarioCreateNestedOneWithoutAgendamentosInput;
};
export type AgendamentoUncheckedCreateWithoutPacienteInput = {
    id?: string;
    dataHora: Date | string;
    status?: $Enums.StatusAgendamento;
    lembreteEnviado?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    usuarioId: string;
};
export type AgendamentoCreateOrConnectWithoutPacienteInput = {
    where: Prisma.AgendamentoWhereUniqueInput;
    create: Prisma.XOR<Prisma.AgendamentoCreateWithoutPacienteInput, Prisma.AgendamentoUncheckedCreateWithoutPacienteInput>;
};
export type AgendamentoCreateManyPacienteInputEnvelope = {
    data: Prisma.AgendamentoCreateManyPacienteInput | Prisma.AgendamentoCreateManyPacienteInput[];
    skipDuplicates?: boolean;
};
export type AgendamentoUpsertWithWhereUniqueWithoutPacienteInput = {
    where: Prisma.AgendamentoWhereUniqueInput;
    update: Prisma.XOR<Prisma.AgendamentoUpdateWithoutPacienteInput, Prisma.AgendamentoUncheckedUpdateWithoutPacienteInput>;
    create: Prisma.XOR<Prisma.AgendamentoCreateWithoutPacienteInput, Prisma.AgendamentoUncheckedCreateWithoutPacienteInput>;
};
export type AgendamentoUpdateWithWhereUniqueWithoutPacienteInput = {
    where: Prisma.AgendamentoWhereUniqueInput;
    data: Prisma.XOR<Prisma.AgendamentoUpdateWithoutPacienteInput, Prisma.AgendamentoUncheckedUpdateWithoutPacienteInput>;
};
export type AgendamentoUpdateManyWithWhereWithoutPacienteInput = {
    where: Prisma.AgendamentoScalarWhereInput;
    data: Prisma.XOR<Prisma.AgendamentoUpdateManyMutationInput, Prisma.AgendamentoUncheckedUpdateManyWithoutPacienteInput>;
};
export type AgendamentoCreateManyUsuarioInput = {
    id?: string;
    dataHora: Date | string;
    status?: $Enums.StatusAgendamento;
    lembreteEnviado?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pacienteId: string;
};
export type AgendamentoUpdateWithoutUsuarioInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dataHora?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento;
    lembreteEnviado?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    paciente?: Prisma.PacienteUpdateOneRequiredWithoutAgendamentosNestedInput;
};
export type AgendamentoUncheckedUpdateWithoutUsuarioInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dataHora?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento;
    lembreteEnviado?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pacienteId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type AgendamentoUncheckedUpdateManyWithoutUsuarioInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dataHora?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento;
    lembreteEnviado?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pacienteId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type AgendamentoCreateManyPacienteInput = {
    id?: string;
    dataHora: Date | string;
    status?: $Enums.StatusAgendamento;
    lembreteEnviado?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    usuarioId: string;
};
export type AgendamentoUpdateWithoutPacienteInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dataHora?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento;
    lembreteEnviado?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usuario?: Prisma.UsuarioUpdateOneRequiredWithoutAgendamentosNestedInput;
};
export type AgendamentoUncheckedUpdateWithoutPacienteInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dataHora?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento;
    lembreteEnviado?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usuarioId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type AgendamentoUncheckedUpdateManyWithoutPacienteInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dataHora?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumStatusAgendamentoFieldUpdateOperationsInput | $Enums.StatusAgendamento;
    lembreteEnviado?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usuarioId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type AgendamentoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    dataHora?: boolean;
    status?: boolean;
    lembreteEnviado?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pacienteId?: boolean;
    usuarioId?: boolean;
    paciente?: boolean | Prisma.PacienteDefaultArgs<ExtArgs>;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["agendamento"]>;
export type AgendamentoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    dataHora?: boolean;
    status?: boolean;
    lembreteEnviado?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pacienteId?: boolean;
    usuarioId?: boolean;
    paciente?: boolean | Prisma.PacienteDefaultArgs<ExtArgs>;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["agendamento"]>;
export type AgendamentoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    dataHora?: boolean;
    status?: boolean;
    lembreteEnviado?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pacienteId?: boolean;
    usuarioId?: boolean;
    paciente?: boolean | Prisma.PacienteDefaultArgs<ExtArgs>;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["agendamento"]>;
export type AgendamentoSelectScalar = {
    id?: boolean;
    dataHora?: boolean;
    status?: boolean;
    lembreteEnviado?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pacienteId?: boolean;
    usuarioId?: boolean;
};
export type AgendamentoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "dataHora" | "status" | "lembreteEnviado" | "createdAt" | "updatedAt" | "pacienteId" | "usuarioId", ExtArgs["result"]["agendamento"]>;
export type AgendamentoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    paciente?: boolean | Prisma.PacienteDefaultArgs<ExtArgs>;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
};
export type AgendamentoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    paciente?: boolean | Prisma.PacienteDefaultArgs<ExtArgs>;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
};
export type AgendamentoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    paciente?: boolean | Prisma.PacienteDefaultArgs<ExtArgs>;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
};
export type $AgendamentoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Agendamento";
    objects: {
        paciente: Prisma.$PacientePayload<ExtArgs>;
        usuario: Prisma.$UsuarioPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        dataHora: Date;
        status: $Enums.StatusAgendamento;
        lembreteEnviado: boolean;
        createdAt: Date;
        updatedAt: Date;
        pacienteId: string;
        usuarioId: string;
    }, ExtArgs["result"]["agendamento"]>;
    composites: {};
};
export type AgendamentoGetPayload<S extends boolean | null | undefined | AgendamentoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AgendamentoPayload, S>;
export type AgendamentoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AgendamentoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AgendamentoCountAggregateInputType | true;
};
export interface AgendamentoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Agendamento'];
        meta: {
            name: 'Agendamento';
        };
    };
    findUnique<T extends AgendamentoFindUniqueArgs>(args: Prisma.SelectSubset<T, AgendamentoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AgendamentoClient<runtime.Types.Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AgendamentoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AgendamentoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AgendamentoClient<runtime.Types.Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AgendamentoFindFirstArgs>(args?: Prisma.SelectSubset<T, AgendamentoFindFirstArgs<ExtArgs>>): Prisma.Prisma__AgendamentoClient<runtime.Types.Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AgendamentoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AgendamentoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AgendamentoClient<runtime.Types.Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AgendamentoFindManyArgs>(args?: Prisma.SelectSubset<T, AgendamentoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AgendamentoCreateArgs>(args: Prisma.SelectSubset<T, AgendamentoCreateArgs<ExtArgs>>): Prisma.Prisma__AgendamentoClient<runtime.Types.Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AgendamentoCreateManyArgs>(args?: Prisma.SelectSubset<T, AgendamentoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AgendamentoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AgendamentoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AgendamentoDeleteArgs>(args: Prisma.SelectSubset<T, AgendamentoDeleteArgs<ExtArgs>>): Prisma.Prisma__AgendamentoClient<runtime.Types.Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AgendamentoUpdateArgs>(args: Prisma.SelectSubset<T, AgendamentoUpdateArgs<ExtArgs>>): Prisma.Prisma__AgendamentoClient<runtime.Types.Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AgendamentoDeleteManyArgs>(args?: Prisma.SelectSubset<T, AgendamentoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AgendamentoUpdateManyArgs>(args: Prisma.SelectSubset<T, AgendamentoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AgendamentoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AgendamentoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AgendamentoUpsertArgs>(args: Prisma.SelectSubset<T, AgendamentoUpsertArgs<ExtArgs>>): Prisma.Prisma__AgendamentoClient<runtime.Types.Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AgendamentoCountArgs>(args?: Prisma.Subset<T, AgendamentoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AgendamentoCountAggregateOutputType> : number>;
    aggregate<T extends AgendamentoAggregateArgs>(args: Prisma.Subset<T, AgendamentoAggregateArgs>): Prisma.PrismaPromise<GetAgendamentoAggregateType<T>>;
    groupBy<T extends AgendamentoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AgendamentoGroupByArgs['orderBy'];
    } : {
        orderBy?: AgendamentoGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AgendamentoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgendamentoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AgendamentoFieldRefs;
}
export interface Prisma__AgendamentoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    paciente<T extends Prisma.PacienteDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PacienteDefaultArgs<ExtArgs>>): Prisma.Prisma__PacienteClient<runtime.Types.Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    usuario<T extends Prisma.UsuarioDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsuarioDefaultArgs<ExtArgs>>): Prisma.Prisma__UsuarioClient<runtime.Types.Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AgendamentoFieldRefs {
    readonly id: Prisma.FieldRef<"Agendamento", 'String'>;
    readonly dataHora: Prisma.FieldRef<"Agendamento", 'DateTime'>;
    readonly status: Prisma.FieldRef<"Agendamento", 'StatusAgendamento'>;
    readonly lembreteEnviado: Prisma.FieldRef<"Agendamento", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Agendamento", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Agendamento", 'DateTime'>;
    readonly pacienteId: Prisma.FieldRef<"Agendamento", 'String'>;
    readonly usuarioId: Prisma.FieldRef<"Agendamento", 'String'>;
}
export type AgendamentoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AgendamentoSelect<ExtArgs> | null;
    omit?: Prisma.AgendamentoOmit<ExtArgs> | null;
    include?: Prisma.AgendamentoInclude<ExtArgs> | null;
    where: Prisma.AgendamentoWhereUniqueInput;
};
export type AgendamentoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AgendamentoSelect<ExtArgs> | null;
    omit?: Prisma.AgendamentoOmit<ExtArgs> | null;
    include?: Prisma.AgendamentoInclude<ExtArgs> | null;
    where: Prisma.AgendamentoWhereUniqueInput;
};
export type AgendamentoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AgendamentoSelect<ExtArgs> | null;
    omit?: Prisma.AgendamentoOmit<ExtArgs> | null;
    include?: Prisma.AgendamentoInclude<ExtArgs> | null;
    where?: Prisma.AgendamentoWhereInput;
    orderBy?: Prisma.AgendamentoOrderByWithRelationInput | Prisma.AgendamentoOrderByWithRelationInput[];
    cursor?: Prisma.AgendamentoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AgendamentoScalarFieldEnum | Prisma.AgendamentoScalarFieldEnum[];
};
export type AgendamentoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AgendamentoSelect<ExtArgs> | null;
    omit?: Prisma.AgendamentoOmit<ExtArgs> | null;
    include?: Prisma.AgendamentoInclude<ExtArgs> | null;
    where?: Prisma.AgendamentoWhereInput;
    orderBy?: Prisma.AgendamentoOrderByWithRelationInput | Prisma.AgendamentoOrderByWithRelationInput[];
    cursor?: Prisma.AgendamentoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AgendamentoScalarFieldEnum | Prisma.AgendamentoScalarFieldEnum[];
};
export type AgendamentoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AgendamentoSelect<ExtArgs> | null;
    omit?: Prisma.AgendamentoOmit<ExtArgs> | null;
    include?: Prisma.AgendamentoInclude<ExtArgs> | null;
    where?: Prisma.AgendamentoWhereInput;
    orderBy?: Prisma.AgendamentoOrderByWithRelationInput | Prisma.AgendamentoOrderByWithRelationInput[];
    cursor?: Prisma.AgendamentoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AgendamentoScalarFieldEnum | Prisma.AgendamentoScalarFieldEnum[];
};
export type AgendamentoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AgendamentoSelect<ExtArgs> | null;
    omit?: Prisma.AgendamentoOmit<ExtArgs> | null;
    include?: Prisma.AgendamentoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AgendamentoCreateInput, Prisma.AgendamentoUncheckedCreateInput>;
};
export type AgendamentoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AgendamentoCreateManyInput | Prisma.AgendamentoCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AgendamentoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AgendamentoSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AgendamentoOmit<ExtArgs> | null;
    data: Prisma.AgendamentoCreateManyInput | Prisma.AgendamentoCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AgendamentoIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AgendamentoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AgendamentoSelect<ExtArgs> | null;
    omit?: Prisma.AgendamentoOmit<ExtArgs> | null;
    include?: Prisma.AgendamentoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AgendamentoUpdateInput, Prisma.AgendamentoUncheckedUpdateInput>;
    where: Prisma.AgendamentoWhereUniqueInput;
};
export type AgendamentoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AgendamentoUpdateManyMutationInput, Prisma.AgendamentoUncheckedUpdateManyInput>;
    where?: Prisma.AgendamentoWhereInput;
    limit?: number;
};
export type AgendamentoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AgendamentoSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AgendamentoOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AgendamentoUpdateManyMutationInput, Prisma.AgendamentoUncheckedUpdateManyInput>;
    where?: Prisma.AgendamentoWhereInput;
    limit?: number;
    include?: Prisma.AgendamentoIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AgendamentoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AgendamentoSelect<ExtArgs> | null;
    omit?: Prisma.AgendamentoOmit<ExtArgs> | null;
    include?: Prisma.AgendamentoInclude<ExtArgs> | null;
    where: Prisma.AgendamentoWhereUniqueInput;
    create: Prisma.XOR<Prisma.AgendamentoCreateInput, Prisma.AgendamentoUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AgendamentoUpdateInput, Prisma.AgendamentoUncheckedUpdateInput>;
};
export type AgendamentoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AgendamentoSelect<ExtArgs> | null;
    omit?: Prisma.AgendamentoOmit<ExtArgs> | null;
    include?: Prisma.AgendamentoInclude<ExtArgs> | null;
    where: Prisma.AgendamentoWhereUniqueInput;
};
export type AgendamentoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AgendamentoWhereInput;
    limit?: number;
};
export type AgendamentoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AgendamentoSelect<ExtArgs> | null;
    omit?: Prisma.AgendamentoOmit<ExtArgs> | null;
    include?: Prisma.AgendamentoInclude<ExtArgs> | null;
};

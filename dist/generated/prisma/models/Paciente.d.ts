import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PacienteModel = runtime.Types.Result.DefaultSelection<Prisma.$PacientePayload>;
export type AggregatePaciente = {
    _count: PacienteCountAggregateOutputType | null;
    _min: PacienteMinAggregateOutputType | null;
    _max: PacienteMaxAggregateOutputType | null;
};
export type PacienteMinAggregateOutputType = {
    id: string | null;
    nome: string | null;
    cpf: string | null;
    dataNascimento: Date | null;
    telefone: string | null;
    email: string | null;
    endereco: string | null;
    historico: string | null;
    status: $Enums.StatusPaciente | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    usuarioId: string | null;
};
export type PacienteMaxAggregateOutputType = {
    id: string | null;
    nome: string | null;
    cpf: string | null;
    dataNascimento: Date | null;
    telefone: string | null;
    email: string | null;
    endereco: string | null;
    historico: string | null;
    status: $Enums.StatusPaciente | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    usuarioId: string | null;
};
export type PacienteCountAggregateOutputType = {
    id: number;
    nome: number;
    cpf: number;
    dataNascimento: number;
    telefone: number;
    email: number;
    endereco: number;
    historico: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    usuarioId: number;
    _all: number;
};
export type PacienteMinAggregateInputType = {
    id?: true;
    nome?: true;
    cpf?: true;
    dataNascimento?: true;
    telefone?: true;
    email?: true;
    endereco?: true;
    historico?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    usuarioId?: true;
};
export type PacienteMaxAggregateInputType = {
    id?: true;
    nome?: true;
    cpf?: true;
    dataNascimento?: true;
    telefone?: true;
    email?: true;
    endereco?: true;
    historico?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    usuarioId?: true;
};
export type PacienteCountAggregateInputType = {
    id?: true;
    nome?: true;
    cpf?: true;
    dataNascimento?: true;
    telefone?: true;
    email?: true;
    endereco?: true;
    historico?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    usuarioId?: true;
    _all?: true;
};
export type PacienteAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PacienteWhereInput;
    orderBy?: Prisma.PacienteOrderByWithRelationInput | Prisma.PacienteOrderByWithRelationInput[];
    cursor?: Prisma.PacienteWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PacienteCountAggregateInputType;
    _min?: PacienteMinAggregateInputType;
    _max?: PacienteMaxAggregateInputType;
};
export type GetPacienteAggregateType<T extends PacienteAggregateArgs> = {
    [P in keyof T & keyof AggregatePaciente]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePaciente[P]> : Prisma.GetScalarType<T[P], AggregatePaciente[P]>;
};
export type PacienteGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PacienteWhereInput;
    orderBy?: Prisma.PacienteOrderByWithAggregationInput | Prisma.PacienteOrderByWithAggregationInput[];
    by: Prisma.PacienteScalarFieldEnum[] | Prisma.PacienteScalarFieldEnum;
    having?: Prisma.PacienteScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PacienteCountAggregateInputType | true;
    _min?: PacienteMinAggregateInputType;
    _max?: PacienteMaxAggregateInputType;
};
export type PacienteGroupByOutputType = {
    id: string;
    nome: string;
    cpf: string;
    dataNascimento: Date;
    telefone: string;
    email: string | null;
    endereco: string | null;
    historico: string | null;
    status: $Enums.StatusPaciente;
    createdAt: Date;
    updatedAt: Date;
    usuarioId: string;
    _count: PacienteCountAggregateOutputType | null;
    _min: PacienteMinAggregateOutputType | null;
    _max: PacienteMaxAggregateOutputType | null;
};
export type GetPacienteGroupByPayload<T extends PacienteGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PacienteGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PacienteGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PacienteGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PacienteGroupByOutputType[P]>;
}>>;
export type PacienteWhereInput = {
    AND?: Prisma.PacienteWhereInput | Prisma.PacienteWhereInput[];
    OR?: Prisma.PacienteWhereInput[];
    NOT?: Prisma.PacienteWhereInput | Prisma.PacienteWhereInput[];
    id?: Prisma.StringFilter<"Paciente"> | string;
    nome?: Prisma.StringFilter<"Paciente"> | string;
    cpf?: Prisma.StringFilter<"Paciente"> | string;
    dataNascimento?: Prisma.DateTimeFilter<"Paciente"> | Date | string;
    telefone?: Prisma.StringFilter<"Paciente"> | string;
    email?: Prisma.StringNullableFilter<"Paciente"> | string | null;
    endereco?: Prisma.StringNullableFilter<"Paciente"> | string | null;
    historico?: Prisma.StringNullableFilter<"Paciente"> | string | null;
    status?: Prisma.EnumStatusPacienteFilter<"Paciente"> | $Enums.StatusPaciente;
    createdAt?: Prisma.DateTimeFilter<"Paciente"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Paciente"> | Date | string;
    usuarioId?: Prisma.StringFilter<"Paciente"> | string;
    usuario?: Prisma.XOR<Prisma.UsuarioScalarRelationFilter, Prisma.UsuarioWhereInput>;
    tratamentos?: Prisma.TratamentoListRelationFilter;
    agendamentos?: Prisma.AgendamentoListRelationFilter;
};
export type PacienteOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    nome?: Prisma.SortOrder;
    cpf?: Prisma.SortOrder;
    dataNascimento?: Prisma.SortOrder;
    telefone?: Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    endereco?: Prisma.SortOrderInput | Prisma.SortOrder;
    historico?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    usuario?: Prisma.UsuarioOrderByWithRelationInput;
    tratamentos?: Prisma.TratamentoOrderByRelationAggregateInput;
    agendamentos?: Prisma.AgendamentoOrderByRelationAggregateInput;
};
export type PacienteWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    cpf?: string;
    AND?: Prisma.PacienteWhereInput | Prisma.PacienteWhereInput[];
    OR?: Prisma.PacienteWhereInput[];
    NOT?: Prisma.PacienteWhereInput | Prisma.PacienteWhereInput[];
    nome?: Prisma.StringFilter<"Paciente"> | string;
    dataNascimento?: Prisma.DateTimeFilter<"Paciente"> | Date | string;
    telefone?: Prisma.StringFilter<"Paciente"> | string;
    email?: Prisma.StringNullableFilter<"Paciente"> | string | null;
    endereco?: Prisma.StringNullableFilter<"Paciente"> | string | null;
    historico?: Prisma.StringNullableFilter<"Paciente"> | string | null;
    status?: Prisma.EnumStatusPacienteFilter<"Paciente"> | $Enums.StatusPaciente;
    createdAt?: Prisma.DateTimeFilter<"Paciente"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Paciente"> | Date | string;
    usuarioId?: Prisma.StringFilter<"Paciente"> | string;
    usuario?: Prisma.XOR<Prisma.UsuarioScalarRelationFilter, Prisma.UsuarioWhereInput>;
    tratamentos?: Prisma.TratamentoListRelationFilter;
    agendamentos?: Prisma.AgendamentoListRelationFilter;
}, "id" | "cpf">;
export type PacienteOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    nome?: Prisma.SortOrder;
    cpf?: Prisma.SortOrder;
    dataNascimento?: Prisma.SortOrder;
    telefone?: Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    endereco?: Prisma.SortOrderInput | Prisma.SortOrder;
    historico?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    _count?: Prisma.PacienteCountOrderByAggregateInput;
    _max?: Prisma.PacienteMaxOrderByAggregateInput;
    _min?: Prisma.PacienteMinOrderByAggregateInput;
};
export type PacienteScalarWhereWithAggregatesInput = {
    AND?: Prisma.PacienteScalarWhereWithAggregatesInput | Prisma.PacienteScalarWhereWithAggregatesInput[];
    OR?: Prisma.PacienteScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PacienteScalarWhereWithAggregatesInput | Prisma.PacienteScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Paciente"> | string;
    nome?: Prisma.StringWithAggregatesFilter<"Paciente"> | string;
    cpf?: Prisma.StringWithAggregatesFilter<"Paciente"> | string;
    dataNascimento?: Prisma.DateTimeWithAggregatesFilter<"Paciente"> | Date | string;
    telefone?: Prisma.StringWithAggregatesFilter<"Paciente"> | string;
    email?: Prisma.StringNullableWithAggregatesFilter<"Paciente"> | string | null;
    endereco?: Prisma.StringNullableWithAggregatesFilter<"Paciente"> | string | null;
    historico?: Prisma.StringNullableWithAggregatesFilter<"Paciente"> | string | null;
    status?: Prisma.EnumStatusPacienteWithAggregatesFilter<"Paciente"> | $Enums.StatusPaciente;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Paciente"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Paciente"> | Date | string;
    usuarioId?: Prisma.StringWithAggregatesFilter<"Paciente"> | string;
};
export type PacienteCreateInput = {
    id?: string;
    nome: string;
    cpf: string;
    dataNascimento: Date | string;
    telefone: string;
    email?: string | null;
    endereco?: string | null;
    historico?: string | null;
    status?: $Enums.StatusPaciente;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    usuario: Prisma.UsuarioCreateNestedOneWithoutPacientesInput;
    tratamentos?: Prisma.TratamentoCreateNestedManyWithoutPacienteInput;
    agendamentos?: Prisma.AgendamentoCreateNestedManyWithoutPacienteInput;
};
export type PacienteUncheckedCreateInput = {
    id?: string;
    nome: string;
    cpf: string;
    dataNascimento: Date | string;
    telefone: string;
    email?: string | null;
    endereco?: string | null;
    historico?: string | null;
    status?: $Enums.StatusPaciente;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    usuarioId: string;
    tratamentos?: Prisma.TratamentoUncheckedCreateNestedManyWithoutPacienteInput;
    agendamentos?: Prisma.AgendamentoUncheckedCreateNestedManyWithoutPacienteInput;
};
export type PacienteUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    cpf?: Prisma.StringFieldUpdateOperationsInput | string;
    dataNascimento?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    telefone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    endereco?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    historico?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumStatusPacienteFieldUpdateOperationsInput | $Enums.StatusPaciente;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usuario?: Prisma.UsuarioUpdateOneRequiredWithoutPacientesNestedInput;
    tratamentos?: Prisma.TratamentoUpdateManyWithoutPacienteNestedInput;
    agendamentos?: Prisma.AgendamentoUpdateManyWithoutPacienteNestedInput;
};
export type PacienteUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    cpf?: Prisma.StringFieldUpdateOperationsInput | string;
    dataNascimento?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    telefone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    endereco?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    historico?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumStatusPacienteFieldUpdateOperationsInput | $Enums.StatusPaciente;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usuarioId?: Prisma.StringFieldUpdateOperationsInput | string;
    tratamentos?: Prisma.TratamentoUncheckedUpdateManyWithoutPacienteNestedInput;
    agendamentos?: Prisma.AgendamentoUncheckedUpdateManyWithoutPacienteNestedInput;
};
export type PacienteCreateManyInput = {
    id?: string;
    nome: string;
    cpf: string;
    dataNascimento: Date | string;
    telefone: string;
    email?: string | null;
    endereco?: string | null;
    historico?: string | null;
    status?: $Enums.StatusPaciente;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    usuarioId: string;
};
export type PacienteUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    cpf?: Prisma.StringFieldUpdateOperationsInput | string;
    dataNascimento?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    telefone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    endereco?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    historico?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumStatusPacienteFieldUpdateOperationsInput | $Enums.StatusPaciente;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PacienteUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    cpf?: Prisma.StringFieldUpdateOperationsInput | string;
    dataNascimento?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    telefone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    endereco?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    historico?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumStatusPacienteFieldUpdateOperationsInput | $Enums.StatusPaciente;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usuarioId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PacienteListRelationFilter = {
    every?: Prisma.PacienteWhereInput;
    some?: Prisma.PacienteWhereInput;
    none?: Prisma.PacienteWhereInput;
};
export type PacienteOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PacienteCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nome?: Prisma.SortOrder;
    cpf?: Prisma.SortOrder;
    dataNascimento?: Prisma.SortOrder;
    telefone?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    endereco?: Prisma.SortOrder;
    historico?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
};
export type PacienteMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nome?: Prisma.SortOrder;
    cpf?: Prisma.SortOrder;
    dataNascimento?: Prisma.SortOrder;
    telefone?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    endereco?: Prisma.SortOrder;
    historico?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
};
export type PacienteMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nome?: Prisma.SortOrder;
    cpf?: Prisma.SortOrder;
    dataNascimento?: Prisma.SortOrder;
    telefone?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    endereco?: Prisma.SortOrder;
    historico?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
};
export type PacienteScalarRelationFilter = {
    is?: Prisma.PacienteWhereInput;
    isNot?: Prisma.PacienteWhereInput;
};
export type PacienteCreateNestedManyWithoutUsuarioInput = {
    create?: Prisma.XOR<Prisma.PacienteCreateWithoutUsuarioInput, Prisma.PacienteUncheckedCreateWithoutUsuarioInput> | Prisma.PacienteCreateWithoutUsuarioInput[] | Prisma.PacienteUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?: Prisma.PacienteCreateOrConnectWithoutUsuarioInput | Prisma.PacienteCreateOrConnectWithoutUsuarioInput[];
    createMany?: Prisma.PacienteCreateManyUsuarioInputEnvelope;
    connect?: Prisma.PacienteWhereUniqueInput | Prisma.PacienteWhereUniqueInput[];
};
export type PacienteUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: Prisma.XOR<Prisma.PacienteCreateWithoutUsuarioInput, Prisma.PacienteUncheckedCreateWithoutUsuarioInput> | Prisma.PacienteCreateWithoutUsuarioInput[] | Prisma.PacienteUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?: Prisma.PacienteCreateOrConnectWithoutUsuarioInput | Prisma.PacienteCreateOrConnectWithoutUsuarioInput[];
    createMany?: Prisma.PacienteCreateManyUsuarioInputEnvelope;
    connect?: Prisma.PacienteWhereUniqueInput | Prisma.PacienteWhereUniqueInput[];
};
export type PacienteUpdateManyWithoutUsuarioNestedInput = {
    create?: Prisma.XOR<Prisma.PacienteCreateWithoutUsuarioInput, Prisma.PacienteUncheckedCreateWithoutUsuarioInput> | Prisma.PacienteCreateWithoutUsuarioInput[] | Prisma.PacienteUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?: Prisma.PacienteCreateOrConnectWithoutUsuarioInput | Prisma.PacienteCreateOrConnectWithoutUsuarioInput[];
    upsert?: Prisma.PacienteUpsertWithWhereUniqueWithoutUsuarioInput | Prisma.PacienteUpsertWithWhereUniqueWithoutUsuarioInput[];
    createMany?: Prisma.PacienteCreateManyUsuarioInputEnvelope;
    set?: Prisma.PacienteWhereUniqueInput | Prisma.PacienteWhereUniqueInput[];
    disconnect?: Prisma.PacienteWhereUniqueInput | Prisma.PacienteWhereUniqueInput[];
    delete?: Prisma.PacienteWhereUniqueInput | Prisma.PacienteWhereUniqueInput[];
    connect?: Prisma.PacienteWhereUniqueInput | Prisma.PacienteWhereUniqueInput[];
    update?: Prisma.PacienteUpdateWithWhereUniqueWithoutUsuarioInput | Prisma.PacienteUpdateWithWhereUniqueWithoutUsuarioInput[];
    updateMany?: Prisma.PacienteUpdateManyWithWhereWithoutUsuarioInput | Prisma.PacienteUpdateManyWithWhereWithoutUsuarioInput[];
    deleteMany?: Prisma.PacienteScalarWhereInput | Prisma.PacienteScalarWhereInput[];
};
export type PacienteUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: Prisma.XOR<Prisma.PacienteCreateWithoutUsuarioInput, Prisma.PacienteUncheckedCreateWithoutUsuarioInput> | Prisma.PacienteCreateWithoutUsuarioInput[] | Prisma.PacienteUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?: Prisma.PacienteCreateOrConnectWithoutUsuarioInput | Prisma.PacienteCreateOrConnectWithoutUsuarioInput[];
    upsert?: Prisma.PacienteUpsertWithWhereUniqueWithoutUsuarioInput | Prisma.PacienteUpsertWithWhereUniqueWithoutUsuarioInput[];
    createMany?: Prisma.PacienteCreateManyUsuarioInputEnvelope;
    set?: Prisma.PacienteWhereUniqueInput | Prisma.PacienteWhereUniqueInput[];
    disconnect?: Prisma.PacienteWhereUniqueInput | Prisma.PacienteWhereUniqueInput[];
    delete?: Prisma.PacienteWhereUniqueInput | Prisma.PacienteWhereUniqueInput[];
    connect?: Prisma.PacienteWhereUniqueInput | Prisma.PacienteWhereUniqueInput[];
    update?: Prisma.PacienteUpdateWithWhereUniqueWithoutUsuarioInput | Prisma.PacienteUpdateWithWhereUniqueWithoutUsuarioInput[];
    updateMany?: Prisma.PacienteUpdateManyWithWhereWithoutUsuarioInput | Prisma.PacienteUpdateManyWithWhereWithoutUsuarioInput[];
    deleteMany?: Prisma.PacienteScalarWhereInput | Prisma.PacienteScalarWhereInput[];
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type EnumStatusPacienteFieldUpdateOperationsInput = {
    set?: $Enums.StatusPaciente;
};
export type PacienteCreateNestedOneWithoutTratamentosInput = {
    create?: Prisma.XOR<Prisma.PacienteCreateWithoutTratamentosInput, Prisma.PacienteUncheckedCreateWithoutTratamentosInput>;
    connectOrCreate?: Prisma.PacienteCreateOrConnectWithoutTratamentosInput;
    connect?: Prisma.PacienteWhereUniqueInput;
};
export type PacienteUpdateOneRequiredWithoutTratamentosNestedInput = {
    create?: Prisma.XOR<Prisma.PacienteCreateWithoutTratamentosInput, Prisma.PacienteUncheckedCreateWithoutTratamentosInput>;
    connectOrCreate?: Prisma.PacienteCreateOrConnectWithoutTratamentosInput;
    upsert?: Prisma.PacienteUpsertWithoutTratamentosInput;
    connect?: Prisma.PacienteWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PacienteUpdateToOneWithWhereWithoutTratamentosInput, Prisma.PacienteUpdateWithoutTratamentosInput>, Prisma.PacienteUncheckedUpdateWithoutTratamentosInput>;
};
export type PacienteCreateNestedOneWithoutAgendamentosInput = {
    create?: Prisma.XOR<Prisma.PacienteCreateWithoutAgendamentosInput, Prisma.PacienteUncheckedCreateWithoutAgendamentosInput>;
    connectOrCreate?: Prisma.PacienteCreateOrConnectWithoutAgendamentosInput;
    connect?: Prisma.PacienteWhereUniqueInput;
};
export type PacienteUpdateOneRequiredWithoutAgendamentosNestedInput = {
    create?: Prisma.XOR<Prisma.PacienteCreateWithoutAgendamentosInput, Prisma.PacienteUncheckedCreateWithoutAgendamentosInput>;
    connectOrCreate?: Prisma.PacienteCreateOrConnectWithoutAgendamentosInput;
    upsert?: Prisma.PacienteUpsertWithoutAgendamentosInput;
    connect?: Prisma.PacienteWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PacienteUpdateToOneWithWhereWithoutAgendamentosInput, Prisma.PacienteUpdateWithoutAgendamentosInput>, Prisma.PacienteUncheckedUpdateWithoutAgendamentosInput>;
};
export type PacienteCreateWithoutUsuarioInput = {
    id?: string;
    nome: string;
    cpf: string;
    dataNascimento: Date | string;
    telefone: string;
    email?: string | null;
    endereco?: string | null;
    historico?: string | null;
    status?: $Enums.StatusPaciente;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tratamentos?: Prisma.TratamentoCreateNestedManyWithoutPacienteInput;
    agendamentos?: Prisma.AgendamentoCreateNestedManyWithoutPacienteInput;
};
export type PacienteUncheckedCreateWithoutUsuarioInput = {
    id?: string;
    nome: string;
    cpf: string;
    dataNascimento: Date | string;
    telefone: string;
    email?: string | null;
    endereco?: string | null;
    historico?: string | null;
    status?: $Enums.StatusPaciente;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tratamentos?: Prisma.TratamentoUncheckedCreateNestedManyWithoutPacienteInput;
    agendamentos?: Prisma.AgendamentoUncheckedCreateNestedManyWithoutPacienteInput;
};
export type PacienteCreateOrConnectWithoutUsuarioInput = {
    where: Prisma.PacienteWhereUniqueInput;
    create: Prisma.XOR<Prisma.PacienteCreateWithoutUsuarioInput, Prisma.PacienteUncheckedCreateWithoutUsuarioInput>;
};
export type PacienteCreateManyUsuarioInputEnvelope = {
    data: Prisma.PacienteCreateManyUsuarioInput | Prisma.PacienteCreateManyUsuarioInput[];
    skipDuplicates?: boolean;
};
export type PacienteUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: Prisma.PacienteWhereUniqueInput;
    update: Prisma.XOR<Prisma.PacienteUpdateWithoutUsuarioInput, Prisma.PacienteUncheckedUpdateWithoutUsuarioInput>;
    create: Prisma.XOR<Prisma.PacienteCreateWithoutUsuarioInput, Prisma.PacienteUncheckedCreateWithoutUsuarioInput>;
};
export type PacienteUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: Prisma.PacienteWhereUniqueInput;
    data: Prisma.XOR<Prisma.PacienteUpdateWithoutUsuarioInput, Prisma.PacienteUncheckedUpdateWithoutUsuarioInput>;
};
export type PacienteUpdateManyWithWhereWithoutUsuarioInput = {
    where: Prisma.PacienteScalarWhereInput;
    data: Prisma.XOR<Prisma.PacienteUpdateManyMutationInput, Prisma.PacienteUncheckedUpdateManyWithoutUsuarioInput>;
};
export type PacienteScalarWhereInput = {
    AND?: Prisma.PacienteScalarWhereInput | Prisma.PacienteScalarWhereInput[];
    OR?: Prisma.PacienteScalarWhereInput[];
    NOT?: Prisma.PacienteScalarWhereInput | Prisma.PacienteScalarWhereInput[];
    id?: Prisma.StringFilter<"Paciente"> | string;
    nome?: Prisma.StringFilter<"Paciente"> | string;
    cpf?: Prisma.StringFilter<"Paciente"> | string;
    dataNascimento?: Prisma.DateTimeFilter<"Paciente"> | Date | string;
    telefone?: Prisma.StringFilter<"Paciente"> | string;
    email?: Prisma.StringNullableFilter<"Paciente"> | string | null;
    endereco?: Prisma.StringNullableFilter<"Paciente"> | string | null;
    historico?: Prisma.StringNullableFilter<"Paciente"> | string | null;
    status?: Prisma.EnumStatusPacienteFilter<"Paciente"> | $Enums.StatusPaciente;
    createdAt?: Prisma.DateTimeFilter<"Paciente"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Paciente"> | Date | string;
    usuarioId?: Prisma.StringFilter<"Paciente"> | string;
};
export type PacienteCreateWithoutTratamentosInput = {
    id?: string;
    nome: string;
    cpf: string;
    dataNascimento: Date | string;
    telefone: string;
    email?: string | null;
    endereco?: string | null;
    historico?: string | null;
    status?: $Enums.StatusPaciente;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    usuario: Prisma.UsuarioCreateNestedOneWithoutPacientesInput;
    agendamentos?: Prisma.AgendamentoCreateNestedManyWithoutPacienteInput;
};
export type PacienteUncheckedCreateWithoutTratamentosInput = {
    id?: string;
    nome: string;
    cpf: string;
    dataNascimento: Date | string;
    telefone: string;
    email?: string | null;
    endereco?: string | null;
    historico?: string | null;
    status?: $Enums.StatusPaciente;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    usuarioId: string;
    agendamentos?: Prisma.AgendamentoUncheckedCreateNestedManyWithoutPacienteInput;
};
export type PacienteCreateOrConnectWithoutTratamentosInput = {
    where: Prisma.PacienteWhereUniqueInput;
    create: Prisma.XOR<Prisma.PacienteCreateWithoutTratamentosInput, Prisma.PacienteUncheckedCreateWithoutTratamentosInput>;
};
export type PacienteUpsertWithoutTratamentosInput = {
    update: Prisma.XOR<Prisma.PacienteUpdateWithoutTratamentosInput, Prisma.PacienteUncheckedUpdateWithoutTratamentosInput>;
    create: Prisma.XOR<Prisma.PacienteCreateWithoutTratamentosInput, Prisma.PacienteUncheckedCreateWithoutTratamentosInput>;
    where?: Prisma.PacienteWhereInput;
};
export type PacienteUpdateToOneWithWhereWithoutTratamentosInput = {
    where?: Prisma.PacienteWhereInput;
    data: Prisma.XOR<Prisma.PacienteUpdateWithoutTratamentosInput, Prisma.PacienteUncheckedUpdateWithoutTratamentosInput>;
};
export type PacienteUpdateWithoutTratamentosInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    cpf?: Prisma.StringFieldUpdateOperationsInput | string;
    dataNascimento?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    telefone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    endereco?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    historico?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumStatusPacienteFieldUpdateOperationsInput | $Enums.StatusPaciente;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usuario?: Prisma.UsuarioUpdateOneRequiredWithoutPacientesNestedInput;
    agendamentos?: Prisma.AgendamentoUpdateManyWithoutPacienteNestedInput;
};
export type PacienteUncheckedUpdateWithoutTratamentosInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    cpf?: Prisma.StringFieldUpdateOperationsInput | string;
    dataNascimento?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    telefone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    endereco?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    historico?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumStatusPacienteFieldUpdateOperationsInput | $Enums.StatusPaciente;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usuarioId?: Prisma.StringFieldUpdateOperationsInput | string;
    agendamentos?: Prisma.AgendamentoUncheckedUpdateManyWithoutPacienteNestedInput;
};
export type PacienteCreateWithoutAgendamentosInput = {
    id?: string;
    nome: string;
    cpf: string;
    dataNascimento: Date | string;
    telefone: string;
    email?: string | null;
    endereco?: string | null;
    historico?: string | null;
    status?: $Enums.StatusPaciente;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    usuario: Prisma.UsuarioCreateNestedOneWithoutPacientesInput;
    tratamentos?: Prisma.TratamentoCreateNestedManyWithoutPacienteInput;
};
export type PacienteUncheckedCreateWithoutAgendamentosInput = {
    id?: string;
    nome: string;
    cpf: string;
    dataNascimento: Date | string;
    telefone: string;
    email?: string | null;
    endereco?: string | null;
    historico?: string | null;
    status?: $Enums.StatusPaciente;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    usuarioId: string;
    tratamentos?: Prisma.TratamentoUncheckedCreateNestedManyWithoutPacienteInput;
};
export type PacienteCreateOrConnectWithoutAgendamentosInput = {
    where: Prisma.PacienteWhereUniqueInput;
    create: Prisma.XOR<Prisma.PacienteCreateWithoutAgendamentosInput, Prisma.PacienteUncheckedCreateWithoutAgendamentosInput>;
};
export type PacienteUpsertWithoutAgendamentosInput = {
    update: Prisma.XOR<Prisma.PacienteUpdateWithoutAgendamentosInput, Prisma.PacienteUncheckedUpdateWithoutAgendamentosInput>;
    create: Prisma.XOR<Prisma.PacienteCreateWithoutAgendamentosInput, Prisma.PacienteUncheckedCreateWithoutAgendamentosInput>;
    where?: Prisma.PacienteWhereInput;
};
export type PacienteUpdateToOneWithWhereWithoutAgendamentosInput = {
    where?: Prisma.PacienteWhereInput;
    data: Prisma.XOR<Prisma.PacienteUpdateWithoutAgendamentosInput, Prisma.PacienteUncheckedUpdateWithoutAgendamentosInput>;
};
export type PacienteUpdateWithoutAgendamentosInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    cpf?: Prisma.StringFieldUpdateOperationsInput | string;
    dataNascimento?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    telefone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    endereco?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    historico?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumStatusPacienteFieldUpdateOperationsInput | $Enums.StatusPaciente;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usuario?: Prisma.UsuarioUpdateOneRequiredWithoutPacientesNestedInput;
    tratamentos?: Prisma.TratamentoUpdateManyWithoutPacienteNestedInput;
};
export type PacienteUncheckedUpdateWithoutAgendamentosInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    cpf?: Prisma.StringFieldUpdateOperationsInput | string;
    dataNascimento?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    telefone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    endereco?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    historico?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumStatusPacienteFieldUpdateOperationsInput | $Enums.StatusPaciente;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usuarioId?: Prisma.StringFieldUpdateOperationsInput | string;
    tratamentos?: Prisma.TratamentoUncheckedUpdateManyWithoutPacienteNestedInput;
};
export type PacienteCreateManyUsuarioInput = {
    id?: string;
    nome: string;
    cpf: string;
    dataNascimento: Date | string;
    telefone: string;
    email?: string | null;
    endereco?: string | null;
    historico?: string | null;
    status?: $Enums.StatusPaciente;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PacienteUpdateWithoutUsuarioInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    cpf?: Prisma.StringFieldUpdateOperationsInput | string;
    dataNascimento?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    telefone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    endereco?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    historico?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumStatusPacienteFieldUpdateOperationsInput | $Enums.StatusPaciente;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tratamentos?: Prisma.TratamentoUpdateManyWithoutPacienteNestedInput;
    agendamentos?: Prisma.AgendamentoUpdateManyWithoutPacienteNestedInput;
};
export type PacienteUncheckedUpdateWithoutUsuarioInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    cpf?: Prisma.StringFieldUpdateOperationsInput | string;
    dataNascimento?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    telefone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    endereco?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    historico?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumStatusPacienteFieldUpdateOperationsInput | $Enums.StatusPaciente;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tratamentos?: Prisma.TratamentoUncheckedUpdateManyWithoutPacienteNestedInput;
    agendamentos?: Prisma.AgendamentoUncheckedUpdateManyWithoutPacienteNestedInput;
};
export type PacienteUncheckedUpdateManyWithoutUsuarioInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    cpf?: Prisma.StringFieldUpdateOperationsInput | string;
    dataNascimento?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    telefone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    endereco?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    historico?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumStatusPacienteFieldUpdateOperationsInput | $Enums.StatusPaciente;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PacienteCountOutputType = {
    tratamentos: number;
    agendamentos: number;
};
export type PacienteCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tratamentos?: boolean | PacienteCountOutputTypeCountTratamentosArgs;
    agendamentos?: boolean | PacienteCountOutputTypeCountAgendamentosArgs;
};
export type PacienteCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PacienteCountOutputTypeSelect<ExtArgs> | null;
};
export type PacienteCountOutputTypeCountTratamentosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TratamentoWhereInput;
};
export type PacienteCountOutputTypeCountAgendamentosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AgendamentoWhereInput;
};
export type PacienteSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nome?: boolean;
    cpf?: boolean;
    dataNascimento?: boolean;
    telefone?: boolean;
    email?: boolean;
    endereco?: boolean;
    historico?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    usuarioId?: boolean;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
    tratamentos?: boolean | Prisma.Paciente$tratamentosArgs<ExtArgs>;
    agendamentos?: boolean | Prisma.Paciente$agendamentosArgs<ExtArgs>;
    _count?: boolean | Prisma.PacienteCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["paciente"]>;
export type PacienteSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nome?: boolean;
    cpf?: boolean;
    dataNascimento?: boolean;
    telefone?: boolean;
    email?: boolean;
    endereco?: boolean;
    historico?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    usuarioId?: boolean;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["paciente"]>;
export type PacienteSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nome?: boolean;
    cpf?: boolean;
    dataNascimento?: boolean;
    telefone?: boolean;
    email?: boolean;
    endereco?: boolean;
    historico?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    usuarioId?: boolean;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["paciente"]>;
export type PacienteSelectScalar = {
    id?: boolean;
    nome?: boolean;
    cpf?: boolean;
    dataNascimento?: boolean;
    telefone?: boolean;
    email?: boolean;
    endereco?: boolean;
    historico?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    usuarioId?: boolean;
};
export type PacienteOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "nome" | "cpf" | "dataNascimento" | "telefone" | "email" | "endereco" | "historico" | "status" | "createdAt" | "updatedAt" | "usuarioId", ExtArgs["result"]["paciente"]>;
export type PacienteInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
    tratamentos?: boolean | Prisma.Paciente$tratamentosArgs<ExtArgs>;
    agendamentos?: boolean | Prisma.Paciente$agendamentosArgs<ExtArgs>;
    _count?: boolean | Prisma.PacienteCountOutputTypeDefaultArgs<ExtArgs>;
};
export type PacienteIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
};
export type PacienteIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
};
export type $PacientePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Paciente";
    objects: {
        usuario: Prisma.$UsuarioPayload<ExtArgs>;
        tratamentos: Prisma.$TratamentoPayload<ExtArgs>[];
        agendamentos: Prisma.$AgendamentoPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        nome: string;
        cpf: string;
        dataNascimento: Date;
        telefone: string;
        email: string | null;
        endereco: string | null;
        historico: string | null;
        status: $Enums.StatusPaciente;
        createdAt: Date;
        updatedAt: Date;
        usuarioId: string;
    }, ExtArgs["result"]["paciente"]>;
    composites: {};
};
export type PacienteGetPayload<S extends boolean | null | undefined | PacienteDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PacientePayload, S>;
export type PacienteCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PacienteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PacienteCountAggregateInputType | true;
};
export interface PacienteDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Paciente'];
        meta: {
            name: 'Paciente';
        };
    };
    findUnique<T extends PacienteFindUniqueArgs>(args: Prisma.SelectSubset<T, PacienteFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PacienteClient<runtime.Types.Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PacienteFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PacienteFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PacienteClient<runtime.Types.Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PacienteFindFirstArgs>(args?: Prisma.SelectSubset<T, PacienteFindFirstArgs<ExtArgs>>): Prisma.Prisma__PacienteClient<runtime.Types.Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PacienteFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PacienteFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PacienteClient<runtime.Types.Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PacienteFindManyArgs>(args?: Prisma.SelectSubset<T, PacienteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PacienteCreateArgs>(args: Prisma.SelectSubset<T, PacienteCreateArgs<ExtArgs>>): Prisma.Prisma__PacienteClient<runtime.Types.Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PacienteCreateManyArgs>(args?: Prisma.SelectSubset<T, PacienteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PacienteCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PacienteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PacienteDeleteArgs>(args: Prisma.SelectSubset<T, PacienteDeleteArgs<ExtArgs>>): Prisma.Prisma__PacienteClient<runtime.Types.Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PacienteUpdateArgs>(args: Prisma.SelectSubset<T, PacienteUpdateArgs<ExtArgs>>): Prisma.Prisma__PacienteClient<runtime.Types.Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PacienteDeleteManyArgs>(args?: Prisma.SelectSubset<T, PacienteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PacienteUpdateManyArgs>(args: Prisma.SelectSubset<T, PacienteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PacienteUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PacienteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PacienteUpsertArgs>(args: Prisma.SelectSubset<T, PacienteUpsertArgs<ExtArgs>>): Prisma.Prisma__PacienteClient<runtime.Types.Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PacienteCountArgs>(args?: Prisma.Subset<T, PacienteCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PacienteCountAggregateOutputType> : number>;
    aggregate<T extends PacienteAggregateArgs>(args: Prisma.Subset<T, PacienteAggregateArgs>): Prisma.PrismaPromise<GetPacienteAggregateType<T>>;
    groupBy<T extends PacienteGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PacienteGroupByArgs['orderBy'];
    } : {
        orderBy?: PacienteGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PacienteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPacienteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PacienteFieldRefs;
}
export interface Prisma__PacienteClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    usuario<T extends Prisma.UsuarioDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsuarioDefaultArgs<ExtArgs>>): Prisma.Prisma__UsuarioClient<runtime.Types.Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    tratamentos<T extends Prisma.Paciente$tratamentosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Paciente$tratamentosArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TratamentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    agendamentos<T extends Prisma.Paciente$agendamentosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Paciente$agendamentosArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AgendamentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PacienteFieldRefs {
    readonly id: Prisma.FieldRef<"Paciente", 'String'>;
    readonly nome: Prisma.FieldRef<"Paciente", 'String'>;
    readonly cpf: Prisma.FieldRef<"Paciente", 'String'>;
    readonly dataNascimento: Prisma.FieldRef<"Paciente", 'DateTime'>;
    readonly telefone: Prisma.FieldRef<"Paciente", 'String'>;
    readonly email: Prisma.FieldRef<"Paciente", 'String'>;
    readonly endereco: Prisma.FieldRef<"Paciente", 'String'>;
    readonly historico: Prisma.FieldRef<"Paciente", 'String'>;
    readonly status: Prisma.FieldRef<"Paciente", 'StatusPaciente'>;
    readonly createdAt: Prisma.FieldRef<"Paciente", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Paciente", 'DateTime'>;
    readonly usuarioId: Prisma.FieldRef<"Paciente", 'String'>;
}
export type PacienteFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PacienteSelect<ExtArgs> | null;
    omit?: Prisma.PacienteOmit<ExtArgs> | null;
    include?: Prisma.PacienteInclude<ExtArgs> | null;
    where: Prisma.PacienteWhereUniqueInput;
};
export type PacienteFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PacienteSelect<ExtArgs> | null;
    omit?: Prisma.PacienteOmit<ExtArgs> | null;
    include?: Prisma.PacienteInclude<ExtArgs> | null;
    where: Prisma.PacienteWhereUniqueInput;
};
export type PacienteFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PacienteSelect<ExtArgs> | null;
    omit?: Prisma.PacienteOmit<ExtArgs> | null;
    include?: Prisma.PacienteInclude<ExtArgs> | null;
    where?: Prisma.PacienteWhereInput;
    orderBy?: Prisma.PacienteOrderByWithRelationInput | Prisma.PacienteOrderByWithRelationInput[];
    cursor?: Prisma.PacienteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PacienteScalarFieldEnum | Prisma.PacienteScalarFieldEnum[];
};
export type PacienteFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PacienteSelect<ExtArgs> | null;
    omit?: Prisma.PacienteOmit<ExtArgs> | null;
    include?: Prisma.PacienteInclude<ExtArgs> | null;
    where?: Prisma.PacienteWhereInput;
    orderBy?: Prisma.PacienteOrderByWithRelationInput | Prisma.PacienteOrderByWithRelationInput[];
    cursor?: Prisma.PacienteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PacienteScalarFieldEnum | Prisma.PacienteScalarFieldEnum[];
};
export type PacienteFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PacienteSelect<ExtArgs> | null;
    omit?: Prisma.PacienteOmit<ExtArgs> | null;
    include?: Prisma.PacienteInclude<ExtArgs> | null;
    where?: Prisma.PacienteWhereInput;
    orderBy?: Prisma.PacienteOrderByWithRelationInput | Prisma.PacienteOrderByWithRelationInput[];
    cursor?: Prisma.PacienteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PacienteScalarFieldEnum | Prisma.PacienteScalarFieldEnum[];
};
export type PacienteCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PacienteSelect<ExtArgs> | null;
    omit?: Prisma.PacienteOmit<ExtArgs> | null;
    include?: Prisma.PacienteInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PacienteCreateInput, Prisma.PacienteUncheckedCreateInput>;
};
export type PacienteCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PacienteCreateManyInput | Prisma.PacienteCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PacienteCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PacienteSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PacienteOmit<ExtArgs> | null;
    data: Prisma.PacienteCreateManyInput | Prisma.PacienteCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PacienteIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PacienteUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PacienteSelect<ExtArgs> | null;
    omit?: Prisma.PacienteOmit<ExtArgs> | null;
    include?: Prisma.PacienteInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PacienteUpdateInput, Prisma.PacienteUncheckedUpdateInput>;
    where: Prisma.PacienteWhereUniqueInput;
};
export type PacienteUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PacienteUpdateManyMutationInput, Prisma.PacienteUncheckedUpdateManyInput>;
    where?: Prisma.PacienteWhereInput;
    limit?: number;
};
export type PacienteUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PacienteSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PacienteOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PacienteUpdateManyMutationInput, Prisma.PacienteUncheckedUpdateManyInput>;
    where?: Prisma.PacienteWhereInput;
    limit?: number;
    include?: Prisma.PacienteIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PacienteUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PacienteSelect<ExtArgs> | null;
    omit?: Prisma.PacienteOmit<ExtArgs> | null;
    include?: Prisma.PacienteInclude<ExtArgs> | null;
    where: Prisma.PacienteWhereUniqueInput;
    create: Prisma.XOR<Prisma.PacienteCreateInput, Prisma.PacienteUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PacienteUpdateInput, Prisma.PacienteUncheckedUpdateInput>;
};
export type PacienteDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PacienteSelect<ExtArgs> | null;
    omit?: Prisma.PacienteOmit<ExtArgs> | null;
    include?: Prisma.PacienteInclude<ExtArgs> | null;
    where: Prisma.PacienteWhereUniqueInput;
};
export type PacienteDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PacienteWhereInput;
    limit?: number;
};
export type Paciente$tratamentosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TratamentoSelect<ExtArgs> | null;
    omit?: Prisma.TratamentoOmit<ExtArgs> | null;
    include?: Prisma.TratamentoInclude<ExtArgs> | null;
    where?: Prisma.TratamentoWhereInput;
    orderBy?: Prisma.TratamentoOrderByWithRelationInput | Prisma.TratamentoOrderByWithRelationInput[];
    cursor?: Prisma.TratamentoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TratamentoScalarFieldEnum | Prisma.TratamentoScalarFieldEnum[];
};
export type Paciente$agendamentosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PacienteDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PacienteSelect<ExtArgs> | null;
    omit?: Prisma.PacienteOmit<ExtArgs> | null;
    include?: Prisma.PacienteInclude<ExtArgs> | null;
};

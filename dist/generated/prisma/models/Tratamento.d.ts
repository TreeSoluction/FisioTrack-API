import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TratamentoModel = runtime.Types.Result.DefaultSelection<Prisma.$TratamentoPayload>;
export type AggregateTratamento = {
    _count: TratamentoCountAggregateOutputType | null;
    _avg: TratamentoAvgAggregateOutputType | null;
    _sum: TratamentoSumAggregateOutputType | null;
    _min: TratamentoMinAggregateOutputType | null;
    _max: TratamentoMaxAggregateOutputType | null;
};
export type TratamentoAvgAggregateOutputType = {
    valor: runtime.Decimal | null;
};
export type TratamentoSumAggregateOutputType = {
    valor: runtime.Decimal | null;
};
export type TratamentoMinAggregateOutputType = {
    id: string | null;
    tempoEstimado: string | null;
    exercicios: string | null;
    valor: runtime.Decimal | null;
    status: $Enums.StatusTratamento | null;
    dataInicio: Date | null;
    dataFim: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    pacienteId: string | null;
    usuarioId: string | null;
};
export type TratamentoMaxAggregateOutputType = {
    id: string | null;
    tempoEstimado: string | null;
    exercicios: string | null;
    valor: runtime.Decimal | null;
    status: $Enums.StatusTratamento | null;
    dataInicio: Date | null;
    dataFim: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    pacienteId: string | null;
    usuarioId: string | null;
};
export type TratamentoCountAggregateOutputType = {
    id: number;
    tempoEstimado: number;
    exercicios: number;
    valor: number;
    status: number;
    dataInicio: number;
    dataFim: number;
    createdAt: number;
    updatedAt: number;
    pacienteId: number;
    usuarioId: number;
    _all: number;
};
export type TratamentoAvgAggregateInputType = {
    valor?: true;
};
export type TratamentoSumAggregateInputType = {
    valor?: true;
};
export type TratamentoMinAggregateInputType = {
    id?: true;
    tempoEstimado?: true;
    exercicios?: true;
    valor?: true;
    status?: true;
    dataInicio?: true;
    dataFim?: true;
    createdAt?: true;
    updatedAt?: true;
    pacienteId?: true;
    usuarioId?: true;
};
export type TratamentoMaxAggregateInputType = {
    id?: true;
    tempoEstimado?: true;
    exercicios?: true;
    valor?: true;
    status?: true;
    dataInicio?: true;
    dataFim?: true;
    createdAt?: true;
    updatedAt?: true;
    pacienteId?: true;
    usuarioId?: true;
};
export type TratamentoCountAggregateInputType = {
    id?: true;
    tempoEstimado?: true;
    exercicios?: true;
    valor?: true;
    status?: true;
    dataInicio?: true;
    dataFim?: true;
    createdAt?: true;
    updatedAt?: true;
    pacienteId?: true;
    usuarioId?: true;
    _all?: true;
};
export type TratamentoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TratamentoWhereInput;
    orderBy?: Prisma.TratamentoOrderByWithRelationInput | Prisma.TratamentoOrderByWithRelationInput[];
    cursor?: Prisma.TratamentoWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TratamentoCountAggregateInputType;
    _avg?: TratamentoAvgAggregateInputType;
    _sum?: TratamentoSumAggregateInputType;
    _min?: TratamentoMinAggregateInputType;
    _max?: TratamentoMaxAggregateInputType;
};
export type GetTratamentoAggregateType<T extends TratamentoAggregateArgs> = {
    [P in keyof T & keyof AggregateTratamento]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTratamento[P]> : Prisma.GetScalarType<T[P], AggregateTratamento[P]>;
};
export type TratamentoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TratamentoWhereInput;
    orderBy?: Prisma.TratamentoOrderByWithAggregationInput | Prisma.TratamentoOrderByWithAggregationInput[];
    by: Prisma.TratamentoScalarFieldEnum[] | Prisma.TratamentoScalarFieldEnum;
    having?: Prisma.TratamentoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TratamentoCountAggregateInputType | true;
    _avg?: TratamentoAvgAggregateInputType;
    _sum?: TratamentoSumAggregateInputType;
    _min?: TratamentoMinAggregateInputType;
    _max?: TratamentoMaxAggregateInputType;
};
export type TratamentoGroupByOutputType = {
    id: string;
    tempoEstimado: string;
    exercicios: string;
    valor: runtime.Decimal;
    status: $Enums.StatusTratamento;
    dataInicio: Date;
    dataFim: Date | null;
    createdAt: Date;
    updatedAt: Date;
    pacienteId: string;
    usuarioId: string;
    _count: TratamentoCountAggregateOutputType | null;
    _avg: TratamentoAvgAggregateOutputType | null;
    _sum: TratamentoSumAggregateOutputType | null;
    _min: TratamentoMinAggregateOutputType | null;
    _max: TratamentoMaxAggregateOutputType | null;
};
export type GetTratamentoGroupByPayload<T extends TratamentoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TratamentoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TratamentoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TratamentoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TratamentoGroupByOutputType[P]>;
}>>;
export type TratamentoWhereInput = {
    AND?: Prisma.TratamentoWhereInput | Prisma.TratamentoWhereInput[];
    OR?: Prisma.TratamentoWhereInput[];
    NOT?: Prisma.TratamentoWhereInput | Prisma.TratamentoWhereInput[];
    id?: Prisma.StringFilter<"Tratamento"> | string;
    tempoEstimado?: Prisma.StringFilter<"Tratamento"> | string;
    exercicios?: Prisma.StringFilter<"Tratamento"> | string;
    valor?: Prisma.DecimalFilter<"Tratamento"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusTratamentoFilter<"Tratamento"> | $Enums.StatusTratamento;
    dataInicio?: Prisma.DateTimeFilter<"Tratamento"> | Date | string;
    dataFim?: Prisma.DateTimeNullableFilter<"Tratamento"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Tratamento"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Tratamento"> | Date | string;
    pacienteId?: Prisma.StringFilter<"Tratamento"> | string;
    usuarioId?: Prisma.StringFilter<"Tratamento"> | string;
    paciente?: Prisma.XOR<Prisma.PacienteScalarRelationFilter, Prisma.PacienteWhereInput>;
    usuario?: Prisma.XOR<Prisma.UsuarioScalarRelationFilter, Prisma.UsuarioWhereInput>;
    sessoes?: Prisma.SessaoListRelationFilter;
    pagamentos?: Prisma.PagamentoListRelationFilter;
};
export type TratamentoOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tempoEstimado?: Prisma.SortOrder;
    exercicios?: Prisma.SortOrder;
    valor?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    dataInicio?: Prisma.SortOrder;
    dataFim?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    pacienteId?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    paciente?: Prisma.PacienteOrderByWithRelationInput;
    usuario?: Prisma.UsuarioOrderByWithRelationInput;
    sessoes?: Prisma.SessaoOrderByRelationAggregateInput;
    pagamentos?: Prisma.PagamentoOrderByRelationAggregateInput;
};
export type TratamentoWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TratamentoWhereInput | Prisma.TratamentoWhereInput[];
    OR?: Prisma.TratamentoWhereInput[];
    NOT?: Prisma.TratamentoWhereInput | Prisma.TratamentoWhereInput[];
    tempoEstimado?: Prisma.StringFilter<"Tratamento"> | string;
    exercicios?: Prisma.StringFilter<"Tratamento"> | string;
    valor?: Prisma.DecimalFilter<"Tratamento"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusTratamentoFilter<"Tratamento"> | $Enums.StatusTratamento;
    dataInicio?: Prisma.DateTimeFilter<"Tratamento"> | Date | string;
    dataFim?: Prisma.DateTimeNullableFilter<"Tratamento"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Tratamento"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Tratamento"> | Date | string;
    pacienteId?: Prisma.StringFilter<"Tratamento"> | string;
    usuarioId?: Prisma.StringFilter<"Tratamento"> | string;
    paciente?: Prisma.XOR<Prisma.PacienteScalarRelationFilter, Prisma.PacienteWhereInput>;
    usuario?: Prisma.XOR<Prisma.UsuarioScalarRelationFilter, Prisma.UsuarioWhereInput>;
    sessoes?: Prisma.SessaoListRelationFilter;
    pagamentos?: Prisma.PagamentoListRelationFilter;
}, "id">;
export type TratamentoOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tempoEstimado?: Prisma.SortOrder;
    exercicios?: Prisma.SortOrder;
    valor?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    dataInicio?: Prisma.SortOrder;
    dataFim?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    pacienteId?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    _count?: Prisma.TratamentoCountOrderByAggregateInput;
    _avg?: Prisma.TratamentoAvgOrderByAggregateInput;
    _max?: Prisma.TratamentoMaxOrderByAggregateInput;
    _min?: Prisma.TratamentoMinOrderByAggregateInput;
    _sum?: Prisma.TratamentoSumOrderByAggregateInput;
};
export type TratamentoScalarWhereWithAggregatesInput = {
    AND?: Prisma.TratamentoScalarWhereWithAggregatesInput | Prisma.TratamentoScalarWhereWithAggregatesInput[];
    OR?: Prisma.TratamentoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TratamentoScalarWhereWithAggregatesInput | Prisma.TratamentoScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Tratamento"> | string;
    tempoEstimado?: Prisma.StringWithAggregatesFilter<"Tratamento"> | string;
    exercicios?: Prisma.StringWithAggregatesFilter<"Tratamento"> | string;
    valor?: Prisma.DecimalWithAggregatesFilter<"Tratamento"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusTratamentoWithAggregatesFilter<"Tratamento"> | $Enums.StatusTratamento;
    dataInicio?: Prisma.DateTimeWithAggregatesFilter<"Tratamento"> | Date | string;
    dataFim?: Prisma.DateTimeNullableWithAggregatesFilter<"Tratamento"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Tratamento"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Tratamento"> | Date | string;
    pacienteId?: Prisma.StringWithAggregatesFilter<"Tratamento"> | string;
    usuarioId?: Prisma.StringWithAggregatesFilter<"Tratamento"> | string;
};
export type TratamentoCreateInput = {
    id?: string;
    tempoEstimado: string;
    exercicios: string;
    valor: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.StatusTratamento;
    dataInicio?: Date | string;
    dataFim?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    paciente: Prisma.PacienteCreateNestedOneWithoutTratamentosInput;
    usuario: Prisma.UsuarioCreateNestedOneWithoutTratamentosInput;
    sessoes?: Prisma.SessaoCreateNestedManyWithoutTratamentoInput;
    pagamentos?: Prisma.PagamentoCreateNestedManyWithoutTratamentoInput;
};
export type TratamentoUncheckedCreateInput = {
    id?: string;
    tempoEstimado: string;
    exercicios: string;
    valor: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.StatusTratamento;
    dataInicio?: Date | string;
    dataFim?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pacienteId: string;
    usuarioId: string;
    sessoes?: Prisma.SessaoUncheckedCreateNestedManyWithoutTratamentoInput;
    pagamentos?: Prisma.PagamentoUncheckedCreateNestedManyWithoutTratamentoInput;
};
export type TratamentoUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tempoEstimado?: Prisma.StringFieldUpdateOperationsInput | string;
    exercicios?: Prisma.StringFieldUpdateOperationsInput | string;
    valor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusTratamentoFieldUpdateOperationsInput | $Enums.StatusTratamento;
    dataInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dataFim?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    paciente?: Prisma.PacienteUpdateOneRequiredWithoutTratamentosNestedInput;
    usuario?: Prisma.UsuarioUpdateOneRequiredWithoutTratamentosNestedInput;
    sessoes?: Prisma.SessaoUpdateManyWithoutTratamentoNestedInput;
    pagamentos?: Prisma.PagamentoUpdateManyWithoutTratamentoNestedInput;
};
export type TratamentoUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tempoEstimado?: Prisma.StringFieldUpdateOperationsInput | string;
    exercicios?: Prisma.StringFieldUpdateOperationsInput | string;
    valor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusTratamentoFieldUpdateOperationsInput | $Enums.StatusTratamento;
    dataInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dataFim?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pacienteId?: Prisma.StringFieldUpdateOperationsInput | string;
    usuarioId?: Prisma.StringFieldUpdateOperationsInput | string;
    sessoes?: Prisma.SessaoUncheckedUpdateManyWithoutTratamentoNestedInput;
    pagamentos?: Prisma.PagamentoUncheckedUpdateManyWithoutTratamentoNestedInput;
};
export type TratamentoCreateManyInput = {
    id?: string;
    tempoEstimado: string;
    exercicios: string;
    valor: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.StatusTratamento;
    dataInicio?: Date | string;
    dataFim?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pacienteId: string;
    usuarioId: string;
};
export type TratamentoUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tempoEstimado?: Prisma.StringFieldUpdateOperationsInput | string;
    exercicios?: Prisma.StringFieldUpdateOperationsInput | string;
    valor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusTratamentoFieldUpdateOperationsInput | $Enums.StatusTratamento;
    dataInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dataFim?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TratamentoUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tempoEstimado?: Prisma.StringFieldUpdateOperationsInput | string;
    exercicios?: Prisma.StringFieldUpdateOperationsInput | string;
    valor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusTratamentoFieldUpdateOperationsInput | $Enums.StatusTratamento;
    dataInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dataFim?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pacienteId?: Prisma.StringFieldUpdateOperationsInput | string;
    usuarioId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type TratamentoListRelationFilter = {
    every?: Prisma.TratamentoWhereInput;
    some?: Prisma.TratamentoWhereInput;
    none?: Prisma.TratamentoWhereInput;
};
export type TratamentoOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TratamentoCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tempoEstimado?: Prisma.SortOrder;
    exercicios?: Prisma.SortOrder;
    valor?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    dataInicio?: Prisma.SortOrder;
    dataFim?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    pacienteId?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
};
export type TratamentoAvgOrderByAggregateInput = {
    valor?: Prisma.SortOrder;
};
export type TratamentoMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tempoEstimado?: Prisma.SortOrder;
    exercicios?: Prisma.SortOrder;
    valor?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    dataInicio?: Prisma.SortOrder;
    dataFim?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    pacienteId?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
};
export type TratamentoMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tempoEstimado?: Prisma.SortOrder;
    exercicios?: Prisma.SortOrder;
    valor?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    dataInicio?: Prisma.SortOrder;
    dataFim?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    pacienteId?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
};
export type TratamentoSumOrderByAggregateInput = {
    valor?: Prisma.SortOrder;
};
export type TratamentoScalarRelationFilter = {
    is?: Prisma.TratamentoWhereInput;
    isNot?: Prisma.TratamentoWhereInput;
};
export type TratamentoCreateNestedManyWithoutUsuarioInput = {
    create?: Prisma.XOR<Prisma.TratamentoCreateWithoutUsuarioInput, Prisma.TratamentoUncheckedCreateWithoutUsuarioInput> | Prisma.TratamentoCreateWithoutUsuarioInput[] | Prisma.TratamentoUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?: Prisma.TratamentoCreateOrConnectWithoutUsuarioInput | Prisma.TratamentoCreateOrConnectWithoutUsuarioInput[];
    createMany?: Prisma.TratamentoCreateManyUsuarioInputEnvelope;
    connect?: Prisma.TratamentoWhereUniqueInput | Prisma.TratamentoWhereUniqueInput[];
};
export type TratamentoUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: Prisma.XOR<Prisma.TratamentoCreateWithoutUsuarioInput, Prisma.TratamentoUncheckedCreateWithoutUsuarioInput> | Prisma.TratamentoCreateWithoutUsuarioInput[] | Prisma.TratamentoUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?: Prisma.TratamentoCreateOrConnectWithoutUsuarioInput | Prisma.TratamentoCreateOrConnectWithoutUsuarioInput[];
    createMany?: Prisma.TratamentoCreateManyUsuarioInputEnvelope;
    connect?: Prisma.TratamentoWhereUniqueInput | Prisma.TratamentoWhereUniqueInput[];
};
export type TratamentoUpdateManyWithoutUsuarioNestedInput = {
    create?: Prisma.XOR<Prisma.TratamentoCreateWithoutUsuarioInput, Prisma.TratamentoUncheckedCreateWithoutUsuarioInput> | Prisma.TratamentoCreateWithoutUsuarioInput[] | Prisma.TratamentoUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?: Prisma.TratamentoCreateOrConnectWithoutUsuarioInput | Prisma.TratamentoCreateOrConnectWithoutUsuarioInput[];
    upsert?: Prisma.TratamentoUpsertWithWhereUniqueWithoutUsuarioInput | Prisma.TratamentoUpsertWithWhereUniqueWithoutUsuarioInput[];
    createMany?: Prisma.TratamentoCreateManyUsuarioInputEnvelope;
    set?: Prisma.TratamentoWhereUniqueInput | Prisma.TratamentoWhereUniqueInput[];
    disconnect?: Prisma.TratamentoWhereUniqueInput | Prisma.TratamentoWhereUniqueInput[];
    delete?: Prisma.TratamentoWhereUniqueInput | Prisma.TratamentoWhereUniqueInput[];
    connect?: Prisma.TratamentoWhereUniqueInput | Prisma.TratamentoWhereUniqueInput[];
    update?: Prisma.TratamentoUpdateWithWhereUniqueWithoutUsuarioInput | Prisma.TratamentoUpdateWithWhereUniqueWithoutUsuarioInput[];
    updateMany?: Prisma.TratamentoUpdateManyWithWhereWithoutUsuarioInput | Prisma.TratamentoUpdateManyWithWhereWithoutUsuarioInput[];
    deleteMany?: Prisma.TratamentoScalarWhereInput | Prisma.TratamentoScalarWhereInput[];
};
export type TratamentoUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: Prisma.XOR<Prisma.TratamentoCreateWithoutUsuarioInput, Prisma.TratamentoUncheckedCreateWithoutUsuarioInput> | Prisma.TratamentoCreateWithoutUsuarioInput[] | Prisma.TratamentoUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?: Prisma.TratamentoCreateOrConnectWithoutUsuarioInput | Prisma.TratamentoCreateOrConnectWithoutUsuarioInput[];
    upsert?: Prisma.TratamentoUpsertWithWhereUniqueWithoutUsuarioInput | Prisma.TratamentoUpsertWithWhereUniqueWithoutUsuarioInput[];
    createMany?: Prisma.TratamentoCreateManyUsuarioInputEnvelope;
    set?: Prisma.TratamentoWhereUniqueInput | Prisma.TratamentoWhereUniqueInput[];
    disconnect?: Prisma.TratamentoWhereUniqueInput | Prisma.TratamentoWhereUniqueInput[];
    delete?: Prisma.TratamentoWhereUniqueInput | Prisma.TratamentoWhereUniqueInput[];
    connect?: Prisma.TratamentoWhereUniqueInput | Prisma.TratamentoWhereUniqueInput[];
    update?: Prisma.TratamentoUpdateWithWhereUniqueWithoutUsuarioInput | Prisma.TratamentoUpdateWithWhereUniqueWithoutUsuarioInput[];
    updateMany?: Prisma.TratamentoUpdateManyWithWhereWithoutUsuarioInput | Prisma.TratamentoUpdateManyWithWhereWithoutUsuarioInput[];
    deleteMany?: Prisma.TratamentoScalarWhereInput | Prisma.TratamentoScalarWhereInput[];
};
export type TratamentoCreateNestedManyWithoutPacienteInput = {
    create?: Prisma.XOR<Prisma.TratamentoCreateWithoutPacienteInput, Prisma.TratamentoUncheckedCreateWithoutPacienteInput> | Prisma.TratamentoCreateWithoutPacienteInput[] | Prisma.TratamentoUncheckedCreateWithoutPacienteInput[];
    connectOrCreate?: Prisma.TratamentoCreateOrConnectWithoutPacienteInput | Prisma.TratamentoCreateOrConnectWithoutPacienteInput[];
    createMany?: Prisma.TratamentoCreateManyPacienteInputEnvelope;
    connect?: Prisma.TratamentoWhereUniqueInput | Prisma.TratamentoWhereUniqueInput[];
};
export type TratamentoUncheckedCreateNestedManyWithoutPacienteInput = {
    create?: Prisma.XOR<Prisma.TratamentoCreateWithoutPacienteInput, Prisma.TratamentoUncheckedCreateWithoutPacienteInput> | Prisma.TratamentoCreateWithoutPacienteInput[] | Prisma.TratamentoUncheckedCreateWithoutPacienteInput[];
    connectOrCreate?: Prisma.TratamentoCreateOrConnectWithoutPacienteInput | Prisma.TratamentoCreateOrConnectWithoutPacienteInput[];
    createMany?: Prisma.TratamentoCreateManyPacienteInputEnvelope;
    connect?: Prisma.TratamentoWhereUniqueInput | Prisma.TratamentoWhereUniqueInput[];
};
export type TratamentoUpdateManyWithoutPacienteNestedInput = {
    create?: Prisma.XOR<Prisma.TratamentoCreateWithoutPacienteInput, Prisma.TratamentoUncheckedCreateWithoutPacienteInput> | Prisma.TratamentoCreateWithoutPacienteInput[] | Prisma.TratamentoUncheckedCreateWithoutPacienteInput[];
    connectOrCreate?: Prisma.TratamentoCreateOrConnectWithoutPacienteInput | Prisma.TratamentoCreateOrConnectWithoutPacienteInput[];
    upsert?: Prisma.TratamentoUpsertWithWhereUniqueWithoutPacienteInput | Prisma.TratamentoUpsertWithWhereUniqueWithoutPacienteInput[];
    createMany?: Prisma.TratamentoCreateManyPacienteInputEnvelope;
    set?: Prisma.TratamentoWhereUniqueInput | Prisma.TratamentoWhereUniqueInput[];
    disconnect?: Prisma.TratamentoWhereUniqueInput | Prisma.TratamentoWhereUniqueInput[];
    delete?: Prisma.TratamentoWhereUniqueInput | Prisma.TratamentoWhereUniqueInput[];
    connect?: Prisma.TratamentoWhereUniqueInput | Prisma.TratamentoWhereUniqueInput[];
    update?: Prisma.TratamentoUpdateWithWhereUniqueWithoutPacienteInput | Prisma.TratamentoUpdateWithWhereUniqueWithoutPacienteInput[];
    updateMany?: Prisma.TratamentoUpdateManyWithWhereWithoutPacienteInput | Prisma.TratamentoUpdateManyWithWhereWithoutPacienteInput[];
    deleteMany?: Prisma.TratamentoScalarWhereInput | Prisma.TratamentoScalarWhereInput[];
};
export type TratamentoUncheckedUpdateManyWithoutPacienteNestedInput = {
    create?: Prisma.XOR<Prisma.TratamentoCreateWithoutPacienteInput, Prisma.TratamentoUncheckedCreateWithoutPacienteInput> | Prisma.TratamentoCreateWithoutPacienteInput[] | Prisma.TratamentoUncheckedCreateWithoutPacienteInput[];
    connectOrCreate?: Prisma.TratamentoCreateOrConnectWithoutPacienteInput | Prisma.TratamentoCreateOrConnectWithoutPacienteInput[];
    upsert?: Prisma.TratamentoUpsertWithWhereUniqueWithoutPacienteInput | Prisma.TratamentoUpsertWithWhereUniqueWithoutPacienteInput[];
    createMany?: Prisma.TratamentoCreateManyPacienteInputEnvelope;
    set?: Prisma.TratamentoWhereUniqueInput | Prisma.TratamentoWhereUniqueInput[];
    disconnect?: Prisma.TratamentoWhereUniqueInput | Prisma.TratamentoWhereUniqueInput[];
    delete?: Prisma.TratamentoWhereUniqueInput | Prisma.TratamentoWhereUniqueInput[];
    connect?: Prisma.TratamentoWhereUniqueInput | Prisma.TratamentoWhereUniqueInput[];
    update?: Prisma.TratamentoUpdateWithWhereUniqueWithoutPacienteInput | Prisma.TratamentoUpdateWithWhereUniqueWithoutPacienteInput[];
    updateMany?: Prisma.TratamentoUpdateManyWithWhereWithoutPacienteInput | Prisma.TratamentoUpdateManyWithWhereWithoutPacienteInput[];
    deleteMany?: Prisma.TratamentoScalarWhereInput | Prisma.TratamentoScalarWhereInput[];
};
export type DecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type EnumStatusTratamentoFieldUpdateOperationsInput = {
    set?: $Enums.StatusTratamento;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type TratamentoCreateNestedOneWithoutSessoesInput = {
    create?: Prisma.XOR<Prisma.TratamentoCreateWithoutSessoesInput, Prisma.TratamentoUncheckedCreateWithoutSessoesInput>;
    connectOrCreate?: Prisma.TratamentoCreateOrConnectWithoutSessoesInput;
    connect?: Prisma.TratamentoWhereUniqueInput;
};
export type TratamentoUpdateOneRequiredWithoutSessoesNestedInput = {
    create?: Prisma.XOR<Prisma.TratamentoCreateWithoutSessoesInput, Prisma.TratamentoUncheckedCreateWithoutSessoesInput>;
    connectOrCreate?: Prisma.TratamentoCreateOrConnectWithoutSessoesInput;
    upsert?: Prisma.TratamentoUpsertWithoutSessoesInput;
    connect?: Prisma.TratamentoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TratamentoUpdateToOneWithWhereWithoutSessoesInput, Prisma.TratamentoUpdateWithoutSessoesInput>, Prisma.TratamentoUncheckedUpdateWithoutSessoesInput>;
};
export type TratamentoCreateNestedOneWithoutPagamentosInput = {
    create?: Prisma.XOR<Prisma.TratamentoCreateWithoutPagamentosInput, Prisma.TratamentoUncheckedCreateWithoutPagamentosInput>;
    connectOrCreate?: Prisma.TratamentoCreateOrConnectWithoutPagamentosInput;
    connect?: Prisma.TratamentoWhereUniqueInput;
};
export type TratamentoUpdateOneRequiredWithoutPagamentosNestedInput = {
    create?: Prisma.XOR<Prisma.TratamentoCreateWithoutPagamentosInput, Prisma.TratamentoUncheckedCreateWithoutPagamentosInput>;
    connectOrCreate?: Prisma.TratamentoCreateOrConnectWithoutPagamentosInput;
    upsert?: Prisma.TratamentoUpsertWithoutPagamentosInput;
    connect?: Prisma.TratamentoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TratamentoUpdateToOneWithWhereWithoutPagamentosInput, Prisma.TratamentoUpdateWithoutPagamentosInput>, Prisma.TratamentoUncheckedUpdateWithoutPagamentosInput>;
};
export type TratamentoCreateWithoutUsuarioInput = {
    id?: string;
    tempoEstimado: string;
    exercicios: string;
    valor: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.StatusTratamento;
    dataInicio?: Date | string;
    dataFim?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    paciente: Prisma.PacienteCreateNestedOneWithoutTratamentosInput;
    sessoes?: Prisma.SessaoCreateNestedManyWithoutTratamentoInput;
    pagamentos?: Prisma.PagamentoCreateNestedManyWithoutTratamentoInput;
};
export type TratamentoUncheckedCreateWithoutUsuarioInput = {
    id?: string;
    tempoEstimado: string;
    exercicios: string;
    valor: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.StatusTratamento;
    dataInicio?: Date | string;
    dataFim?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pacienteId: string;
    sessoes?: Prisma.SessaoUncheckedCreateNestedManyWithoutTratamentoInput;
    pagamentos?: Prisma.PagamentoUncheckedCreateNestedManyWithoutTratamentoInput;
};
export type TratamentoCreateOrConnectWithoutUsuarioInput = {
    where: Prisma.TratamentoWhereUniqueInput;
    create: Prisma.XOR<Prisma.TratamentoCreateWithoutUsuarioInput, Prisma.TratamentoUncheckedCreateWithoutUsuarioInput>;
};
export type TratamentoCreateManyUsuarioInputEnvelope = {
    data: Prisma.TratamentoCreateManyUsuarioInput | Prisma.TratamentoCreateManyUsuarioInput[];
    skipDuplicates?: boolean;
};
export type TratamentoUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: Prisma.TratamentoWhereUniqueInput;
    update: Prisma.XOR<Prisma.TratamentoUpdateWithoutUsuarioInput, Prisma.TratamentoUncheckedUpdateWithoutUsuarioInput>;
    create: Prisma.XOR<Prisma.TratamentoCreateWithoutUsuarioInput, Prisma.TratamentoUncheckedCreateWithoutUsuarioInput>;
};
export type TratamentoUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: Prisma.TratamentoWhereUniqueInput;
    data: Prisma.XOR<Prisma.TratamentoUpdateWithoutUsuarioInput, Prisma.TratamentoUncheckedUpdateWithoutUsuarioInput>;
};
export type TratamentoUpdateManyWithWhereWithoutUsuarioInput = {
    where: Prisma.TratamentoScalarWhereInput;
    data: Prisma.XOR<Prisma.TratamentoUpdateManyMutationInput, Prisma.TratamentoUncheckedUpdateManyWithoutUsuarioInput>;
};
export type TratamentoScalarWhereInput = {
    AND?: Prisma.TratamentoScalarWhereInput | Prisma.TratamentoScalarWhereInput[];
    OR?: Prisma.TratamentoScalarWhereInput[];
    NOT?: Prisma.TratamentoScalarWhereInput | Prisma.TratamentoScalarWhereInput[];
    id?: Prisma.StringFilter<"Tratamento"> | string;
    tempoEstimado?: Prisma.StringFilter<"Tratamento"> | string;
    exercicios?: Prisma.StringFilter<"Tratamento"> | string;
    valor?: Prisma.DecimalFilter<"Tratamento"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusTratamentoFilter<"Tratamento"> | $Enums.StatusTratamento;
    dataInicio?: Prisma.DateTimeFilter<"Tratamento"> | Date | string;
    dataFim?: Prisma.DateTimeNullableFilter<"Tratamento"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Tratamento"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Tratamento"> | Date | string;
    pacienteId?: Prisma.StringFilter<"Tratamento"> | string;
    usuarioId?: Prisma.StringFilter<"Tratamento"> | string;
};
export type TratamentoCreateWithoutPacienteInput = {
    id?: string;
    tempoEstimado: string;
    exercicios: string;
    valor: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.StatusTratamento;
    dataInicio?: Date | string;
    dataFim?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    usuario: Prisma.UsuarioCreateNestedOneWithoutTratamentosInput;
    sessoes?: Prisma.SessaoCreateNestedManyWithoutTratamentoInput;
    pagamentos?: Prisma.PagamentoCreateNestedManyWithoutTratamentoInput;
};
export type TratamentoUncheckedCreateWithoutPacienteInput = {
    id?: string;
    tempoEstimado: string;
    exercicios: string;
    valor: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.StatusTratamento;
    dataInicio?: Date | string;
    dataFim?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    usuarioId: string;
    sessoes?: Prisma.SessaoUncheckedCreateNestedManyWithoutTratamentoInput;
    pagamentos?: Prisma.PagamentoUncheckedCreateNestedManyWithoutTratamentoInput;
};
export type TratamentoCreateOrConnectWithoutPacienteInput = {
    where: Prisma.TratamentoWhereUniqueInput;
    create: Prisma.XOR<Prisma.TratamentoCreateWithoutPacienteInput, Prisma.TratamentoUncheckedCreateWithoutPacienteInput>;
};
export type TratamentoCreateManyPacienteInputEnvelope = {
    data: Prisma.TratamentoCreateManyPacienteInput | Prisma.TratamentoCreateManyPacienteInput[];
    skipDuplicates?: boolean;
};
export type TratamentoUpsertWithWhereUniqueWithoutPacienteInput = {
    where: Prisma.TratamentoWhereUniqueInput;
    update: Prisma.XOR<Prisma.TratamentoUpdateWithoutPacienteInput, Prisma.TratamentoUncheckedUpdateWithoutPacienteInput>;
    create: Prisma.XOR<Prisma.TratamentoCreateWithoutPacienteInput, Prisma.TratamentoUncheckedCreateWithoutPacienteInput>;
};
export type TratamentoUpdateWithWhereUniqueWithoutPacienteInput = {
    where: Prisma.TratamentoWhereUniqueInput;
    data: Prisma.XOR<Prisma.TratamentoUpdateWithoutPacienteInput, Prisma.TratamentoUncheckedUpdateWithoutPacienteInput>;
};
export type TratamentoUpdateManyWithWhereWithoutPacienteInput = {
    where: Prisma.TratamentoScalarWhereInput;
    data: Prisma.XOR<Prisma.TratamentoUpdateManyMutationInput, Prisma.TratamentoUncheckedUpdateManyWithoutPacienteInput>;
};
export type TratamentoCreateWithoutSessoesInput = {
    id?: string;
    tempoEstimado: string;
    exercicios: string;
    valor: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.StatusTratamento;
    dataInicio?: Date | string;
    dataFim?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    paciente: Prisma.PacienteCreateNestedOneWithoutTratamentosInput;
    usuario: Prisma.UsuarioCreateNestedOneWithoutTratamentosInput;
    pagamentos?: Prisma.PagamentoCreateNestedManyWithoutTratamentoInput;
};
export type TratamentoUncheckedCreateWithoutSessoesInput = {
    id?: string;
    tempoEstimado: string;
    exercicios: string;
    valor: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.StatusTratamento;
    dataInicio?: Date | string;
    dataFim?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pacienteId: string;
    usuarioId: string;
    pagamentos?: Prisma.PagamentoUncheckedCreateNestedManyWithoutTratamentoInput;
};
export type TratamentoCreateOrConnectWithoutSessoesInput = {
    where: Prisma.TratamentoWhereUniqueInput;
    create: Prisma.XOR<Prisma.TratamentoCreateWithoutSessoesInput, Prisma.TratamentoUncheckedCreateWithoutSessoesInput>;
};
export type TratamentoUpsertWithoutSessoesInput = {
    update: Prisma.XOR<Prisma.TratamentoUpdateWithoutSessoesInput, Prisma.TratamentoUncheckedUpdateWithoutSessoesInput>;
    create: Prisma.XOR<Prisma.TratamentoCreateWithoutSessoesInput, Prisma.TratamentoUncheckedCreateWithoutSessoesInput>;
    where?: Prisma.TratamentoWhereInput;
};
export type TratamentoUpdateToOneWithWhereWithoutSessoesInput = {
    where?: Prisma.TratamentoWhereInput;
    data: Prisma.XOR<Prisma.TratamentoUpdateWithoutSessoesInput, Prisma.TratamentoUncheckedUpdateWithoutSessoesInput>;
};
export type TratamentoUpdateWithoutSessoesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tempoEstimado?: Prisma.StringFieldUpdateOperationsInput | string;
    exercicios?: Prisma.StringFieldUpdateOperationsInput | string;
    valor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusTratamentoFieldUpdateOperationsInput | $Enums.StatusTratamento;
    dataInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dataFim?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    paciente?: Prisma.PacienteUpdateOneRequiredWithoutTratamentosNestedInput;
    usuario?: Prisma.UsuarioUpdateOneRequiredWithoutTratamentosNestedInput;
    pagamentos?: Prisma.PagamentoUpdateManyWithoutTratamentoNestedInput;
};
export type TratamentoUncheckedUpdateWithoutSessoesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tempoEstimado?: Prisma.StringFieldUpdateOperationsInput | string;
    exercicios?: Prisma.StringFieldUpdateOperationsInput | string;
    valor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusTratamentoFieldUpdateOperationsInput | $Enums.StatusTratamento;
    dataInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dataFim?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pacienteId?: Prisma.StringFieldUpdateOperationsInput | string;
    usuarioId?: Prisma.StringFieldUpdateOperationsInput | string;
    pagamentos?: Prisma.PagamentoUncheckedUpdateManyWithoutTratamentoNestedInput;
};
export type TratamentoCreateWithoutPagamentosInput = {
    id?: string;
    tempoEstimado: string;
    exercicios: string;
    valor: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.StatusTratamento;
    dataInicio?: Date | string;
    dataFim?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    paciente: Prisma.PacienteCreateNestedOneWithoutTratamentosInput;
    usuario: Prisma.UsuarioCreateNestedOneWithoutTratamentosInput;
    sessoes?: Prisma.SessaoCreateNestedManyWithoutTratamentoInput;
};
export type TratamentoUncheckedCreateWithoutPagamentosInput = {
    id?: string;
    tempoEstimado: string;
    exercicios: string;
    valor: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.StatusTratamento;
    dataInicio?: Date | string;
    dataFim?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pacienteId: string;
    usuarioId: string;
    sessoes?: Prisma.SessaoUncheckedCreateNestedManyWithoutTratamentoInput;
};
export type TratamentoCreateOrConnectWithoutPagamentosInput = {
    where: Prisma.TratamentoWhereUniqueInput;
    create: Prisma.XOR<Prisma.TratamentoCreateWithoutPagamentosInput, Prisma.TratamentoUncheckedCreateWithoutPagamentosInput>;
};
export type TratamentoUpsertWithoutPagamentosInput = {
    update: Prisma.XOR<Prisma.TratamentoUpdateWithoutPagamentosInput, Prisma.TratamentoUncheckedUpdateWithoutPagamentosInput>;
    create: Prisma.XOR<Prisma.TratamentoCreateWithoutPagamentosInput, Prisma.TratamentoUncheckedCreateWithoutPagamentosInput>;
    where?: Prisma.TratamentoWhereInput;
};
export type TratamentoUpdateToOneWithWhereWithoutPagamentosInput = {
    where?: Prisma.TratamentoWhereInput;
    data: Prisma.XOR<Prisma.TratamentoUpdateWithoutPagamentosInput, Prisma.TratamentoUncheckedUpdateWithoutPagamentosInput>;
};
export type TratamentoUpdateWithoutPagamentosInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tempoEstimado?: Prisma.StringFieldUpdateOperationsInput | string;
    exercicios?: Prisma.StringFieldUpdateOperationsInput | string;
    valor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusTratamentoFieldUpdateOperationsInput | $Enums.StatusTratamento;
    dataInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dataFim?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    paciente?: Prisma.PacienteUpdateOneRequiredWithoutTratamentosNestedInput;
    usuario?: Prisma.UsuarioUpdateOneRequiredWithoutTratamentosNestedInput;
    sessoes?: Prisma.SessaoUpdateManyWithoutTratamentoNestedInput;
};
export type TratamentoUncheckedUpdateWithoutPagamentosInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tempoEstimado?: Prisma.StringFieldUpdateOperationsInput | string;
    exercicios?: Prisma.StringFieldUpdateOperationsInput | string;
    valor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusTratamentoFieldUpdateOperationsInput | $Enums.StatusTratamento;
    dataInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dataFim?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pacienteId?: Prisma.StringFieldUpdateOperationsInput | string;
    usuarioId?: Prisma.StringFieldUpdateOperationsInput | string;
    sessoes?: Prisma.SessaoUncheckedUpdateManyWithoutTratamentoNestedInput;
};
export type TratamentoCreateManyUsuarioInput = {
    id?: string;
    tempoEstimado: string;
    exercicios: string;
    valor: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.StatusTratamento;
    dataInicio?: Date | string;
    dataFim?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pacienteId: string;
};
export type TratamentoUpdateWithoutUsuarioInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tempoEstimado?: Prisma.StringFieldUpdateOperationsInput | string;
    exercicios?: Prisma.StringFieldUpdateOperationsInput | string;
    valor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusTratamentoFieldUpdateOperationsInput | $Enums.StatusTratamento;
    dataInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dataFim?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    paciente?: Prisma.PacienteUpdateOneRequiredWithoutTratamentosNestedInput;
    sessoes?: Prisma.SessaoUpdateManyWithoutTratamentoNestedInput;
    pagamentos?: Prisma.PagamentoUpdateManyWithoutTratamentoNestedInput;
};
export type TratamentoUncheckedUpdateWithoutUsuarioInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tempoEstimado?: Prisma.StringFieldUpdateOperationsInput | string;
    exercicios?: Prisma.StringFieldUpdateOperationsInput | string;
    valor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusTratamentoFieldUpdateOperationsInput | $Enums.StatusTratamento;
    dataInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dataFim?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pacienteId?: Prisma.StringFieldUpdateOperationsInput | string;
    sessoes?: Prisma.SessaoUncheckedUpdateManyWithoutTratamentoNestedInput;
    pagamentos?: Prisma.PagamentoUncheckedUpdateManyWithoutTratamentoNestedInput;
};
export type TratamentoUncheckedUpdateManyWithoutUsuarioInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tempoEstimado?: Prisma.StringFieldUpdateOperationsInput | string;
    exercicios?: Prisma.StringFieldUpdateOperationsInput | string;
    valor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusTratamentoFieldUpdateOperationsInput | $Enums.StatusTratamento;
    dataInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dataFim?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pacienteId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type TratamentoCreateManyPacienteInput = {
    id?: string;
    tempoEstimado: string;
    exercicios: string;
    valor: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.StatusTratamento;
    dataInicio?: Date | string;
    dataFim?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    usuarioId: string;
};
export type TratamentoUpdateWithoutPacienteInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tempoEstimado?: Prisma.StringFieldUpdateOperationsInput | string;
    exercicios?: Prisma.StringFieldUpdateOperationsInput | string;
    valor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusTratamentoFieldUpdateOperationsInput | $Enums.StatusTratamento;
    dataInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dataFim?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usuario?: Prisma.UsuarioUpdateOneRequiredWithoutTratamentosNestedInput;
    sessoes?: Prisma.SessaoUpdateManyWithoutTratamentoNestedInput;
    pagamentos?: Prisma.PagamentoUpdateManyWithoutTratamentoNestedInput;
};
export type TratamentoUncheckedUpdateWithoutPacienteInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tempoEstimado?: Prisma.StringFieldUpdateOperationsInput | string;
    exercicios?: Prisma.StringFieldUpdateOperationsInput | string;
    valor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusTratamentoFieldUpdateOperationsInput | $Enums.StatusTratamento;
    dataInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dataFim?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usuarioId?: Prisma.StringFieldUpdateOperationsInput | string;
    sessoes?: Prisma.SessaoUncheckedUpdateManyWithoutTratamentoNestedInput;
    pagamentos?: Prisma.PagamentoUncheckedUpdateManyWithoutTratamentoNestedInput;
};
export type TratamentoUncheckedUpdateManyWithoutPacienteInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tempoEstimado?: Prisma.StringFieldUpdateOperationsInput | string;
    exercicios?: Prisma.StringFieldUpdateOperationsInput | string;
    valor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumStatusTratamentoFieldUpdateOperationsInput | $Enums.StatusTratamento;
    dataInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dataFim?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usuarioId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type TratamentoCountOutputType = {
    sessoes: number;
    pagamentos: number;
};
export type TratamentoCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sessoes?: boolean | TratamentoCountOutputTypeCountSessoesArgs;
    pagamentos?: boolean | TratamentoCountOutputTypeCountPagamentosArgs;
};
export type TratamentoCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TratamentoCountOutputTypeSelect<ExtArgs> | null;
};
export type TratamentoCountOutputTypeCountSessoesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SessaoWhereInput;
};
export type TratamentoCountOutputTypeCountPagamentosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PagamentoWhereInput;
};
export type TratamentoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tempoEstimado?: boolean;
    exercicios?: boolean;
    valor?: boolean;
    status?: boolean;
    dataInicio?: boolean;
    dataFim?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pacienteId?: boolean;
    usuarioId?: boolean;
    paciente?: boolean | Prisma.PacienteDefaultArgs<ExtArgs>;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
    sessoes?: boolean | Prisma.Tratamento$sessoesArgs<ExtArgs>;
    pagamentos?: boolean | Prisma.Tratamento$pagamentosArgs<ExtArgs>;
    _count?: boolean | Prisma.TratamentoCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tratamento"]>;
export type TratamentoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tempoEstimado?: boolean;
    exercicios?: boolean;
    valor?: boolean;
    status?: boolean;
    dataInicio?: boolean;
    dataFim?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pacienteId?: boolean;
    usuarioId?: boolean;
    paciente?: boolean | Prisma.PacienteDefaultArgs<ExtArgs>;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tratamento"]>;
export type TratamentoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tempoEstimado?: boolean;
    exercicios?: boolean;
    valor?: boolean;
    status?: boolean;
    dataInicio?: boolean;
    dataFim?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pacienteId?: boolean;
    usuarioId?: boolean;
    paciente?: boolean | Prisma.PacienteDefaultArgs<ExtArgs>;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tratamento"]>;
export type TratamentoSelectScalar = {
    id?: boolean;
    tempoEstimado?: boolean;
    exercicios?: boolean;
    valor?: boolean;
    status?: boolean;
    dataInicio?: boolean;
    dataFim?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pacienteId?: boolean;
    usuarioId?: boolean;
};
export type TratamentoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tempoEstimado" | "exercicios" | "valor" | "status" | "dataInicio" | "dataFim" | "createdAt" | "updatedAt" | "pacienteId" | "usuarioId", ExtArgs["result"]["tratamento"]>;
export type TratamentoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    paciente?: boolean | Prisma.PacienteDefaultArgs<ExtArgs>;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
    sessoes?: boolean | Prisma.Tratamento$sessoesArgs<ExtArgs>;
    pagamentos?: boolean | Prisma.Tratamento$pagamentosArgs<ExtArgs>;
    _count?: boolean | Prisma.TratamentoCountOutputTypeDefaultArgs<ExtArgs>;
};
export type TratamentoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    paciente?: boolean | Prisma.PacienteDefaultArgs<ExtArgs>;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
};
export type TratamentoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    paciente?: boolean | Prisma.PacienteDefaultArgs<ExtArgs>;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
};
export type $TratamentoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Tratamento";
    objects: {
        paciente: Prisma.$PacientePayload<ExtArgs>;
        usuario: Prisma.$UsuarioPayload<ExtArgs>;
        sessoes: Prisma.$SessaoPayload<ExtArgs>[];
        pagamentos: Prisma.$PagamentoPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tempoEstimado: string;
        exercicios: string;
        valor: runtime.Decimal;
        status: $Enums.StatusTratamento;
        dataInicio: Date;
        dataFim: Date | null;
        createdAt: Date;
        updatedAt: Date;
        pacienteId: string;
        usuarioId: string;
    }, ExtArgs["result"]["tratamento"]>;
    composites: {};
};
export type TratamentoGetPayload<S extends boolean | null | undefined | TratamentoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TratamentoPayload, S>;
export type TratamentoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TratamentoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TratamentoCountAggregateInputType | true;
};
export interface TratamentoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Tratamento'];
        meta: {
            name: 'Tratamento';
        };
    };
    findUnique<T extends TratamentoFindUniqueArgs>(args: Prisma.SelectSubset<T, TratamentoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TratamentoClient<runtime.Types.Result.GetResult<Prisma.$TratamentoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TratamentoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TratamentoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TratamentoClient<runtime.Types.Result.GetResult<Prisma.$TratamentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TratamentoFindFirstArgs>(args?: Prisma.SelectSubset<T, TratamentoFindFirstArgs<ExtArgs>>): Prisma.Prisma__TratamentoClient<runtime.Types.Result.GetResult<Prisma.$TratamentoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TratamentoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TratamentoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TratamentoClient<runtime.Types.Result.GetResult<Prisma.$TratamentoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TratamentoFindManyArgs>(args?: Prisma.SelectSubset<T, TratamentoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TratamentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TratamentoCreateArgs>(args: Prisma.SelectSubset<T, TratamentoCreateArgs<ExtArgs>>): Prisma.Prisma__TratamentoClient<runtime.Types.Result.GetResult<Prisma.$TratamentoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TratamentoCreateManyArgs>(args?: Prisma.SelectSubset<T, TratamentoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TratamentoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TratamentoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TratamentoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TratamentoDeleteArgs>(args: Prisma.SelectSubset<T, TratamentoDeleteArgs<ExtArgs>>): Prisma.Prisma__TratamentoClient<runtime.Types.Result.GetResult<Prisma.$TratamentoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TratamentoUpdateArgs>(args: Prisma.SelectSubset<T, TratamentoUpdateArgs<ExtArgs>>): Prisma.Prisma__TratamentoClient<runtime.Types.Result.GetResult<Prisma.$TratamentoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TratamentoDeleteManyArgs>(args?: Prisma.SelectSubset<T, TratamentoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TratamentoUpdateManyArgs>(args: Prisma.SelectSubset<T, TratamentoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TratamentoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TratamentoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TratamentoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TratamentoUpsertArgs>(args: Prisma.SelectSubset<T, TratamentoUpsertArgs<ExtArgs>>): Prisma.Prisma__TratamentoClient<runtime.Types.Result.GetResult<Prisma.$TratamentoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TratamentoCountArgs>(args?: Prisma.Subset<T, TratamentoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TratamentoCountAggregateOutputType> : number>;
    aggregate<T extends TratamentoAggregateArgs>(args: Prisma.Subset<T, TratamentoAggregateArgs>): Prisma.PrismaPromise<GetTratamentoAggregateType<T>>;
    groupBy<T extends TratamentoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TratamentoGroupByArgs['orderBy'];
    } : {
        orderBy?: TratamentoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TratamentoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTratamentoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TratamentoFieldRefs;
}
export interface Prisma__TratamentoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    paciente<T extends Prisma.PacienteDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PacienteDefaultArgs<ExtArgs>>): Prisma.Prisma__PacienteClient<runtime.Types.Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    usuario<T extends Prisma.UsuarioDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsuarioDefaultArgs<ExtArgs>>): Prisma.Prisma__UsuarioClient<runtime.Types.Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    sessoes<T extends Prisma.Tratamento$sessoesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tratamento$sessoesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SessaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    pagamentos<T extends Prisma.Tratamento$pagamentosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tratamento$pagamentosArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PagamentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TratamentoFieldRefs {
    readonly id: Prisma.FieldRef<"Tratamento", 'String'>;
    readonly tempoEstimado: Prisma.FieldRef<"Tratamento", 'String'>;
    readonly exercicios: Prisma.FieldRef<"Tratamento", 'String'>;
    readonly valor: Prisma.FieldRef<"Tratamento", 'Decimal'>;
    readonly status: Prisma.FieldRef<"Tratamento", 'StatusTratamento'>;
    readonly dataInicio: Prisma.FieldRef<"Tratamento", 'DateTime'>;
    readonly dataFim: Prisma.FieldRef<"Tratamento", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Tratamento", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Tratamento", 'DateTime'>;
    readonly pacienteId: Prisma.FieldRef<"Tratamento", 'String'>;
    readonly usuarioId: Prisma.FieldRef<"Tratamento", 'String'>;
}
export type TratamentoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TratamentoSelect<ExtArgs> | null;
    omit?: Prisma.TratamentoOmit<ExtArgs> | null;
    include?: Prisma.TratamentoInclude<ExtArgs> | null;
    where: Prisma.TratamentoWhereUniqueInput;
};
export type TratamentoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TratamentoSelect<ExtArgs> | null;
    omit?: Prisma.TratamentoOmit<ExtArgs> | null;
    include?: Prisma.TratamentoInclude<ExtArgs> | null;
    where: Prisma.TratamentoWhereUniqueInput;
};
export type TratamentoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TratamentoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TratamentoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TratamentoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TratamentoSelect<ExtArgs> | null;
    omit?: Prisma.TratamentoOmit<ExtArgs> | null;
    include?: Prisma.TratamentoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TratamentoCreateInput, Prisma.TratamentoUncheckedCreateInput>;
};
export type TratamentoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TratamentoCreateManyInput | Prisma.TratamentoCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TratamentoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TratamentoSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TratamentoOmit<ExtArgs> | null;
    data: Prisma.TratamentoCreateManyInput | Prisma.TratamentoCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TratamentoIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TratamentoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TratamentoSelect<ExtArgs> | null;
    omit?: Prisma.TratamentoOmit<ExtArgs> | null;
    include?: Prisma.TratamentoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TratamentoUpdateInput, Prisma.TratamentoUncheckedUpdateInput>;
    where: Prisma.TratamentoWhereUniqueInput;
};
export type TratamentoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TratamentoUpdateManyMutationInput, Prisma.TratamentoUncheckedUpdateManyInput>;
    where?: Prisma.TratamentoWhereInput;
    limit?: number;
};
export type TratamentoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TratamentoSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TratamentoOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TratamentoUpdateManyMutationInput, Prisma.TratamentoUncheckedUpdateManyInput>;
    where?: Prisma.TratamentoWhereInput;
    limit?: number;
    include?: Prisma.TratamentoIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TratamentoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TratamentoSelect<ExtArgs> | null;
    omit?: Prisma.TratamentoOmit<ExtArgs> | null;
    include?: Prisma.TratamentoInclude<ExtArgs> | null;
    where: Prisma.TratamentoWhereUniqueInput;
    create: Prisma.XOR<Prisma.TratamentoCreateInput, Prisma.TratamentoUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TratamentoUpdateInput, Prisma.TratamentoUncheckedUpdateInput>;
};
export type TratamentoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TratamentoSelect<ExtArgs> | null;
    omit?: Prisma.TratamentoOmit<ExtArgs> | null;
    include?: Prisma.TratamentoInclude<ExtArgs> | null;
    where: Prisma.TratamentoWhereUniqueInput;
};
export type TratamentoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TratamentoWhereInput;
    limit?: number;
};
export type Tratamento$sessoesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessaoSelect<ExtArgs> | null;
    omit?: Prisma.SessaoOmit<ExtArgs> | null;
    include?: Prisma.SessaoInclude<ExtArgs> | null;
    where?: Prisma.SessaoWhereInput;
    orderBy?: Prisma.SessaoOrderByWithRelationInput | Prisma.SessaoOrderByWithRelationInput[];
    cursor?: Prisma.SessaoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SessaoScalarFieldEnum | Prisma.SessaoScalarFieldEnum[];
};
export type Tratamento$pagamentosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PagamentoSelect<ExtArgs> | null;
    omit?: Prisma.PagamentoOmit<ExtArgs> | null;
    include?: Prisma.PagamentoInclude<ExtArgs> | null;
    where?: Prisma.PagamentoWhereInput;
    orderBy?: Prisma.PagamentoOrderByWithRelationInput | Prisma.PagamentoOrderByWithRelationInput[];
    cursor?: Prisma.PagamentoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PagamentoScalarFieldEnum | Prisma.PagamentoScalarFieldEnum[];
};
export type TratamentoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TratamentoSelect<ExtArgs> | null;
    omit?: Prisma.TratamentoOmit<ExtArgs> | null;
    include?: Prisma.TratamentoInclude<ExtArgs> | null;
};

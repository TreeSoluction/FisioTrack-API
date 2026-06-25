import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SessaoModel = runtime.Types.Result.DefaultSelection<Prisma.$SessaoPayload>;
export type AggregateSessao = {
    _count: SessaoCountAggregateOutputType | null;
    _avg: SessaoAvgAggregateOutputType | null;
    _sum: SessaoSumAggregateOutputType | null;
    _min: SessaoMinAggregateOutputType | null;
    _max: SessaoMaxAggregateOutputType | null;
};
export type SessaoAvgAggregateOutputType = {
    peso: runtime.Decimal | null;
    escalaDor: number | null;
};
export type SessaoSumAggregateOutputType = {
    peso: runtime.Decimal | null;
    escalaDor: number | null;
};
export type SessaoMinAggregateOutputType = {
    id: string | null;
    data: Date | null;
    peso: runtime.Decimal | null;
    escalaDor: number | null;
    observacoes: string | null;
    createdAt: Date | null;
    tratamentoId: string | null;
};
export type SessaoMaxAggregateOutputType = {
    id: string | null;
    data: Date | null;
    peso: runtime.Decimal | null;
    escalaDor: number | null;
    observacoes: string | null;
    createdAt: Date | null;
    tratamentoId: string | null;
};
export type SessaoCountAggregateOutputType = {
    id: number;
    data: number;
    peso: number;
    escalaDor: number;
    medidas: number;
    observacoes: number;
    createdAt: number;
    tratamentoId: number;
    _all: number;
};
export type SessaoAvgAggregateInputType = {
    peso?: true;
    escalaDor?: true;
};
export type SessaoSumAggregateInputType = {
    peso?: true;
    escalaDor?: true;
};
export type SessaoMinAggregateInputType = {
    id?: true;
    data?: true;
    peso?: true;
    escalaDor?: true;
    observacoes?: true;
    createdAt?: true;
    tratamentoId?: true;
};
export type SessaoMaxAggregateInputType = {
    id?: true;
    data?: true;
    peso?: true;
    escalaDor?: true;
    observacoes?: true;
    createdAt?: true;
    tratamentoId?: true;
};
export type SessaoCountAggregateInputType = {
    id?: true;
    data?: true;
    peso?: true;
    escalaDor?: true;
    medidas?: true;
    observacoes?: true;
    createdAt?: true;
    tratamentoId?: true;
    _all?: true;
};
export type SessaoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SessaoWhereInput;
    orderBy?: Prisma.SessaoOrderByWithRelationInput | Prisma.SessaoOrderByWithRelationInput[];
    cursor?: Prisma.SessaoWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SessaoCountAggregateInputType;
    _avg?: SessaoAvgAggregateInputType;
    _sum?: SessaoSumAggregateInputType;
    _min?: SessaoMinAggregateInputType;
    _max?: SessaoMaxAggregateInputType;
};
export type GetSessaoAggregateType<T extends SessaoAggregateArgs> = {
    [P in keyof T & keyof AggregateSessao]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSessao[P]> : Prisma.GetScalarType<T[P], AggregateSessao[P]>;
};
export type SessaoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SessaoWhereInput;
    orderBy?: Prisma.SessaoOrderByWithAggregationInput | Prisma.SessaoOrderByWithAggregationInput[];
    by: Prisma.SessaoScalarFieldEnum[] | Prisma.SessaoScalarFieldEnum;
    having?: Prisma.SessaoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SessaoCountAggregateInputType | true;
    _avg?: SessaoAvgAggregateInputType;
    _sum?: SessaoSumAggregateInputType;
    _min?: SessaoMinAggregateInputType;
    _max?: SessaoMaxAggregateInputType;
};
export type SessaoGroupByOutputType = {
    id: string;
    data: Date;
    peso: runtime.Decimal | null;
    escalaDor: number;
    medidas: runtime.JsonValue | null;
    observacoes: string | null;
    createdAt: Date;
    tratamentoId: string;
    _count: SessaoCountAggregateOutputType | null;
    _avg: SessaoAvgAggregateOutputType | null;
    _sum: SessaoSumAggregateOutputType | null;
    _min: SessaoMinAggregateOutputType | null;
    _max: SessaoMaxAggregateOutputType | null;
};
export type GetSessaoGroupByPayload<T extends SessaoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SessaoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SessaoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SessaoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SessaoGroupByOutputType[P]>;
}>>;
export type SessaoWhereInput = {
    AND?: Prisma.SessaoWhereInput | Prisma.SessaoWhereInput[];
    OR?: Prisma.SessaoWhereInput[];
    NOT?: Prisma.SessaoWhereInput | Prisma.SessaoWhereInput[];
    id?: Prisma.StringFilter<"Sessao"> | string;
    data?: Prisma.DateTimeFilter<"Sessao"> | Date | string;
    peso?: Prisma.DecimalNullableFilter<"Sessao"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    escalaDor?: Prisma.IntFilter<"Sessao"> | number;
    medidas?: Prisma.JsonNullableFilter<"Sessao">;
    observacoes?: Prisma.StringNullableFilter<"Sessao"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Sessao"> | Date | string;
    tratamentoId?: Prisma.StringFilter<"Sessao"> | string;
    tratamento?: Prisma.XOR<Prisma.TratamentoScalarRelationFilter, Prisma.TratamentoWhereInput>;
};
export type SessaoOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    data?: Prisma.SortOrder;
    peso?: Prisma.SortOrderInput | Prisma.SortOrder;
    escalaDor?: Prisma.SortOrder;
    medidas?: Prisma.SortOrderInput | Prisma.SortOrder;
    observacoes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    tratamentoId?: Prisma.SortOrder;
    tratamento?: Prisma.TratamentoOrderByWithRelationInput;
};
export type SessaoWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SessaoWhereInput | Prisma.SessaoWhereInput[];
    OR?: Prisma.SessaoWhereInput[];
    NOT?: Prisma.SessaoWhereInput | Prisma.SessaoWhereInput[];
    data?: Prisma.DateTimeFilter<"Sessao"> | Date | string;
    peso?: Prisma.DecimalNullableFilter<"Sessao"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    escalaDor?: Prisma.IntFilter<"Sessao"> | number;
    medidas?: Prisma.JsonNullableFilter<"Sessao">;
    observacoes?: Prisma.StringNullableFilter<"Sessao"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Sessao"> | Date | string;
    tratamentoId?: Prisma.StringFilter<"Sessao"> | string;
    tratamento?: Prisma.XOR<Prisma.TratamentoScalarRelationFilter, Prisma.TratamentoWhereInput>;
}, "id">;
export type SessaoOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    data?: Prisma.SortOrder;
    peso?: Prisma.SortOrderInput | Prisma.SortOrder;
    escalaDor?: Prisma.SortOrder;
    medidas?: Prisma.SortOrderInput | Prisma.SortOrder;
    observacoes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    tratamentoId?: Prisma.SortOrder;
    _count?: Prisma.SessaoCountOrderByAggregateInput;
    _avg?: Prisma.SessaoAvgOrderByAggregateInput;
    _max?: Prisma.SessaoMaxOrderByAggregateInput;
    _min?: Prisma.SessaoMinOrderByAggregateInput;
    _sum?: Prisma.SessaoSumOrderByAggregateInput;
};
export type SessaoScalarWhereWithAggregatesInput = {
    AND?: Prisma.SessaoScalarWhereWithAggregatesInput | Prisma.SessaoScalarWhereWithAggregatesInput[];
    OR?: Prisma.SessaoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SessaoScalarWhereWithAggregatesInput | Prisma.SessaoScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Sessao"> | string;
    data?: Prisma.DateTimeWithAggregatesFilter<"Sessao"> | Date | string;
    peso?: Prisma.DecimalNullableWithAggregatesFilter<"Sessao"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    escalaDor?: Prisma.IntWithAggregatesFilter<"Sessao"> | number;
    medidas?: Prisma.JsonNullableWithAggregatesFilter<"Sessao">;
    observacoes?: Prisma.StringNullableWithAggregatesFilter<"Sessao"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Sessao"> | Date | string;
    tratamentoId?: Prisma.StringWithAggregatesFilter<"Sessao"> | string;
};
export type SessaoCreateInput = {
    id?: string;
    data?: Date | string;
    peso?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    escalaDor: number;
    medidas?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    observacoes?: string | null;
    createdAt?: Date | string;
    tratamento: Prisma.TratamentoCreateNestedOneWithoutSessoesInput;
};
export type SessaoUncheckedCreateInput = {
    id?: string;
    data?: Date | string;
    peso?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    escalaDor: number;
    medidas?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    observacoes?: string | null;
    createdAt?: Date | string;
    tratamentoId: string;
};
export type SessaoUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    data?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    peso?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    escalaDor?: Prisma.IntFieldUpdateOperationsInput | number;
    medidas?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    observacoes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tratamento?: Prisma.TratamentoUpdateOneRequiredWithoutSessoesNestedInput;
};
export type SessaoUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    data?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    peso?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    escalaDor?: Prisma.IntFieldUpdateOperationsInput | number;
    medidas?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    observacoes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tratamentoId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SessaoCreateManyInput = {
    id?: string;
    data?: Date | string;
    peso?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    escalaDor: number;
    medidas?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    observacoes?: string | null;
    createdAt?: Date | string;
    tratamentoId: string;
};
export type SessaoUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    data?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    peso?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    escalaDor?: Prisma.IntFieldUpdateOperationsInput | number;
    medidas?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    observacoes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SessaoUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    data?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    peso?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    escalaDor?: Prisma.IntFieldUpdateOperationsInput | number;
    medidas?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    observacoes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tratamentoId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SessaoListRelationFilter = {
    every?: Prisma.SessaoWhereInput;
    some?: Prisma.SessaoWhereInput;
    none?: Prisma.SessaoWhereInput;
};
export type SessaoOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SessaoCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    data?: Prisma.SortOrder;
    peso?: Prisma.SortOrder;
    escalaDor?: Prisma.SortOrder;
    medidas?: Prisma.SortOrder;
    observacoes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    tratamentoId?: Prisma.SortOrder;
};
export type SessaoAvgOrderByAggregateInput = {
    peso?: Prisma.SortOrder;
    escalaDor?: Prisma.SortOrder;
};
export type SessaoMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    data?: Prisma.SortOrder;
    peso?: Prisma.SortOrder;
    escalaDor?: Prisma.SortOrder;
    observacoes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    tratamentoId?: Prisma.SortOrder;
};
export type SessaoMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    data?: Prisma.SortOrder;
    peso?: Prisma.SortOrder;
    escalaDor?: Prisma.SortOrder;
    observacoes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    tratamentoId?: Prisma.SortOrder;
};
export type SessaoSumOrderByAggregateInput = {
    peso?: Prisma.SortOrder;
    escalaDor?: Prisma.SortOrder;
};
export type SessaoCreateNestedManyWithoutTratamentoInput = {
    create?: Prisma.XOR<Prisma.SessaoCreateWithoutTratamentoInput, Prisma.SessaoUncheckedCreateWithoutTratamentoInput> | Prisma.SessaoCreateWithoutTratamentoInput[] | Prisma.SessaoUncheckedCreateWithoutTratamentoInput[];
    connectOrCreate?: Prisma.SessaoCreateOrConnectWithoutTratamentoInput | Prisma.SessaoCreateOrConnectWithoutTratamentoInput[];
    createMany?: Prisma.SessaoCreateManyTratamentoInputEnvelope;
    connect?: Prisma.SessaoWhereUniqueInput | Prisma.SessaoWhereUniqueInput[];
};
export type SessaoUncheckedCreateNestedManyWithoutTratamentoInput = {
    create?: Prisma.XOR<Prisma.SessaoCreateWithoutTratamentoInput, Prisma.SessaoUncheckedCreateWithoutTratamentoInput> | Prisma.SessaoCreateWithoutTratamentoInput[] | Prisma.SessaoUncheckedCreateWithoutTratamentoInput[];
    connectOrCreate?: Prisma.SessaoCreateOrConnectWithoutTratamentoInput | Prisma.SessaoCreateOrConnectWithoutTratamentoInput[];
    createMany?: Prisma.SessaoCreateManyTratamentoInputEnvelope;
    connect?: Prisma.SessaoWhereUniqueInput | Prisma.SessaoWhereUniqueInput[];
};
export type SessaoUpdateManyWithoutTratamentoNestedInput = {
    create?: Prisma.XOR<Prisma.SessaoCreateWithoutTratamentoInput, Prisma.SessaoUncheckedCreateWithoutTratamentoInput> | Prisma.SessaoCreateWithoutTratamentoInput[] | Prisma.SessaoUncheckedCreateWithoutTratamentoInput[];
    connectOrCreate?: Prisma.SessaoCreateOrConnectWithoutTratamentoInput | Prisma.SessaoCreateOrConnectWithoutTratamentoInput[];
    upsert?: Prisma.SessaoUpsertWithWhereUniqueWithoutTratamentoInput | Prisma.SessaoUpsertWithWhereUniqueWithoutTratamentoInput[];
    createMany?: Prisma.SessaoCreateManyTratamentoInputEnvelope;
    set?: Prisma.SessaoWhereUniqueInput | Prisma.SessaoWhereUniqueInput[];
    disconnect?: Prisma.SessaoWhereUniqueInput | Prisma.SessaoWhereUniqueInput[];
    delete?: Prisma.SessaoWhereUniqueInput | Prisma.SessaoWhereUniqueInput[];
    connect?: Prisma.SessaoWhereUniqueInput | Prisma.SessaoWhereUniqueInput[];
    update?: Prisma.SessaoUpdateWithWhereUniqueWithoutTratamentoInput | Prisma.SessaoUpdateWithWhereUniqueWithoutTratamentoInput[];
    updateMany?: Prisma.SessaoUpdateManyWithWhereWithoutTratamentoInput | Prisma.SessaoUpdateManyWithWhereWithoutTratamentoInput[];
    deleteMany?: Prisma.SessaoScalarWhereInput | Prisma.SessaoScalarWhereInput[];
};
export type SessaoUncheckedUpdateManyWithoutTratamentoNestedInput = {
    create?: Prisma.XOR<Prisma.SessaoCreateWithoutTratamentoInput, Prisma.SessaoUncheckedCreateWithoutTratamentoInput> | Prisma.SessaoCreateWithoutTratamentoInput[] | Prisma.SessaoUncheckedCreateWithoutTratamentoInput[];
    connectOrCreate?: Prisma.SessaoCreateOrConnectWithoutTratamentoInput | Prisma.SessaoCreateOrConnectWithoutTratamentoInput[];
    upsert?: Prisma.SessaoUpsertWithWhereUniqueWithoutTratamentoInput | Prisma.SessaoUpsertWithWhereUniqueWithoutTratamentoInput[];
    createMany?: Prisma.SessaoCreateManyTratamentoInputEnvelope;
    set?: Prisma.SessaoWhereUniqueInput | Prisma.SessaoWhereUniqueInput[];
    disconnect?: Prisma.SessaoWhereUniqueInput | Prisma.SessaoWhereUniqueInput[];
    delete?: Prisma.SessaoWhereUniqueInput | Prisma.SessaoWhereUniqueInput[];
    connect?: Prisma.SessaoWhereUniqueInput | Prisma.SessaoWhereUniqueInput[];
    update?: Prisma.SessaoUpdateWithWhereUniqueWithoutTratamentoInput | Prisma.SessaoUpdateWithWhereUniqueWithoutTratamentoInput[];
    updateMany?: Prisma.SessaoUpdateManyWithWhereWithoutTratamentoInput | Prisma.SessaoUpdateManyWithWhereWithoutTratamentoInput[];
    deleteMany?: Prisma.SessaoScalarWhereInput | Prisma.SessaoScalarWhereInput[];
};
export type NullableDecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type SessaoCreateWithoutTratamentoInput = {
    id?: string;
    data?: Date | string;
    peso?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    escalaDor: number;
    medidas?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    observacoes?: string | null;
    createdAt?: Date | string;
};
export type SessaoUncheckedCreateWithoutTratamentoInput = {
    id?: string;
    data?: Date | string;
    peso?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    escalaDor: number;
    medidas?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    observacoes?: string | null;
    createdAt?: Date | string;
};
export type SessaoCreateOrConnectWithoutTratamentoInput = {
    where: Prisma.SessaoWhereUniqueInput;
    create: Prisma.XOR<Prisma.SessaoCreateWithoutTratamentoInput, Prisma.SessaoUncheckedCreateWithoutTratamentoInput>;
};
export type SessaoCreateManyTratamentoInputEnvelope = {
    data: Prisma.SessaoCreateManyTratamentoInput | Prisma.SessaoCreateManyTratamentoInput[];
    skipDuplicates?: boolean;
};
export type SessaoUpsertWithWhereUniqueWithoutTratamentoInput = {
    where: Prisma.SessaoWhereUniqueInput;
    update: Prisma.XOR<Prisma.SessaoUpdateWithoutTratamentoInput, Prisma.SessaoUncheckedUpdateWithoutTratamentoInput>;
    create: Prisma.XOR<Prisma.SessaoCreateWithoutTratamentoInput, Prisma.SessaoUncheckedCreateWithoutTratamentoInput>;
};
export type SessaoUpdateWithWhereUniqueWithoutTratamentoInput = {
    where: Prisma.SessaoWhereUniqueInput;
    data: Prisma.XOR<Prisma.SessaoUpdateWithoutTratamentoInput, Prisma.SessaoUncheckedUpdateWithoutTratamentoInput>;
};
export type SessaoUpdateManyWithWhereWithoutTratamentoInput = {
    where: Prisma.SessaoScalarWhereInput;
    data: Prisma.XOR<Prisma.SessaoUpdateManyMutationInput, Prisma.SessaoUncheckedUpdateManyWithoutTratamentoInput>;
};
export type SessaoScalarWhereInput = {
    AND?: Prisma.SessaoScalarWhereInput | Prisma.SessaoScalarWhereInput[];
    OR?: Prisma.SessaoScalarWhereInput[];
    NOT?: Prisma.SessaoScalarWhereInput | Prisma.SessaoScalarWhereInput[];
    id?: Prisma.StringFilter<"Sessao"> | string;
    data?: Prisma.DateTimeFilter<"Sessao"> | Date | string;
    peso?: Prisma.DecimalNullableFilter<"Sessao"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    escalaDor?: Prisma.IntFilter<"Sessao"> | number;
    medidas?: Prisma.JsonNullableFilter<"Sessao">;
    observacoes?: Prisma.StringNullableFilter<"Sessao"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Sessao"> | Date | string;
    tratamentoId?: Prisma.StringFilter<"Sessao"> | string;
};
export type SessaoCreateManyTratamentoInput = {
    id?: string;
    data?: Date | string;
    peso?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    escalaDor: number;
    medidas?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    observacoes?: string | null;
    createdAt?: Date | string;
};
export type SessaoUpdateWithoutTratamentoInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    data?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    peso?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    escalaDor?: Prisma.IntFieldUpdateOperationsInput | number;
    medidas?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    observacoes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SessaoUncheckedUpdateWithoutTratamentoInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    data?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    peso?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    escalaDor?: Prisma.IntFieldUpdateOperationsInput | number;
    medidas?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    observacoes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SessaoUncheckedUpdateManyWithoutTratamentoInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    data?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    peso?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    escalaDor?: Prisma.IntFieldUpdateOperationsInput | number;
    medidas?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    observacoes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SessaoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    data?: boolean;
    peso?: boolean;
    escalaDor?: boolean;
    medidas?: boolean;
    observacoes?: boolean;
    createdAt?: boolean;
    tratamentoId?: boolean;
    tratamento?: boolean | Prisma.TratamentoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["sessao"]>;
export type SessaoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    data?: boolean;
    peso?: boolean;
    escalaDor?: boolean;
    medidas?: boolean;
    observacoes?: boolean;
    createdAt?: boolean;
    tratamentoId?: boolean;
    tratamento?: boolean | Prisma.TratamentoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["sessao"]>;
export type SessaoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    data?: boolean;
    peso?: boolean;
    escalaDor?: boolean;
    medidas?: boolean;
    observacoes?: boolean;
    createdAt?: boolean;
    tratamentoId?: boolean;
    tratamento?: boolean | Prisma.TratamentoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["sessao"]>;
export type SessaoSelectScalar = {
    id?: boolean;
    data?: boolean;
    peso?: boolean;
    escalaDor?: boolean;
    medidas?: boolean;
    observacoes?: boolean;
    createdAt?: boolean;
    tratamentoId?: boolean;
};
export type SessaoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "data" | "peso" | "escalaDor" | "medidas" | "observacoes" | "createdAt" | "tratamentoId", ExtArgs["result"]["sessao"]>;
export type SessaoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tratamento?: boolean | Prisma.TratamentoDefaultArgs<ExtArgs>;
};
export type SessaoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tratamento?: boolean | Prisma.TratamentoDefaultArgs<ExtArgs>;
};
export type SessaoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tratamento?: boolean | Prisma.TratamentoDefaultArgs<ExtArgs>;
};
export type $SessaoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Sessao";
    objects: {
        tratamento: Prisma.$TratamentoPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        data: Date;
        peso: runtime.Decimal | null;
        escalaDor: number;
        medidas: runtime.JsonValue | null;
        observacoes: string | null;
        createdAt: Date;
        tratamentoId: string;
    }, ExtArgs["result"]["sessao"]>;
    composites: {};
};
export type SessaoGetPayload<S extends boolean | null | undefined | SessaoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SessaoPayload, S>;
export type SessaoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SessaoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SessaoCountAggregateInputType | true;
};
export interface SessaoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Sessao'];
        meta: {
            name: 'Sessao';
        };
    };
    findUnique<T extends SessaoFindUniqueArgs>(args: Prisma.SelectSubset<T, SessaoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SessaoClient<runtime.Types.Result.GetResult<Prisma.$SessaoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SessaoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SessaoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SessaoClient<runtime.Types.Result.GetResult<Prisma.$SessaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SessaoFindFirstArgs>(args?: Prisma.SelectSubset<T, SessaoFindFirstArgs<ExtArgs>>): Prisma.Prisma__SessaoClient<runtime.Types.Result.GetResult<Prisma.$SessaoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SessaoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SessaoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SessaoClient<runtime.Types.Result.GetResult<Prisma.$SessaoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SessaoFindManyArgs>(args?: Prisma.SelectSubset<T, SessaoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SessaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SessaoCreateArgs>(args: Prisma.SelectSubset<T, SessaoCreateArgs<ExtArgs>>): Prisma.Prisma__SessaoClient<runtime.Types.Result.GetResult<Prisma.$SessaoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SessaoCreateManyArgs>(args?: Prisma.SelectSubset<T, SessaoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SessaoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SessaoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SessaoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SessaoDeleteArgs>(args: Prisma.SelectSubset<T, SessaoDeleteArgs<ExtArgs>>): Prisma.Prisma__SessaoClient<runtime.Types.Result.GetResult<Prisma.$SessaoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SessaoUpdateArgs>(args: Prisma.SelectSubset<T, SessaoUpdateArgs<ExtArgs>>): Prisma.Prisma__SessaoClient<runtime.Types.Result.GetResult<Prisma.$SessaoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SessaoDeleteManyArgs>(args?: Prisma.SelectSubset<T, SessaoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SessaoUpdateManyArgs>(args: Prisma.SelectSubset<T, SessaoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SessaoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SessaoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SessaoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SessaoUpsertArgs>(args: Prisma.SelectSubset<T, SessaoUpsertArgs<ExtArgs>>): Prisma.Prisma__SessaoClient<runtime.Types.Result.GetResult<Prisma.$SessaoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SessaoCountArgs>(args?: Prisma.Subset<T, SessaoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SessaoCountAggregateOutputType> : number>;
    aggregate<T extends SessaoAggregateArgs>(args: Prisma.Subset<T, SessaoAggregateArgs>): Prisma.PrismaPromise<GetSessaoAggregateType<T>>;
    groupBy<T extends SessaoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SessaoGroupByArgs['orderBy'];
    } : {
        orderBy?: SessaoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SessaoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessaoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SessaoFieldRefs;
}
export interface Prisma__SessaoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tratamento<T extends Prisma.TratamentoDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TratamentoDefaultArgs<ExtArgs>>): Prisma.Prisma__TratamentoClient<runtime.Types.Result.GetResult<Prisma.$TratamentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SessaoFieldRefs {
    readonly id: Prisma.FieldRef<"Sessao", 'String'>;
    readonly data: Prisma.FieldRef<"Sessao", 'DateTime'>;
    readonly peso: Prisma.FieldRef<"Sessao", 'Decimal'>;
    readonly escalaDor: Prisma.FieldRef<"Sessao", 'Int'>;
    readonly medidas: Prisma.FieldRef<"Sessao", 'Json'>;
    readonly observacoes: Prisma.FieldRef<"Sessao", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Sessao", 'DateTime'>;
    readonly tratamentoId: Prisma.FieldRef<"Sessao", 'String'>;
}
export type SessaoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessaoSelect<ExtArgs> | null;
    omit?: Prisma.SessaoOmit<ExtArgs> | null;
    include?: Prisma.SessaoInclude<ExtArgs> | null;
    where: Prisma.SessaoWhereUniqueInput;
};
export type SessaoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessaoSelect<ExtArgs> | null;
    omit?: Prisma.SessaoOmit<ExtArgs> | null;
    include?: Prisma.SessaoInclude<ExtArgs> | null;
    where: Prisma.SessaoWhereUniqueInput;
};
export type SessaoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SessaoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SessaoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SessaoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessaoSelect<ExtArgs> | null;
    omit?: Prisma.SessaoOmit<ExtArgs> | null;
    include?: Prisma.SessaoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SessaoCreateInput, Prisma.SessaoUncheckedCreateInput>;
};
export type SessaoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SessaoCreateManyInput | Prisma.SessaoCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SessaoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessaoSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SessaoOmit<ExtArgs> | null;
    data: Prisma.SessaoCreateManyInput | Prisma.SessaoCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.SessaoIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type SessaoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessaoSelect<ExtArgs> | null;
    omit?: Prisma.SessaoOmit<ExtArgs> | null;
    include?: Prisma.SessaoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SessaoUpdateInput, Prisma.SessaoUncheckedUpdateInput>;
    where: Prisma.SessaoWhereUniqueInput;
};
export type SessaoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SessaoUpdateManyMutationInput, Prisma.SessaoUncheckedUpdateManyInput>;
    where?: Prisma.SessaoWhereInput;
    limit?: number;
};
export type SessaoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessaoSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SessaoOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SessaoUpdateManyMutationInput, Prisma.SessaoUncheckedUpdateManyInput>;
    where?: Prisma.SessaoWhereInput;
    limit?: number;
    include?: Prisma.SessaoIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type SessaoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessaoSelect<ExtArgs> | null;
    omit?: Prisma.SessaoOmit<ExtArgs> | null;
    include?: Prisma.SessaoInclude<ExtArgs> | null;
    where: Prisma.SessaoWhereUniqueInput;
    create: Prisma.XOR<Prisma.SessaoCreateInput, Prisma.SessaoUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SessaoUpdateInput, Prisma.SessaoUncheckedUpdateInput>;
};
export type SessaoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessaoSelect<ExtArgs> | null;
    omit?: Prisma.SessaoOmit<ExtArgs> | null;
    include?: Prisma.SessaoInclude<ExtArgs> | null;
    where: Prisma.SessaoWhereUniqueInput;
};
export type SessaoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SessaoWhereInput;
    limit?: number;
};
export type SessaoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessaoSelect<ExtArgs> | null;
    omit?: Prisma.SessaoOmit<ExtArgs> | null;
    include?: Prisma.SessaoInclude<ExtArgs> | null;
};

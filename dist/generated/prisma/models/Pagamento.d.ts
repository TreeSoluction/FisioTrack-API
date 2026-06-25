import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PagamentoModel = runtime.Types.Result.DefaultSelection<Prisma.$PagamentoPayload>;
export type AggregatePagamento = {
    _count: PagamentoCountAggregateOutputType | null;
    _avg: PagamentoAvgAggregateOutputType | null;
    _sum: PagamentoSumAggregateOutputType | null;
    _min: PagamentoMinAggregateOutputType | null;
    _max: PagamentoMaxAggregateOutputType | null;
};
export type PagamentoAvgAggregateOutputType = {
    valor: runtime.Decimal | null;
};
export type PagamentoSumAggregateOutputType = {
    valor: runtime.Decimal | null;
};
export type PagamentoMinAggregateOutputType = {
    id: string | null;
    valor: runtime.Decimal | null;
    dataVencimento: Date | null;
    dataPagamento: Date | null;
    status: $Enums.StatusPagamento | null;
    comprovante: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    tratamentoId: string | null;
};
export type PagamentoMaxAggregateOutputType = {
    id: string | null;
    valor: runtime.Decimal | null;
    dataVencimento: Date | null;
    dataPagamento: Date | null;
    status: $Enums.StatusPagamento | null;
    comprovante: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    tratamentoId: string | null;
};
export type PagamentoCountAggregateOutputType = {
    id: number;
    valor: number;
    dataVencimento: number;
    dataPagamento: number;
    status: number;
    comprovante: number;
    createdAt: number;
    updatedAt: number;
    tratamentoId: number;
    _all: number;
};
export type PagamentoAvgAggregateInputType = {
    valor?: true;
};
export type PagamentoSumAggregateInputType = {
    valor?: true;
};
export type PagamentoMinAggregateInputType = {
    id?: true;
    valor?: true;
    dataVencimento?: true;
    dataPagamento?: true;
    status?: true;
    comprovante?: true;
    createdAt?: true;
    updatedAt?: true;
    tratamentoId?: true;
};
export type PagamentoMaxAggregateInputType = {
    id?: true;
    valor?: true;
    dataVencimento?: true;
    dataPagamento?: true;
    status?: true;
    comprovante?: true;
    createdAt?: true;
    updatedAt?: true;
    tratamentoId?: true;
};
export type PagamentoCountAggregateInputType = {
    id?: true;
    valor?: true;
    dataVencimento?: true;
    dataPagamento?: true;
    status?: true;
    comprovante?: true;
    createdAt?: true;
    updatedAt?: true;
    tratamentoId?: true;
    _all?: true;
};
export type PagamentoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PagamentoWhereInput;
    orderBy?: Prisma.PagamentoOrderByWithRelationInput | Prisma.PagamentoOrderByWithRelationInput[];
    cursor?: Prisma.PagamentoWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PagamentoCountAggregateInputType;
    _avg?: PagamentoAvgAggregateInputType;
    _sum?: PagamentoSumAggregateInputType;
    _min?: PagamentoMinAggregateInputType;
    _max?: PagamentoMaxAggregateInputType;
};
export type GetPagamentoAggregateType<T extends PagamentoAggregateArgs> = {
    [P in keyof T & keyof AggregatePagamento]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePagamento[P]> : Prisma.GetScalarType<T[P], AggregatePagamento[P]>;
};
export type PagamentoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PagamentoWhereInput;
    orderBy?: Prisma.PagamentoOrderByWithAggregationInput | Prisma.PagamentoOrderByWithAggregationInput[];
    by: Prisma.PagamentoScalarFieldEnum[] | Prisma.PagamentoScalarFieldEnum;
    having?: Prisma.PagamentoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PagamentoCountAggregateInputType | true;
    _avg?: PagamentoAvgAggregateInputType;
    _sum?: PagamentoSumAggregateInputType;
    _min?: PagamentoMinAggregateInputType;
    _max?: PagamentoMaxAggregateInputType;
};
export type PagamentoGroupByOutputType = {
    id: string;
    valor: runtime.Decimal;
    dataVencimento: Date;
    dataPagamento: Date | null;
    status: $Enums.StatusPagamento;
    comprovante: string | null;
    createdAt: Date;
    updatedAt: Date;
    tratamentoId: string;
    _count: PagamentoCountAggregateOutputType | null;
    _avg: PagamentoAvgAggregateOutputType | null;
    _sum: PagamentoSumAggregateOutputType | null;
    _min: PagamentoMinAggregateOutputType | null;
    _max: PagamentoMaxAggregateOutputType | null;
};
export type GetPagamentoGroupByPayload<T extends PagamentoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PagamentoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PagamentoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PagamentoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PagamentoGroupByOutputType[P]>;
}>>;
export type PagamentoWhereInput = {
    AND?: Prisma.PagamentoWhereInput | Prisma.PagamentoWhereInput[];
    OR?: Prisma.PagamentoWhereInput[];
    NOT?: Prisma.PagamentoWhereInput | Prisma.PagamentoWhereInput[];
    id?: Prisma.StringFilter<"Pagamento"> | string;
    valor?: Prisma.DecimalFilter<"Pagamento"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dataVencimento?: Prisma.DateTimeFilter<"Pagamento"> | Date | string;
    dataPagamento?: Prisma.DateTimeNullableFilter<"Pagamento"> | Date | string | null;
    status?: Prisma.EnumStatusPagamentoFilter<"Pagamento"> | $Enums.StatusPagamento;
    comprovante?: Prisma.StringNullableFilter<"Pagamento"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Pagamento"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Pagamento"> | Date | string;
    tratamentoId?: Prisma.StringFilter<"Pagamento"> | string;
    tratamento?: Prisma.XOR<Prisma.TratamentoScalarRelationFilter, Prisma.TratamentoWhereInput>;
};
export type PagamentoOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    valor?: Prisma.SortOrder;
    dataVencimento?: Prisma.SortOrder;
    dataPagamento?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    comprovante?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    tratamentoId?: Prisma.SortOrder;
    tratamento?: Prisma.TratamentoOrderByWithRelationInput;
};
export type PagamentoWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PagamentoWhereInput | Prisma.PagamentoWhereInput[];
    OR?: Prisma.PagamentoWhereInput[];
    NOT?: Prisma.PagamentoWhereInput | Prisma.PagamentoWhereInput[];
    valor?: Prisma.DecimalFilter<"Pagamento"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dataVencimento?: Prisma.DateTimeFilter<"Pagamento"> | Date | string;
    dataPagamento?: Prisma.DateTimeNullableFilter<"Pagamento"> | Date | string | null;
    status?: Prisma.EnumStatusPagamentoFilter<"Pagamento"> | $Enums.StatusPagamento;
    comprovante?: Prisma.StringNullableFilter<"Pagamento"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Pagamento"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Pagamento"> | Date | string;
    tratamentoId?: Prisma.StringFilter<"Pagamento"> | string;
    tratamento?: Prisma.XOR<Prisma.TratamentoScalarRelationFilter, Prisma.TratamentoWhereInput>;
}, "id">;
export type PagamentoOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    valor?: Prisma.SortOrder;
    dataVencimento?: Prisma.SortOrder;
    dataPagamento?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    comprovante?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    tratamentoId?: Prisma.SortOrder;
    _count?: Prisma.PagamentoCountOrderByAggregateInput;
    _avg?: Prisma.PagamentoAvgOrderByAggregateInput;
    _max?: Prisma.PagamentoMaxOrderByAggregateInput;
    _min?: Prisma.PagamentoMinOrderByAggregateInput;
    _sum?: Prisma.PagamentoSumOrderByAggregateInput;
};
export type PagamentoScalarWhereWithAggregatesInput = {
    AND?: Prisma.PagamentoScalarWhereWithAggregatesInput | Prisma.PagamentoScalarWhereWithAggregatesInput[];
    OR?: Prisma.PagamentoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PagamentoScalarWhereWithAggregatesInput | Prisma.PagamentoScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Pagamento"> | string;
    valor?: Prisma.DecimalWithAggregatesFilter<"Pagamento"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dataVencimento?: Prisma.DateTimeWithAggregatesFilter<"Pagamento"> | Date | string;
    dataPagamento?: Prisma.DateTimeNullableWithAggregatesFilter<"Pagamento"> | Date | string | null;
    status?: Prisma.EnumStatusPagamentoWithAggregatesFilter<"Pagamento"> | $Enums.StatusPagamento;
    comprovante?: Prisma.StringNullableWithAggregatesFilter<"Pagamento"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Pagamento"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Pagamento"> | Date | string;
    tratamentoId?: Prisma.StringWithAggregatesFilter<"Pagamento"> | string;
};
export type PagamentoCreateInput = {
    id?: string;
    valor: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dataVencimento: Date | string;
    dataPagamento?: Date | string | null;
    status?: $Enums.StatusPagamento;
    comprovante?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tratamento: Prisma.TratamentoCreateNestedOneWithoutPagamentosInput;
};
export type PagamentoUncheckedCreateInput = {
    id?: string;
    valor: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dataVencimento: Date | string;
    dataPagamento?: Date | string | null;
    status?: $Enums.StatusPagamento;
    comprovante?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tratamentoId: string;
};
export type PagamentoUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    valor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dataVencimento?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dataPagamento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumStatusPagamentoFieldUpdateOperationsInput | $Enums.StatusPagamento;
    comprovante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tratamento?: Prisma.TratamentoUpdateOneRequiredWithoutPagamentosNestedInput;
};
export type PagamentoUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    valor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dataVencimento?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dataPagamento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumStatusPagamentoFieldUpdateOperationsInput | $Enums.StatusPagamento;
    comprovante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tratamentoId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PagamentoCreateManyInput = {
    id?: string;
    valor: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dataVencimento: Date | string;
    dataPagamento?: Date | string | null;
    status?: $Enums.StatusPagamento;
    comprovante?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tratamentoId: string;
};
export type PagamentoUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    valor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dataVencimento?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dataPagamento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumStatusPagamentoFieldUpdateOperationsInput | $Enums.StatusPagamento;
    comprovante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PagamentoUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    valor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dataVencimento?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dataPagamento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumStatusPagamentoFieldUpdateOperationsInput | $Enums.StatusPagamento;
    comprovante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tratamentoId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PagamentoListRelationFilter = {
    every?: Prisma.PagamentoWhereInput;
    some?: Prisma.PagamentoWhereInput;
    none?: Prisma.PagamentoWhereInput;
};
export type PagamentoOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PagamentoCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    valor?: Prisma.SortOrder;
    dataVencimento?: Prisma.SortOrder;
    dataPagamento?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    comprovante?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    tratamentoId?: Prisma.SortOrder;
};
export type PagamentoAvgOrderByAggregateInput = {
    valor?: Prisma.SortOrder;
};
export type PagamentoMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    valor?: Prisma.SortOrder;
    dataVencimento?: Prisma.SortOrder;
    dataPagamento?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    comprovante?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    tratamentoId?: Prisma.SortOrder;
};
export type PagamentoMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    valor?: Prisma.SortOrder;
    dataVencimento?: Prisma.SortOrder;
    dataPagamento?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    comprovante?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    tratamentoId?: Prisma.SortOrder;
};
export type PagamentoSumOrderByAggregateInput = {
    valor?: Prisma.SortOrder;
};
export type PagamentoCreateNestedManyWithoutTratamentoInput = {
    create?: Prisma.XOR<Prisma.PagamentoCreateWithoutTratamentoInput, Prisma.PagamentoUncheckedCreateWithoutTratamentoInput> | Prisma.PagamentoCreateWithoutTratamentoInput[] | Prisma.PagamentoUncheckedCreateWithoutTratamentoInput[];
    connectOrCreate?: Prisma.PagamentoCreateOrConnectWithoutTratamentoInput | Prisma.PagamentoCreateOrConnectWithoutTratamentoInput[];
    createMany?: Prisma.PagamentoCreateManyTratamentoInputEnvelope;
    connect?: Prisma.PagamentoWhereUniqueInput | Prisma.PagamentoWhereUniqueInput[];
};
export type PagamentoUncheckedCreateNestedManyWithoutTratamentoInput = {
    create?: Prisma.XOR<Prisma.PagamentoCreateWithoutTratamentoInput, Prisma.PagamentoUncheckedCreateWithoutTratamentoInput> | Prisma.PagamentoCreateWithoutTratamentoInput[] | Prisma.PagamentoUncheckedCreateWithoutTratamentoInput[];
    connectOrCreate?: Prisma.PagamentoCreateOrConnectWithoutTratamentoInput | Prisma.PagamentoCreateOrConnectWithoutTratamentoInput[];
    createMany?: Prisma.PagamentoCreateManyTratamentoInputEnvelope;
    connect?: Prisma.PagamentoWhereUniqueInput | Prisma.PagamentoWhereUniqueInput[];
};
export type PagamentoUpdateManyWithoutTratamentoNestedInput = {
    create?: Prisma.XOR<Prisma.PagamentoCreateWithoutTratamentoInput, Prisma.PagamentoUncheckedCreateWithoutTratamentoInput> | Prisma.PagamentoCreateWithoutTratamentoInput[] | Prisma.PagamentoUncheckedCreateWithoutTratamentoInput[];
    connectOrCreate?: Prisma.PagamentoCreateOrConnectWithoutTratamentoInput | Prisma.PagamentoCreateOrConnectWithoutTratamentoInput[];
    upsert?: Prisma.PagamentoUpsertWithWhereUniqueWithoutTratamentoInput | Prisma.PagamentoUpsertWithWhereUniqueWithoutTratamentoInput[];
    createMany?: Prisma.PagamentoCreateManyTratamentoInputEnvelope;
    set?: Prisma.PagamentoWhereUniqueInput | Prisma.PagamentoWhereUniqueInput[];
    disconnect?: Prisma.PagamentoWhereUniqueInput | Prisma.PagamentoWhereUniqueInput[];
    delete?: Prisma.PagamentoWhereUniqueInput | Prisma.PagamentoWhereUniqueInput[];
    connect?: Prisma.PagamentoWhereUniqueInput | Prisma.PagamentoWhereUniqueInput[];
    update?: Prisma.PagamentoUpdateWithWhereUniqueWithoutTratamentoInput | Prisma.PagamentoUpdateWithWhereUniqueWithoutTratamentoInput[];
    updateMany?: Prisma.PagamentoUpdateManyWithWhereWithoutTratamentoInput | Prisma.PagamentoUpdateManyWithWhereWithoutTratamentoInput[];
    deleteMany?: Prisma.PagamentoScalarWhereInput | Prisma.PagamentoScalarWhereInput[];
};
export type PagamentoUncheckedUpdateManyWithoutTratamentoNestedInput = {
    create?: Prisma.XOR<Prisma.PagamentoCreateWithoutTratamentoInput, Prisma.PagamentoUncheckedCreateWithoutTratamentoInput> | Prisma.PagamentoCreateWithoutTratamentoInput[] | Prisma.PagamentoUncheckedCreateWithoutTratamentoInput[];
    connectOrCreate?: Prisma.PagamentoCreateOrConnectWithoutTratamentoInput | Prisma.PagamentoCreateOrConnectWithoutTratamentoInput[];
    upsert?: Prisma.PagamentoUpsertWithWhereUniqueWithoutTratamentoInput | Prisma.PagamentoUpsertWithWhereUniqueWithoutTratamentoInput[];
    createMany?: Prisma.PagamentoCreateManyTratamentoInputEnvelope;
    set?: Prisma.PagamentoWhereUniqueInput | Prisma.PagamentoWhereUniqueInput[];
    disconnect?: Prisma.PagamentoWhereUniqueInput | Prisma.PagamentoWhereUniqueInput[];
    delete?: Prisma.PagamentoWhereUniqueInput | Prisma.PagamentoWhereUniqueInput[];
    connect?: Prisma.PagamentoWhereUniqueInput | Prisma.PagamentoWhereUniqueInput[];
    update?: Prisma.PagamentoUpdateWithWhereUniqueWithoutTratamentoInput | Prisma.PagamentoUpdateWithWhereUniqueWithoutTratamentoInput[];
    updateMany?: Prisma.PagamentoUpdateManyWithWhereWithoutTratamentoInput | Prisma.PagamentoUpdateManyWithWhereWithoutTratamentoInput[];
    deleteMany?: Prisma.PagamentoScalarWhereInput | Prisma.PagamentoScalarWhereInput[];
};
export type EnumStatusPagamentoFieldUpdateOperationsInput = {
    set?: $Enums.StatusPagamento;
};
export type PagamentoCreateWithoutTratamentoInput = {
    id?: string;
    valor: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dataVencimento: Date | string;
    dataPagamento?: Date | string | null;
    status?: $Enums.StatusPagamento;
    comprovante?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PagamentoUncheckedCreateWithoutTratamentoInput = {
    id?: string;
    valor: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dataVencimento: Date | string;
    dataPagamento?: Date | string | null;
    status?: $Enums.StatusPagamento;
    comprovante?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PagamentoCreateOrConnectWithoutTratamentoInput = {
    where: Prisma.PagamentoWhereUniqueInput;
    create: Prisma.XOR<Prisma.PagamentoCreateWithoutTratamentoInput, Prisma.PagamentoUncheckedCreateWithoutTratamentoInput>;
};
export type PagamentoCreateManyTratamentoInputEnvelope = {
    data: Prisma.PagamentoCreateManyTratamentoInput | Prisma.PagamentoCreateManyTratamentoInput[];
    skipDuplicates?: boolean;
};
export type PagamentoUpsertWithWhereUniqueWithoutTratamentoInput = {
    where: Prisma.PagamentoWhereUniqueInput;
    update: Prisma.XOR<Prisma.PagamentoUpdateWithoutTratamentoInput, Prisma.PagamentoUncheckedUpdateWithoutTratamentoInput>;
    create: Prisma.XOR<Prisma.PagamentoCreateWithoutTratamentoInput, Prisma.PagamentoUncheckedCreateWithoutTratamentoInput>;
};
export type PagamentoUpdateWithWhereUniqueWithoutTratamentoInput = {
    where: Prisma.PagamentoWhereUniqueInput;
    data: Prisma.XOR<Prisma.PagamentoUpdateWithoutTratamentoInput, Prisma.PagamentoUncheckedUpdateWithoutTratamentoInput>;
};
export type PagamentoUpdateManyWithWhereWithoutTratamentoInput = {
    where: Prisma.PagamentoScalarWhereInput;
    data: Prisma.XOR<Prisma.PagamentoUpdateManyMutationInput, Prisma.PagamentoUncheckedUpdateManyWithoutTratamentoInput>;
};
export type PagamentoScalarWhereInput = {
    AND?: Prisma.PagamentoScalarWhereInput | Prisma.PagamentoScalarWhereInput[];
    OR?: Prisma.PagamentoScalarWhereInput[];
    NOT?: Prisma.PagamentoScalarWhereInput | Prisma.PagamentoScalarWhereInput[];
    id?: Prisma.StringFilter<"Pagamento"> | string;
    valor?: Prisma.DecimalFilter<"Pagamento"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dataVencimento?: Prisma.DateTimeFilter<"Pagamento"> | Date | string;
    dataPagamento?: Prisma.DateTimeNullableFilter<"Pagamento"> | Date | string | null;
    status?: Prisma.EnumStatusPagamentoFilter<"Pagamento"> | $Enums.StatusPagamento;
    comprovante?: Prisma.StringNullableFilter<"Pagamento"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Pagamento"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Pagamento"> | Date | string;
    tratamentoId?: Prisma.StringFilter<"Pagamento"> | string;
};
export type PagamentoCreateManyTratamentoInput = {
    id?: string;
    valor: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dataVencimento: Date | string;
    dataPagamento?: Date | string | null;
    status?: $Enums.StatusPagamento;
    comprovante?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PagamentoUpdateWithoutTratamentoInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    valor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dataVencimento?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dataPagamento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumStatusPagamentoFieldUpdateOperationsInput | $Enums.StatusPagamento;
    comprovante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PagamentoUncheckedUpdateWithoutTratamentoInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    valor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dataVencimento?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dataPagamento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumStatusPagamentoFieldUpdateOperationsInput | $Enums.StatusPagamento;
    comprovante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PagamentoUncheckedUpdateManyWithoutTratamentoInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    valor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dataVencimento?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dataPagamento?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumStatusPagamentoFieldUpdateOperationsInput | $Enums.StatusPagamento;
    comprovante?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PagamentoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    valor?: boolean;
    dataVencimento?: boolean;
    dataPagamento?: boolean;
    status?: boolean;
    comprovante?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tratamentoId?: boolean;
    tratamento?: boolean | Prisma.TratamentoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pagamento"]>;
export type PagamentoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    valor?: boolean;
    dataVencimento?: boolean;
    dataPagamento?: boolean;
    status?: boolean;
    comprovante?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tratamentoId?: boolean;
    tratamento?: boolean | Prisma.TratamentoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pagamento"]>;
export type PagamentoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    valor?: boolean;
    dataVencimento?: boolean;
    dataPagamento?: boolean;
    status?: boolean;
    comprovante?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tratamentoId?: boolean;
    tratamento?: boolean | Prisma.TratamentoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pagamento"]>;
export type PagamentoSelectScalar = {
    id?: boolean;
    valor?: boolean;
    dataVencimento?: boolean;
    dataPagamento?: boolean;
    status?: boolean;
    comprovante?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tratamentoId?: boolean;
};
export type PagamentoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "valor" | "dataVencimento" | "dataPagamento" | "status" | "comprovante" | "createdAt" | "updatedAt" | "tratamentoId", ExtArgs["result"]["pagamento"]>;
export type PagamentoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tratamento?: boolean | Prisma.TratamentoDefaultArgs<ExtArgs>;
};
export type PagamentoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tratamento?: boolean | Prisma.TratamentoDefaultArgs<ExtArgs>;
};
export type PagamentoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tratamento?: boolean | Prisma.TratamentoDefaultArgs<ExtArgs>;
};
export type $PagamentoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Pagamento";
    objects: {
        tratamento: Prisma.$TratamentoPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        valor: runtime.Decimal;
        dataVencimento: Date;
        dataPagamento: Date | null;
        status: $Enums.StatusPagamento;
        comprovante: string | null;
        createdAt: Date;
        updatedAt: Date;
        tratamentoId: string;
    }, ExtArgs["result"]["pagamento"]>;
    composites: {};
};
export type PagamentoGetPayload<S extends boolean | null | undefined | PagamentoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PagamentoPayload, S>;
export type PagamentoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PagamentoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PagamentoCountAggregateInputType | true;
};
export interface PagamentoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Pagamento'];
        meta: {
            name: 'Pagamento';
        };
    };
    findUnique<T extends PagamentoFindUniqueArgs>(args: Prisma.SelectSubset<T, PagamentoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PagamentoClient<runtime.Types.Result.GetResult<Prisma.$PagamentoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PagamentoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PagamentoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PagamentoClient<runtime.Types.Result.GetResult<Prisma.$PagamentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PagamentoFindFirstArgs>(args?: Prisma.SelectSubset<T, PagamentoFindFirstArgs<ExtArgs>>): Prisma.Prisma__PagamentoClient<runtime.Types.Result.GetResult<Prisma.$PagamentoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PagamentoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PagamentoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PagamentoClient<runtime.Types.Result.GetResult<Prisma.$PagamentoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PagamentoFindManyArgs>(args?: Prisma.SelectSubset<T, PagamentoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PagamentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PagamentoCreateArgs>(args: Prisma.SelectSubset<T, PagamentoCreateArgs<ExtArgs>>): Prisma.Prisma__PagamentoClient<runtime.Types.Result.GetResult<Prisma.$PagamentoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PagamentoCreateManyArgs>(args?: Prisma.SelectSubset<T, PagamentoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PagamentoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PagamentoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PagamentoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PagamentoDeleteArgs>(args: Prisma.SelectSubset<T, PagamentoDeleteArgs<ExtArgs>>): Prisma.Prisma__PagamentoClient<runtime.Types.Result.GetResult<Prisma.$PagamentoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PagamentoUpdateArgs>(args: Prisma.SelectSubset<T, PagamentoUpdateArgs<ExtArgs>>): Prisma.Prisma__PagamentoClient<runtime.Types.Result.GetResult<Prisma.$PagamentoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PagamentoDeleteManyArgs>(args?: Prisma.SelectSubset<T, PagamentoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PagamentoUpdateManyArgs>(args: Prisma.SelectSubset<T, PagamentoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PagamentoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PagamentoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PagamentoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PagamentoUpsertArgs>(args: Prisma.SelectSubset<T, PagamentoUpsertArgs<ExtArgs>>): Prisma.Prisma__PagamentoClient<runtime.Types.Result.GetResult<Prisma.$PagamentoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PagamentoCountArgs>(args?: Prisma.Subset<T, PagamentoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PagamentoCountAggregateOutputType> : number>;
    aggregate<T extends PagamentoAggregateArgs>(args: Prisma.Subset<T, PagamentoAggregateArgs>): Prisma.PrismaPromise<GetPagamentoAggregateType<T>>;
    groupBy<T extends PagamentoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PagamentoGroupByArgs['orderBy'];
    } : {
        orderBy?: PagamentoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PagamentoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPagamentoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PagamentoFieldRefs;
}
export interface Prisma__PagamentoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tratamento<T extends Prisma.TratamentoDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TratamentoDefaultArgs<ExtArgs>>): Prisma.Prisma__TratamentoClient<runtime.Types.Result.GetResult<Prisma.$TratamentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PagamentoFieldRefs {
    readonly id: Prisma.FieldRef<"Pagamento", 'String'>;
    readonly valor: Prisma.FieldRef<"Pagamento", 'Decimal'>;
    readonly dataVencimento: Prisma.FieldRef<"Pagamento", 'DateTime'>;
    readonly dataPagamento: Prisma.FieldRef<"Pagamento", 'DateTime'>;
    readonly status: Prisma.FieldRef<"Pagamento", 'StatusPagamento'>;
    readonly comprovante: Prisma.FieldRef<"Pagamento", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Pagamento", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Pagamento", 'DateTime'>;
    readonly tratamentoId: Prisma.FieldRef<"Pagamento", 'String'>;
}
export type PagamentoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PagamentoSelect<ExtArgs> | null;
    omit?: Prisma.PagamentoOmit<ExtArgs> | null;
    include?: Prisma.PagamentoInclude<ExtArgs> | null;
    where: Prisma.PagamentoWhereUniqueInput;
};
export type PagamentoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PagamentoSelect<ExtArgs> | null;
    omit?: Prisma.PagamentoOmit<ExtArgs> | null;
    include?: Prisma.PagamentoInclude<ExtArgs> | null;
    where: Prisma.PagamentoWhereUniqueInput;
};
export type PagamentoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PagamentoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PagamentoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PagamentoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PagamentoSelect<ExtArgs> | null;
    omit?: Prisma.PagamentoOmit<ExtArgs> | null;
    include?: Prisma.PagamentoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PagamentoCreateInput, Prisma.PagamentoUncheckedCreateInput>;
};
export type PagamentoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PagamentoCreateManyInput | Prisma.PagamentoCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PagamentoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PagamentoSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PagamentoOmit<ExtArgs> | null;
    data: Prisma.PagamentoCreateManyInput | Prisma.PagamentoCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PagamentoIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PagamentoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PagamentoSelect<ExtArgs> | null;
    omit?: Prisma.PagamentoOmit<ExtArgs> | null;
    include?: Prisma.PagamentoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PagamentoUpdateInput, Prisma.PagamentoUncheckedUpdateInput>;
    where: Prisma.PagamentoWhereUniqueInput;
};
export type PagamentoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PagamentoUpdateManyMutationInput, Prisma.PagamentoUncheckedUpdateManyInput>;
    where?: Prisma.PagamentoWhereInput;
    limit?: number;
};
export type PagamentoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PagamentoSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PagamentoOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PagamentoUpdateManyMutationInput, Prisma.PagamentoUncheckedUpdateManyInput>;
    where?: Prisma.PagamentoWhereInput;
    limit?: number;
    include?: Prisma.PagamentoIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PagamentoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PagamentoSelect<ExtArgs> | null;
    omit?: Prisma.PagamentoOmit<ExtArgs> | null;
    include?: Prisma.PagamentoInclude<ExtArgs> | null;
    where: Prisma.PagamentoWhereUniqueInput;
    create: Prisma.XOR<Prisma.PagamentoCreateInput, Prisma.PagamentoUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PagamentoUpdateInput, Prisma.PagamentoUncheckedUpdateInput>;
};
export type PagamentoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PagamentoSelect<ExtArgs> | null;
    omit?: Prisma.PagamentoOmit<ExtArgs> | null;
    include?: Prisma.PagamentoInclude<ExtArgs> | null;
    where: Prisma.PagamentoWhereUniqueInput;
};
export type PagamentoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PagamentoWhereInput;
    limit?: number;
};
export type PagamentoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PagamentoSelect<ExtArgs> | null;
    omit?: Prisma.PagamentoOmit<ExtArgs> | null;
    include?: Prisma.PagamentoInclude<ExtArgs> | null;
};

import { PRGetTransactionRequestForViewDto } from "./PRGetTransactionRequestForViewDto";

export interface IPRGetAllMntMemberTransactionForViewDto {
    totalCount: number;
    items: PRGetTransactionRequestForViewDto[] | undefined;
}
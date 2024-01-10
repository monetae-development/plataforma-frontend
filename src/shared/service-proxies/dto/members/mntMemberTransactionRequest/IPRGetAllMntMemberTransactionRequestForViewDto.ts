import { GetMntMemberTransactionRequestForViewDto } from './GetMntMemberTransactionRequestForViewDto';

export interface IPRGetAllMntMemberTransactionRequestForViewDto {
    totalCount: number;
    items: GetMntMemberTransactionRequestForViewDto[] | undefined;
}

import { GetMntMemberBankAccountForViewDto } from './GetMntMemberBankAccountForViewDto';

export interface IPRGetMntMemberBankAccountForViewDto {
    totalCount: number;
    items: GetMntMemberBankAccountForViewDto[] | undefined;
}

import { CreateOrEditMntMemberBankAccountDto } from './CreateOrEditMntMemberBankAccountDto';

export interface IGetMntMemberBankAccountForEditOutput {
    mntMemberBankAccount: CreateOrEditMntMemberBankAccountDto;
    catCountryId: number;
}


import { MntMemberBankAccountDto } from '../mntMemberBankAccount/MntMemberBankAccountDto';
import { PlatformBankAccountForViewMemberDto } from '../../Platform/PlatformBankAccount/PlatformBankAccountForViewMemberDto';
import { UserInfoDto } from '../../Authorization/Users/UserInfoDto';
import { MntMemberFileDto } from '../mntMemberFile/MntMemberFileDto';
import { FiatType } from '@shared/service-proxies/enum/Members/FiatType.enum';
import { FiatStatus } from '@shared/service-proxies/enum/Members/FiatStatus.enum';
import { DateTime } from 'luxon';

export interface IMntMemberFiatFullDto {
    folio: string;
    mntMemberBankAccountId: number;
    mntMemberBankAccountFk: MntMemberBankAccountDto;
    platformBankAccountId: number;
    platformBankAccountFk: PlatformBankAccountForViewMemberDto;
    mntMemberFileId: number;
    mntMemberFileFk: MntMemberFileDto;
    userFk: UserInfoDto | undefined;
    type: FiatType;
    amount: number;
    reference: string;
    status: FiatStatus;
    creationTime: DateTime;
    creatorUserId: number;
    lastModificationTime: DateTime;
    id: number;
}

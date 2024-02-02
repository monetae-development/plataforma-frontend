import { IMntMemberFiatFullDto } from './IMntMemberFiatFullDto';
import { MntMemberBankAccountDto } from '../mntMemberBankAccount/MntMemberBankAccountDto';
import { PlatformBankAccountForViewMemberDto } from '../../Platform/PlatformBankAccount/PlatformBankAccountForViewMemberDto';
import { UserInfoDto } from '../../Authorization/Users/UserInfoDto';
import { MntMemberFileDto } from '../mntMemberFile/MntMemberFileDto';
import { FiatType } from '@shared/service-proxies/enum/Members/FiatType.enum';
import { FiatStatus } from '@shared/service-proxies/enum/Members/FiatStatus.enum';
import { DateTime } from 'luxon';

export class MntMemberFiatFullDto implements IMntMemberFiatFullDto {
    folio!: string;
    mntMemberBankAccountId!: number;
    mntMemberBankAccountFk!: MntMemberBankAccountDto;
    platformBankAccountId!: number;
    platformBankAccountFk!: PlatformBankAccountForViewMemberDto;
    userFk!: UserInfoDto;
    mntMemberFileId: number;
    mntMemberFileFk: MntMemberFileDto;
    type!: FiatType;
    amount!: number;
    reference!: string;
    status!: FiatStatus;
    creationTime!: DateTime;
    creatorUserId!: number;
    lastModificationTime!: DateTime;
    id!: number;

    constructor(data?: IMntMemberFiatFullDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): MntMemberFiatFullDto {
        data = typeof data === 'object' ? data : {};
        let result = new MntMemberFiatFullDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.folio = _data['folio'];
            this.mntMemberBankAccountId = _data['mntMemberBankAccountId'];
            let mntMemberBankAccountFk = _data['mntMemberBankAccountFk'];
            this.mntMemberBankAccountFk = mntMemberBankAccountFk ? MntMemberBankAccountDto.fromJS(mntMemberBankAccountFk) : new MntMemberBankAccountDto();
            this.platformBankAccountId = _data['platformBankAccountId'];
            let platformBankAccountFk = _data['platformBankAccountFk'];
            this.platformBankAccountFk = platformBankAccountFk ? PlatformBankAccountForViewMemberDto.fromJS(platformBankAccountFk) : new PlatformBankAccountForViewMemberDto();
            let userFk = _data['userFk'];
            this.userFk = userFk ? UserInfoDto.fromJS(userFk) : <any>undefined;
            this.mntMemberFileId = _data['fileId'];
            this.mntMemberFileFk = _data['mntMemberFileFk'];
            this.type = _data['type'];
            this.amount = _data['amount'];
            this.reference = _data['reference'];
            this.status = _data['status'];
            this.creationTime = _data['creationTime'] ? DateTime.fromISO(_data['creationTime'].toString()) : <any>undefined;
            this.lastModificationTime = _data['lastModificationTime'] ? DateTime.fromISO(_data['lastModificationTime'].toString()) : <any>undefined;
            this.creatorUserId = _data['creatorUserId'];
            this.id = _data['id'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['folio'] = this.folio;
        data['mntMemberBankAccountId'] = this.mntMemberBankAccountId;
        data['mntMemberBankAccountFk'] = this.mntMemberBankAccountFk;
        data['platformBankAccountId'] = this.platformBankAccountId;
        data['platformBankAccountFk'] = this.platformBankAccountFk;
        data['userFk'] = this.userFk;
        data['mntMemberFileId'] = this.mntMemberFileId;
        data['mntMemberFileFk'] = this.mntMemberFileFk;
        data['type'] = this.type;
        data['amount'] = this.amount;
        data['reference'] = this.reference;
        data['status'] = this.status;
        data['lastModificationTime'] = this.lastModificationTime ? this.lastModificationTime.toString() : <any>undefined;
        data['creationTime'] = this.creationTime ? this.creationTime.toString() : <any>undefined;
        data['creatorUserId'] = this.creatorUserId;
        data['id'] = this.id;
        return data;
    }
}

import { FiatType } from '@shared/service-proxies/enum/Members/FiatType.enum';
import { FiatStatus } from '@shared/service-proxies/enum/Members/FiatStatus.enum';
import { IMntMemberFiatRequestDto } from './IMntMemberFiatRequestDto';

export class MntMemberFiatRequestDto implements IMntMemberFiatRequestDto {
    folio!: string;
    mntMemberBankHolder!: string;
    mntMemberBankAccount!: string;
    platformBankAlias!: string;
    platformBankAccount!: string;
    amount!: number;
    reference!: string;
    fileName!: string;
    fileId!: number;
    creationTime!: string;
    type!: FiatType;
    status!: FiatStatus;

    constructor(data?: IMntMemberFiatRequestDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): MntMemberFiatRequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new MntMemberFiatRequestDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.folio = _data['folio'];
            this.mntMemberBankHolder = _data['mntMemberBankHolder'];
            this.mntMemberBankAccount = _data['mntMemberBankAccount'];
            this.platformBankAlias = _data['platformBankAlias'];
            this.platformBankAccount = _data['platformBankAccount'];
            this.amount = _data['amount'];
            this.reference = _data['reference'];
            this.fileName = _data['fileName'];
            this.fileId = _data['fileId'];
            this.creationTime = _data['creationTime'];
            this.type = _data['type'];
            this.status = _data['status'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['folio'] = this.folio;
        data['mntMemberBankHolder'] = this.mntMemberBankHolder;
        data['mntMemberBankAccount'] = this.mntMemberBankAccount;
        data['platformBankAlias'] = this.platformBankAlias;
        data['platformBankAccount'] = this.platformBankAccount;
        data['amount'] = this.amount;
        data['reference'] = this.reference;
        data['fileName'] = this.fileName;
        data['fileId'] = this.fileId;
        data['creationTime'] = this.creationTime ? this.creationTime.toString() : <any>undefined;
        data['type'] = this.type;
        data['status'] = this.status;
        return data;
    }
}


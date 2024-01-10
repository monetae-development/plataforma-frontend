import { IGetMntMemberTransactionRequestForViewDto } from './IGetMntMemberTransactionRequestForViewDto';
import { GetTransactionForRequestDto } from './GetTransactionForRequestDto';
import { GetVaultAssetForViewDto } from './GetVaultAssetForViewDto';
import { DateTime } from 'luxon';

export class GetMntMemberTransactionRequestForViewDto implements IGetMntMemberTransactionRequestForViewDto {
    id: number;
    folio: string;
    mntMemberId: number;
    userEmail: string;
    userFullName: string;
    authorize: boolean;
    coinName: string;
    blockchainNetworkName: string;
    transaction!: GetTransactionForRequestDto;
    vaultAssetOrigin!: GetVaultAssetForViewDto;
    creationTime: DateTime;
    lastModificationTime: DateTime;
    lastModifierUserId: number;
    creatorUserId: number;

    constructor(data?: IGetMntMemberTransactionRequestForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetMntMemberTransactionRequestForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetMntMemberTransactionRequestForViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data['id'];
            this.folio = _data['folio'];
            this.mntMemberId = _data['mntMemberId'];
            this.userEmail = _data['userEmail'];
            this.userFullName = _data['userFullName'];
            this.authorize = _data['authorize'];
            this.coinName = _data['coinName'];
            this.blockchainNetworkName = _data['blockchainNetworkName'];
            this.transaction = _data['transaction'] ? GetTransactionForRequestDto.fromJS(_data['transaction']) : <any>undefined;
            this.vaultAssetOrigin = _data['vaultAssetOrigin'] ? GetVaultAssetForViewDto.fromJS(_data['transaction']) : <any>undefined;
            this.creationTime = _data['creationTime'] ? DateTime.fromISO(_data['creationTime'].toString()) : <any>undefined;
            this.lastModificationTime = _data['lastModificationTime'] ? DateTime.fromISO(_data['lastModificationTime'].toString()) : <any>undefined;
            this.lastModifierUserId = _data['lastModifierUserId'];
            this.creatorUserId = _data['creatorUserId'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['id'] = this.id;
        data['folio'] = this.folio;
        data['mntMemberId'] = this.mntMemberId;
        data['userEmail'] = this.userEmail;
        data['userFullName'] = this.userFullName;
        data['authorize'] = this.authorize;
        data['coinName'] = this.coinName;
        data['blockchainNetworkName'] = this.blockchainNetworkName;
        data['transaction'] = this.transaction;
        data['vaultAssetOrigin'] = this.vaultAssetOrigin;
        data['creationTime'] = this.creationTime ? this.creationTime.toString() : <any>undefined;
        data['lastModificationTime'] = this.lastModificationTime ? this.lastModificationTime.toString() : <any>undefined;
        data['lastModifierUserId'] = this.lastModifierUserId;
        data['creatorUserId'] = this.creatorUserId;
        return data;
    }
}

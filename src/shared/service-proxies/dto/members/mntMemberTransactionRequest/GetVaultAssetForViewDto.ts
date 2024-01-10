import { IGetVaultAssetForViewDto } from './IGetVaultAssetForViewDto';

export class GetVaultAssetForViewDto implements IGetVaultAssetForViewDto {
    vaultId: number;
    vaultName: string;
    address: string;
    assetId: string;
    tag!: string;

    constructor(data?: IGetVaultAssetForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetVaultAssetForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetVaultAssetForViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.vaultId = _data['vaultId'];
            this.vaultName = _data['vaultName'];
            this.address = _data['address'];
            this.assetId = _data['assetId'];
            this.tag = _data['tag'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['vaultId'] = this.vaultId;
        data['vaultName'] = this.vaultName;
        data['address'] = this.address;
        data['assetId'] = this.assetId;
        data['tag'] = this.tag;
        return data;
    }
}

import { IGetAllVaultAssetsForQRMenuDto } from './IGetAllVaultAssetsForQRMenuDto';

export class GetAllVaultAssetsForQRMenuDto implements IGetAllVaultAssetsForQRMenuDto {
    id: number;
    label: string;
    name: string;
    address: string;

    constructor(data?: IGetAllVaultAssetsForQRMenuDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetAllVaultAssetsForQRMenuDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetAllVaultAssetsForQRMenuDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data['id'];
            this.label = _data['label'];
            this.name = _data['name'];
            this.address = _data['address'];

        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['id'] = this.id;
        data['label'] = this.label;
        data['name'] = this.name;
        data['address'] = this.address;
        return data;
    }
}

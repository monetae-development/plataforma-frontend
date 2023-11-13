import { IOTCTradingForViewDto } from './IOTCTradingForViewDto';
import { CryptoBehaviors } from '../../../enum/OTC/CryptoBehaviors.enum';

export class OTCTradingForViewDto implements IOTCTradingForViewDto {
    id!: number | undefined;
    name!: string | undefined;
    key!: string | undefined;
    salePrice!: number | undefined;
    purchasePrice!: number | undefined;
    change24h!: number | undefined;
    behavior!: CryptoBehaviors;

    constructor(data?: IOTCTradingForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): OTCTradingForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new OTCTradingForViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data['id'] ?? _data['Id'];
            this.name = _data['name'] ?? _data['Name'];
            this.key = _data['key'] ?? _data['Key'];
            this.salePrice = _data['salePrice'] ?? _data['SalePrice'];
            this.purchasePrice = _data['purchasePrice'] ?? _data['PurchasePrice'];
            this.change24h = _data['change24h'] ?? _data['Change24h'];
            this.behavior = _data['behavior'] ?? _data['Behavior'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['id'] = this.id;
        data['name'] = this.name;
        data['key'] = this.key;
        data['salePrice'] = this.salePrice;
        data['purchasePrice'] = this.purchasePrice;
        data['behavior'] = this.behavior;
        return data;
    }
}

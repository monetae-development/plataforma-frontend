import { ITradingCryptoCurrencyForSimpleViewDto } from './ITradingCryptoCurrencyForSimpleViewDto';
import { CryptoBehaviors } from "@shared/service-proxies/enum/Trading/CryptoBehaviors.enum";

export class TradingCryptoCurrencyForSimpleViewDto implements ITradingCryptoCurrencyForSimpleViewDto {
    id: number;
    name: string;
    key: string;
    salePrice: number;
    purchasePrice: number;
    change24h: number;
    behavior: CryptoBehaviors;

    constructor(data?: ITradingCryptoCurrencyForSimpleViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): TradingCryptoCurrencyForSimpleViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new TradingCryptoCurrencyForSimpleViewDto();
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
        data['change24h'] = this.change24h;
        data['behavior'] = this.behavior;
        return data;
    }
}

import { ITradingCryptoCurrencyForFullViewDto } from './ITradingCryptoCurrencyForFullViewDto';
import { CryptoBehaviors } from '@shared/service-proxies/enum/Trading/CryptoBehaviors.enum';

export class TradingCryptoCurrencyForFullViewDto implements ITradingCryptoCurrencyForFullViewDto {
    id: number;
    name: string;
    key: string;
    salePrice: number;
    purchasePrice: number;
    salePriceWithFee: number;
    purchasePriceWithFee: number;
    fee: number;
    change24h: number;
    behavior: CryptoBehaviors;

    constructor(data?: ITradingCryptoCurrencyForFullViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): TradingCryptoCurrencyForFullViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new TradingCryptoCurrencyForFullViewDto();
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
            this.salePriceWithFee = _data['salePriceWithFee'] ?? _data['SalePriceWithFee'];
            this.purchasePriceWithFee = _data['purchasePriceWithFee'] ?? _data['PurchasePriceWithFee'];
            this.fee = _data['fee'] ?? _data['Fee'];
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
        data['salePriceWithFee'] = this.salePriceWithFee;
        data['purchasePriceWithFee'] = this.purchasePriceWithFee;
        data['fee'] = this.fee;
        data['change24h'] = this.change24h;
        data['behavior'] = this.behavior;
        return data;
    }
}

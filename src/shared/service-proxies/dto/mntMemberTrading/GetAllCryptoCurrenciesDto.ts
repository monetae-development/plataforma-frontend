import { IGetAllCryptoCurrenciesDto } from './IGetAllCryptoCurrenciesDto';

export class GetAllCryptoCurrenciesDto implements IGetAllCryptoCurrenciesDto {
    label: string;
    subtitle: string;
    value: number;
    purchasePrice: number;
    salePrice: number;
    fee: number;
    percent24H: number;

    constructor(data?: IGetAllCryptoCurrenciesDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetAllCryptoCurrenciesDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetAllCryptoCurrenciesDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.label = _data['label'];
            this.subtitle = _data['subtitle'];
            this.value = _data['value'];
            this.purchasePrice = _data['purchasePrice'];
            this.salePrice = _data['salePrice'];
            this.fee = _data['fee'];
            this.percent24H = _data['percent24H'];
        }
    }

    toJSON(data?: any) {
        data['label'] = this.label;
        data['subtitle'] = this.subtitle;
        data['value'] = this.value;
        data['purchasePrice'] = this.purchasePrice;
        data['salePrice'] = this.salePrice;
        data['fee'] = this.fee;
        data['percent24H'] = this.percent24H;
        return data;
    }
}

import { IGetAllCryptoCurrenciesForSelectDto } from './IGetAllCryptoCurrenciesForSelectDto';
import { GetSelectDto } from '../Common/SelectInput/GetSelectDto';

export class GetAllCryptoCurrenciesForSelectDto implements IGetAllCryptoCurrenciesForSelectDto {
    label: string;
    subtitle: string;
    value: number;
    tradingCryptoCurrencyId: number;
    blockchainNetworks: GetSelectDto[];
    assetId: number;

    constructor(data?: IGetAllCryptoCurrenciesForSelectDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetAllCryptoCurrenciesForSelectDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetAllCryptoCurrenciesForSelectDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.label = _data['label'];
            this.subtitle = _data['subtitle'];
            this.value = _data['value'];
            this.tradingCryptoCurrencyId = _data['tradingCryptoCurrencyId'];
            this.assetId = _data['assetId'];
            if (Array.isArray(_data['blockchainNetworks'])) {
                this.blockchainNetworks = [] as any;
                for (let item of _data['blockchainNetworks']) {
                    this.blockchainNetworks?.push(GetSelectDto.fromJS(item));
                }
            }
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['label'] = this.label;
        data['subtitle'] = this.subtitle;
        data['value'] = this.value;
        data['tradingCryptoCurrencyId'] = this.tradingCryptoCurrencyId;
        data['assetId'] = this.assetId;
        if (Array.isArray(this.blockchainNetworks)) {
            data['blockchainNetworks'] = [];
            for (let item of this.blockchainNetworks) {
                data['blockchainNetworks'].push(item.toJSON());
            }
        }
        return data;
    }
}

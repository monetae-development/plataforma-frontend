import { CryptoCurrencyDto } from '../mntMemberTrading/CryptoCurrencyDto';
import { GetAllMemberTransactionRequestDto } from './GetAllMemberTransactionRequestDto';
import { IPRGetTransactionRequestForViewDto } from './IPRGetTransactionRequestForViewDto';

export class PRGetTransactionRequestForViewDto implements IPRGetTransactionRequestForViewDto {
    request!: GetAllMemberTransactionRequestDto | undefined;
    cryptoCurrency!: CryptoCurrencyDto | undefined;

    constructor(data?: IPRGetTransactionRequestForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): PRGetTransactionRequestForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new PRGetTransactionRequestForViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.request = _data['request'] ? GetAllMemberTransactionRequestDto.fromJS(_data['request']) : <any>undefined;
            this.cryptoCurrency = _data['cryptoCurrency'] ? CryptoCurrencyDto.fromJS(_data['cryptoCurrency']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['request'] = this.request ? this.request.toJSON() : <any>undefined;
        data['cryptoCurrency'] = this.cryptoCurrency ? this.cryptoCurrency.toJSON() : <any>undefined;
        return data;
    }
}

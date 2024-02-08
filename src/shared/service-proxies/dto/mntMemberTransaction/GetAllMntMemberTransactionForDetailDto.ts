import { IGetAllMntMemberTransactionForDetailDto } from './IGetAllMntMemberTransactionForDetailDto';
import { TradingCryptoCurrencyForMemberDto } from './TradingCryptoCurrencyForMemberDto';
import { TransactionRequestForMemberDetailDto } from './TransactionRequestForMemberDetailDto';

export class GetAllMntMemberTransactionForDetailDto implements IGetAllMntMemberTransactionForDetailDto {
    request!: TransactionRequestForMemberDetailDto | undefined;
    cryptoCurrency!: TradingCryptoCurrencyForMemberDto | undefined;

    constructor(data?: IGetAllMntMemberTransactionForDetailDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetAllMntMemberTransactionForDetailDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetAllMntMemberTransactionForDetailDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.request = _data['request'] ? TransactionRequestForMemberDetailDto.fromJS(_data['request']) : <any>undefined;
            this.cryptoCurrency = _data['cryptoCurrency'] ? TradingCryptoCurrencyForMemberDto.fromJS(_data['cryptoCurrency']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['request'] = this.request ? this.request.toJSON() : <any>undefined;
        data['cryptoCurrency'] = this.cryptoCurrency ? this.cryptoCurrency.toJSON() : <any>undefined;
        return data;
    }
}

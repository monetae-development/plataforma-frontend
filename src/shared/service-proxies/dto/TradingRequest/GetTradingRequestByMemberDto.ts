import { IGetTradingRequestByMemberDto } from './IGetTradingTradingByMemberDto';
import { TradingRequestForMemberDto } from './TradingRequestForMemberDto';
import { TradingCryptoCurrencyForMemberDto } from '../Trading/TradingCryptoCurrency/TradingCryptoCurrencyForMemberDto';

export class GetTradingRequestByMemberDto implements IGetTradingRequestByMemberDto {
    tradingRequest!: TradingRequestForMemberDto;
    tradingCryptoCurrencyFk!: TradingCryptoCurrencyForMemberDto;

    constructor(data?: IGetTradingRequestByMemberDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetTradingRequestByMemberDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetTradingRequestByMemberDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.tradingRequest = _data['tradingRequest'] ? TradingRequestForMemberDto.fromJS(_data['tradingRequest']) : <any>undefined;
            this.tradingCryptoCurrencyFk = _data['tradingCryptoCurrencyFk'] ? TradingCryptoCurrencyForMemberDto.fromJS(_data['tradingCryptoCurrencyFk']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['tradingRequest'] = this.tradingRequest ? this.tradingRequest.toJSON() : <any>undefined;
        data['tradingCryptoCurrencyFk'] = this.tradingCryptoCurrencyFk ? this.tradingCryptoCurrencyFk.toJSON() : <any>undefined;
        return data;
    }
}

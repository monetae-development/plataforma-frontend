import { CurrencyDto } from './CurrencyDto';
import { IGetMemberDetailRequestDto } from './IGetMemberDetailRequestDto';
import { MntMemberFiatDto } from './MntMemberFiatDto';
import { MntMemberFiatRequestDto } from './MntMemberFiatRequestDto';

export class GetMemberDetailRequestDto implements IGetMemberDetailRequestDto {
    request!: MntMemberFiatRequestDto;
    currency!: CurrencyDto;

    constructor(data?: IGetMemberDetailRequestDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetMemberDetailRequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetMemberDetailRequestDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.request = _data['request'] ? MntMemberFiatDto.fromJS(_data['request']) : <any>undefined;
            this.currency = _data['currency'] ? CurrencyDto.fromJS(_data['currency']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['request'] = this.request ? this.request.toJSON() : <any>undefined;
        data['currency'] = this.currency ? this.currency.toJSON() : <any>undefined;
        return data;
    }
}

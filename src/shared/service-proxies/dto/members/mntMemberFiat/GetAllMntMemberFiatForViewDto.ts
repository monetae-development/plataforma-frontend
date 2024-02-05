import { CurrencyDto } from './CurrencyDto';
import { IGetAllMntMemberFiatForViewDto } from './IGetAllMntMemberFiatForViewDto';
import { MntMemberFiatDto } from './MntMemberFiatDto';

export class GetAllMntMemberFiatForViewDto implements IGetAllMntMemberFiatForViewDto {
    request!: MntMemberFiatDto;
    currency!: CurrencyDto;

    constructor(data?: IGetAllMntMemberFiatForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetAllMntMemberFiatForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetAllMntMemberFiatForViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.request = _data['request'] ? MntMemberFiatDto.fromJS(_data['request']) : <any>undefined;
            this.currency = _data['currency'] ? MntMemberFiatDto.fromJS(_data['currency']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['request'] = this.request ? this.request.toJSON() : <any>undefined;
        data['currency'] = this.currency ? this.currency.toJSON() : <any>undefined;
        return data;
    }
}

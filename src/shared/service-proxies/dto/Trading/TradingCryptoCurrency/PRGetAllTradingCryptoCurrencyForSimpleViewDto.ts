import { IPRGetAllTradingCryptoCurrencyForSimpleViewDto } from './IPRGetAllTradingCryptoCurrencyForSimpleViewDto';
import { GetAllTradingCryptoCurrencyForSimpleViewDto } from './GetAllTradingCryptoCurrencyForSimpleViewDto';

export class PRGetAllTradingCryptoCurrencyForSimpleViewDto implements IPRGetAllTradingCryptoCurrencyForSimpleViewDto {
    totalCount: number;
    items: GetAllTradingCryptoCurrencyForSimpleViewDto[] | undefined;

    constructor(data?: IPRGetAllTradingCryptoCurrencyForSimpleViewDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.totalCount = _data["totalCount"] ?? _data["TotalCount"];
            let items = _data['items'] ?? _data['Items'];
            if (Array.isArray(items)) {
                this.items = [] as any;
                for (let item of items)
                    this.items!.push(GetAllTradingCryptoCurrencyForSimpleViewDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PRGetAllTradingCryptoCurrencyForSimpleViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new PRGetAllTradingCryptoCurrencyForSimpleViewDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["totalCount"] = this.totalCount;
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        return data;
    }

}

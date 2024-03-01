import { IPRGetAllTradingCryptoCurrencyForFullViewDto } from './IPRGetAllTradingCryptoCurrencyForFullViewDto';
import { GetAllTradingCryptoCurrencyForFullViewDto } from './GetAllTradingCryptoCurrencyForFullViewDto';

export class PRGetAllTradingCryptoCurrencyForFullViewDto implements IPRGetAllTradingCryptoCurrencyForFullViewDto {
    totalCount: number;
    items: GetAllTradingCryptoCurrencyForFullViewDto[] | undefined;

    constructor(data?: IPRGetAllTradingCryptoCurrencyForFullViewDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.totalCount = _data["totalCount"];
            if (Array.isArray(_data["items"])) {
                this.items = [] as any;
                for (let item of _data["items"])
                    this.items!.push(GetAllTradingCryptoCurrencyForFullViewDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PRGetAllTradingCryptoCurrencyForFullViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new PRGetAllTradingCryptoCurrencyForFullViewDto();
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

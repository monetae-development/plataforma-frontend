import { IPRGetAllTradingCryptoCurrencyForFullViewDto } from './IPRGetAllTradingCryptoCurrencyForFullViewDto';
import { GetAllTradingCryptoCurrencyForFullViewDto } from './GetAllTradingCryptoCurrencyForFullViewDto';

export class PRGetAllTradingCryptoCurrencyForFullViewDto implements IPRGetAllTradingCryptoCurrencyForFullViewDto {
    totalCount: number;
    items: GetAllTradingCryptoCurrencyForFullViewDto[] | undefined;

    constructor(data?: IPRGetAllTradingCryptoCurrencyForFullViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): PRGetAllTradingCryptoCurrencyForFullViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new PRGetAllTradingCryptoCurrencyForFullViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.totalCount = _data['totalCount'] ?? _data['TotalCount'];
            let items = _data['items'] ?? _data['Items'];
            if (Array.isArray(items)) {
                this.items = [] as any;
                for (let item of items) {
                    this.items?.push(GetAllTradingCryptoCurrencyForFullViewDto.fromJS(item));
                }
            }
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['totalCount'] = this.totalCount;
        if (Array.isArray(this.items)) {
            data['items'] = [];
            for (let item of this.items) {
                data['items'].push(item.toJSON());
            }
        }
        return data;
    }

}

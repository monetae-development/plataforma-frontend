import { IPRGetAllCryptoCurrenciesForSelectDto } from './IPRGetAllCryptoCurrenciesForSelectDto';
import { GetAllCryptoCurrenciesForSelectDto } from './GetAllCryptoCurrenciesForSelectDto';

export class PRGetAllCryptoCurrenciesForSelectDto implements IPRGetAllCryptoCurrenciesForSelectDto {
    totalCount: number;
    items: GetAllCryptoCurrenciesForSelectDto[] | undefined;

    constructor(data?: IPRGetAllCryptoCurrenciesForSelectDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): PRGetAllCryptoCurrenciesForSelectDto {
        data = typeof data === 'object' ? data : {};
        let result = new PRGetAllCryptoCurrenciesForSelectDto();
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
                    this.items?.push(GetAllCryptoCurrenciesForSelectDto.fromJS(item));
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

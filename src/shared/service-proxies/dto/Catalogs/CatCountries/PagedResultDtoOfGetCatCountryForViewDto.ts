import { IPagedResultDtoOfGetCatCountryForViewDto } from './IPagedResultDtoOfGetCatCountryForViewDto';
import { GetCatCountryForViewDto } from './GetCatCountryForViewDto';

export class PagedResultDtoOfGetCatCountryForViewDto implements IPagedResultDtoOfGetCatCountryForViewDto {
    totalCount!: number;
    items!: GetCatCountryForViewDto[] | undefined;

    constructor(data?: IPagedResultDtoOfGetCatCountryForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfGetCatCountryForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfGetCatCountryForViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.totalCount = _data['totalCount'];
            if (Array.isArray(_data['items'])) {
                this.items = [] as any;
                for (let item of _data['items']){
                    this.items?.push(GetCatCountryForViewDto.fromJS(item));
                }
            }
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['totalCount'] = this.totalCount;
        if (Array.isArray(this.items)) {
            data['items'] = [];
            for (let item of this.items){
                data['items'].push(item.toJSON());
            }
        }
        return data;
    }
}

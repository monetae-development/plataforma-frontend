import { IPagedResultDtoOfGetCatActivityEconomicCategoryForViewDto } from './IPagedResultDtoOfGetCatActivityEconomicCategoryForViewDto';
import { GetCatActivityEconomicCategoryForViewDto } from './GetCatActivityEconomicCategoryForViewDto';

export class PagedResultDtoOfGetCatActivityEconomicCategoryForViewDto implements IPagedResultDtoOfGetCatActivityEconomicCategoryForViewDto {
    totalCount!: number;
    items!: GetCatActivityEconomicCategoryForViewDto[] | undefined;

    constructor(data?: IPagedResultDtoOfGetCatActivityEconomicCategoryForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfGetCatActivityEconomicCategoryForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfGetCatActivityEconomicCategoryForViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.totalCount = _data['totalCount'];
            if (Array.isArray(_data['items'])) {
                this.items = [] as any;
                for (let item of _data['items']){
                    this.items?.push(GetCatActivityEconomicCategoryForViewDto.fromJS(item));
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

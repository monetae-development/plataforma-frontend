import { IPagedResultDtoOfGetAllOTCTradingForViewDto } from './IPagedResultDtoOfGetAllOTCTradingForViewDto';
import { GetOTCTradingForViewDto } from './GetOTCTradingForViewDto';

export class PagedResultDtoOfGetAllOTCTradingForViewDto implements IPagedResultDtoOfGetAllOTCTradingForViewDto {
    totalCount!: number;
    items!: GetOTCTradingForViewDto[] | undefined;

    constructor(data?: IPagedResultDtoOfGetAllOTCTradingForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfGetAllOTCTradingForViewDto{
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfGetAllOTCTradingForViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.totalCount = _data['totalCount'] ?? _data['TotalCount'];
            let items = _data['items'] ?? _data['Items'];
            if (Array.isArray( items )) {
                this.items = [] as any;
                for (let item of items){
                    this.items?.push(GetOTCTradingForViewDto.fromJS(item));
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

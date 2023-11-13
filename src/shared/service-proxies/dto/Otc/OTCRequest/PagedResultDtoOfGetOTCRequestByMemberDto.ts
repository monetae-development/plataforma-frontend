import { GetOTCRequestByMemberDto } from './GetOTCRequestByMemberDto';
import { IPagedResultDtoOfGetOTCRequestByMemberDto } from './IPagedResultDtoOfGetOTCRequestByMemberDto';

export class PagedResultDtoOfGetOTCRequestByMemberDto implements IPagedResultDtoOfGetOTCRequestByMemberDto {
    totalCount!: number;
    items!: GetOTCRequestByMemberDto[] | undefined;

    constructor(data?: IPagedResultDtoOfGetOTCRequestByMemberDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfGetOTCRequestByMemberDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfGetOTCRequestByMemberDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.totalCount = _data['totalCount'];
            if (Array.isArray(_data['items'])) {
                this.items = [] as any;
                for (let item of _data['items']) {
                    this.items?.push(GetOTCRequestByMemberDto.fromJS(item));
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

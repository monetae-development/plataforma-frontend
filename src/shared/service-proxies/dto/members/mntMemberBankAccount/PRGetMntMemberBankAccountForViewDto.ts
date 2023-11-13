import { IPRGetMntMemberBankAccountForViewDto } from './IPRGetMntMemberBankAccountForViewDto';
import { GetMntMemberBankAccountForViewDto } from './GetMntMemberBankAccountForViewDto';

export class PRGetMntMemberBankAccountForViewDto implements IPRGetMntMemberBankAccountForViewDto {
    totalCount!: number;
    items!: GetMntMemberBankAccountForViewDto[] | undefined;

    constructor(data?: IPRGetMntMemberBankAccountForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): PRGetMntMemberBankAccountForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new PRGetMntMemberBankAccountForViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.totalCount = _data['totalCount'];
            if (Array.isArray(_data['items'])) {
                this.items = [] as any;
                for (let item of _data['items']) {
                    this.items.push(GetMntMemberBankAccountForViewDto.fromJS(item));
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

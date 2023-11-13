import { IMntMemberForRequestDto } from './IMntMemberForRequestDto';

export class MntMemberForRequestDto implements IMntMemberForRequestDto {
    usserId!: number;
    id!: number;

    constructor(data?: IMntMemberForRequestDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): MntMemberForRequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new MntMemberForRequestDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.usserId = _data['userId'];
            this.id = _data['id'];
        }
    }

    toJSON(data?: any) {
        data['userId'] = this.usserId;
        data['id'] = this.id;
        return data;
    }
}

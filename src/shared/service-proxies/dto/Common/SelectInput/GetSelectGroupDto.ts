import { IGetSelectGroupDto } from './IGetSelectGroupDto';
import { IGetSelectDto } from './IGetSelectDto';

export class GetSelectGroupDto implements IGetSelectGroupDto {
    label!: string | undefined;
    value!: string | undefined;
    items: IGetSelectDto | undefined;

    constructor(data?: IGetSelectGroupDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetSelectGroupDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetSelectGroupDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.label = _data['label'];
            this.value = _data['value'];
            this.items = _data['items'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['label'] = this.label;
        data['value'] = this.value;
        data['items'] = this.items;
        return data;
    }
}

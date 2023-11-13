import { IGetSelectDto } from './IGetSelectDto';

export class GetSelectDto implements IGetSelectDto {
    label!: string | undefined;
    value!: string | undefined;
    subtitle!: string | undefined;

    constructor(data?: IGetSelectDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetSelectDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetSelectDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.label = _data['label'];
            this.value = _data['value'];
            this.subtitle = _data['subtitle'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['label'] = this.label;
        data['value'] = this.value;
        data['subtitle'] = this.subtitle;
        return data;
    }
}

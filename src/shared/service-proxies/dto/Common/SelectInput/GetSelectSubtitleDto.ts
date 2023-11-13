import { IGetSelectSubtitleDto } from './IGetSelectSubtitleDto';

export class GetSelectSubtitleDto implements IGetSelectSubtitleDto {
    label!: string | undefined;
    subtitle!: string | undefined;
    value!: string | undefined;

    constructor(data?: IGetSelectSubtitleDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetSelectSubtitleDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetSelectSubtitleDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.label = _data['label'];
            this.subtitle = _data['subtitle'];
            this.value = _data['value'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['label'] = this.label;
        data['subtitle'] = this.subtitle;
        data['value'] = this.value;
        return data;
    }
}

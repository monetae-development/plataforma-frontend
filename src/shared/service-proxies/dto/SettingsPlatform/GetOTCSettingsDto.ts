import { IGetOTCSettingsDto } from './IGetOTCSettingsDto';
import { OTCSettingsDto } from './OTCSettingsDto';

export class GetOTCSettingsDto implements IGetOTCSettingsDto {
    otcSettings!: OTCSettingsDto;

    constructor(data?: IGetOTCSettingsDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetOTCSettingsDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetOTCSettingsDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            let item = _data['otcSettings'] ?? _data['otcSettings'];
            this.otcSettings = item ? OTCSettingsDto.fromJS(item) : <any>undefined;
        }
    }
}

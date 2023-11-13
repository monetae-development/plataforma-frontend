import { IGetCatIdentityTypeForViewDto } from './IGetCatIdentityTypeForViewDto';
import { CatIdentityTypeDto } from './CatIdentityTypeDto';

export class GetCatIdentityTypeForViewDto implements IGetCatIdentityTypeForViewDto {
    catIdentityType!: CatIdentityTypeDto;

    constructor(data?: IGetCatIdentityTypeForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetCatIdentityTypeForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetCatIdentityTypeForViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.catIdentityType = _data['catIdentityType'] ? CatIdentityTypeDto.fromJS(_data['catIdentityType']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['catIdentityType'] = this.catIdentityType ? this.catIdentityType.toJSON() : <any>undefined;
        return data;
    }
}

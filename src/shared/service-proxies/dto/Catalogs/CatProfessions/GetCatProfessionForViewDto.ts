import { IGetCatProfessionForViewDto } from './IGetCatProfessionForViewDto';
import { CatProfessionDto } from './CatProfessionDto';

export class GetCatProfessionForViewDto implements IGetCatProfessionForViewDto {
    catProfession!: CatProfessionDto;

    constructor(data?: IGetCatProfessionForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetCatProfessionForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetCatProfessionForViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.catProfession = _data['catProfession'] ? CatProfessionDto.fromJS(_data['catProfession']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['catProfession'] = this.catProfession ? this.catProfession.toJSON() : <any>undefined;
        return data;
    }
}

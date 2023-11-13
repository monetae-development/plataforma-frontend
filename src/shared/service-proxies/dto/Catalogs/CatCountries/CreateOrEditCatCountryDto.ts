import { ICreateOrEditCatCountryDto } from './ICreateOrEditCatCountryDto';

export class CreateOrEditCatCountryDto implements ICreateOrEditCatCountryDto {
    title!: string;
    order!: number | undefined;
    publish!: boolean;
    restricted!: boolean;
    id!: number | undefined;

    constructor(data?: ICreateOrEditCatCountryDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): CreateOrEditCatCountryDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateOrEditCatCountryDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.title = _data['title'];
            this.order = _data['order'];
            this.publish = _data['publish'];
            this.restricted = _data['restricted'];
            this.id = _data['id'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['title'] = this.title;
        data['order'] = this.order;
        data['publish'] = this.publish;
        data['restricted'] = this.restricted;
        data['id'] = this.id;
        return data;
    }
}

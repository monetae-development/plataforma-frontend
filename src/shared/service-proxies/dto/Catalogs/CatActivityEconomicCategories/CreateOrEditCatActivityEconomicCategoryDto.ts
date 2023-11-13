import { ICreateOrEditCatActivityEconomicCategoryDto } from './ICreateOrEditCatActivityEconomicCategoryDto';

export class CreateOrEditCatActivityEconomicCategoryDto implements ICreateOrEditCatActivityEconomicCategoryDto {
    title!: string;
    publish!: boolean;
    id!: number | undefined;

    constructor(data?: ICreateOrEditCatActivityEconomicCategoryDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): CreateOrEditCatActivityEconomicCategoryDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateOrEditCatActivityEconomicCategoryDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.title = _data['title'];
            this.publish = _data['publish'];
            this.id = _data['id'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['title'] = this.title;
        data['publish'] = this.publish;
        data['id'] = this.id;
        return data;
    }
}

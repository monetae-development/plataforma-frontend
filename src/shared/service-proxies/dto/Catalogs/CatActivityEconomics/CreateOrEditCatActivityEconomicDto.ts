import { ICreateOrEditCatActivityEconomicDto } from './ICreateOrEditCatActivityEconomicDto';

export class CreateOrEditCatActivityEconomicDto implements ICreateOrEditCatActivityEconomicDto {
    title!: string;
    publish!: boolean;
    catActivityEconomicCategoryId!: number;
    id!: number | undefined;

    constructor(data?: ICreateOrEditCatActivityEconomicDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): CreateOrEditCatActivityEconomicDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateOrEditCatActivityEconomicDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.title = _data['title'];
            this.publish = _data['publish'];
            this.catActivityEconomicCategoryId = _data['catActivityEconomicCategoryId'];
            this.id = _data['id'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['title'] = this.title;
        data['publish'] = this.publish;
        data['catActivityEconomicCategoryId'] = this.catActivityEconomicCategoryId;
        data['id'] = this.id;
        return data;
    }
}

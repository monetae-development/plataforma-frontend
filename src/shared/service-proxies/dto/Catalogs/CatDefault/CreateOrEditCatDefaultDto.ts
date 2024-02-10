import { ICreateOrEditCatDefaultDto } from './ICreateOrEditCatDefaultDto';

export class CreateOrEditCatDefaultDto implements ICreateOrEditCatDefaultDto {
    id!: number | undefined;
    title!: string;
    publish!: boolean;

    constructor(data?: ICreateOrEditCatDefaultDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): CreateOrEditCatDefaultDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateOrEditCatDefaultDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data['id'];
            this.title = _data['title'];
            this.publish = _data['publish'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['id'] = this.id;
        data['title'] = this.title;
        data['publish'] = this.publish;
        return data;
    }
}

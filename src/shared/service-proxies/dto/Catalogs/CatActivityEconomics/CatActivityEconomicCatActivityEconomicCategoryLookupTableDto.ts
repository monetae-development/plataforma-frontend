import { ICatActivityEconomicCatActivityEconomicCategoryLookupTableDto } from './ICatActivityEconomicCatActivityEconomicCategoryLookupTableDto';

export class CatActivityEconomicCatActivityEconomicCategoryLookupTableDto implements ICatActivityEconomicCatActivityEconomicCategoryLookupTableDto {
    id!: number;
    displayName!: string | undefined;

    constructor(data?: ICatActivityEconomicCatActivityEconomicCategoryLookupTableDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): CatActivityEconomicCatActivityEconomicCategoryLookupTableDto {
        data = typeof data === 'object' ? data : {};
        let result = new CatActivityEconomicCatActivityEconomicCategoryLookupTableDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data['id'];
            this.displayName = _data['displayName'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['id'] = this.id;
        data['displayName'] = this.displayName;
        return data;
    }
}

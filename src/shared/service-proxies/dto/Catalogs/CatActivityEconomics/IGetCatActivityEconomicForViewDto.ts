import { CatActivityEconomicDto } from './CatActivityEconomicDto';

export interface IGetCatActivityEconomicForViewDto {
    catActivityEconomic: CatActivityEconomicDto;
    catActivityEconomicCategoryTitle: string | undefined;
}

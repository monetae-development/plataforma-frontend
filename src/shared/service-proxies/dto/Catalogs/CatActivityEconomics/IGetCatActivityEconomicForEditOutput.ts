import { CreateOrEditCatActivityEconomicDto } from './CreateOrEditCatActivityEconomicDto';

export interface IGetCatActivityEconomicForEditOutput {
    catActivityEconomic: CreateOrEditCatActivityEconomicDto;
    catActivityEconomicCategoryTitle: string | undefined;
}

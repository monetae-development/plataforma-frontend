import { CreateOrEditCatStateDto } from './CreateOrEditCatStateDto';

export interface IGetCatStateForEditOutput {
    catState: CreateOrEditCatStateDto;
    catCountryTitle: string | undefined;
}

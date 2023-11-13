import { CatStateDto } from './CatStateDto';

export interface IGetCatStateForViewDto {
    catState: CatStateDto;
    catCountryTitle: string | undefined;
}

export interface ICreateOrEditCatCountryDto {
    title: string;
    order: number | undefined;
    publish: boolean;
    restricted: boolean;
    id: number | undefined;
}

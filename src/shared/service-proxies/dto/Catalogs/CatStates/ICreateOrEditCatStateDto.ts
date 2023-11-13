export interface ICreateOrEditCatStateDto {
    title: string;
    order: number | undefined;
    publish: boolean;
    catCountryId: number;
    id: number | undefined;
}

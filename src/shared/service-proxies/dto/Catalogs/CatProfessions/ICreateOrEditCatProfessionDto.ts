export interface ICreateOrEditCatProfessionDto {
    title: string;
    risk: number | undefined;
    order: number | undefined;
    publish: boolean;
    id: number | undefined;
}

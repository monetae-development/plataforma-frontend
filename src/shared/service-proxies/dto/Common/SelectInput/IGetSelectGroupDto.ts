import { IGetSelectDto } from './IGetSelectDto';

export interface IGetSelectGroupDto {
    label: string | undefined;
    value: string | undefined;
    items: IGetSelectDto | undefined;
}

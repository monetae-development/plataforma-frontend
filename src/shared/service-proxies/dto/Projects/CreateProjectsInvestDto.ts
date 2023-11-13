import { ICreateProjectsInvestDto } from './ICreateProjectsInvestDto';

export class CreateProjectsInvestDto implements ICreateProjectsInvestDto {
    amount!: number;
    totalAmount!: number;
    currency!: number;
    tokens: number;
}

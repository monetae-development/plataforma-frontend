export interface ICompanyInfoDto {
    id: number | undefined;
    legalName: string;
    commercialName: string;
    nit: string;
    fiscalNoId: string;
    fiscalConstitutionCountryId: number;
    fiscalConstitutionDate: Date;
    phone1CodeId: number;
    phone1: number;
    phone2CodeId: number;
    phone2: number;
    webpage: string | undefined;
    publicRegisterInscriptionNumber: string;
    catEconomicActivityId: number;
    catCompanySectorId: number;
    countryWhereItHasBranchesId: number;
    noOfBranches: number;
    quantityEmployes: number;
}

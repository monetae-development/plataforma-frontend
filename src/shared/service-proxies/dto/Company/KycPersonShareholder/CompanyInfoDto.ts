import { ICompanyInfoDto } from './ICompanyInfoDto';

export class CompanyInfoDto implements ICompanyInfoDto {
    id!: number | undefined;
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
    webpage!: string | undefined;
    publicRegisterInscriptionNumber: string;
    catEconomicActivityId: number;
    catCompanySectorId: number;
    countryWhereItHasBranchesId: number;
    noOfBranches: number;
    quantityEmployes: number;

    constructor(data?: ICompanyInfoDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): CompanyInfoDto {
        data = typeof data === 'object' ? data : {};
        let result = new CompanyInfoDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data['id'];
            this.legalName = _data['legalName'];
            this.commercialName = _data['commercialName'];
            this.nit = _data['nit'];
            this.fiscalNoId = _data['fiscalNoId'];
            this.fiscalConstitutionCountryId = _data['fiscalConstitutionCountryId'];
            this.fiscalConstitutionDate = _data['fiscalConstitutionDate'];
            this.phone1CodeId = _data['phone1CodeId'];
            this.phone1 = _data['phone1'];
            this.phone2CodeId = _data['phone2CodeId'];
            this.phone2 = _data['phone2'];
            this.webpage = _data['webpage'];
            this.publicRegisterInscriptionNumber = _data['publicRegisterInscriptionNumber'];
            this.catEconomicActivityId = _data['catEconomicActivityId'];
            this.catCompanySectorId = _data['catCompanySectorId'];
            this.countryWhereItHasBranchesId = _data['countryWhereItHasBranchesId'];
            this.noOfBranches = _data['noOfBranches'];
            this.quantityEmployes = _data['quantityEmployes'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['id'] = this.id;
        data['legalName'] = this.legalName;
        data['commercialName'] = this.commercialName;
        data['nit'] = this.nit;
        data['fiscalNoId'] = this.fiscalNoId;
        data['fiscalConstitutionCountryId'] = this.fiscalConstitutionCountryId;
        data['fiscalConstitutionDate'] = this.fiscalConstitutionDate;
        data['phone1CodeId'] = this.phone1CodeId;
        data['phone1'] = this.phone1;
        data['phone2CodeId'] = this.phone2CodeId;
        data['phone2'] = this.phone2;
        data['webpage'] = this.webpage;
        data['publicRegisterInscriptionNumber'] = this.publicRegisterInscriptionNumber;
        data['catEconomicActivityId'] = this.catEconomicActivityId;
        data['catCompanySectorId'] = this.catCompanySectorId;
        data['countryWhereItHasBranchesId'] = this.countryWhereItHasBranchesId;
        data['noOfBranches'] = this.noOfBranches;
        data['quantityEmployes'] = this.quantityEmployes;
        return data;
    }
}

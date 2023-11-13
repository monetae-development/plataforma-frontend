import { DateTime } from 'luxon';

export class MemberDto {
    id: number | undefined;
    name: string | undefined;
    surname: string | undefined;
    phone: string | undefined;
    nationalityId: number | undefined;
    dayOfBirth: DateTime | undefined;
    countryId: number | undefined;
    stateId: number | undefined;
    city: string | undefined;
    addrStreet: string | undefined;
    addrExteriorNo: string | undefined;
    addrInteriorNo: string | undefined;
    addrZipCode: string | undefined;
    addrCountryId: number | undefined;
    addrStateId: number | undefined;
    addrCity: string | undefined;
    identityId: number | undefined;
    identityNo: string | undefined;
    identityExpiration: DateTime | undefined;
    professionId: number | undefined;
    income: number | undefined;
    sourceFoundId: number | undefined;
    transactions: number | undefined;
}

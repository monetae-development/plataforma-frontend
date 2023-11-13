import { FiatStatus } from '@shared/service-proxies/enum/Members/FiatStatus.enum';

export interface IUpdateMntMemberFiatRequestStatusInput {
    id: number;
    status: FiatStatus;
}

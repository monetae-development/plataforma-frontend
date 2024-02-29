import { OperationRequestType } from '@shared/service-proxies/enum/Common/OperationRequestType.enum';
import { OperationRequestSubType } from '@shared/service-proxies/enum/Common/OperationRequestSubType.enum';

export interface ICreateOrEditMntMemberRequestLogDto {
    id: number | undefined;
    comment: string | undefined;
    type: OperationRequestType | undefined;
    subtype: OperationRequestSubType | undefined;
    isSendUserEmail: boolean;
}

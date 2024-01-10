import { GetTransactionForRequestDto } from './GetTransactionForRequestDto';
import { GetVaultAssetForViewDto } from './GetVaultAssetForViewDto';
import { DateTime } from 'luxon';

export interface IGetMntMemberTransactionRequestForViewDto {
    id: number;
    folio: string;
    mntMemberId: number;
    userEmail: string;
    userFullName: string;
    authorize: boolean;
    coinName: string;
    blockchainNetworkName: string;
    transaction: GetTransactionForRequestDto;
    vaultAssetOrigin: GetVaultAssetForViewDto;
    creationTime: DateTime;
    lastModificationTime: DateTime;
    lastModifierUserId: number;
    creatorUserId: number;
}

export interface IGetMntMemberStatus {
    completed: boolean;
    approved: boolean;
    refused: boolean;
    status: number;
    feedback: string | undefined;
}

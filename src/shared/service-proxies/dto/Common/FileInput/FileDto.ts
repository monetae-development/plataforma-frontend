/* eslint-disable @typescript-eslint/member-ordering */
import { IFileDto } from './IFileDto';

export class FileDto implements IFileDto{
    fileName!: string;
    fileType!: string | undefined;
    fileToken!: string;

    static fromJS(data: any): FileDto {
        data = typeof data === 'object' ? data : {};
        let result = new FileDto();
        result.init(data);
        return result;
    }

    constructor(data?: IFileDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.fileName = _data['fileName'];
            this.fileType = _data['fileType'];
            this.fileToken = _data['fileToken'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['fileName'] = this.fileName;
        data['fileType'] = this.fileType;
        data['fileToken'] = this.fileToken;
        return data;
    }
}

import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';

export class ApiException extends Error {

    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any };
    result: any;
    protected isApiException = true;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

export class Helpers {
    static throwException(message: string, status: number, response: string, headers: { [key: string]: any }, result?: any): Observable<any> {
        if (result !== null && result !== undefined){
            return _observableThrow(result) as any;
        }else{
            return _observableThrow(new ApiException(message, status, response, headers, null)) as any;
        }
    }
    static blobToText(blob: any): Observable<string> {
        return new Observable<string>((observer: any) => {
            if (!blob) {
                observer.next('');
                observer.complete();
            } else {
                let reader = new FileReader();
                reader.onload = event => {
                    observer.next((<any>event.target).result);
                    observer.complete();
                };
                reader.readAsText(blob);
            }
        });
    }
}

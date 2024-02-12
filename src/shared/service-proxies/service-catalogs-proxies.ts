/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/member-ordering */
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Helpers } from './service-helpers';
import { PRDtoGetCatDefaultForViewDto } from './dto/Catalogs/CatDefault/PRDtoGetCatDefaultForViewDto';
import { GetCatDefaultForViewDto } from './dto/Catalogs/CatDefault/GetCatDefaultForViewDto';
import { CreateOrEditCatDefaultDto } from './dto/Catalogs/CatDefault/CreateOrEditCatDefaultDto';
import { GetCatDefaultForEditOutput } from './dto/Catalogs/CatDefault/GetCatDefaultForEditOutput';
import { CreateOrEditCatNationalityDto } from './dto/Catalogs/CatNationalities/CreateOrEditCatNationalityDto';
import { PagedResultDtoOfGetCatNationalityForViewDto } from './dto/Catalogs/CatNationalities/PagedResultDtoOfGetCatNationalityForViewDto';
import { GetCatNationalityForViewDto } from './dto/Catalogs/CatNationalities/GetCatNationalityForViewDto';
import { GetCatNationalityForEditOutput } from './dto/Catalogs/CatNationalities/GetCatNationalityForEditOutput';
import { PagedResultDtoOfGetCatCountryForViewDto } from './dto/Catalogs/CatCountries/PagedResultDtoOfGetCatCountryForViewDto';
import { GetCatCountryForViewDto } from './dto/Catalogs/CatCountries/GetCatCountryForViewDto';
import { GetCatCountryForEditOutput } from './dto/Catalogs/CatCountries/GetCatCountryForEditOutput';
import { CreateOrEditCatCountryDto } from './dto/Catalogs/CatCountries/CreateOrEditCatCountryDto';
import { PagedResultDtoOfGetCatStateForViewDto } from './dto/Catalogs/CatStates/PagedResultDtoOfGetCatStateForViewDto';
import { GetCatStateForViewDto } from './dto/Catalogs/CatStates/GetCatStateForViewDto';
import { CreateOrEditCatStateDto } from './dto/Catalogs/CatStates/CreateOrEditCatStateDto';
import { GetCatStateForEditOutput } from './dto/Catalogs/CatStates/GetCatStateForEditOutput';
import { CatStateCatCountryLookupTableDto } from './dto/Catalogs/CatStates/CatStateCatCountryLookupTableDto';
import { PagedResultDtoOfGetCatIdentityTypeForViewDto } from './dto/Catalogs/CatIdentityType/PagedResultDtoOfGetCatIdentityTypeForViewDto';
import { GetCatIdentityTypeForViewDto } from './dto/Catalogs/CatIdentityType/GetCatIdentityTypeForViewDto';
import { GetCatIdentityTypeForEditOutput } from './dto/Catalogs/CatIdentityType/GetCatIdentityTypeForEditOutput';
import { CreateOrEditCatIdentityTypeDto } from './dto/Catalogs/CatIdentityType/CreateOrEditCatIdentityTypeDto';
import { PagedResultDtoOfGetCatProfessionForViewDto } from './dto/Catalogs/CatProfessions/PagedResultDtoOfGetCatProfessionForViewDto';
import { GetCatProfessionForViewDto } from './dto/Catalogs/CatProfessions/GetCatProfessionForViewDto';
import { GetCatProfessionForEditOutput } from './dto/Catalogs/CatProfessions/GetCatProfessionForEditOutput';
import { CreateOrEditCatProfessionDto } from './dto/Catalogs/CatProfessions/CreateOrEditCatProfessionDto';
import { PagedResultDtoOfGetCatActivityEconomicCategoryForViewDto } from './dto/Catalogs/CatActivityEconomicCategories/PagedResultDtoOfGetCatActivityEconomicCategoryForViewDto';
import { GetCatActivityEconomicCategoryForViewDto } from './dto/Catalogs/CatActivityEconomicCategories/GetCatActivityEconomicCategoryForViewDto';
import { GetCatActivityEconomicCategoryForEditOutput } from './dto/Catalogs/CatActivityEconomicCategories/GetCatActivityEconomicCategoryForEditOutput';
import { CreateOrEditCatActivityEconomicCategoryDto } from './dto/Catalogs/CatActivityEconomicCategories/CreateOrEditCatActivityEconomicCategoryDto';
import { PagedResultDtoOfGetCatActivityEconomicForViewDto } from './dto/Catalogs/CatActivityEconomics/PagedResultDtoOfGetCatActivityEconomicForViewDto';
import { GetCatActivityEconomicForViewDto } from './dto/Catalogs/CatActivityEconomics/GetCatActivityEconomicForViewDto';
import { GetCatActivityEconomicForEditOutput } from './dto/Catalogs/CatActivityEconomics/GetCatActivityEconomicForEditOutput';
import { CreateOrEditCatActivityEconomicDto } from './dto/Catalogs/CatActivityEconomics/CreateOrEditCatActivityEconomicDto';
import { PagedResultDtoOfCatActivityEconomicCatActivityEconomicCategoryLookupTableDto } from './dto/Catalogs/CatActivityEconomics/PagedResultDtoOfCatActivityEconomicCatActivityEconomicCategoryLookupTableDto';
import { PagedResultDtoOfGetCatSourceFoundsForViewDto } from './dto/Catalogs/CatSourceFoundses/PagedResultDtoOfGetCatSourceFoundsForViewDto';
import { GetCatSourceFoundsForViewDto } from './dto/Catalogs/CatSourceFoundses/GetCatSourceFoundsForViewDto';
import { GetCatSourceFoundsForEditOutput } from './dto/Catalogs/CatSourceFoundses/GetCatSourceFoundsForEditOutput';
import { CreateOrEditCatSourceFoundsDto } from './dto/Catalogs/CatSourceFoundses/CreateOrEditCatSourceFoundsDto';
import { FileDto } from './dto/Common/FileInput/FileDto';
import { DateTime, Duration } from 'luxon';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class CatDefaultServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
    }

    /**
     * @param filter (optional)
     * @param titleFilter (optional)
     * @param publishFilter (optional)
     * @param sorting (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    getAll(catalog: string | undefined, filter: string | undefined, titleFilter: string | undefined, publishFilter: number | undefined, sorting: string | undefined, skipCount: number | undefined, maxResultCount: number | undefined): Observable<PRDtoGetCatDefaultForViewDto> {
        let url_ = this.baseUrl + '/api/services/app/' + catalog + '/GetAll?';
        url_ += 'Filter=' + encodeURIComponent('' + ((filter === null || filter === undefined) ? '' : filter)) + '&';
        url_ += 'TitleFilter=' + encodeURIComponent('' + ((titleFilter === null || titleFilter === undefined) ? '' : titleFilter)) + '&';
        url_ += 'PublishFilter=' + encodeURIComponent('' + ((publishFilter === null || publishFilter === undefined) ? '' : publishFilter)) + '&';
        url_ += 'Sorting=' + encodeURIComponent('' + ((sorting === null || sorting === undefined) ? '' : sorting)) + '&';
        url_ += 'SkipCount=' + encodeURIComponent('' + ((skipCount === null || skipCount === undefined) ? '' : skipCount)) + '&';
        url_ += 'MaxResultCount=' + encodeURIComponent('' + ((maxResultCount === null || maxResultCount === undefined) ? '' : maxResultCount)) + '&';
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => this.processGetAll(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAll(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<PRDtoGetCatDefaultForViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<PRDtoGetCatDefaultForViewDto>;
            }
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PRDtoGetCatDefaultForViewDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PRDtoGetCatDefaultForViewDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    getForView(catalog: string | undefined, id: number | undefined): Observable<GetCatDefaultForViewDto> {
        let url_ = this.baseUrl + '/api/services/app/' + catalog + '/GetForView?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetForView(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetForView(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetCatDefaultForViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<GetCatDefaultForViewDto>;
            }
        }));
    }

    protected processGetForView(response: HttpResponseBase): Observable<GetCatDefaultForViewDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = GetCatDefaultForViewDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    getForEdit(catalog: string | undefined, id: number | undefined): Observable<GetCatDefaultForEditOutput> {
        let url_ = this.baseUrl + '/api/services/app/' + catalog + '/GetForEdit?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'Id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetForEdit(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetForEdit(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetCatDefaultForEditOutput>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<GetCatDefaultForEditOutput>;
            }
        }));
    }

    protected processGetForEdit(response: HttpResponseBase): Observable<GetCatDefaultForEditOutput> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = GetCatDefaultForEditOutput.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param body (optional)
     * @return Success
     */
    createOrEdit(catalog: string | undefined, body: CreateOrEditCatDefaultDto | undefined): Observable<void> {
        let url_ = this.baseUrl + '/api/services/app/' + catalog + '/CreateOrEdit';
        url_ = url_.replace(/[?&]$/, '');

        const content_ = JSON.stringify(body);

        let options_: any = {
            body: content_,
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Content-Type': 'application/json-patch+json',
            })
        };

        return this.http.request('post', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processCreateOrEdit(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateOrEdit(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<void>;
            }
        }));
    }

    protected processCreateOrEdit(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return _observableOf(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    delete(catalog: string | undefined, id: number | undefined): Observable<void> {
        let url_ = this.baseUrl + '/api/services/app/' + catalog + '/Delete?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'Id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
            })
        };

        return this.http.request('delete', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processDelete(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDelete(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<void>;
            }
        }));
    }

    protected processDelete(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return _observableOf(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }
}


@Injectable()
export class CatNationalitiesServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
    }

    /**
     * @param filter (optional)
     * @param titleFilter (optional)
     * @param publishFilter (optional)
     * @param sorting (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    getAll(filter: string | undefined, titleFilter: string | undefined, publishFilter: number | undefined, sorting: string | undefined, skipCount: number | undefined, maxResultCount: number | undefined): Observable<PagedResultDtoOfGetCatNationalityForViewDto> {
        let url_ = this.baseUrl + '/api/services/app/CatNationalities/GetAll?';
        if (filter === null) {
            throw new Error('The parameter \'filter\' cannot be null.');
        } else if (filter !== undefined) {
            url_ += 'Filter=' + encodeURIComponent('' + filter) + '&';
        }
        if (titleFilter === null) {
            throw new Error('The parameter \'titleFilter\' cannot be null.');
        } else if (titleFilter !== undefined) {
            url_ += 'TitleFilter=' + encodeURIComponent('' + titleFilter) + '&';
        }
        if (publishFilter === null) {
            throw new Error('The parameter \'publishFilter\' cannot be null.');
        } else if (publishFilter !== undefined) {
            url_ += 'PublishFilter=' + encodeURIComponent('' + publishFilter) + '&';
        }
        if (sorting === null) {
            throw new Error('The parameter \'sorting\' cannot be null.');
        } else if (sorting !== undefined) {
            url_ += 'Sorting=' + encodeURIComponent('' + sorting) + '&';
        }
        if (skipCount === null) {
            throw new Error('The parameter \'skipCount\' cannot be null.');
        } else if (skipCount !== undefined) {
            url_ += 'SkipCount=' + encodeURIComponent('' + skipCount) + '&';
        }
        if (maxResultCount === null) {
            throw new Error('The parameter \'maxResultCount\' cannot be null.');
        } else if (maxResultCount !== undefined) {
            url_ += 'MaxResultCount=' + encodeURIComponent('' + maxResultCount) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => this.processGetAll(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAll(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<PagedResultDtoOfGetCatNationalityForViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<PagedResultDtoOfGetCatNationalityForViewDto>;
            }
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfGetCatNationalityForViewDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfGetCatNationalityForViewDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    getCatNationalityForView(id: number | undefined): Observable<GetCatNationalityForViewDto> {
        let url_ = this.baseUrl + '/api/services/app/CatNationalities/GetCatNationalityForView?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetCatNationalityForView(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCatNationalityForView(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetCatNationalityForViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<GetCatNationalityForViewDto>;
            }
        }));
    }

    protected processGetCatNationalityForView(response: HttpResponseBase): Observable<GetCatNationalityForViewDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = GetCatNationalityForViewDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    getCatNationalityForEdit(id: number | undefined): Observable<GetCatNationalityForEditOutput> {
        let url_ = this.baseUrl + '/api/services/app/CatNationalities/GetCatNationalityForEdit?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'Id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetCatNationalityForEdit(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCatNationalityForEdit(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetCatNationalityForEditOutput>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<GetCatNationalityForEditOutput>;
            }
        }));
    }

    protected processGetCatNationalityForEdit(response: HttpResponseBase): Observable<GetCatNationalityForEditOutput> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = GetCatNationalityForEditOutput.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param body (optional)
     * @return Success
     */
    createOrEdit(body: CreateOrEditCatNationalityDto | undefined): Observable<void> {
        let url_ = this.baseUrl + '/api/services/app/CatNationalities/CreateOrEdit';
        url_ = url_.replace(/[?&]$/, '');

        const content_ = JSON.stringify(body);

        let options_: any = {
            body: content_,
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Content-Type': 'application/json-patch+json',
            })
        };

        return this.http.request('post', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processCreateOrEdit(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateOrEdit(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<void>;
            }
        }));
    }

    protected processCreateOrEdit(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return _observableOf(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    delete(id: number | undefined): Observable<void> {
        let url_ = this.baseUrl + '/api/services/app/CatNationalities/Delete?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'Id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
            })
        };

        return this.http.request('delete', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processDelete(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDelete(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<void>;
            }
        }));
    }

    protected processDelete(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return _observableOf(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param filter (optional)
     * @param titleFilter (optional)
     * @param publishFilter (optional)
     * @return Success
     */
    getCatNationalitiesToExcel(filter: string | undefined, titleFilter: string | undefined, publishFilter: number | undefined): Observable<FileDto> {
        let url_ = this.baseUrl + '/api/services/app/CatNationalities/GetCatNationalitiesToExcel?';
        if (filter === null) {
            throw new Error('The parameter \'filter\' cannot be null.');
        } else if (filter !== undefined) {
            url_ += 'Filter=' + encodeURIComponent('' + filter) + '&';
        }
        if (titleFilter === null) {
            throw new Error('The parameter \'titleFilter\' cannot be null.');
        } else if (titleFilter !== undefined) {
            url_ += 'TitleFilter=' + encodeURIComponent('' + titleFilter) + '&';
        }
        if (publishFilter === null) {
            throw new Error('The parameter \'publishFilter\' cannot be null.');
        } else if (publishFilter !== undefined) {
            url_ += 'PublishFilter=' + encodeURIComponent('' + publishFilter) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetCatNationalitiesToExcel(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCatNationalitiesToExcel(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<FileDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<FileDto>;
            }
        }));
    }

    protected processGetCatNationalitiesToExcel(response: HttpResponseBase): Observable<FileDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = FileDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }
}

@Injectable()
export class CatCountriesServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
    }

    /**
     * @param filter (optional)
     * @param titleFilter (optional)
     * @param maxOrderFilter (optional)
     * @param minOrderFilter (optional)
     * @param publishFilter (optional)
     * @param restrictedFilter (optional)
     * @param sorting (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    getAll(filter: string | undefined, titleFilter: string | undefined, maxOrderFilter: number | undefined, minOrderFilter: number | undefined, publishFilter: number | undefined, restrictedFilter: number | undefined, sorting: string | undefined, skipCount: number | undefined, maxResultCount: number | undefined): Observable<PagedResultDtoOfGetCatCountryForViewDto> {
        let url_ = this.baseUrl + '/api/services/app/CatCountries/GetAll?';
        if (filter === null) {
            throw new Error('The parameter \'filter\' cannot be null.');
        } else if (filter !== undefined) {
            url_ += 'Filter=' + encodeURIComponent('' + filter) + '&';
        }
        if (titleFilter === null) {
            throw new Error('The parameter \'titleFilter\' cannot be null.');
        } else if (titleFilter !== undefined) {
            url_ += 'TitleFilter=' + encodeURIComponent('' + titleFilter) + '&';
        } if (maxOrderFilter === null) {
            throw new Error('The parameter \'maxOrderFilter\' cannot be null.');
        } else if (maxOrderFilter !== undefined) {
            url_ += 'MaxOrderFilter=' + encodeURIComponent('' + maxOrderFilter) + '&';
        }
        if (minOrderFilter === null) {
            throw new Error('The parameter \'minOrderFilter\' cannot be null.');
        } else if (minOrderFilter !== undefined) {
            url_ += 'MinOrderFilter=' + encodeURIComponent('' + minOrderFilter) + '&';
        }
        if (publishFilter === null) {
            throw new Error('The parameter \'publishFilter\' cannot be null.');
        } else if (publishFilter !== undefined) {
            url_ += 'PublishFilter=' + encodeURIComponent('' + publishFilter) + '&';
        }
        if (restrictedFilter === null) {
            throw new Error('The parameter \'restrictedFilter\' cannot be null.');
        } else if (restrictedFilter !== undefined) {
            url_ += 'RestrictedFilter=' + encodeURIComponent('' + restrictedFilter) + '&';
        }
        if (sorting === null) {
            throw new Error('The parameter \'sorting\' cannot be null.');
        } else if (sorting !== undefined) {
            url_ += 'Sorting=' + encodeURIComponent('' + sorting) + '&';
        }
        if (skipCount === null) {
            throw new Error('The parameter \'skipCount\' cannot be null.');
        } else if (skipCount !== undefined) {
            url_ += 'SkipCount=' + encodeURIComponent('' + skipCount) + '&';
        }
        if (maxResultCount === null) {
            throw new Error('The parameter \'maxResultCount\' cannot be null.');
        } else if (maxResultCount !== undefined) {
            url_ += 'MaxResultCount=' + encodeURIComponent('' + maxResultCount) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetAll(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAll(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<PagedResultDtoOfGetCatCountryForViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<PagedResultDtoOfGetCatCountryForViewDto>;
            }
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfGetCatCountryForViewDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfGetCatCountryForViewDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    getCatCountryForView(id: number | undefined): Observable<GetCatCountryForViewDto> {
        let url_ = this.baseUrl + '/api/services/app/CatCountries/GetCatCountryForView?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetCatCountryForView(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCatCountryForView(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetCatCountryForViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<GetCatCountryForViewDto>;
            }
        }));
    }

    protected processGetCatCountryForView(response: HttpResponseBase): Observable<GetCatCountryForViewDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = GetCatCountryForViewDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    getCatCountryForEdit(id: number | undefined): Observable<GetCatCountryForEditOutput> {
        let url_ = this.baseUrl + '/api/services/app/CatCountries/GetCatCountryForEdit?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'Id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetCatCountryForEdit(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCatCountryForEdit(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetCatCountryForEditOutput>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<GetCatCountryForEditOutput>;
            }
        }));
    }

    protected processGetCatCountryForEdit(response: HttpResponseBase): Observable<GetCatCountryForEditOutput> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = GetCatCountryForEditOutput.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param body (optional)
     * @return Success
     */
    createOrEdit(body: CreateOrEditCatCountryDto | undefined): Observable<void> {
        let url_ = this.baseUrl + '/api/services/app/CatCountries/CreateOrEdit';
        url_ = url_.replace(/[?&]$/, '');

        const content_ = JSON.stringify(body);

        let options_: any = {
            body: content_,
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Content-Type': 'application/json-patch+json',
            })
        };

        return this.http.request('post', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processCreateOrEdit(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateOrEdit(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<void>;
            }
        }));
    }

    protected processCreateOrEdit(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return _observableOf(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    delete(id: number | undefined): Observable<void> {
        let url_ = this.baseUrl + '/api/services/app/CatCountries/Delete?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'Id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
            })
        };

        return this.http.request('delete', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processDelete(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDelete(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<void>;
            }
        }));
    }

    protected processDelete(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return _observableOf(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param filter (optional)
     * @param titleFilter (optional)
     * @param maxOrderFilter (optional)
     * @param minOrderFilter (optional)
     * @param publishFilter (optional)
     * @param restrictedFilter (optional)
     * @return Success
     */
    getCatCountriesToExcel(filter: string | undefined, titleFilter: string | undefined, maxOrderFilter: number | undefined, minOrderFilter: number | undefined, publishFilter: number | undefined, restrictedFilter: number | undefined): Observable<FileDto> {
        let url_ = this.baseUrl + '/api/services/app/CatCountries/GetCatCountriesToExcel?';
        if (filter === null) {
            throw new Error('The parameter \'filter\' cannot be null.');
        } else if (filter !== undefined) {
            url_ += 'Filter=' + encodeURIComponent('' + filter) + '&';
        }
        if (titleFilter === null) {
            throw new Error('The parameter \'titleFilter\' cannot be null.');
        } else if (titleFilter !== undefined) {
            url_ += 'TitleFilter=' + encodeURIComponent('' + titleFilter) + '&';
        }
        if (maxOrderFilter === null) {
            throw new Error('The parameter \'maxOrderFilter\' cannot be null.');
        } else if (maxOrderFilter !== undefined) {
            url_ += 'MaxOrderFilter=' + encodeURIComponent('' + maxOrderFilter) + '&';
        }
        if (minOrderFilter === null) {
            throw new Error('The parameter \'minOrderFilter\' cannot be null.');
        } else if (minOrderFilter !== undefined) {
            url_ += 'MinOrderFilter=' + encodeURIComponent('' + minOrderFilter) + '&';
        }
        if (publishFilter === null) {
            throw new Error('The parameter \'publishFilter\' cannot be null.');
        } else if (publishFilter !== undefined) {
            url_ += 'PublishFilter=' + encodeURIComponent('' + publishFilter) + '&';
        }
        if (restrictedFilter === null) {
            throw new Error('The parameter \'restrictedFilter\' cannot be null.');
        } else if (restrictedFilter !== undefined) {
            url_ += 'RestrictedFilter=' + encodeURIComponent('' + restrictedFilter) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetCatCountriesToExcel(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCatCountriesToExcel(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<FileDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<FileDto>;
            }
        }));
    }

    protected processGetCatCountriesToExcel(response: HttpResponseBase): Observable<FileDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = FileDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }
}

@Injectable()
export class CatStatesServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
    }

    /**
     * @param filter (optional)
     * @param titleFilter (optional)
     * @param maxOrderFilter (optional)
     * @param minOrderFilter (optional)
     * @param publishFilter (optional)
     * @param catCountryTitleFilter (optional)
     * @param sorting (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    getAll(filter: string | undefined, titleFilter: string | undefined, maxOrderFilter: number | undefined, minOrderFilter: number | undefined, publishFilter: number | undefined, catCountryTitleFilter: string | undefined, sorting: string | undefined, skipCount: number | undefined, maxResultCount: number | undefined): Observable<PagedResultDtoOfGetCatStateForViewDto> {
        let url_ = this.baseUrl + '/api/services/app/CatStates/GetAll?';
        if (filter === null) {
            throw new Error('The parameter \'filter\' cannot be null.');
        } else if (filter !== undefined) {
            url_ += 'Filter=' + encodeURIComponent('' + filter) + '&';
        }
        if (titleFilter === null) {
            throw new Error('The parameter \'titleFilter\' cannot be null.');
        } else if (titleFilter !== undefined) {
            url_ += 'TitleFilter=' + encodeURIComponent('' + titleFilter) + '&';
        }
        if (maxOrderFilter === null) {
            throw new Error('The parameter \'maxOrderFilter\' cannot be null.');
        } else if (maxOrderFilter !== undefined) {
            url_ += 'MaxOrderFilter=' + encodeURIComponent('' + maxOrderFilter) + '&';
        }
        if (minOrderFilter === null) {
            throw new Error('The parameter \'minOrderFilter\' cannot be null.');
        } else if (minOrderFilter !== undefined) {
            url_ += 'MinOrderFilter=' + encodeURIComponent('' + minOrderFilter) + '&';
        }
        if (publishFilter === null) {
            throw new Error('The parameter \'publishFilter\' cannot be null.');
        } else if (publishFilter !== undefined) {
            url_ += 'PublishFilter=' + encodeURIComponent('' + publishFilter) + '&';
        }
        if (catCountryTitleFilter === null) {
            throw new Error('The parameter \'catCountryTitleFilter\' cannot be null.');
        } else if (catCountryTitleFilter !== undefined) {
            url_ += 'CatCountryTitleFilter=' + encodeURIComponent('' + catCountryTitleFilter) + '&';
        }
        if (sorting === null) {
            throw new Error('The parameter \'sorting\' cannot be null.');
        } else if (sorting !== undefined) {
            url_ += 'Sorting=' + encodeURIComponent('' + sorting) + '&';
        }
        if (skipCount === null) {
            throw new Error('The parameter \'skipCount\' cannot be null.');
        } else if (skipCount !== undefined) {
            url_ += 'SkipCount=' + encodeURIComponent('' + skipCount) + '&';
        }
        if (maxResultCount === null) {
            throw new Error('The parameter \'maxResultCount\' cannot be null.');
        } else if (maxResultCount !== undefined) {
            url_ += 'MaxResultCount=' + encodeURIComponent('' + maxResultCount) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetAll(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAll(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<PagedResultDtoOfGetCatStateForViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<PagedResultDtoOfGetCatStateForViewDto>;
            }
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfGetCatStateForViewDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfGetCatStateForViewDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    getCatStateForView(id: number | undefined): Observable<GetCatStateForViewDto> {
        let url_ = this.baseUrl + '/api/services/app/CatStates/GetCatStateForView?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetCatStateForView(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCatStateForView(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetCatStateForViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<GetCatStateForViewDto>;
            }
        }));
    }

    protected processGetCatStateForView(response: HttpResponseBase): Observable<GetCatStateForViewDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = GetCatStateForViewDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    getCatStateForEdit(id: number | undefined): Observable<GetCatStateForEditOutput> {
        let url_ = this.baseUrl + '/api/services/app/CatStates/GetCatStateForEdit?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'Id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetCatStateForEdit(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCatStateForEdit(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetCatStateForEditOutput>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<GetCatStateForEditOutput>;
            }
        }));
    }

    protected processGetCatStateForEdit(response: HttpResponseBase): Observable<GetCatStateForEditOutput> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = GetCatStateForEditOutput.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param body (optional)
     * @return Success
     */
    createOrEdit(body: CreateOrEditCatStateDto | undefined): Observable<void> {
        let url_ = this.baseUrl + '/api/services/app/CatStates/CreateOrEdit';
        url_ = url_.replace(/[?&]$/, '');

        const content_ = JSON.stringify(body);

        let options_: any = {
            body: content_,
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Content-Type': 'application/json-patch+json',
            })
        };

        return this.http.request('post', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processCreateOrEdit(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateOrEdit(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<void>;
            }
        }));
    }

    protected processCreateOrEdit(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return _observableOf(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    delete(id: number | undefined): Observable<void> {
        let url_ = this.baseUrl + '/api/services/app/CatStates/Delete?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'Id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
            })
        };

        return this.http.request('delete', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processDelete(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDelete(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<void>;
            }
        }));
    }

    protected processDelete(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return _observableOf(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param filter (optional)
     * @param titleFilter (optional)
     * @param maxOrderFilter (optional)
     * @param minOrderFilter (optional)
     * @param publishFilter (optional)
     * @param catCountryTitleFilter (optional)
     * @return Success
     */
    getCatStatesToExcel(filter: string | undefined, titleFilter: string | undefined, maxOrderFilter: number | undefined, minOrderFilter: number | undefined, publishFilter: number | undefined, catCountryTitleFilter: string | undefined): Observable<FileDto> {
        let url_ = this.baseUrl + '/api/services/app/CatStates/GetCatStatesToExcel?';
        if (filter === null) {
            throw new Error('The parameter \'filter\' cannot be null.');
        } else if (filter !== undefined) {
            url_ += 'Filter=' + encodeURIComponent('' + filter) + '&';
        }
        if (titleFilter === null) {
            throw new Error('The parameter \'titleFilter\' cannot be null.');
        } else if (titleFilter !== undefined) {
            url_ += 'TitleFilter=' + encodeURIComponent('' + titleFilter) + '&';
        }
        if (maxOrderFilter === null) {
            throw new Error('The parameter \'maxOrderFilter\' cannot be null.');
        } else if (maxOrderFilter !== undefined) {
            url_ += 'MaxOrderFilter=' + encodeURIComponent('' + maxOrderFilter) + '&';
        }
        if (minOrderFilter === null) {
            throw new Error('The parameter \'minOrderFilter\' cannot be null.');
        } else if (minOrderFilter !== undefined) {
            url_ += 'MinOrderFilter=' + encodeURIComponent('' + minOrderFilter) + '&';
        }
        if (publishFilter === null) {
            throw new Error('The parameter \'publishFilter\' cannot be null.');
        } else if (publishFilter !== undefined) {
            url_ += 'PublishFilter=' + encodeURIComponent('' + publishFilter) + '&';
        }
        if (catCountryTitleFilter === null) {
            throw new Error('The parameter \'catCountryTitleFilter\' cannot be null.');
        } else if (catCountryTitleFilter !== undefined) {
            url_ += 'CatCountryTitleFilter=' + encodeURIComponent('' + catCountryTitleFilter) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetCatStatesToExcel(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCatStatesToExcel(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<FileDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<FileDto>;
            }
        }));
    }

    protected processGetCatStatesToExcel(response: HttpResponseBase): Observable<FileDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = FileDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @return Success
     */
    getAllCatCountryForTableDropdown(): Observable<CatStateCatCountryLookupTableDto[]> {
        let url_ = this.baseUrl + '/api/services/app/CatStates/GetAllCatCountryForTableDropdown';
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetAllCatCountryForTableDropdown(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllCatCountryForTableDropdown(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<CatStateCatCountryLookupTableDto[]>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<CatStateCatCountryLookupTableDto[]>;
            }
        }));
    }

    protected processGetAllCatCountryForTableDropdown(response: HttpResponseBase): Observable<CatStateCatCountryLookupTableDto[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                if (Array.isArray(resultData200)) {
                    result200 = [] as any;
                    for (let item of resultData200) {
                        result200!.push(CatStateCatCountryLookupTableDto.fromJS(item));
                    }
                } else {
                    result200 = <any>null;
                }
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }
}

@Injectable()
export class CatIdentityTypesServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
    }

    /**
     * @param filter (optional)
     * @param titleFilter (optional)
     * @param publishFilter (optional)
     * @param sorting (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    getAll(filter: string | undefined, titleFilter: string | undefined, publishFilter: number | undefined, sorting: string | undefined, skipCount: number | undefined, maxResultCount: number | undefined): Observable<PagedResultDtoOfGetCatIdentityTypeForViewDto> {
        let url_ = this.baseUrl + '/api/services/app/CatIdentityTypes/GetAll?';
        if (filter === null) {
            throw new Error('The parameter \'filter\' cannot be null.');
        } else if (filter !== undefined) {
            url_ += 'Filter=' + encodeURIComponent('' + filter) + '&';
        }
        if (titleFilter === null) {
            throw new Error('The parameter \'titleFilter\' cannot be null.');
        } else if (titleFilter !== undefined) {
            url_ += 'TitleFilter=' + encodeURIComponent('' + titleFilter) + '&';
        }
        if (publishFilter === null) {
            throw new Error('The parameter \'publishFilter\' cannot be null.');
        } else if (publishFilter !== undefined) {
            url_ += 'PublishFilter=' + encodeURIComponent('' + publishFilter) + '&';
        }
        if (sorting === null) {
            throw new Error('The parameter \'sorting\' cannot be null.');
        } else if (sorting !== undefined) {
            url_ += 'Sorting=' + encodeURIComponent('' + sorting) + '&';
        }
        if (skipCount === null) {
            throw new Error('The parameter \'skipCount\' cannot be null.');
        } else if (skipCount !== undefined) {
            url_ += 'SkipCount=' + encodeURIComponent('' + skipCount) + '&';
        }
        if (maxResultCount === null) {
            throw new Error('The parameter \'maxResultCount\' cannot be null.');
        } else if (maxResultCount !== undefined) {
            url_ += 'MaxResultCount=' + encodeURIComponent('' + maxResultCount) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetAll(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAll(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<PagedResultDtoOfGetCatIdentityTypeForViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<PagedResultDtoOfGetCatIdentityTypeForViewDto>;
            }
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfGetCatIdentityTypeForViewDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfGetCatIdentityTypeForViewDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    getCatIdentityTypeForView(id: number | undefined): Observable<GetCatIdentityTypeForViewDto> {
        let url_ = this.baseUrl + '/api/services/app/CatIdentityTypes/GetCatIdentityTypeForView?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetCatIdentityTypeForView(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCatIdentityTypeForView(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetCatIdentityTypeForViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<GetCatIdentityTypeForViewDto>;
            }
        }));
    }

    protected processGetCatIdentityTypeForView(response: HttpResponseBase): Observable<GetCatIdentityTypeForViewDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = GetCatIdentityTypeForViewDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    getCatIdentityTypeForEdit(id: number | undefined): Observable<GetCatIdentityTypeForEditOutput> {
        let url_ = this.baseUrl + '/api/services/app/CatIdentityTypes/GetCatIdentityTypeForEdit?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'Id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetCatIdentityTypeForEdit(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCatIdentityTypeForEdit(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetCatIdentityTypeForEditOutput>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<GetCatIdentityTypeForEditOutput>;
            }
        }));
    }

    protected processGetCatIdentityTypeForEdit(response: HttpResponseBase): Observable<GetCatIdentityTypeForEditOutput> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = GetCatIdentityTypeForEditOutput.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param body (optional)
     * @return Success
     */
    createOrEdit(body: CreateOrEditCatIdentityTypeDto | undefined): Observable<void> {
        let url_ = this.baseUrl + '/api/services/app/CatIdentityTypes/CreateOrEdit';
        url_ = url_.replace(/[?&]$/, '');

        const content_ = JSON.stringify(body);

        let options_: any = {
            body: content_,
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Content-Type': 'application/json-patch+json',
            })
        };

        return this.http.request('post', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processCreateOrEdit(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateOrEdit(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<void>;
            }
        }));
    }

    protected processCreateOrEdit(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return _observableOf(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    delete(id: number | undefined): Observable<void> {
        let url_ = this.baseUrl + '/api/services/app/CatIdentityTypes/Delete?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'Id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
            })
        };

        return this.http.request('delete', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processDelete(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDelete(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<void>;
            }
        }));
    }

    protected processDelete(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return _observableOf(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param filter (optional)
     * @param titleFilter (optional)
     * @param publishFilter (optional)
     * @return Success
     */
    getCatIdentityTypesToExcel(filter: string | undefined, titleFilter: string | undefined, publishFilter: number | undefined): Observable<FileDto> {
        let url_ = this.baseUrl + '/api/services/app/CatIdentityTypes/GetCatIdentityTypesToExcel?';
        if (filter === null) {
            throw new Error('The parameter \'filter\' cannot be null.');
        } else if (filter !== undefined) {
            url_ += 'Filter=' + encodeURIComponent('' + filter) + '&';
        }
        if (titleFilter === null) {
            throw new Error('The parameter \'titleFilter\' cannot be null.');
        } else if (titleFilter !== undefined) {
            url_ += 'TitleFilter=' + encodeURIComponent('' + titleFilter) + '&';
        }
        if (publishFilter === null) {
            throw new Error('The parameter \'publishFilter\' cannot be null.');
        } else if (publishFilter !== undefined) {
            url_ += 'PublishFilter=' + encodeURIComponent('' + publishFilter) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetCatIdentityTypesToExcel(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCatIdentityTypesToExcel(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<FileDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<FileDto>;
            }
        }));
    }

    protected processGetCatIdentityTypesToExcel(response: HttpResponseBase): Observable<FileDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = FileDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }
}

@Injectable()
export class CatProfessionsServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
    }

    /**
     * @param filter (optional)
     * @param titleFilter (optional)
     * @param maxRiskFilter (optional)
     * @param minRiskFilter (optional)
     * @param maxOrderFilter (optional)
     * @param minOrderFilter (optional)
     * @param publishFilter (optional)
     * @param sorting (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    getAll(filter: string | undefined, titleFilter: string | undefined, maxRiskFilter: number | undefined, minRiskFilter: number | undefined, maxOrderFilter: number | undefined, minOrderFilter: number | undefined, publishFilter: number | undefined, sorting: string | undefined, skipCount: number | undefined, maxResultCount: number | undefined): Observable<PagedResultDtoOfGetCatProfessionForViewDto> {
        let url_ = this.baseUrl + '/api/services/app/CatProfessions/GetAll?';
        if (filter === null) {
            throw new Error('The parameter \'filter\' cannot be null.');
        } else if (filter !== undefined) {
            url_ += 'Filter=' + encodeURIComponent('' + filter) + '&';
        }
        if (titleFilter === null) {
            throw new Error('The parameter \'titleFilter\' cannot be null.');
        } else if (titleFilter !== undefined) {
            url_ += 'TitleFilter=' + encodeURIComponent('' + titleFilter) + '&';
        }
        if (maxRiskFilter === null) {
            throw new Error('The parameter \'maxRiskFilter\' cannot be null.');
        } else if (maxRiskFilter !== undefined) {
            url_ += 'MaxRiskFilter=' + encodeURIComponent('' + maxRiskFilter) + '&';
        }
        if (minRiskFilter === null) {
            throw new Error('The parameter \'minRiskFilter\' cannot be null.');
        } else if (minRiskFilter !== undefined) {
            url_ += 'MinRiskFilter=' + encodeURIComponent('' + minRiskFilter) + '&';
        }
        if (maxOrderFilter === null) {
            throw new Error('The parameter \'maxOrderFilter\' cannot be null.');
        } else if (maxOrderFilter !== undefined) {
            url_ += 'MaxOrderFilter=' + encodeURIComponent('' + maxOrderFilter) + '&';
        }
        if (minOrderFilter === null) {
            throw new Error('The parameter \'minOrderFilter\' cannot be null.');
        } else if (minOrderFilter !== undefined) {
            url_ += 'MinOrderFilter=' + encodeURIComponent('' + minOrderFilter) + '&';
        }
        if (publishFilter === null) {
            throw new Error('The parameter \'publishFilter\' cannot be null.');
        } else if (publishFilter !== undefined) {
            url_ += 'PublishFilter=' + encodeURIComponent('' + publishFilter) + '&';
        }
        if (sorting === null) {
            throw new Error('The parameter \'sorting\' cannot be null.');
        } else if (sorting !== undefined) {
            url_ += 'Sorting=' + encodeURIComponent('' + sorting) + '&';
        }
        if (skipCount === null) {
            throw new Error('The parameter \'skipCount\' cannot be null.');
        } else if (skipCount !== undefined) {
            url_ += 'SkipCount=' + encodeURIComponent('' + skipCount) + '&';
        }
        if (maxResultCount === null) {
            throw new Error('The parameter \'maxResultCount\' cannot be null.');
        } else if (maxResultCount !== undefined) {
            url_ += 'MaxResultCount=' + encodeURIComponent('' + maxResultCount) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetAll(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAll(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<PagedResultDtoOfGetCatProfessionForViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<PagedResultDtoOfGetCatProfessionForViewDto>;
            }
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfGetCatProfessionForViewDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfGetCatProfessionForViewDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    getCatProfessionForView(id: number | undefined): Observable<GetCatProfessionForViewDto> {
        let url_ = this.baseUrl + '/api/services/app/CatProfessions/GetCatProfessionForView?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetCatProfessionForView(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCatProfessionForView(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetCatProfessionForViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<GetCatProfessionForViewDto>;
            }
        }));
    }

    protected processGetCatProfessionForView(response: HttpResponseBase): Observable<GetCatProfessionForViewDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = GetCatProfessionForViewDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    getCatProfessionForEdit(id: number | undefined): Observable<GetCatProfessionForEditOutput> {
        let url_ = this.baseUrl + '/api/services/app/CatProfessions/GetCatProfessionForEdit?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'Id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetCatProfessionForEdit(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCatProfessionForEdit(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetCatProfessionForEditOutput>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<GetCatProfessionForEditOutput>;
            }
        }));
    }

    protected processGetCatProfessionForEdit(response: HttpResponseBase): Observable<GetCatProfessionForEditOutput> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = GetCatProfessionForEditOutput.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param body (optional)
     * @return Success
     */
    createOrEdit(body: CreateOrEditCatProfessionDto | undefined): Observable<void> {
        let url_ = this.baseUrl + '/api/services/app/CatProfessions/CreateOrEdit';
        url_ = url_.replace(/[?&]$/, '');

        const content_ = JSON.stringify(body);

        let options_: any = {
            body: content_,
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Content-Type': 'application/json-patch+json',
            })
        };

        return this.http.request('post', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processCreateOrEdit(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateOrEdit(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<void>;
            }
        }));
    }

    protected processCreateOrEdit(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return _observableOf(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    delete(id: number | undefined): Observable<void> {
        let url_ = this.baseUrl + '/api/services/app/CatProfessions/Delete?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'Id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
            })
        };

        return this.http.request('delete', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processDelete(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDelete(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<void>;
            }
        }));
    }

    protected processDelete(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return _observableOf(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param filter (optional)
     * @param titleFilter (optional)
     * @param maxRiskFilter (optional)
     * @param minRiskFilter (optional)
     * @param maxOrderFilter (optional)
     * @param minOrderFilter (optional)
     * @param publishFilter (optional)
     * @return Success
     */
    getCatProfessionsToExcel(filter: string | undefined, titleFilter: string | undefined, maxRiskFilter: number | undefined, minRiskFilter: number | undefined, maxOrderFilter: number | undefined, minOrderFilter: number | undefined, publishFilter: number | undefined): Observable<FileDto> {
        let url_ = this.baseUrl + '/api/services/app/CatProfessions/GetCatProfessionsToExcel?';
        if (filter === null) {
            throw new Error('The parameter \'filter\' cannot be null.');
        } else if (filter !== undefined) {
            url_ += 'Filter=' + encodeURIComponent('' + filter) + '&';
        }
        if (titleFilter === null) {
            throw new Error('The parameter \'titleFilter\' cannot be null.');
        } else if (titleFilter !== undefined) {
            url_ += 'TitleFilter=' + encodeURIComponent('' + titleFilter) + '&';
        }
        if (maxRiskFilter === null) {
            throw new Error('The parameter \'maxRiskFilter\' cannot be null.');
        } else if (maxRiskFilter !== undefined) {
            url_ += 'MaxRiskFilter=' + encodeURIComponent('' + maxRiskFilter) + '&';
        }
        if (minRiskFilter === null) {
            throw new Error('The parameter \'minRiskFilter\' cannot be null.');
        } else if (minRiskFilter !== undefined) {
            url_ += 'MinRiskFilter=' + encodeURIComponent('' + minRiskFilter) + '&';
        }
        if (maxOrderFilter === null) {
            throw new Error('The parameter \'maxOrderFilter\' cannot be null.');
        } else if (maxOrderFilter !== undefined) {
            url_ += 'MaxOrderFilter=' + encodeURIComponent('' + maxOrderFilter) + '&';
        }
        if (minOrderFilter === null) {
            throw new Error('The parameter \'minOrderFilter\' cannot be null.');
        } else if (minOrderFilter !== undefined) {
            url_ += 'MinOrderFilter=' + encodeURIComponent('' + minOrderFilter) + '&';
        }
        if (publishFilter === null) {
            throw new Error('The parameter \'publishFilter\' cannot be null.');
        } else if (publishFilter !== undefined) {
            url_ += 'PublishFilter=' + encodeURIComponent('' + publishFilter) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetCatProfessionsToExcel(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCatProfessionsToExcel(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<FileDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<FileDto>;
            }
        }));
    }

    protected processGetCatProfessionsToExcel(response: HttpResponseBase): Observable<FileDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = FileDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }
}

@Injectable()
export class CatActivityEconomicCategoriesServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
    }

    /**
     * @param filter (optional)
     * @param titleFilter (optional)
     * @param publishFilter (optional)
     * @param sorting (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    getAll(filter: string | undefined, titleFilter: string | undefined, publishFilter: number | undefined, sorting: string | undefined, skipCount: number | undefined, maxResultCount: number | undefined): Observable<PagedResultDtoOfGetCatActivityEconomicCategoryForViewDto> {
        let url_ = this.baseUrl + '/api/services/app/CatActivityEconomicCategories/GetAll?';
        if (filter === null) {
            throw new Error('The parameter \'filter\' cannot be null.');
        } else if (filter !== undefined) {
            url_ += 'Filter=' + encodeURIComponent('' + filter) + '&';
        }
        if (titleFilter === null) {
            throw new Error('The parameter \'titleFilter\' cannot be null.');
        } else if (titleFilter !== undefined) {
            url_ += 'TitleFilter=' + encodeURIComponent('' + titleFilter) + '&';
        }
        if (publishFilter === null) {
            throw new Error('The parameter \'publishFilter\' cannot be null.');
        } else if (publishFilter !== undefined) {
            url_ += 'PublishFilter=' + encodeURIComponent('' + publishFilter) + '&';
        }
        if (sorting === null) {
            throw new Error('The parameter \'sorting\' cannot be null.');
        } else if (sorting !== undefined) {
            url_ += 'Sorting=' + encodeURIComponent('' + sorting) + '&';
        }
        if (skipCount === null) {
            throw new Error('The parameter \'skipCount\' cannot be null.');
        } else if (skipCount !== undefined) {
            url_ += 'SkipCount=' + encodeURIComponent('' + skipCount) + '&';
        }
        if (maxResultCount === null) {
            throw new Error('The parameter \'maxResultCount\' cannot be null.');
        } else if (maxResultCount !== undefined) {
            url_ += 'MaxResultCount=' + encodeURIComponent('' + maxResultCount) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetAll(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAll(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<PagedResultDtoOfGetCatActivityEconomicCategoryForViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<PagedResultDtoOfGetCatActivityEconomicCategoryForViewDto>;
            }
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfGetCatActivityEconomicCategoryForViewDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfGetCatActivityEconomicCategoryForViewDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    getCatActivityEconomicCategoryForView(id: number | undefined): Observable<GetCatActivityEconomicCategoryForViewDto> {
        let url_ = this.baseUrl + '/api/services/app/CatActivityEconomicCategories/GetCatActivityEconomicCategoryForView?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetCatActivityEconomicCategoryForView(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCatActivityEconomicCategoryForView(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetCatActivityEconomicCategoryForViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<GetCatActivityEconomicCategoryForViewDto>;
            }
        }));
    }

    protected processGetCatActivityEconomicCategoryForView(response: HttpResponseBase): Observable<GetCatActivityEconomicCategoryForViewDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = GetCatActivityEconomicCategoryForViewDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    getCatActivityEconomicCategoryForEdit(id: number | undefined): Observable<GetCatActivityEconomicCategoryForEditOutput> {
        let url_ = this.baseUrl + '/api/services/app/CatActivityEconomicCategories/GetCatActivityEconomicCategoryForEdit?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'Id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetCatActivityEconomicCategoryForEdit(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCatActivityEconomicCategoryForEdit(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetCatActivityEconomicCategoryForEditOutput>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<GetCatActivityEconomicCategoryForEditOutput>;
            }
        }));
    }

    protected processGetCatActivityEconomicCategoryForEdit(response: HttpResponseBase): Observable<GetCatActivityEconomicCategoryForEditOutput> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = GetCatActivityEconomicCategoryForEditOutput.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param body (optional)
     * @return Success
     */
    createOrEdit(body: CreateOrEditCatActivityEconomicCategoryDto | undefined): Observable<void> {
        let url_ = this.baseUrl + '/api/services/app/CatActivityEconomicCategories/CreateOrEdit';
        url_ = url_.replace(/[?&]$/, '');

        const content_ = JSON.stringify(body);

        let options_: any = {
            body: content_,
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Content-Type': 'application/json-patch+json',
            })
        };

        return this.http.request('post', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processCreateOrEdit(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateOrEdit(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<void>;
            }
        }));
    }

    protected processCreateOrEdit(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return _observableOf(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    delete(id: number | undefined): Observable<void> {
        let url_ = this.baseUrl + '/api/services/app/CatActivityEconomicCategories/Delete?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'Id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
            })
        };

        return this.http.request('delete', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processDelete(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDelete(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<void>;
            }
        }));
    }

    protected processDelete(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return _observableOf(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param filter (optional)
     * @param titleFilter (optional)
     * @param publishFilter (optional)
     * @return Success
     */
    getCatActivityEconomicCategoriesToExcel(filter: string | undefined, titleFilter: string | undefined, publishFilter: number | undefined): Observable<FileDto> {
        let url_ = this.baseUrl + '/api/services/app/CatActivityEconomicCategories/GetCatActivityEconomicCategoriesToExcel?';
        if (filter === null) {
            throw new Error('The parameter \'filter\' cannot be null.');
        } else if (filter !== undefined) {
            url_ += 'Filter=' + encodeURIComponent('' + filter) + '&';
        }
        if (titleFilter === null) {
            throw new Error('The parameter \'titleFilter\' cannot be null.');
        } else if (titleFilter !== undefined) {
            url_ += 'TitleFilter=' + encodeURIComponent('' + titleFilter) + '&';
        }
        if (publishFilter === null) {
            throw new Error('The parameter \'publishFilter\' cannot be null.');
        } else if (publishFilter !== undefined) {
            url_ += 'PublishFilter=' + encodeURIComponent('' + publishFilter) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetCatActivityEconomicCategoriesToExcel(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCatActivityEconomicCategoriesToExcel(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<FileDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<FileDto>;
            }
        }));
    }

    protected processGetCatActivityEconomicCategoriesToExcel(response: HttpResponseBase): Observable<FileDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = FileDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }
}

@Injectable()
export class CatActivityEconomicsServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
    }

    /**
     * @param filter (optional)
     * @param titleFilter (optional)
     * @param publishFilter (optional)
     * @param catActivityEconomicCategoryTitleFilter (optional)
     * @param sorting (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    getAll(filter: string | undefined, titleFilter: string | undefined, publishFilter: number | undefined, catActivityEconomicCategoryTitleFilter: string | undefined, sorting: string | undefined, skipCount: number | undefined, maxResultCount: number | undefined): Observable<PagedResultDtoOfGetCatActivityEconomicForViewDto> {
        let url_ = this.baseUrl + '/api/services/app/CatActivityEconomics/GetAll?';
        if (filter === null) {
            throw new Error('The parameter \'filter\' cannot be null.');
        } else if (filter !== undefined) {
            url_ += 'Filter=' + encodeURIComponent('' + filter) + '&';
        }
        if (titleFilter === null) {
            throw new Error('The parameter \'titleFilter\' cannot be null.');
        } else if (titleFilter !== undefined) {
            url_ += 'TitleFilter=' + encodeURIComponent('' + titleFilter) + '&';
        }
        if (publishFilter === null) {
            throw new Error('The parameter \'publishFilter\' cannot be null.');
        } else if (publishFilter !== undefined) {
            url_ += 'PublishFilter=' + encodeURIComponent('' + publishFilter) + '&';
        }
        if (catActivityEconomicCategoryTitleFilter === null) {
            throw new Error('The parameter \'catActivityEconomicCategoryTitleFilter\' cannot be null.');
        } else if (catActivityEconomicCategoryTitleFilter !== undefined) {
            url_ += 'CatActivityEconomicCategoryTitleFilter=' + encodeURIComponent('' + catActivityEconomicCategoryTitleFilter) + '&';
        }
        if (sorting === null) {
            throw new Error('The parameter \'sorting\' cannot be null.');
        } else if (sorting !== undefined) {
            url_ += 'Sorting=' + encodeURIComponent('' + sorting) + '&';
        }
        if (skipCount === null) {
            throw new Error('The parameter \'skipCount\' cannot be null.');
        } else if (skipCount !== undefined) {
            url_ += 'SkipCount=' + encodeURIComponent('' + skipCount) + '&';
        }
        if (maxResultCount === null) {
            throw new Error('The parameter \'maxResultCount\' cannot be null.');
        } else if (maxResultCount !== undefined) {
            url_ += 'MaxResultCount=' + encodeURIComponent('' + maxResultCount) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetAll(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAll(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<PagedResultDtoOfGetCatActivityEconomicForViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<PagedResultDtoOfGetCatActivityEconomicForViewDto>;
            }
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfGetCatActivityEconomicForViewDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfGetCatActivityEconomicForViewDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    getCatActivityEconomicForView(id: number | undefined): Observable<GetCatActivityEconomicForViewDto> {
        let url_ = this.baseUrl + '/api/services/app/CatActivityEconomics/GetCatActivityEconomicForView?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetCatActivityEconomicForView(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCatActivityEconomicForView(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetCatActivityEconomicForViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<GetCatActivityEconomicForViewDto>;
            }
        }));
    }

    protected processGetCatActivityEconomicForView(response: HttpResponseBase): Observable<GetCatActivityEconomicForViewDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = GetCatActivityEconomicForViewDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    getCatActivityEconomicForEdit(id: number | undefined): Observable<GetCatActivityEconomicForEditOutput> {
        let url_ = this.baseUrl + '/api/services/app/CatActivityEconomics/GetCatActivityEconomicForEdit?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'Id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetCatActivityEconomicForEdit(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCatActivityEconomicForEdit(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetCatActivityEconomicForEditOutput>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<GetCatActivityEconomicForEditOutput>;
            }
        }));
    }

    protected processGetCatActivityEconomicForEdit(response: HttpResponseBase): Observable<GetCatActivityEconomicForEditOutput> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = GetCatActivityEconomicForEditOutput.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param body (optional)
     * @return Success
     */
    createOrEdit(body: CreateOrEditCatActivityEconomicDto | undefined): Observable<void> {
        let url_ = this.baseUrl + '/api/services/app/CatActivityEconomics/CreateOrEdit';
        url_ = url_.replace(/[?&]$/, '');

        const content_ = JSON.stringify(body);

        let options_: any = {
            body: content_,
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Content-Type': 'application/json-patch+json',
            })
        };

        return this.http.request('post', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processCreateOrEdit(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateOrEdit(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<void>;
            }
        }));
    }

    protected processCreateOrEdit(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return _observableOf(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    delete(id: number | undefined): Observable<void> {
        let url_ = this.baseUrl + '/api/services/app/CatActivityEconomics/Delete?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'Id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
            })
        };

        return this.http.request('delete', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processDelete(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDelete(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<void>;
            }
        }));
    }

    protected processDelete(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return _observableOf(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param filter (optional)
     * @param titleFilter (optional)
     * @param publishFilter (optional)
     * @param catActivityEconomicCategoryTitleFilter (optional)
     * @return Success
     */
    getCatActivityEconomicsToExcel(filter: string | undefined, titleFilter: string | undefined, publishFilter: number | undefined, catActivityEconomicCategoryTitleFilter: string | undefined): Observable<FileDto> {
        let url_ = this.baseUrl + '/api/services/app/CatActivityEconomics/GetCatActivityEconomicsToExcel?';
        if (filter === null) {
            throw new Error('The parameter \'filter\' cannot be null.');
        } else if (filter !== undefined) {
            url_ += 'Filter=' + encodeURIComponent('' + filter) + '&';
        }
        if (titleFilter === null) {
            throw new Error('The parameter \'titleFilter\' cannot be null.');
        } else if (titleFilter !== undefined) {
            url_ += 'TitleFilter=' + encodeURIComponent('' + titleFilter) + '&';
        }
        if (publishFilter === null) {
            throw new Error('The parameter \'publishFilter\' cannot be null.');
        } else if (publishFilter !== undefined) {
            url_ += 'PublishFilter=' + encodeURIComponent('' + publishFilter) + '&';
        }
        if (catActivityEconomicCategoryTitleFilter === null) {
            throw new Error('The parameter \'catActivityEconomicCategoryTitleFilter\' cannot be null.');
        } else if (catActivityEconomicCategoryTitleFilter !== undefined) {
            url_ += 'CatActivityEconomicCategoryTitleFilter=' + encodeURIComponent('' + catActivityEconomicCategoryTitleFilter) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetCatActivityEconomicsToExcel(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCatActivityEconomicsToExcel(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<FileDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<FileDto>;
            }
        }));
    }

    protected processGetCatActivityEconomicsToExcel(response: HttpResponseBase): Observable<FileDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = FileDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param filter (optional)
     * @param sorting (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    getAllCatActivityEconomicCategoryForLookupTable(filter: string | undefined, sorting: string | undefined, skipCount: number | undefined, maxResultCount: number | undefined): Observable<PagedResultDtoOfCatActivityEconomicCatActivityEconomicCategoryLookupTableDto> {
        let url_ = this.baseUrl + '/api/services/app/CatActivityEconomics/GetAllCatActivityEconomicCategoryForLookupTable?';
        if (filter === null) {
            throw new Error('The parameter \'filter\' cannot be null.');
        } else if (filter !== undefined) {
            url_ += 'Filter=' + encodeURIComponent('' + filter) + '&';
        }
        if (sorting === null) {
            throw new Error('The parameter \'sorting\' cannot be null.');
        } else if (sorting !== undefined) {
            url_ += 'Sorting=' + encodeURIComponent('' + sorting) + '&';
        }
        if (skipCount === null) {
            throw new Error('The parameter \'skipCount\' cannot be null.');
        } else if (skipCount !== undefined) {
            url_ += 'SkipCount=' + encodeURIComponent('' + skipCount) + '&';
        }
        if (maxResultCount === null) {
            throw new Error('The parameter \'maxResultCount\' cannot be null.');
        } else if (maxResultCount !== undefined) {
            url_ += 'MaxResultCount=' + encodeURIComponent('' + maxResultCount) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetAllCatActivityEconomicCategoryForLookupTable(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllCatActivityEconomicCategoryForLookupTable(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<PagedResultDtoOfCatActivityEconomicCatActivityEconomicCategoryLookupTableDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<PagedResultDtoOfCatActivityEconomicCatActivityEconomicCategoryLookupTableDto>;
            }
        }));
    }

    protected processGetAllCatActivityEconomicCategoryForLookupTable(response: HttpResponseBase): Observable<PagedResultDtoOfCatActivityEconomicCatActivityEconomicCategoryLookupTableDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfCatActivityEconomicCatActivityEconomicCategoryLookupTableDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }
}

@Injectable()
export class CatSourceFoundsesServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
    }

    /**
     * @param filter (optional)
     * @param titleFilter (optional)
     * @param publishFilter (optional)
     * @param sorting (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    getAll(filter: string | undefined, titleFilter: string | undefined, publishFilter: number | undefined, sorting: string | undefined, skipCount: number | undefined, maxResultCount: number | undefined): Observable<PagedResultDtoOfGetCatSourceFoundsForViewDto> {
        let url_ = this.baseUrl + '/api/services/app/CatSourceFoundses/GetAll?';
        if (filter === null) {
            throw new Error('The parameter \'filter\' cannot be null.');
        } else if (filter !== undefined) {
            url_ += 'Filter=' + encodeURIComponent('' + filter) + '&';
        }
        if (titleFilter === null) {
            throw new Error('The parameter \'titleFilter\' cannot be null.');
        } else if (titleFilter !== undefined) {
            url_ += 'TitleFilter=' + encodeURIComponent('' + titleFilter) + '&';
        }
        if (publishFilter === null) {
            throw new Error('The parameter \'publishFilter\' cannot be null.');
        } else if (publishFilter !== undefined) {
            url_ += 'PublishFilter=' + encodeURIComponent('' + publishFilter) + '&';
        }
        if (sorting === null) {
            throw new Error('The parameter \'sorting\' cannot be null.');
        } else if (sorting !== undefined) {
            url_ += 'Sorting=' + encodeURIComponent('' + sorting) + '&';
        }
        if (skipCount === null) {
            throw new Error('The parameter \'skipCount\' cannot be null.');
        } else if (skipCount !== undefined) {
            url_ += 'SkipCount=' + encodeURIComponent('' + skipCount) + '&';
        }
        if (maxResultCount === null) {
            throw new Error('The parameter \'maxResultCount\' cannot be null.');
        } else if (maxResultCount !== undefined) {
            url_ += 'MaxResultCount=' + encodeURIComponent('' + maxResultCount) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetAll(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAll(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<PagedResultDtoOfGetCatSourceFoundsForViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<PagedResultDtoOfGetCatSourceFoundsForViewDto>;
            }
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfGetCatSourceFoundsForViewDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfGetCatSourceFoundsForViewDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    getCatSourceFoundsForView(id: number | undefined): Observable<GetCatSourceFoundsForViewDto> {
        let url_ = this.baseUrl + '/api/services/app/CatSourceFoundses/GetCatSourceFoundsForView?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetCatSourceFoundsForView(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCatSourceFoundsForView(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetCatSourceFoundsForViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<GetCatSourceFoundsForViewDto>;
            }
        }));
    }

    protected processGetCatSourceFoundsForView(response: HttpResponseBase): Observable<GetCatSourceFoundsForViewDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = GetCatSourceFoundsForViewDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    getCatSourceFoundsForEdit(id: number | undefined): Observable<GetCatSourceFoundsForEditOutput> {
        let url_ = this.baseUrl + '/api/services/app/CatSourceFoundses/GetCatSourceFoundsForEdit?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'Id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetCatSourceFoundsForEdit(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCatSourceFoundsForEdit(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetCatSourceFoundsForEditOutput>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<GetCatSourceFoundsForEditOutput>;
            }
        }));
    }

    protected processGetCatSourceFoundsForEdit(response: HttpResponseBase): Observable<GetCatSourceFoundsForEditOutput> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = GetCatSourceFoundsForEditOutput.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param body (optional)
     * @return Success
     */
    createOrEdit(body: CreateOrEditCatSourceFoundsDto | undefined): Observable<void> {
        let url_ = this.baseUrl + '/api/services/app/CatSourceFoundses/CreateOrEdit';
        url_ = url_.replace(/[?&]$/, '');

        const content_ = JSON.stringify(body);

        let options_: any = {
            body: content_,
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Content-Type': 'application/json-patch+json',
            })
        };

        return this.http.request('post', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processCreateOrEdit(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateOrEdit(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<void>;
            }
        }));
    }

    protected processCreateOrEdit(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return _observableOf(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    delete(id: number | undefined): Observable<void> {
        let url_ = this.baseUrl + '/api/services/app/CatSourceFoundses/Delete?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'Id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
            })
        };

        return this.http.request('delete', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processDelete(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDelete(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<void>;
            }
        }));
    }

    protected processDelete(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return _observableOf(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param filter (optional)
     * @param titleFilter (optional)
     * @param publishFilter (optional)
     * @return Success
     */
    getCatSourceFoundsesToExcel(filter: string | undefined, titleFilter: string | undefined, publishFilter: number | undefined): Observable<FileDto> {
        let url_ = this.baseUrl + '/api/services/app/CatSourceFoundses/GetCatSourceFoundsesToExcel?';
        if (filter === null) {
            throw new Error('The parameter \'filter\' cannot be null.');
        } else if (filter !== undefined) {
            url_ += 'Filter=' + encodeURIComponent('' + filter) + '&';
        }
        if (titleFilter === null) {
            throw new Error('The parameter \'titleFilter\' cannot be null.');
        } else if (titleFilter !== undefined) {
            url_ += 'TitleFilter=' + encodeURIComponent('' + titleFilter) + '&';
        }
        if (publishFilter === null) {
            throw new Error('The parameter \'publishFilter\' cannot be null.');
        } else if (publishFilter !== undefined) {
            url_ += 'PublishFilter=' + encodeURIComponent('' + publishFilter) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetCatSourceFoundsesToExcel(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCatSourceFoundsesToExcel(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<FileDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<FileDto>;
            }
        }));
    }

    protected processGetCatSourceFoundsesToExcel(response: HttpResponseBase): Observable<FileDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = FileDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }
}

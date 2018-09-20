import { Observable } from 'rxjs';
import { RestfulModelService } from './restful-model.service';
import { Util } from '../utils/utils';
import { RestfulOptions, RestfulParamsOptions } from '../../../type';

export class RestFulService {
    RESTFUL: RestfulModelService;

    constructor() {
        this.RESTFUL = Util.Injector.getService(RestfulModelService);
    }

    GET(options: RestfulOptions) {
        return this.RESTFUL.GET(options);
    }
    
    POST(options: RestfulParamsOptions) {
        return this.RESTFUL.POST(options);
    }

    PUT(options: RestfulParamsOptions) {
        return this.RESTFUL.PUT(options);
    }

    DELETE(options: RestfulOptions) {
        return this.RESTFUL.DELETE(options);
    }

    rxGET(options: RestfulOptions): Observable<any> {
        return this.RESTFUL.rxGET(options);
    }

    rxPOST(options: RestfulParamsOptions): Observable<any> {
        return this.RESTFUL.rxPOST(options);
    }

    rxPUT(options: RestfulParamsOptions): Observable<any> {
        return this.RESTFUL.rxPUT(options);
    }

    rxDELETE(options: RestfulOptions): Observable<any> {
        return this.RESTFUL.rxDELETE(options);
    }
}

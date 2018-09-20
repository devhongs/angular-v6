import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { RestFulService } from '../../../../sdk/service/restful.service';

@Injectable()
export class H2Service {
    constructor(
        private restService: RestFulService
    ) {}

    getMemberList(): Observable<any> {
        return this.restService.rxGET({
            uriPath: `member`
        });
    }

    saveMember(params: any): Observable<any> {
        return this.restService.rxPOST({
            uriPath: `member`,
            params: params
        });
    }

    deleteMember(id: any): Observable<any> {
        return this.restService.rxDELETE({
            uriPath: `member/${id}`
        });
    }
}

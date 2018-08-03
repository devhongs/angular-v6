import { Component } from '@angular/core';
import { MenuContentBase } from '../common/menu-content-base';
import { H2Service } from './h2.service';

@Component({
    selector: 'app-h2',
    templateUrl: './h2.component.html',
    providers: [H2Service]
})
export class H2Component extends MenuContentBase {

    member: any = {name: 'hong', age: 11};
    memberList: Array<any>;

    constructor(
        // private service: H2Service
    ) {
        super();
    }

    initComponent() {
        // this.getMemberList();
    }

    // getMemberList() {
    //     this.service.getMemberList().subscribe((data: any) => {
    //         console.log(data);
    //         this.memberList = data;
    //     });
    // }
    //
    // saveMember() {
    //     this.service.saveMember(this.member).subscribe((data: any) => {
    //         console.log(data);
    //         this.getMemberList();
    //     });
    // }
    //
    // deleteMember(id: any) {
    //     this.service.deleteMember(id).subscribe((data: any) => {
    //         console.log(data);
    //         this.getMemberList();
    //     });
    // }
    //
    // cancelMember() {
    //     this.member = {};
    // }
}

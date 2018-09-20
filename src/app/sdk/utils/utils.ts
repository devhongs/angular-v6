import { CodeUtil } from './code.util';
import { DataUtil } from './data.util';
import { DateUtil } from './date.util';
import { NumberUtil } from './number.util';
import { RestfulUtil } from './restful.util';
import { UUIDUtil } from './uuid.util';
import { UnicodeUtil } from './unicode.util';
import { ContextUtil } from './context.util';
import { StorageUtil } from './storage.util';
import { InjectorUtil } from './injector.util';
import { ListUtil } from './list.util';
import { ValidatorUtil } from './validator.util';
import { DomUtil } from './dom.util';

export const Util = {
    Dom: DomUtil,
    Data: DataUtil,
    Date: DateUtil,
    List: ListUtil,
    Number: NumberUtil,
    Restful: RestfulUtil,
    Unicode: UnicodeUtil,
    UUID: UUIDUtil,
    Context: ContextUtil,
    Validator: ValidatorUtil,
    Code: CodeUtil,
    Storage: StorageUtil,
    Injector: InjectorUtil,
};

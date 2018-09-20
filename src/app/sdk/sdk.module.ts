import { NgModule } from '@angular/core';
import { MaxSizeDirective } from './directives/max-size.directive';
import { ExcludePatternDirective } from './directives/exclude-pattern.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        HttpClientModule
    ],
    declarations: [
        MaxSizeDirective,
        ExcludePatternDirective,
    ],
    exports: [
        MaxSizeDirective,
        ExcludePatternDirective,
    ],
    providers: []
})
export class SdkModule {}


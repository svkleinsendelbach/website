import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './components/reports/reports.component';
import { TextSectionModule } from '../text-section/text-section.module';
import { ReportComponent } from './components/report/report.component';

@NgModule({
    declarations: [
        ReportComponent,
        ReportsComponent
    ],
    imports: [
        CommonModule,
        TextSectionModule
    ],
    exports: [
        ReportComponent,
        ReportsComponent
    ]
})
export class ReportsModule { }

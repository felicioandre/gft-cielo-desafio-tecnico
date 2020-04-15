import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { LoadingComponent } from './loading/loading.component';
import { CardComponent } from './card/card.component';
import { HeaderComponent } from './header/header.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    HeaderComponent,
    CardComponent,
    LoadingComponent,
    ChartComponent,
  ],
  exports: [HeaderComponent, CardComponent, LoadingComponent, ChartComponent],
  imports: [CommonModule, ChartsModule],
})
export class ComponentsModule {}

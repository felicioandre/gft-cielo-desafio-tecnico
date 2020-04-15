import { Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';

export interface IChart {
    labels: Label[],
    data: ChartDataSets[]
}

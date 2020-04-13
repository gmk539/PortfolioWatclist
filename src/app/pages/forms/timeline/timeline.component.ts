import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';

import { NbThemeService } from '@nebular/theme';
import { delay, takeWhile } from 'rxjs/operators';

import { LayoutService } from '../../../@core/utils/layout.service';

import { OrdersChart } from '../../../@core/data/orders-chart';
import { OrderProfitChartSummary, OrdersProfitChartData } from '../../../@core/data/orders-profit-chart';


@Component({
  selector: 'ngx-timeline',
  styleUrls: ['./timeline.component.scss'],
  templateUrl: './timeline.component.html',
})
export class TimelineComponent  implements AfterViewInit, OnDestroy, OnChanges, OnInit {

  @Input() 
  companyName: string;


    ordersChartData: OrdersChart;
    period: string = 'week';
  
    private alive = true;
  
    echartsIntance: any;
    option: any;
  
    ngOnChanges(): void {
      this.getOrdersChartData(this.period, this.companyName);
      this.updateOrdersChartOptions(this.ordersChartData);
      // if (this.option) {
      //   this.updateOrdersChartOptions(this.ordersChartData);
      // }
    }
    
    ngOnInit():void{
    //  this.getOrdersChartData(this.period, this.companyName);
    }
  
    constructor(private ordersProfitChartService: OrdersProfitChartData,
        private theme: NbThemeService,
                private layoutService: LayoutService) {
      this.layoutService.onChangeLayoutSize()
        .pipe(
          takeWhile(() => this.alive),
        )
        .subscribe(() => this.resizeChart());

      //  this.getOrdersChartData(this.period, this.companyName);
    }
  
    ngAfterViewInit(): void {
      this.theme.getJsTheme()
        .pipe(
          takeWhile(() => this.alive),
          delay(1),
        )
        .subscribe(config => {
          const eTheme: any = config.variables.orders;
  
          this.setOptions(eTheme);
          this.updateOrdersChartOptions(this.ordersChartData);
        });
    }

    getOrdersChartData(period: string, companySymbol : string) {
        this.ordersProfitChartService.getOrdersChartData(period,companySymbol)
          .pipe(takeWhile(() => this.alive))
          .subscribe(ordersChartData => {
            this.ordersChartData = ordersChartData;
          });
      }
  
    setOptions(eTheme) {
      this.option = {
        grid: {
          left: 40,
          top: 20,
          right: 0,
          bottom: 40,
        },
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: eTheme.tooltipLineColor,
              width: eTheme.tooltipLineWidth,
            },
          },
          textStyle: {
            color: eTheme.tooltipTextColor,
            fontSize: eTheme.tooltipFontSize,
            fontWeight: eTheme.tooltipFontWeight,
          },
          position: 'top',
          backgroundColor: eTheme.tooltipBg,
          borderColor: eTheme.tooltipBorderColor,
          borderWidth: 1,
          formatter: (params) => {
            return Math.round(parseInt(params.value, 10));
          },
          extraCssText: eTheme.tooltipExtraCss,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
         // offset: 5,
          data: [],
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: eTheme.axisTextColor,
            fontSize: eTheme.axisFontSize,
          },
          axisLine: {
            lineStyle: {
              color: eTheme.axisLineColor,
              width: '2',
            },
          },
        },
        yAxis: {
          type: 'value',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: eTheme.axisLineColor,
              width: '1',
            },
          },
          axisLabel: {
            color: eTheme.axisTextColor,
            fontSize: eTheme.axisFontSize,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
  
            lineStyle: {
              color: eTheme.yAxisSplitLine,
              width: '1',
            },
          },
        },
        series: [
          this.getThirdLine(eTheme),
        ],
      };
    }
  
    
    getThirdLine(eTheme) {
      return {
        type: 'line',
        smooth: true,
        symbolSize: 20,
        itemStyle: {
          normal: {
            opacity: 0,
          },
          emphasis: {
            color: '#ffffff',
            borderColor: eTheme.itemBorderColor,
            borderWidth: 2,
            opacity: 1,
          },
        },
        lineStyle: {
          normal: {
            width: eTheme.lineWidth,
            type: eTheme.lineStyle,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: eTheme.thirdLineGradFrom,
            }, {
              offset: 1,
              color: eTheme.thirdLineGradTo,
            }]),
          },
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: eTheme.thirdAreaGradFrom,
            }, {
              offset: 1,
              color: eTheme.thirdAreaGradTo,
            }]),
          },
        },
        data: [],
      };
    }
  
    updateOrdersChartOptions(ordersChartData: OrdersChart) {
      const options = this.option;
      const series = this.getNewSeries(options.series, ordersChartData.linesData);
      const xAxis = this.getNewXAxis(options.xAxis, ordersChartData.chartLabel);
  
      this.option = {
        ...options,
        xAxis,
        series,
      };
    }
  
    getNewSeries(series, linesData: number[][]) {
      return series.map((line, index) => {
        return {
          ...line,
          data: linesData[index],
        };
      });
    }
  
    getNewXAxis(xAxis, chartLabel: string[]) {
      return {
        ...xAxis,
        data: chartLabel,
      };
    }
  
    onChartInit(echarts) {
      this.echartsIntance = echarts;
    }
  
    resizeChart() {
      if (this.echartsIntance) {
        // Fix recalculation chart size
        // TODO: investigate more deeply
        setTimeout(() => {
          this.echartsIntance.resize();
        }, 0);
      }
    }
  
    ngOnDestroy() {
      this.alive = false;
    }
  }
  
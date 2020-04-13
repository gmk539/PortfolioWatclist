import { Injectable } from '@angular/core';
import { PeriodsService } from './periods.service';
import { OrdersChart, OrdersChartData } from '../data/orders-chart';

@Injectable()
export class OrdersChartService extends OrdersChartData {

  private year = [
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
  ];

  private data = { };

  constructor(private period: PeriodsService) {
    super();
    this.data = {
      // week: this.getDataForWeekPeriod(),
      // month: this.getDataForMonthPeriod(),
      // year: this.getDataForYearPeriod(),
    };
  }

  private getDataForWeekPeriod(companySymbol : string): OrdersChart {
    var companyWisePriceData = [
      {
        Name: "International Business Machines Corporation",   
        Symbol: "IBM-USA",
        Data: [110.00,106.34,114.82,114.94,119.29,121.50]
      },
      {
        Name: "Alphabet Inc. Class A",
        Symbol: "GOOGL-USA",
        Data: [1120.84,1097.88,1186.92,1186.51,1210.28,1211.45]
      },
      {
        Name: "Tata Motors Limited Sponsored ADR",
        Symbol: "TTM-USA",      
        Data: [4.12,4.08,4.56,4.34,4.61,5.14]
      },
      {
        Name: "Factset Research Systems Inc.",
        Symbol: "FDS-USA",
         Data: [262.31,253.11,266.90,267.85,270.97,279.16]
      },
      {
        Name: "Wells Fargo & Company",
        Symbol: "WFC-USA",
        Data: [27.22,26.23,28.63,28.77,30.28,33.20]
      },
      {
        Name: "Bank of America Corp",
        Symbol: "BAC-USA",
        Data: [20.57,20.03,21.39,22.14,23.45,24.86]
      },
      {
        Name: "InterGlobe Aviation Ltd",
        Symbol: "INDIGO-IND",
          Data: [999.0,953.25,980.25,990.15,1041.95]
      },
      {
        Name: "L&T Technology Services Ltd.",
        Symbol: "LTTS-IND",
          Data: [1181.10,1107.60,1108.75,1104.50,1173.85]
      },
      {
        Name: "Avenue Supermarts Ltd",
        Symbol: "DMART-IND",
          Data: [2082.70,2066.95,2170.25,2278.75,2392.65]
      },
      {
        Name: "State Bank of India",
        Symbol: "SBIN-IND",
          Data: [186.55,175.50,186.40,183.00,187.75]
      },
      {
        Name: "JPMorgan Chase & Co.",
        Symbol: "JPM-USA",
          Data: [84.05,89.46,90.64,94.30,102.76]
      },
      {
        Name: "Amazon.com, Inc.",
        Symbol: "AMZN-USA",
          Data: [1906.59,1997.59,2011.60,2043.00,2042.76]
      },
      {
        Name: "3M Company",
        Symbol: "MMM-USA",
          Data: [137.91,133.79,140.70,144.60,148.99,147.78]
      },
      {
        Name: "General Motors Company",
        Symbol: "GM-USA",
          Data: [18.19,18.04,19.55,21.30,23.13,24.06]
      },
      {
        Name: "Omega Healthcare Investors, Inc.",
        Symbol: "OHI-USA",
          Data: [24.10,26.58,28.65,32.12,34.59]
      },
      {
        Name: "Microsoft Corporation",
        Symbol: "MSFT-USA",
        Data: [155.26,153.83,165.27,163.49,165.13,165.14]              
      },
      {
        Name: "Apple Inc.",
        Symbol: "APPL-USA",
        Data: [244.93,241.41,262.47,259.43,266.07,267.99]            
      }
    ];
    var comapnyData = companyWisePriceData.filter(function(obj){return (obj.Name == companySymbol || obj.Symbol == companySymbol )});
    var linesDataTemp = [];
    linesDataTemp.push(comapnyData[0].Data);
    return {
      chartLabel: this.getDataLabels(6, this.period.getWeeks()),
      linesData: linesDataTemp,
    };
  }

  private getDataForMonthPeriod(): OrdersChart {
    return {
      chartLabel: this.getDataLabels(47, this.period.getMonths()),
      linesData: [
        [
          5, 63, 113, 156, 194, 225,
          250, 270, 283, 289, 290,
          286, 277, 264, 244, 220,
          194, 171, 157, 151, 150,
          152, 155, 160, 166, 170,
          167, 153, 135, 115, 97,
          82, 71, 64, 63, 62, 61,
          62, 65, 73, 84, 102,
          127, 159, 203, 259, 333,
        ],
        [
          6, 83, 148, 200, 240,
          265, 273, 259, 211,
          122, 55, 30, 28, 36,
          50, 68, 88, 109, 129,
          146, 158, 163, 165,
          173, 187, 208, 236,
          271, 310, 346, 375,
          393, 400, 398, 387,
          368, 341, 309, 275,
          243, 220, 206, 202,
          207, 222, 247, 286, 348,
        ],
        [
          398, 348, 315, 292, 274,
          261, 251, 243, 237, 231,
          222, 209, 192, 172, 152,
          132, 116, 102, 90, 80, 71,
          64, 58, 53, 49, 48, 54, 66,
          84, 104, 125, 142, 156, 166,
          172, 174, 172, 167, 159, 149,
          136, 121, 105, 86, 67, 45, 22,
        ],
      ],
    };
  }

  private getDataForYearPeriod(): OrdersChart {
    return {
      chartLabel: this.getDataLabels(42, this.year),
      linesData: [
        [
          190, 269, 327, 366, 389, 398,
          396, 387, 375, 359, 343, 327,
          312, 298, 286, 276, 270, 268,
          265, 258, 247, 234, 220, 204,
          188, 172, 157, 142, 128, 116,
          106, 99, 95, 94, 92, 89, 84,
          77, 69, 60, 49, 36, 22,
        ],
        [
          265, 307, 337, 359, 375, 386,
          393, 397, 399, 397, 390, 379,
          365, 347, 326, 305, 282, 261,
          241, 223, 208, 197, 190, 187,
          185, 181, 172, 160, 145, 126,
          105, 82, 60, 40, 26, 19, 22,
          43, 82, 141, 220, 321,
        ],
        [
          9, 165, 236, 258, 244, 206,
          186, 189, 209, 239, 273, 307,
          339, 365, 385, 396, 398, 385,
          351, 300, 255, 221, 197, 181,
          170, 164, 162, 161, 159, 154,
          146, 135, 122, 108, 96, 87,
          83, 82, 82, 82, 82, 82, 82,
        ],
      ],
    };
  }

  getDataLabels(nPoints: number, labelsArray: string[]): string[] {
    const labelsArrayLength = labelsArray.length;
    const step = Math.round(nPoints / labelsArrayLength);

    return Array.from(Array(nPoints)).map((item, index) => {
      const dataIndex = Math.round(index / step);

      return index % step === 0 ? labelsArray[dataIndex] : '';
    });
  }

  getOrdersChartData(period: string, companySymbol : string): OrdersChart {
    //return this.data[period];
    return this.getDataForWeekPeriod(companySymbol);
  }
}

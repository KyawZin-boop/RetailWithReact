import api from "@/api";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = () => {
    const { data: totalCount } = api.record.getTotalSaleCountForEachProduct.useQuery();

    const [state, setState] = useState({
        series: [] as number[],
        options: {
          chart: {
            type: 'polarArea' as const,
          },
          stroke: {
            colors: ['#fff']
          },
          fill: {
            opacity: 0.8
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
    });

    useEffect(() => {
      if (totalCount) {
        setState((prevState) => ({
          ...prevState,
          series: totalCount.map((item) => item.saleCount),
          options: {
            ...prevState.options,
            // Use the product name (or productCode) as labels
            labels: totalCount.map((item) => item.productName) // or item.name
          }
        }));
      }
    }, [totalCount]);

    return (
      <div>
        <div id="chart" className="">
            <ReactApexChart options={state.options} series={state.series} type="polarArea" height={"800px"}/>
          </div>
        <div id="html-dist"></div>
      </div>
    );
  }

  export default ApexChart;
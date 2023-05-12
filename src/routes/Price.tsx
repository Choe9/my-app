import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ReactApexChart from "react-apexcharts";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface PriceProps {
  coinId?: string;
}

interface ToggleDarkType {
  isDark: boolean;
}

function Price() {
  // const { coinId } = useOutletContext() as ChartProps;
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", "btc-bitcoin"],
    // ["ohlcv", coinId],
    // () => fetchCoinHistory(coinId),
    () => fetchCoinHistory("btc-bitcoin"),
    {
      refetchInterval: 10000,
    }
  );

  const { isDark } = useOutletContext<ToggleDarkType>();

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ReactApexChart
          type="bar"
          series={[
            {
              name: "LowPrice",
              data: data?.map((price) => Number(price.low)) as number[],
            },
            {
              name: "HighPrice",
              data: data?.map((price) => Number(price.high)) as number[],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              // height: 300,
              // width: 500,
              toolbar: {
                show: false,
              },
              background: "rgba(0, 0, 0, 0.5)",
              stacked: true,
              // stackType: "normal",
            },
            // grid: { show: false },
            // stroke: {
            //   curve: "smooth",
            //   width: 4,
            // },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
            },
            // fill: {
            //   type: "gradient",
            //   gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            // },
            // colors: ["#0fbcf9"],
            // tooltip: {
            //   y: {
            //     formatter: (value) => `$ ${value.toFixed(3)}`,
            //   },
            // },
            colors: ["#FF4560", "#008FFB"],
            plotOptions: {
              bar: {
                horizontal: true,
                barHeight: "70%",
              },
            },

            dataLabels: {
              enabled: true,
            },
            // stroke: {
            //   width: 1,
            //   colors: ["#fff"],
            // },
            grid: {
              xaxis: {
                lines: {
                  show: false,
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Price;

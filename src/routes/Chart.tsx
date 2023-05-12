import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

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

interface ChartProps {
  coinId?: string;
}

function Chart() {
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

  const isDark = useRecoilValue(isDarkAtom);

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ReactApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((price) => {
                return {
                  x: new Date(price.time_close * 1000),
                  y: [
                    Number(price.open),
                    Number(price.high),
                    Number(price.low),
                    Number(price.close),
                  ],
                };
              }),
            } as { data: { x: Date; y: number[] }[] },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "rgba(0, 0, 0, 0.5)",
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
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#DF7D46",
                  downward: "#3C90EB",
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;

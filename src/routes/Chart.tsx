import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';

interface IHistoricalData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ChartProps {
  coinID: string;
}

const Chart = ({ coinID }: ChartProps) => {
  const { isLoading, data } = useQuery<IHistoricalData[]>(['ohlcv', coinID], () => fetchCoinHistory(coinID!));
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <div>
      {isLoading ? (
        'Loading Chart...'
      ) : (
        <ApexChart
          type='candlestick'
          series={[
            {
              name: 'Price',
              data: data?.map((price) => ({
                x: price.time_close,
                y: [price.open, price.high, price.low, price.close],
              })),
            },
          ]}
          options={{
            yaxis: {
              show: false,
            },
            grid: {
              yaxis: {
                lines: {
                  show: false,
                },
              },
            },
            chart: {
              type: 'candlestick',
              width: 500,
              height: 500,
              toolbar: {
                show: false,
              },
            },
            theme: {
              mode: isDark ? 'dark' : 'light',
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;

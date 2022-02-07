import { useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchCoinPrice } from '../api';

const PriceWrapper = styled.div``;
const PriceItems = styled.div``;

const PriceItem = styled.div`
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${(props) => props.theme.textColor};
  border: none;
  margin: 10px;
  height: 30px;
  display: flex;
  align-items: center;
  span:first-child {
    padding: 10px;
    text-transform: uppercase;
  }
`;

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

export interface BaseSyntheticEvent<E = object, C = any, T = any> {
  nativeEvent: E;
  currentTarget: C;
  target: T;
  bubbles: boolean;
  cancelable: boolean;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  preventDefault(): void;
  isDefaultPrevented(): boolean;
  stopPropagation(): void;
  isPropagationStopped(): boolean;
  persist(): void;
  timeStamp: number;
  type: string;
}

const Price = ({ coinID }: ChartProps) => {
  const { isLoading, data: priceData } = useQuery<IHistoricalData[]>(['price', coinID], () => fetchCoinPrice(coinID!));
  return (
    <PriceWrapper>
      {isLoading ? (
        'Loading...'
      ) : (
        <PriceItems>
          {priceData?.map((price) => (
            <>
              <PriceItem>
                <span>Date : </span>
                <span>{price.time_close.slice(5, 10)}</span>
              </PriceItem>
              <PriceItem>
                <span>Open : </span>
                <span>${price.open.toFixed(3)}</span>
              </PriceItem>
              <PriceItem>
                <span>High : </span>
                <span>${price.high.toFixed(3)}</span>
              </PriceItem>
              <PriceItem>
                <span>Low : </span>
                <span>${price.low.toFixed(3)}</span>
              </PriceItem>
              <PriceItem>
                <span>Close : </span>
                <span>${price.close.toFixed(3)}</span>
              </PriceItem>
              <PriceItem>
                <span>Volume : </span>
                <span>${price.volume}</span>
              </PriceItem>
              <PriceItem>
                <span>Market Cap : </span>
                <span>${price.market_cap}</span>
              </PriceItem>
            </>
          ))}
        </PriceItems>
      )}
    </PriceWrapper>
  );
};

export default Price;

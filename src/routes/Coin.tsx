import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Route, Routes, useLocation, useParams, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
import Chart from './Chart';
import Price from './Price';
import { Helmet } from 'react-helmet';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const BackBtn = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.5);
  color: ${(params) => params.theme.textColor};
  margin: 20px;
  height: 30px;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const CoinWrapper = styled.div`
  height: 10vh;
  display: flex;
  padding: 0px 10px;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  border-radius: 10px;
`;

const CoinExplain = styled.p`
  margin: 10px;
  font-size: 20px;
  line-height: 30px;
`;

const CoinWrapperItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  font-size: 20px;
  span:nth-child(1) {
    font-size: 10px;
  }
  span {
    padding: 2px;
  }
`;

const Tabs = styled.div`
  height: 5vh;
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  border-radius: 10px;
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) => (props.isActive ? props.theme.accentColor : props.theme.textColor)};
  a {
    display: block;
  }
`;

const Header = styled.header`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface RouteState {
  state: {
    name: string;
  };
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  tags: object;
  team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface ICoinProps {}

const Coin = ({}: ICoinProps) => {
  const { coinID } = useParams();
  const { state } = useLocation() as RouteState;
  const priceMatch = useMatch('/:coinID/price');
  const chartMatch = useMatch('/:coinID/chart');
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(['info', coinID], () => fetchCoinInfo(coinID!));
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(['tickers', coinID], () => fetchCoinTickers(coinID!), {
    refetchInterval: 10000,
  });

  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Helmet>
        <title>{state?.name || infoData?.name}</title>
      </Helmet>
      <Header>
        <Title>{state?.name || infoData?.name} </Title>
        <Link to='/'>
          <BackBtn>&larr; Back</BackBtn>
        </Link>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <CoinWrapper>
            <CoinWrapperItem>
              <span>RANK :</span>
              <span>{infoData?.rank}</span>
            </CoinWrapperItem>
            <CoinWrapperItem>
              <span>SYMBOL :</span>
              <span>{infoData?.symbol}</span>
            </CoinWrapperItem>
            <CoinWrapperItem>
              <span>PRICE :</span>
              <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
            </CoinWrapperItem>
          </CoinWrapper>
          <CoinExplain>{infoData?.description}</CoinExplain>
          <CoinWrapper>
            <CoinWrapperItem>
              <span>TOTAL SUPPLY :</span>
              <span>{tickersData?.total_supply}</span>
            </CoinWrapperItem>
            <CoinWrapperItem>
              <span>MAX SUPPLY :</span>
              <span>{tickersData?.max_supply}</span>
            </CoinWrapperItem>
          </CoinWrapper>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinID}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinID}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Routes>
            <Route path={'/price'} element={<Price coinID={coinID!} />} />
            <Route path={'/chart'} element={<Chart coinID={coinID!} />} />
          </Routes>
        </>
      )}
    </Container>
  );
};

export default Coin;

import styles from './Statistics.module.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  AreaChart,
  Legend,
  Tooltip,
} from 'recharts';
import GraphSelecter from '../../components/GraphFooter/GraphSelector';
import { apiConfig, ApiError } from '../../api/ApiConfig';
import { StatsApi } from '@codecharacter-2024/client';
import { useState, useEffect } from 'react';
import Toast from 'react-hot-toast';
import {
  DCToolTip,
  LineChartToolTip,
  AreaChartToolTip,
} from '../../components/GraphToolTips/ToolTips';

const Statistics = () => {
  const [selected, setSelected] = useState(0);
  const [data, setData] = useState<any>({});
  const [top, setTop] = useState(true);

  const fetchTop = () => {
    const statisticsApi = new StatsApi(apiConfig);
    statisticsApi
      .getStats()
      .then(response => {
        const cdata = [];
        for (let i = 0; i < response[0].length; i++) {
          const currentDataObject = {};
          const player1Data = response[0][i];
          let player2Data = response[0][i];
          if (response.length == 2) {
            setTop(false);
            player2Data = response[1][i];
          }
          for (const keys in player1Data) {
            currentDataObject[`${keys}1`] = player1Data[keys];
            currentDataObject[`${keys}2`] = player2Data[keys];
          }
          cdata.push(currentDataObject);
        }
        setData(cdata);
      })
      .catch(error => {
        setData(null);
        if (error instanceof ApiError) Toast.error(error.message);
      });
  };
  useEffect(() => {
    fetchTop();
  }, []);
  const titles = [
    'Average Attack Rates',
    'Coins Usage Per Match',
    'Daily Challenges Wins',
  ];
  return (
    <>
      <div className={styles.parent}>
        {data != null ? (
          <>
            <div className={styles.footer}>
              <h1 className={styles.title}>{titles[selected]}</h1>
            </div>
            <div className={styles.bg}>
              <div className={styles.graphContainer}>
                <GraphSelecter
                  graph={titles}
                  selected={selected}
                  setSelected={setSelected}
                />
                <div className={styles.graphParent}>
                  {selected == 0 && (
                    <AreaChart
                      width={1130}
                      height={600}
                      data={data}
                      margin={{
                        right: 80,
                        bottom: 30,
                      }}
                    >
                      <defs>
                        <linearGradient
                          id="colorUv"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#8884d8"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#8884d8"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorPv"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#82ca9d"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#82ca9d"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>

                      <XAxis
                        className={styles.axis}
                        stroke="white"
                        label={{
                          value: 'Past Days',
                          position: 'insideBottomRight',
                          offset: -15,
                        }}
                      />
                      <YAxis className={styles.axis} stroke="white" />
                      <Tooltip
                        cursor={{
                          fill: '#ffffff34',
                        }}
                        content={<LineChartToolTip external={external} />}
                      />
                      <CartesianGrid strokeDasharray="3 3" />
                      {!top && (
                        <Area
                          type="monotone"
                          strokeWidth="4px"
                          dataKey="avgAtk1"
                          stroke="#8884d8"
                          fillOpacity={1}
                          fill="url(#colorUv)"
                          activeDot={{ r: 8 }}
                          name="You"
                        />
                      )}
                      <Area
                        type="monotone"
                        dataKey="avgAtk2"
                        strokeWidth="2px"
                        strokeDasharray="5 5"
                        stroke="#82ca9d"
                        activeDot={{ r: 3 }}
                        fillOpacity={1}
                        fill="url(#colorPv)"
                        name="Leaderboard Top"
                      />

                      <Legend
                        wrapperStyle={{
                          fontFamily: 'monospace',
                          fontStyle: 'bold',
                          fontWeight: '900',
                        }}
                        verticalAlign="top"
                      />
                    </AreaChart>
                  )}
                  {selected == 1 && (
                    <AreaChart
                      width={1130}
                      height={600}
                      data={data}
                      margin={{
                        right: 80,
                        bottom: 30,
                      }}
                    >
                      <defs>
                        <linearGradient
                          id="colorUv"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#00ffff"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#00ffff"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorPv"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#ffff66"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#ffff66"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>

                      <XAxis
                        className={styles.axis}
                        stroke="white"
                        label={{
                          value: 'Past Days',
                          position: 'insideBottomRight',
                          offset: -15,
                        }}
                      />
                      <YAxis className={styles.axis} stroke="white" />
                      <Tooltip
                        cursor={{
                          fill: '#ffffff34',
                        }}
                        content={<AreaChartToolTip external={external} />}
                      />
                      <CartesianGrid strokeDasharray="3 3" />
                      {!top && (
                        <Area
                          type="monotone"
                          strokeWidth="4px"
                          dataKey="coins1"
                          stroke="#00ffff"
                          fillOpacity={1}
                          fill="url(#colorUv)"
                          activeDot={{ r: 8 }}
                          name="You"
                        />
                      )}
                      <Area
                        type="monotone"
                        dataKey="coins2"
                        strokeWidth="2px"
                        strokeDasharray="5 5"
                        stroke="#ffff66"
                        activeDot={{ r: 3 }}
                        fillOpacity={1}
                        fill="url(#colorPv)"
                        name="Leaderboard Top"
                      />

                      <Legend
                        wrapperStyle={{
                          fontFamily: 'monospace',
                          fontStyle: 'bold',
                          fontWeight: '900',
                        }}
                        verticalAlign="top"
                      />
                    </AreaChart>
                  )}
                  {selected == 2 && (
                    <LineChart
                      width={1130}
                      height={600}
                      data={data}
                      margin={{
                        right: 80,
                        bottom: 30,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        className={styles.axis}
                        stroke="white"
                        label={{
                          value: 'Past Days',
                          position: 'insideBottomRight',
                          offset: -15,
                        }}
                      />
                      <YAxis className={styles.axis} stroke="white" />

                      <Legend
                        wrapperStyle={{
                          fontFamily: 'monospace',
                          fontStyle: 'bold',
                          fontWeight: '900',
                        }}
                        verticalAlign="top"
                      />
                      <Tooltip
                        cursor={{
                          fill: '#ffffff34',
                        }}
                        content={<DCToolTip external={external} />}
                      />
                      {!top && (
                        <Line
                          type="monotone"
                          dataKey="dc_wins1"
                          stroke="#8884d8"
                          strokeWidth="4px"
                          activeDot={{ r: 8 }}
                          name="You"
                        />
                      )}
                      <Line
                        type="monotone"
                        strokeDasharray="5 5"
                        strokeWidth="2px"
                        dataKey="dc_wins2"
                        activeDot={{ r: 3 }}
                        stroke="#82ca9d"
                        name="Leaderboard Top"
                      />
                    </LineChart>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={`${styles.bg} ${styles.error}`}>
            Start a match for recoding statistics!
          </div>
        )}
      </div>
    </>
  );
};

export default Statistics;

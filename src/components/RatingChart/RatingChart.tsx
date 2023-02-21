import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Loader from '../Loader/Loader';
import styles from './RatingHistory.module.css';
import {
  CurrentUserApi,
  RatingHistory,
  UserApi,
} from '@codecharacter-2023/client';
import { apiConfig, ApiError } from '../../api/ApiConfig';
import Toast from 'react-hot-toast';

function RatingHistoryChart() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<RatingHistory[]>([]);
  const [labelItems, setLabelItems] = useState<string[]>([]);
  const [dataItems, setDataItems] = useState<number[]>([]);
  const userApi = new UserApi(apiConfig);
  let currentUser: string;
  const currentUserApi = new CurrentUserApi(apiConfig);
  currentUserApi.getCurrentUser().then(response => {
    currentUser = response.id;
    console.log(currentUser);
  });
  const labels: string[] = [];
  const ratings: number[] = [];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );

  const data = {
    labelItems,
    datasets: [
      {
        label: 'Rating History',
        data: dataItems,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  useEffect(() => {
    fetchRatingHistory();
  }, []);

  useEffect(() => {
    items &&
      items.map((entry: RatingHistory) => {
        const label = entry.validFrom;
        labels.push(label);
        const rating = entry.rating + entry.ratingDeviation;
        ratings.push(rating);
        setDataItems(ratings);
        setLabelItems(labels);
      });
  }, []);

  function fetchRatingHistory() {
    setIsLoaded(false);
    const ratingHistory = userApi.getRatingHistory(currentUser);
    ratingHistory
      .then(response => {
        setItems(response);
        setIsLoaded(true);
      })
      .catch(error => {
        if (error instanceof ApiError) Toast.error(error.message);
      });
  }

  return (
    <>
      <>{!isLoaded ? <Loader /> : <Bar options={options} data={data} />}</>
    </>
  );
}

export default function ratingHistory(): JSX.Element {
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <h1 className={styles.header__title}>
          <span>Rating Chart</span>
        </h1>
      </div>
      <div className={styles.ranklist}>
        <RatingHistoryChart />
      </div>
    </div>
  );
}

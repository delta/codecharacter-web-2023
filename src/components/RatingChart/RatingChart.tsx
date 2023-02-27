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
  const [currentUser, setCurrentUser] = useState<string>('');
  const userApi = new UserApi(apiConfig);

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
        text: 'YOUR RATING HISTORY',
      },
    },
  };

  const [data, setData] = useState({
    labels: ['a'],
    datasets: [
      {
        label: '',
        data: [1],
        backgroundColor: '',
      },
    ],
  });

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );

  useEffect(() => {
    setData({
      labels: labelItems,
      datasets: [
        {
          label: 'Rating History',
          data: dataItems,
          backgroundColor: 'rgb(59, 128, 121)',
        },
      ],
    });
  }, [labelItems]);

  useEffect(() => {
    const currentUserApi = new CurrentUserApi(apiConfig);
    currentUserApi.getCurrentUser().then(response => {
      setCurrentUser(response.id);
    });
  }, []);

  useEffect(() => {
    fetchRatingHistory();
  }, [currentUser]);

  useEffect(() => {
    items &&
      items.map((entry: RatingHistory) => {
        const labelfull = entry.validFrom;
        const label = labelfull.slice(11, 19);
        labels.push(label);
        const rating = entry.rating;
        ratings.push(rating);
        setDataItems(ratings);
        setLabelItems(labels);
      });
  }, [isLoaded]);

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

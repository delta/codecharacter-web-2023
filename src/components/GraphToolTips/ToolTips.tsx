import styles from './GraphToolTip.module.css';
export const BarChartToolTip = ({ active, payload }: ToolTipProps) => {
  console.log(active);
  console.log(payload);
  if (active && payload && payload.length) {
    return (
      <div className={styles.barChartToolTip}>
        <ul>
          <li className="label">{`Your Wins: ${payload[0].value}`}</li>
          <li className="label">{`Your Losses: ${payload[1].value}`}</li>
        </ul>
      </div>
    );
  }

  return null;
};

export const LineChartToolTip = ({ active, payload }: ToolTipProps) => {
  console.log(active);
  console.log(payload);

  if (active && payload && payload.length) {
    return (
      <div className={styles.barChartToolTip}>
        <ul>
          {payload.length == 2 && (
            <li className="label">{`Your Attacks ${payload[0].value}%`}</li>
          )}
          <li className="label">{`Leaderboard Top: ${
            payload.at(-1).value
          }%`}</li>
        </ul>
      </div>
    );
  }
  return null;
};

export const AreaChartToolTip = ({ active, payload }: ToolTipProps) => {
  console.log(active);
  console.log(payload);

  if (active && payload && payload.length) {
    return (
      <div className={styles.barChartToolTip}>
        <div>
          <p>Coins Used By:</p>
          <ul>
            {payload.length == 2 && (
              <li className="label">{`You: ${payload[0].value}`}</li>
            )}
            <li className="label">{`Leaderboard Top: ${
              payload.at(-1).value
            }`}</li>
          </ul>
        </div>
      </div>
    );
  }
  return null;
};
export const DCToolTip = ({ active, payload }: ToolTipProps) => {
  console.log(active);
  console.log(payload);

  if (active && payload && payload.length) {
    return (
      <div className={styles.barChartToolTip}>
        <div>
          <p>Daily Challenges Attempts Made:</p>
          <ul>
            {payload.length == 2 && (
              <li className="label">{`You: ${payload[0].value}`}</li>
            )}
            <li className="label">{`Leaderboard Top: ${
              payload.at(-1).value
            }`}</li>
          </ul>
        </div>
      </div>
    );
  }
  return null;
};

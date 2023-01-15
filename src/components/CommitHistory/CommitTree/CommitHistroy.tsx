import { CodeRevision, GameMapRevision } from '@codecharacter-2023/client';
import { useState } from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import './CommitHistory.css';

type PropsType = {
  commitID: (commitID: string) => void;
  commitHistoryDetails: CodeRevision[] | GameMapRevision[];
  SelectedButton: string;
};

export default function CommitHistory(props: PropsType): JSX.Element {
  const CircleIcon = {
    background: '#DFFF00',
    color: '#fff',
  };

  const [commitNumber, setCommitNumber] = useState('0');

  const parseTimeFormat = (machineTime: string) => {
    const datepart = machineTime.substring(8, 10);
    const monthpart = machineTime.substring(5, 7);
    const yearpart = machineTime.substring(0, 4);
    return `${datepart}-${monthpart}-${yearpart}`;
  };

  return (
    <VerticalTimeline layout="1-column-left" lineColor="#EAEAEA">
      {props.commitHistoryDetails && props.commitHistoryDetails.length > 0 ? (
        props.commitHistoryDetails.map(eachCommit => {
          return (
            <VerticalTimelineElement
              key={eachCommit.id.toString()}
              className="vertical-timeline-element--work"
              contentStyle={{
                background: 'rgba(26, 26, 26, 0.7)',
                color: '#fff',
              }}
              date={parseTimeFormat(eachCommit.createdAt.toString())}
              iconStyle={
                commitNumber == eachCommit.id
                  ? CircleIcon
                  : { background: '#444444', color: '#444444' }
              }
              onTimelineElementClick={() => {
                setCommitNumber(eachCommit.id);
                props.commitID(eachCommit.id);
              }}
            >
              <h6 className="vertical-timeline-element-title">
                {eachCommit.message}
              </h6>
            </VerticalTimelineElement>
          );
        })
      ) : (
        <h1 className="noCommitStyle">No Commits available</h1>
      )}
    </VerticalTimeline>
  );
}

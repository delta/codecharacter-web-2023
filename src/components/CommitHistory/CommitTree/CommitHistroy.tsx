import { CodeRevision, GameMapRevision } from '@codecharacter-2023/client';
import React, { useEffect, useState } from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import './CommitHistory.css';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from '../HistoryMain/History.module.css';
import { useAppDispatch } from '../../../store/hooks';
import {
  codeCommitIDChanged,
  codeCommitNameChanged,
  isSelfMatchModalOpened,
  mapCommitIDChanged,
  mapCommitNameChanged,
} from '../../../store/SelfMatchMakeModal/SelfMatchModal';
import { Button } from 'react-bootstrap';

type PropsType = {
  commitID: (commitID: string) => void;
  commitHistoryDetails: CodeRevision[] | GameMapRevision[];
  BigButton: string;
};

export default function CommitHistory(props: PropsType): JSX.Element {
  const CircleIcon = {
    background: '#DFFF00',
    color: '#fff',
  };

  const dispatch = useAppDispatch();
  const [commitNumber, setCommitNumber] = useState('0');

  function handleCommitSelect(e: React.MouseEvent<HTMLDivElement>) {
    // Since the button has an icon, event
    // target doesnt give the button element
    // when clicked on the icon. Hence we get the
    // parent if clicked on icon
    const target = e.target as HTMLDivElement;
    if (target.getAttribute('data-uuid') === null) {
      if (
        (target.parentNode as HTMLButtonElement)?.getAttribute('data-uuid') !==
        null
      ) {
        if (props.BigButton === 'Code') {
          dispatch(
            codeCommitNameChanged(
              (target.parentNode as HTMLButtonElement)?.getAttribute(
                'data-name',
              ) || '',
            ),
          );
          dispatch(
            codeCommitIDChanged(
              (target.parentNode as HTMLButtonElement)?.getAttribute(
                'data-uuid',
              ) || '',
            ),
          );
        } else {
          dispatch(
            mapCommitNameChanged(
              (target.parentNode as HTMLButtonElement)?.getAttribute(
                'data-name',
              ) || '',
            ),
          );
          dispatch(
            mapCommitIDChanged(
              (target.parentNode as HTMLButtonElement)?.getAttribute(
                'data-uuid',
              ) || '',
            ),
          );
        }
      } else {
        if (props.BigButton === 'Code') {
          dispatch(
            codeCommitNameChanged(
              (
                target.parentNode?.parentNode as HTMLButtonElement
              )?.getAttribute('data-name') || '',
            ),
          );
          dispatch(
            codeCommitIDChanged(
              (
                target.parentNode?.parentNode as HTMLButtonElement
              )?.getAttribute('data-uuid') || '',
            ),
          );
        } else {
          dispatch(
            mapCommitNameChanged(
              (
                target.parentNode?.parentNode as HTMLButtonElement
              )?.getAttribute('data-name') || '',
            ),
          );
          dispatch(
            mapCommitIDChanged(
              (
                target.parentNode?.parentNode as HTMLButtonElement
              )?.getAttribute('data-uuid') || '',
            ),
          );
        }
      }
    } else {
      if (props.BigButton === 'Code') {
        dispatch(codeCommitNameChanged(target.getAttribute('data-name') || ''));
        dispatch(codeCommitIDChanged(target.getAttribute('data-uuid') || ''));
      } else {
        dispatch(mapCommitNameChanged(target.getAttribute('data-name') || ''));
        dispatch(mapCommitIDChanged(target.getAttribute('data-uuid') || ''));
      }
    }

    dispatch(isSelfMatchModalOpened(true));
  }
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
              {/* <div
                className="flex d-flex justify-content-start"
                onClick={e => handleCommitSelect(e)}
              >
              </div> */}
            </VerticalTimelineElement>
          );
        })
      ) : (
        <h1 className="noCommitStyle">No Commits available</h1>
      )}
    </VerticalTimeline>
  );
}

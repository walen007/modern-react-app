import React from 'react';
import { ILaunch } from '@@types';
import { Heading, Section } from '@atoms';
import { PastLaunchList } from '@molecules';
import styles from './PastLaunches.module.scss';

interface IPastLaunchesProps {
  pastLaunches: ILaunch[];
}

// eslint-disable-next-line react-refresh/only-export-components
const PastLaunches: React.FC<IPastLaunchesProps> = ({ pastLaunches, ...props }): JSX.Element => {
  return (
    <Section customClass={styles.pastLaunches} {...props}>
      {/*  TODO: Translations */}
      <Heading tabIndex={23}>Past launches</Heading>
      <PastLaunchList pastLaunches={pastLaunches} />
    </Section>
  );
};

const memoizedPastLaunches = React.memo(PastLaunches);
export default memoizedPastLaunches;

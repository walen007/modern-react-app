import React from 'react';
import { ILaunch } from '@@types';
import { UList, ListItem } from '@atoms';
import styles from './PastLaunchList.module.scss';

interface IPastLaunchListProps {
  pastLaunches: ILaunch[];
}

export const PastLaunchList: React.FC<IPastLaunchListProps> = ({ pastLaunches, ...props }): JSX.Element => {
  return (
    <UList
      data-testid="past-launch-list"
      aria-description="List of SpaceX past launches"
      customClass={styles.launchList}
      {...props}
    >
      {pastLaunches.map((launch: ILaunch, idx: number) => {
        let rootIndex = 24;
        if (idx > 0) rootIndex += idx * 3;

        return (
          <ListItem
            aria-description="SpaceX past launches list item"
            aria-live="polite"
            key={launch.id}
            tabIndex={rootIndex + 1}
            customClass={styles.launchItem}
          >
            <div tabIndex={rootIndex + 2} className={styles.launchName}>
              {launch.name}
            </div>
            <div tabIndex={rootIndex + 3} className={styles.launchId}>
              ID: {launch.id}
            </div>
          </ListItem>
        );
      })}
    </UList>
  );
};

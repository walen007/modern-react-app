import { forwardRef } from 'react';
import { ILaunch } from '@@types';

import { Section, SuccessIndicator } from '@atoms';
import styles from './SearchResult.module.scss';
import { Timer } from './Timer';

interface ISearchResultProps {
  launch: ILaunch;
}

const SearchResult = forwardRef<HTMLElement, ISearchResultProps>(({ launch, ...props }, ref?): JSX.Element => {
  return (
    <Section
      data-testid="search-result"
      tabIndex={-1}
      aria-description="Launch ID data was successfully retrieved"
      ref={ref}
      customClass={styles.selectedLaunch}
      {...props}
    >
      <div className={styles.selectedInfo}>
        <div className={styles.topInfo}>
          <div aria-live="assertive" tabIndex={13} className={styles.selectedName}>
            {launch.name}
          </div>
          <SuccessIndicator
            data-testid="success-indicator"
            tabIndex={14}
            aria-live="assertive"
            aria-description={
              launch.success === true
                ? `Success Indicator: The SpaceX ${launch.name} was a successful launch`
                : `Success Indicator: The SpaceX ${launch.name} was not a successful launch`
            }
            isSuccess={launch.success}
          />
        </div>

        <div className={styles.bottomInfo}>
          <div>
            <div data-testid="time-elapsed-title" tabIndex={15}>
              Elapsed time since launch
            </div>
            <Timer customClass={styles.elapsedTime} date={launch.date_local} />
          </div>
          <div tabIndex={17} className={styles.launchId}>
            ID: {launch.id}
          </div>
        </div>
      </div>
    </Section>
  );
});

export default SearchResult;

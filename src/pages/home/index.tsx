import { lazy } from 'react';
import { Heading, Section } from '@atoms';
import ErrorBoundary from '@organisms/ErrorBoundary';
import { useHome } from './useHome';
import styles from './home.module.scss';

const SearchBox = lazy(() => import('@organisms/SearchBox'));
const SearchResult = lazy(() => import('@organisms/SearchResult'));
const PastLaunches = lazy(() => import('@organisms/PastLaunches'));

const Home = (): JSX.Element => {
  // prettier-ignore
  const {
    searchRef,
    searchResultRef,
    errorRef,
    isFetching,
    selectedLaunch,
    pastLaunches,
    appError,
    getLaunch,
  } = useHome();

  return (
    <>
      <ErrorBoundary fallback="An error occurred while searching launch ID.">
        <SearchBox ref={searchRef} getLaunch={getLaunch} isFetching={isFetching} />
      </ErrorBoundary>
      {(appError || selectedLaunch?.id) && (
        <Heading customClass={styles.searchResultHeading} tabIndex={12}>
          {/*  TODO: Translations */}
          Search result
        </Heading>
      )}
      {appError && (
        <Section
          data-testid="error-message"
          ref={errorRef}
          aria-live="assertive"
          aria-description="Error Message: "
          tabIndex={-1}
          customClass={styles.error}
        >
          {appError}
        </Section>
      )}
      {selectedLaunch?.id && (
        <ErrorBoundary fallback="An error occurred while displaying the search result.">
          <SearchResult ref={searchResultRef} launch={selectedLaunch} />
        </ErrorBoundary>
      )}
      {pastLaunches.length > 0 && (
        <ErrorBoundary fallback="An error occurred while getting the latest SpaceX launches.">
          <PastLaunches pastLaunches={pastLaunches} />
        </ErrorBoundary>
      )}
    </>
  );
};

export default Home;

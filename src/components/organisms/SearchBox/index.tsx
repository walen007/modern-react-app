import { useCallback, PointerEvent, KeyboardEvent, forwardRef } from 'react';
import { Button, Section, TextInput, LoadingSvg } from '@atoms';
import styles from './SearchBox.module.scss';

interface ISearchBoxProps {
  isFetching: boolean;
  getLaunch: () => void;
}

const SearchBox = forwardRef<HTMLInputElement, ISearchBoxProps>(
  ({ isFetching, getLaunch, ...props }, ref?): JSX.Element => {
    const handleSearch = useCallback(
      (_event: PointerEvent<HTMLButtonElement>) => {
        _event.stopPropagation();
        getLaunch();
      },
      [getLaunch]
    );

    const handleKeyPress = useCallback(
      (_event: KeyboardEvent<HTMLInputElement>) => {
        _event.stopPropagation();

        if (_event.key === 'Enter') {
          getLaunch();
        }
      },
      [getLaunch]
    );

    // TODO: Translations
    return (
      <Section customClass={styles.searchBox} {...props}>
        <TextInput
          data-testid="search-text"
          type="search"
          tabIndex={5}
          ref={ref}
          handleKeyPress={handleKeyPress}
          placeholder="Enter Launch ID"
        />
        <Button data-testid="submit-button" tabIndex={6} onClick={handleSearch} isFetching={isFetching}>
          {isFetching === true ? <LoadingSvg /> : 'Search'}
        </Button>
      </Section>
    );
  }
);

export default SearchBox;

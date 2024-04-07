import { useEffect, useRef, useState, useCallback } from 'react';
import { HttpStatus, ILaunch } from '@@types';
import { useSpaceX } from '@hooks/api/useSpaceX';

interface IUseHome {
  searchRef: React.RefObject<HTMLInputElement>;
  searchResultRef: React.RefObject<HTMLElement>;
  errorRef: React.RefObject<HTMLElement>;
  isFetching: boolean;
  selectedLaunch?: ILaunch | null;
  pastLaunches: ILaunch[];
  appError?: string | null;
  getLaunch: () => void;
}

export const useHome = (): IUseHome => {
  const [isFetching, setIsFetching] = useState(false);
  const [selectedLaunch, setSelectedLaunch] = useState<ILaunch | null>();
  const [pastLaunches, setPastLaunches] = useState<ILaunch[]>([]);
  const [appError, setAppError] = useState<string | null>();

  const api = useSpaceX();
  const searchRef = useRef<HTMLInputElement>(null);
  const searchResultRef = useRef<HTMLElement>(null);
  const errorRef = useRef<HTMLElement>(null);

  useEffect(() => {
    void (async (): Promise<void> => {
      const { status, data, errorMessage } = await api.getLaunches();

      if (status !== HttpStatus.OK && errorMessage) {
        setAppError(errorMessage);

        setTimeout(() => {
          if (errorRef.current) errorRef.current.focus();
        }, 100);

        return;
      }

      setPastLaunches(data as ILaunch[]);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLaunch = useCallback(() => {
    void (async (): Promise<void> => {
      if (searchRef.current && searchRef.current.value.length > 0) {
        searchRef.current.style.border = '1px solid var(--font-color)';

        setIsFetching(true);
        // TODO: Frontend input validation/sanitization
        const { status, data, errorMessage } = await api.getLaunch(searchRef.current.value);
        setIsFetching(false);

        if (status !== HttpStatus.OK) {
          setSelectedLaunch(null);
          setAppError(errorMessage);

          setTimeout(() => {
            if (errorRef.current) errorRef.current.focus();
          }, 100);

          return;
        }

        setAppError(null);

        setTimeout(() => {
          if (searchResultRef.current) searchResultRef.current.focus();
        }, 100);

        return setSelectedLaunch(data);
      }

      setAppError('Please enter a valid Launch ID');
      if (searchRef.current) searchRef.current.style.border = '1px solid red';

      setTimeout(() => {
        if (errorRef.current) errorRef.current.focus();
      }, 100);
    })();
  }, [api]);

  return {
    searchRef,
    searchResultRef,
    errorRef,
    isFetching,
    selectedLaunch,
    pastLaunches,
    appError,
    getLaunch,
  };
};

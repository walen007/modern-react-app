import React from 'react';
import { render, waitFor, fireEvent } from '@test/test-utils';
import { pastLaunchesAll } from '@test/past-launches-all';
import { searchLaunchId } from '@test/search';
import { pastLaunchesMixed } from '@test/past-launches-mixed';

const Home = React.lazy(() => import('.'));

const allPastLaunches: Response = {
  ok: true,
  status: 200,
  statusText: 'OK',
  headers: {
    // @ts-ignore
    'Content-Type': 'application/json',
  },
  json: () => Promise.resolve(pastLaunchesAll),
};

vi.mock('./LazyComponent', () => {
  return {
    __esModule: true,
    default: () => <Home />,
  };
});

describe('<Home />', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('--- should render home page lazy', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValueOnce(allPastLaunches);

    const { baseElement, getByText } = render(
      <React.Suspense fallback="Loading home page for testing">
        <Home />
      </React.Suspense>
    );

    await waitFor(() => getByText(/Past launches/));
    await waitFor(() => getByText('ID: 62dd70d5202306255024d139'));

    expect(baseElement).toMatchSnapshot();
  });

  it('--- should render page load error', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValueOnce(searchLaunchId('error'));

    const { getByTestId } = render(
      <React.Suspense fallback="Loading home page for testing">
        <Home />
      </React.Suspense>
    );

    const errorMessage = await waitFor(() => getByTestId('error-message'));
    expect(errorMessage).toHaveTextContent('An error occurred while retrieving launch data.');
  });

  it('--- should render search result (dynamic content) with successful launch indication', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValueOnce(allPastLaunches);
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <React.Suspense fallback="Loading home page for testing">
        <Home />
      </React.Suspense>
    );

    await waitFor(() => getByText('Past launches'));

    const input = getByPlaceholderText('Enter Launch ID');
    const button = getByText('Search');

    fireEvent.change(input, {
      target: { value: pastLaunchesMixed[0].id },
    });

    // Mock system time
    vi.setSystemTime(new Date('2024-02-10T12:00:00Z'));

    vi.spyOn(window, 'fetch').mockResolvedValue(searchLaunchId(pastLaunchesMixed[0].id));
    fireEvent.click(button);

    expect(await waitFor(() => getByText('Search result'))).toBeInTheDocument();
    expect(await waitFor(() => getByText('Elapsed time since launch'))).toBeInTheDocument();

    expect(getByTestId('time-elapsed')).toHaveTextContent('529:00:00');

    const indicator = getByTestId('success-indicator');
    expect(indicator.getAttribute('aria-description')).toBe(
      'Success Indicator: The SpaceX Crew-5 was a successful launch'
    );
  });

  it('--- should render search result (dynamic content) with failed launch indication', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValueOnce(allPastLaunches);
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <React.Suspense fallback="Loading home page for testing">
        <Home />
      </React.Suspense>
    );

    await waitFor(() => getByText('Past launches'));

    const input = getByPlaceholderText('Enter Launch ID');
    const button = getByText('Search');

    fireEvent.change(input, {
      target: { value: pastLaunchesMixed[1].id },
    });

    // Mock system time - to prevent fluctuation in date calculations
    vi.setSystemTime(new Date('2024-02-10T12:00:00Z'));

    vi.spyOn(window, 'fetch').mockResolvedValue(searchLaunchId(pastLaunchesMixed[1].id));
    fireEvent.click(button);

    expect(await waitFor(() => getByText('Search result'))).toBeInTheDocument();
    expect(await waitFor(() => getByTestId('time-elapsed'))).toBeInTheDocument();

    const timeElapsed = getByTestId('time-elapsed');
    expect(timeElapsed).toHaveTextContent('6775:30:0');

    const indicator = getByTestId('success-indicator');
    expect(indicator.getAttribute('aria-description')).toBe(
      'Success Indicator: The SpaceX FalconSat was not a successful launch'
    );
  });

  it('--- should render error state ui', async () => {
    const randomStr = 'asdsasda8aidjnad80audja098d';
    vi.spyOn(window, 'fetch').mockResolvedValueOnce(allPastLaunches);
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <React.Suspense fallback="Loading home page for testing">
        <Home />
      </React.Suspense>
    );

    await waitFor(() => getByText('Past launches'));

    const input = getByPlaceholderText('Enter Launch ID');
    const button = getByText('Search');

    fireEvent.click(button);
    const errorMessage = await waitFor(() => getByTestId('error-message'));
    expect(errorMessage).toHaveTextContent('Please enter a valid Launch ID');

    fireEvent.change(input, {
      target: { value: randomStr },
    });

    // Mock system time - to prevent fluctuations in date calculations
    vi.setSystemTime(new Date('2024-02-10T12:00:00Z'));

    vi.spyOn(window, 'fetch').mockResolvedValue(searchLaunchId(randomStr));
    fireEvent.click(button);

    const errorMessage2 = await waitFor(() => getByTestId('error-message'));
    expect(errorMessage2).toHaveTextContent('The Launch ID provided was not found.');
  });
});

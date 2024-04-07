import React from 'react';
import { render, waitFor } from '@test/test-utils';
import { pastLaunchesAll } from '@test/past-launches-all';
import App from './App';

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

describe('<App />', () => {
  it('--- should render app root', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValueOnce(allPastLaunches);

    const { getByText } = render(
      <React.Suspense fallback="Loading app for testing">
        <App />
      </React.Suspense>
    );

    await waitFor(() => getByText(/Past launches/));
    await waitFor(() => getByText('ID: 62dd70d5202306255024d139'));
  });
});

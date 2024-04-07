import { pastLaunchesAll } from '@test/past-launches-all';

export const searchLaunchId = (launchId: string): Response => {
  if (launchId === 'error') {
    return {
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      headers: {
        // @ts-ignore
        'Content-Type': 'application/json',
      },
    };
  }

  let status = 200;
  let launch = pastLaunchesAll.find(launch => launch.id === launchId);

  if (!launch) status = 404;
  if (!launchId && !launchId.length) status = 400;

  return {
    ok: true,
    status,
    statusText: 'OK',
    headers: {
      // @ts-ignore
      'Content-Type': 'application/json',
    },
    json: () => Promise.resolve(launch),
  };
};

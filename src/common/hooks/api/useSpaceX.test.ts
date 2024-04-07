import { act, renderHook } from '@test/test-utils';
import { useSpaceX } from '@hooks/api/useSpaceX';
import { pastLaunchesAll } from '@test/past-launches-all';
import { pastLaunchesLatest3 } from '@test/past-launches-latest-3';
import { searchLaunchId } from '@test/search';

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

describe('useSpaceX', () => {
  it('-- should render useSpaceX hook', () => {
    const { result } = renderHook(() => useSpaceX());
    const api = result.current;
    const { getLaunch, getLaunches } = api;

    expect(typeof api).toBe('object');
    expect(typeof getLaunch).toBe('function');
    expect(typeof getLaunches).toBe('function');
  });

  it('-- should fetch the last 3 launches', async () => {
    const { result } = renderHook(() => useSpaceX());

    vi.spyOn(window, 'fetch').mockResolvedValueOnce(allPastLaunches);
    const launches = await act(() => result.current.getLaunches());

    // @ts-ignore
    expect(launches.data[0].success === pastLaunchesLatest3[0].success).toBeTruthy();
    // @ts-ignore
    expect(launches.data[1].success === pastLaunchesLatest3[1].success).toBeTruthy();
    // @ts-ignore
    expect(launches.data[2].success === pastLaunchesLatest3[2].success).toBeTruthy();
  });

  it('-- should pass launch Id search', async () => {
    const { result } = renderHook(() => useSpaceX());

    vi.spyOn(window, 'fetch').mockResolvedValueOnce(searchLaunchId(pastLaunchesAll[5].id));
    const launch = await act(() => result.current.getLaunch(pastLaunchesAll[5].id));

    // @ts-ignore
    expect(launch.data.id).toBe(pastLaunchesAll[5].id);
  });

  it('-- should fail launch Id search', async () => {
    const randomString = 'k0814oifhj98swfsoijfsoidf';
    const { result } = renderHook(() => useSpaceX());

    vi.spyOn(window, 'fetch').mockResolvedValueOnce(searchLaunchId(randomString));
    const launch = await act(() => result.current.getLaunch(randomString));

    // @ts-ignore
    expect(launch.data).toBeFalsy();
  });

  it('-- should fail search with invalid Id', async () => {
    const randomString = '';
    const { result } = renderHook(() => useSpaceX());

    vi.spyOn(window, 'fetch').mockResolvedValueOnce(searchLaunchId(randomString));
    const launch = await act(() => result.current.getLaunch(randomString));

    // @ts-ignore
    expect(launch.data).toBeFalsy();
  });

  it('-- should fail on error response', async () => {
    const { result } = renderHook(() => useSpaceX());

    vi.spyOn(window, 'fetch').mockRejectedValueOnce(searchLaunchId('error'));
    const launch = await act(() => result.current.getLaunch(pastLaunchesAll[5].id));

    // @ts-ignore
    expect(launch.data).toBeFalsy();
  });
});

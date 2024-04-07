import { IApiResponse, ILaunch, HttpStatus } from '@@types';

export interface ISpaceX {
  getLaunch: (launchId: string) => Promise<IApiResponse<ILaunch>>;
  getLaunches: () => Promise<IApiResponse<ILaunch[]>>;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const baseUrl = import.meta.env.VITE_API_BASE_URL;

async function fetchLaunchData<T>(uri: string): Promise<IApiResponse<T>> {
  try {
    const response = await fetch(`${baseUrl}${uri}`);
    const status = response.status as HttpStatus;

    if (status === HttpStatus.OK) {
      const data = (await response.json()) as T;
      return { status: response.status, data };
    }

    if (status === HttpStatus.NOT_FOUND) {
      return {
        status: response.status,
        // TODO: Translations
        errorMessage: 'The Launch ID provided was not found.',
      };
    }

    return {
      status: response.status,
      // TODO: Translations
      errorMessage: 'An error occurred while retrieving launch data.',
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    return { status: error.status, errorMessage: error.message };
  }
}

export const useSpaceX = (): ISpaceX => {
  const getLaunch = async (launchId: string) => {
    // TODO: Backend input validation/sanitization
    return await fetchLaunchData<ILaunch>(`/launches/${launchId}`);
  };

  const getLaunches = async () => {
    const { status, data, errorMessage } = await fetchLaunchData<ILaunch[]>('/launches/past');

    if (status !== HttpStatus.OK) {
      return { status, errorMessage };
    }

    // Data sorting and pagination is typically handled on the Backend
    if (status === HttpStatus.OK) {
      const parsedData = data as ILaunch[];

      parsedData.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return new Date(b.date_local) - new Date(a.date_local);
      });

      return { status, data: parsedData.slice(0, 3) };
    }

    return { status, data, errorMessage };
  };

  return { getLaunch, getLaunches };
};

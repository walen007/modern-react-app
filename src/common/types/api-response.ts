import { HttpStatus } from '@@types';

export interface IApiResponse<T> {
  status: HttpStatus;
  data?: T;
  errorMessage?: string;
}

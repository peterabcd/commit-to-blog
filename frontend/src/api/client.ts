import axios, { AxiosError } from 'axios';

export class ApiError extends Error {
  constructor(
    public readonly code: 'NETWORK' | 'SERVER' | 'NOT_FOUND' | 'BAD_REQUEST',
    message: string,
    options?: ErrorOptions
  ) {
    super(message, options);
    this.name = 'ApiError';
  }
}

export const http = axios.create();

http.interceptors.response.use(
  res => res,
  (err: AxiosError<{ error?: string }>) => {
    if (!err.response) {
      throw new ApiError('NETWORK', '네트워크 오류가 발생했습니다.', { cause: err });
    }
    const msg = err.response.data?.error ?? '서버 오류가 발생했습니다.';
    if (err.response.status === 404) throw new ApiError('NOT_FOUND', msg, { cause: err });
    if (err.response.status === 400) throw new ApiError('BAD_REQUEST', msg, { cause: err });
    throw new ApiError('SERVER', msg, { cause: err });
  }
);

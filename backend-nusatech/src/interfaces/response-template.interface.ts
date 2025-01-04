import { IPaginationMeta } from './index-template.interface';

export class IApiResponse<T> {
  // status: string;
  message: string;
  meta?: IPaginationMeta;
  data: T;
}

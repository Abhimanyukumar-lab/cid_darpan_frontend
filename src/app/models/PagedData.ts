import { Page } from './Page';

export class PagedData<T> {
  data = new Array<T>();
  page = new Page();
}

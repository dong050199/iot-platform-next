import toNumber from "lodash/toNumber";

import { PAGINATION } from "../constants/pagination";

const { PAGE_SIZE, PAGE } = PAGINATION;

export const getPagination = ({ rowsPerPage = PAGE_SIZE, page = PAGE }: IGETPAGINATION) => {
	return {
		rowsPerPage: toNumber(rowsPerPage) ?? PAGE_SIZE,
		page: toNumber(page) ?? PAGE,
	};
};

export interface IGETPAGINATION {
	rowsPerPage?: number;
	page?: number;
	count?: number;
  }
  

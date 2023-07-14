import moment from 'moment';

import { get, filter, includes, toLower, toNumber, cloneDeep, isEmpty, forEach, trim } from 'lodash';

import { FORMAT_DATE } from '../constants/pagination';

export const eachFilter = ({ filters, data }:any) => {
	let cloneDeepData = cloneDeep(data);

	for (let item of filters) {
		cloneDeepData = isEmpty(item.value)
			? cloneDeepData
			: item.filter({ data: cloneDeepData, field: item.field, value: item.value });
	}

	return cloneDeepData;
};

export const includesMultipleFilter = ({ data, field, value }:any) => {
	const splitValue = value?.split(',');

	return filter(data, (item) => {
		let isExist = false;

		forEach(splitValue, (split) => {
			if (!isEmpty(split) && includes(trim(toLower(get(item, `${field}`))), trim(toLower(split)))) {
				isExist = true;
				return;
			}
		});

		return isExist;
	});
};
export const equalDateFilter = ({ data, field, value, formatType = FORMAT_DATE }:any) =>
	filter(data, (item) => {
		return (
			moment(formatDateToString(get(item, `${field}`), formatType), formatType).valueOf() ===
			moment(value, formatType).valueOf()
		);
});

export const formatDateToString = (date: Date | string, type?: string, isLocal?: boolean) => {
	//console.log()
	let result;
	if (isLocal) {
		result = moment(date)
			.local()
			.format(type ?? FORMAT_DATE);

		if (toLower(result) === 'invalid date') return '--';
		return result;
	}

	result = moment(date).format(type ?? FORMAT_DATE);

	if (toLower(result) === 'invalid date') return '--';
	return result;
};

export const includesFilter = ({ data, field, value }:any) =>
	filter(data, (item) => includes(toLower(get(item, `${field}`)), toLower(value)));

export const equalNumberFilter = ({ data, field, value }:any) =>
	filter(data, (item) => get(item, `${field}`) === toNumber(value));

// export const rangeNumberFilter = ({ data, field, value }:any) => {
// 	const splitValue = value?.split('-');

// 	if (splitValue?.length > 2 || isEmpty(splitValue)) return data;

// 	if (splitValue?.length === 1) return equalNumberFilter({ data, field, value: splitValue[0] });

// 	return filter(
// 		data,
// 		(item) =>
// 			get(item, `${field}`) >= toNumber(splitValue[0] || 0) &&
// 			get(item, `${field}`) <= toNumber(splitValue[1] || 999999999999999)
// 	);
// };

// export const rangeDateFilter = ({ data, field, value, formatType = FORMAT_DATE }:any) => {
// 	const splitValue = value?.split('-');

// 	if (splitValue?.length > 2 || isEmpty(splitValue)) return data;
// };

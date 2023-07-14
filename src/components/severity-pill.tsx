import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import type { Theme } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { SxProps } from '@mui/system';
import get from 'lodash/get';

export type SeverityPillColor =
	| 'primary'
	| 'secondary'
	| 'error'
	| 'info'
	| 'warning'
	| 'success'
	| string;

interface SeverityPillProps {
	children?: ReactNode;
	color?: SeverityPillColor;
	style?: {};
	sx?: SxProps<Theme>;
}

interface SeverityPillRootProps {
	ownerState: {
		color: SeverityPillColor;
	};
}

const SeverityPillRoot = styled('span')<SeverityPillRootProps>(({ theme, ownerState }) => {
	const backgroundColor = get(theme, `palette[${ownerState?.color}].main`, ownerState?.color);
	const color = get(theme, `palette[${ownerState.color}].contrastText`, ' #fff');

	return {
		alignItems: 'center',
		backgroundColor,
		borderRadius: 12,
		color,
		cursor: 'default',
		display: 'inline-flex',
		flexGrow: 0,
		flexShrink: 0,
		fontFamily: theme.typography.fontFamily,
		fontSize: theme.typography.pxToRem(10),
		lineHeight: 2,
		fontWeight: 400,
		justifyContent: 'center',
		letterSpacing: 0.5,
		minWidth: 20,
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		whiteSpace: 'nowrap',
		textTransform: 'capitalize',
	};
});

export const SeverityPill: FC<SeverityPillProps> = (props) => {
	const { color = 'primary', children, ...other } = props;

	const ownerState = { color };

	return (
		<SeverityPillRoot ownerState={ownerState} {...other}>
			{children}
		</SeverityPillRoot>
	);
};

SeverityPill.propTypes = {
	children: PropTypes.node,
	color: PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'warning', 'success']),
};

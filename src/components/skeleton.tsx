import { FC, ReactNode } from "react";

import { Box, CircularProgress } from '@mui/material';

interface Props {
	children?: ReactNode;
	isLoading?: boolean;
}

export const Skeleton: FC<Props> = ({ children, isLoading = true }) => {
	return (
		<>
			{isLoading ? (
				<Box
					sx={{
						mt: 2,
						mb: 2,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						minHeight: 200,
					}}
				>
					<CircularProgress size={20} />
				</Box>
			) : (
				children && children
			)}
		</>
	);
};

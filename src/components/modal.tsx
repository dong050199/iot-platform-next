import { FC, ReactNode } from 'react';

import Box from '@mui/material/Box';
import ModalMaterial from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import { ClassNames } from '@emotion/react';

interface Props {
	open: boolean;
	children?: ReactNode;
	onClose?: () => void;
	sx?: any;
}

export const Modal: FC<Props> = ({ open, children, onClose, sx }) => {
	return (
		<ModalMaterial open={open} onClose={onClose}>
			<Box
				sx={{
					p: 2,
					minHeight: '100%',
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Paper
					elevation={12}
					sx={{
						display: 'flex',
						flexDriection: 'column',
						mx: 'auto',
						outline: 'none',
						width: '100%',
						position: 'relative',
						maxHeight: '80vh',
						...sx,
					}}
				>
					<Box
						sx={{ p: 2, minHeight: '100%', width: '100%', overflow: 'auto' }}
						className="custom-scrollbar"
					>
						{children}
					</Box>
				</Paper>
			</Box>
		</ModalMaterial>
	);
};

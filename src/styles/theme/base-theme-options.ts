import { colors, ThemeOptions } from '@mui/material';

const background = {
	default: '#F0F0F0',
	paper: '#FFFFFF',
	
};

const neutral = {
	100: '#F3F4F6',
	700: 'rgb(33, 43, 54)',
	900: '#9E9E9E',
};

const primary = {
	// main: '#36499b',
	main: '#FF7A00',
	contrastText: '#FFFFFF',
};

const blue = {
	main: '#1283EB',
};

const success = {
	main: '#3AD29F',
	contrastText: '#FFFFFF',
};

const info = {
	main: '#64B6F7',
	contrastText: '#FFFFFF',
};

const warning = {
	main: '#FF6B00',
	contrastText: '#FFFFFF',
};

const text = {
	primary: 'rgb(33, 43, 54)',
	secondary: '#202070',
	main: '#000000',
	mainSub: '#111827',
	secondarySub: '#595E68',
	green: '#26B50F',
	blue: '#046CB9',
	blueDark: '#38385F',
	gray: '#6C757D',
	graySecondary: '#6B7280',
	graythird: '#E7E7E7',
	success: '#3AD29F',
	warning: '#FF6B00',
	error: '#F11A16',
};

const typography = {
	fontFamily: '"Public Sans", sans-serif',
	//fontFamily: 'Nunito',
	h1: {
		fontWeight: 700,
		fontSize: '1.5em',
		lineHeight: 1.4,
	},
	h2: {
		fontWeight: 700,
		fontSize: '1.25rem',
		lineHeight: 1.4,
	},
	h3: {
		fontWeight: 700,
		fontSize: '1.125rem',
		lineHeight: 1.4,
		color: 'rgb(33, 43, 54)',
	},
	h4: {
		fontWeight: 700,
		fontSize: '1rem',
		lineHeight: 1.4,
		color: 'rgb(33, 43, 54)',
	},
	h5: {
		fontWeight: 700,
		fontSize: '0.875rem',
		lineHeight: 1.4,
		color: 'rgb(33, 43, 54)',
	},
	h6: {
		fontSize: '0.875rem',
		lineHeight: 1.4,
		color: 'rgb(33, 43, 54)',
	},
	body1: {
		fontSize: '0.875rem',
		lineHeight: 1.4,
		color: '#5E5E5E',
		paddingRight: '0 !important',
	},
	body2: {
		fontSize: '0.75rem',
		lineHeight: 1.4,
		color: '#5E5E5E',
		paddingRight: '0 !important',
	},
};

const boxShadow = ['rgb(100 116 139 / 12%) 0px 1px 4px'];

export const baseThemeOptions: ThemeOptions = {
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 1000,
			lg: 1200,
			xl: 1440,
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				'*': {
					boxSizing: 'border-box',
				},
				html: {
					MozOsxFontSmoothing: 'grayscale',
					WebkitFontSmoothing: 'antialiased',
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100%',
					width: '100%',
				},
				body: {
					display: 'flex',
					flex: '1 1 auto',
					flexDirection: 'column',
					minHeight: '100%',
					width: '100%',
				},
				'#__next': {
					display: 'flex',
					flex: '1 1 auto',
					flexDirection: 'column',
					height: '100%',
					width: '100%',
				},
				'#nprogress': {
					pointerEvents: 'none',
				},
				'#nprogress .bar': {
					backgroundColor: '#5048E5',
					height: 3,
					left: 0,
					position: 'fixed',
					top: 0,
					width: '100%',
					zIndex: 2000,
				},
			},
		},
		MuiRadio: {
			defaultProps: {
				color: 'primary',
			},
		},
		MuiSwitch: {
			defaultProps: {
				color: 'primary',
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					border: 'none',
					background: '#fff',
					boxShadow: boxShadow[0],
					borderRadius: '8px',

					'& .MuiAutocomplete-listbox': {
						color: neutral[700],
						fontSize: '0.75rem',
					},
				},
			},
		},
		MuiButton: {
			defaultProps: {
				disableElevation: true,
			},
			styleOverrides: {
				root: {
					textTransform: 'none',
				},
				sizeSmall: {
					padding: '7px 14px',
					fontSize: '0.75rem',
					minWidth: '80px',
					borderRadius: '4px',
					fontWeight: 500,
					lineHeight: 1.5,

					'& .MuiButton-startIcon': {
						'& .MuiSvgIcon-root': {
							fontSize: '0.75rem',
						},
					},
				},
			},
		},
		MuiFormControl: {
			styleOverrides: {
				root: {
					textTransform: 'none',

					'& .MuiInputLabel-sizeSmall': {
						fontSize: '0.75rem',
						lineHeight: '1.2em',
					},

					'& .MuiFormHelperText-sizeSmall': {
						margin: '4px 0 0',
						fontSize: '0.675rem',
					},
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				root: {
					'&.Mui-disabled': {
						color: text.primary,
						'-webkit-text-fill-color': text.primary,

						'& .MuiInputBase-input': {
							color: text.primary,
							'-webkit-text-fill-color': text.primary,
						},
					},
				},
				sizeSmall: {
					fontSize: '0.75rem',

					'& .MuiOutlinedInput': {
						paddingRight: '12px !important',
					},

					'.MuiInputBase-input': {
						height: '1.2em',
						color: text.primary,
					},

					'& .MuiInputAdornment-root': {
						'& .MuiSvgIcon-root': {
							width: '0.875rem',
							height: '0.875rem',
						},

						'& .MuiTypography-root': {
							fontSize: 'inherit',
							color: 'inherit',
						},

						'& +.MuiInputBase-inputAdornedStart': {
							paddingLeft: '0px',
						},
					},
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					borderBottom: '1px solid #E6E8F0',
				},
			},
		},
		MuiTableHead: {
			styleOverrides: {
				root: {
					backgroundColor: `${neutral[100]} !important`,
					'.MuiTableCell-root': {
						color: neutral[700],
						textTransform: 'uppercase',
					},
				},
			},
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					marginRight: '16px',
					'&.MuiListItemIcon-root': {
						minWidth: 'unset',
					},
				},
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					color: text.primary,
				},
			},
		},
		MuiList: {
			styleOverrides: {
				root: {
					'& .MuiMenuItem-root': {
						fontSize: '0.775rem',
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					'& .MuiOutlinedInput-input': {
						// padding: "9.5px 14px",
					},
					'&.MuiInputBase-adornedEnd': {
						height: '53px',
						paddingRight: '12px !important',
					},
				},
				sizeSmall: {
					'& .MuiOutlinedInput-input:not(textarea)': {
						padding: '6px 14px',
						height: '20px !important',
						lineHeight: '20px',
					},
					'&.MuiInputBase-adornedEnd': {
						height: '32px',
						paddingRight: '12px !important',
					},
				},
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					fontSize: '0.75rem',
					fontWeight: 500,
					lineHeight: 1.71,
					minWidth: 'auto',
					paddingLeft: 0,
					paddingRight: 0,
					textTransform: 'none',
					'& + &': {
						marginLeft: 16,
					},
				},
			},
		},
		MuiContainer: {
			styleOverrides: {
				root: {
					padding: '0 16px !important',
				},
			},
		},
		MuiLink: {
			styleOverrides: {
				root: {
					cursor: 'pointer',
				},
			},
		},
		MuiSvgIcon: {
			styleOverrides: {
				fontSizeSmall: {
					width: '0.75rem',
					height: '0.75rem',
				},
			},
		},
		MuiStep: {
			styleOverrides: {
				root: {
					'&.MuiStepRootCustom:last-child .MuiStepLabelRootCustom': {
						paddingTop: 0,
						marginTop: '0',

						'& .MuiStepLabel-label': {
							top: '4px'
						}
					},
				}
			}
		},
		MuiStepLabel: {
			styleOverrides: {
				root: {
					'& .MuiStepLabel-alternativeLabel.MuiStepLabel-label': {
						marginTop: '10px',
					},
					'& .MuiStepLabel-alternativeLabel.Mui-active': {
						color: '#FF7A00',
						fontWeight: 700,
					},
					'& .MuiStepLabel-alternativeLabel.Mui-completed': {
						color: '#FF7A00',
						fontWeight: 700,
					},
					'&.MuiStepLabelRootCustom': {
						paddingTop: 0,
						marginTop: '-10px',
					},
					'&.stepError .MuiStepLabel-iconContainer > div': {
						backgroundColor: '#F11A16'
					},
				},
			},
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					'&.Mui-error': {
						marginLeft: 0,
					},
				},
			},
		},
	},
	typography,
	palette: {
		background,
		primary,
		text,
		success,
		info,
		warning,
	},
};

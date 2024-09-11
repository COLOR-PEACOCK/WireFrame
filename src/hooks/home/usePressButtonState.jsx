import { COLOR } from '@styles/color';
import { useState } from 'react';

const usePressButtonState = () => {
	const [contentColor, setContentColor] = useState(COLOR.GRAY_10);
	const [buttonColor, setButtonColor] = useState(COLOR.WHITE);

	const handleTouchStart = () => {
		setContentColor(COLOR.GRAY_1);
		setButtonColor(COLOR.PRIMARY);
	};

	const handleTouchEnd = () => {
		setContentColor(COLOR.GRAY_10);
		setButtonColor(COLOR.WHITE);
	};

	return { contentColor, buttonColor, handleTouchStart, handleTouchEnd };
};

export default usePressButtonState;

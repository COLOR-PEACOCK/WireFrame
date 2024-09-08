import { COLOR } from "@styles/color";
import { useState } from "react";

const usePressButtonState = () => {
	const [contentColor, setContentColor] = useState(COLOR.GRAY_9);
	const [buttonColor, setButtonColor] = useState(COLOR.WHITE);
	
	const handleTouchStart = () => {
		setContentColor(COLOR.WHITE);
		setButtonColor(COLOR.PRIMARY);
	};

	const handleTouchEnd = () => {
		setContentColor(COLOR.GRAY_9);
		setButtonColor(COLOR.WHITE);
	};

	return { contentColor, buttonColor, handleTouchStart, handleTouchEnd };
};

export default usePressButtonState;
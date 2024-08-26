import { useState } from 'react';

export const useModal = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleCloseModal = () => {
		setIsModalVisible(false);
	};
	const handleOpenModal = () => {
		setIsModalVisible(true);
	};

	const modalHandle = {
		handleOpenModal,
		handleCloseModal,
	};
	return { isModalVisible, modalHandle};
};

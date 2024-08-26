import { useState } from 'react';

const useModal = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleCloseModal = () => {
		setIsModalVisible(false);
	};
	const handleOpenModal = () => {
		setIsModalVisible(true);
	};

	return { isModalVisible, handleOpenModal, handleCloseModal };
};

export default useModal;

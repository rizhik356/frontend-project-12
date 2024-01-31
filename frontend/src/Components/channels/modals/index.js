import ModalAddChannel from "./ModalRenameChannel";
import ModalRemoveChannel from "./ModalRemoveChannel";
import ModalRenameChannel from "./ModalRenameChannel";

const modals = {
    adding: ModalAddChannel,
    removing: ModalRemoveChannel,
    renaming: ModalRenameChannel,
}

const getModal = (modalName) => modals[modalName];

export default getModal;
import { toast } from 'react-toastify';

export default class Toastify {
  constructor() {
    this.toast = toast.loading('Загрузка...');
  }

  update(type, render) {
    return toast.update(
      this.toast,
      {
        render,
        type,
        isLoading: false,
        autoClose: 3000,
      },
    );
  }
}

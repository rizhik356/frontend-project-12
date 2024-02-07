/* eslint-disable functional/no-classes */

import { toast } from 'react-toastify';

export default class Toastify {
  constructor(name) {
    this.toast = toast.loading(name);
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

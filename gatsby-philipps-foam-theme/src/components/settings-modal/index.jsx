import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useRef } from 'react';
import useSettingsModal from '../../state/useSettingsModal';
import SettingsContent from './settings-content';

const SettingsModal = () => {
  const { isOpen, close } = useSettingsModal();
  const cancelButtonRef = useRef();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        open={isOpen}
        className="fixed z-10 inset-0 overflow-y-auto select-none"
        initialFocus={cancelButtonRef}
        onClose={close}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity backdrop-filter backdrop-blur" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block align-bottom rounded text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full md:max-w-screen-lg m-auto">
              <div className="flex items-center justify-between text-skin-base bg-skin-popover py-3 px-6 border-b border-skin-base">
                <Dialog.Title as="h2" className="text-xl font-semibold">
                  Settings
                </Dialog.Title>
                <button
                  type="button"
                  className="p-2 rounded focus:outline-none focus:ring focus:ring-skin-base"
                  onClick={close}
                  ref={cancelButtonRef}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <SettingsContent />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SettingsModal;

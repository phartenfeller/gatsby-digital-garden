import { CogIcon } from '@heroicons/react/outline';
import React from 'react';
import SettingsModal from '.';
import useSettingsModal from '../../state/useSettingsModal';

const SettingsButton = () => {
  const { open } = useSettingsModal();

  return (
    <>
      <button
        type="button"
        title="Show Settings"
        aria-label="Show Settings"
        className="header-button"
        onClick={open}
      >
        <CogIcon className="w-5 h-5" />
      </button>
      <SettingsModal />
    </>
  );
};

export default SettingsButton;

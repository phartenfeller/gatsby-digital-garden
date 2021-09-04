import { Tab } from '@headlessui/react';
import React, { Fragment } from 'react';

const tabs = {
  general: {
    title: 'General',
  },
  about: {
    title: 'About',
  },
};

const TabButton = ({ selected, id }) => {
  const tab = tabs[id];

  return (
    <button
      type="button"
      className={selected ? 'bg-blue-500 text-white' : 'bg-white text-black'}
    >
      {tab.title}
    </button>
  );
};

const SettingsContents = () => (
  <Tab.Group vertical>
    <Tab.List>
      <Tab as={Fragment}>
        {({ selected }) => <TabButton selected={selected} id="general" />}
      </Tab>
      {/* ...  */}
    </Tab.List>
    <Tab.Panels>
      <Tab.Panel>Content 1</Tab.Panel>
      {/* ... */}
    </Tab.Panels>
  </Tab.Group>
);

export default SettingsContents;

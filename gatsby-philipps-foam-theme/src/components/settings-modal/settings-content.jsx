import { Tab } from '@headlessui/react';
import React, { Fragment } from 'react';
import {
  InformationCircleIcon,
  ColorSwatchIcon,
} from '@heroicons/react/outline';
import classNames from '../../utils/classNames';
import AppearancePage from './appearance-page';

const tabs = [
  {
    title: 'Appearance',
    icon: ColorSwatchIcon,
  },
  {
    title: 'About',
    icon: InformationCircleIcon,
  },
];

const TabButtonContent = ({ tab }) => (
  <span className="flex items-center">
    {tab.icon && <tab.icon className="w-4 h-4 mr-3 text-skin-icon" />}
    <span>{tab.title}</span>
  </span>
);

const getTabButtonClasses = (selected) =>
  classNames(
    'block w-full bg-skin-popover bg-opacity-70 font-normal px-3 py-3 text-left border-l-4 transition duration-300 ease-in-out transition-opacity hover:bg-opacity-100',
    selected
      ? 'shadow-skin-inner border-skin-accent'
      : 'border-transparent hover:border-skin-accent'
  );

const SettingsContents = () => (
  <Tab.Group vertical>
    <div className="flex text-skin-base" style={{ minHeight: '50vh' }}>
      <div className="w-1/4 flex flex-col">
        <Tab.List>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button type="button" className={getTabButtonClasses(selected)}>
                <TabButtonContent tab={tabs[0]} />
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button type="button" className={getTabButtonClasses(selected)}>
                <TabButtonContent tab={tabs[1]} />
              </button>
            )}
          </Tab>
          {/* ...  */}
        </Tab.List>
        {/* Fill rest of the space with the same bg color */}
        <div className="bg-skin-popover bg-opacity-70 flex-grow" />
      </div>
      <div className="bg-skin-popover-hover flex-grow pt-3 px-5 text-lg">
        <Tab.Panels>
          <Tab.Panel>
            <AppearancePage />
          </Tab.Panel>
          {/* ... */}
        </Tab.Panels>
      </div>
    </div>
  </Tab.Group>
);

export default SettingsContents;

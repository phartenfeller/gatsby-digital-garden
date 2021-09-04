import { MenuIcon } from '@heroicons/react/solid';
import { Link } from 'gatsby';
import React from 'react';
import useSiteMetadata from '../use-site-metadata';
import DarkModeToggle from './dark-mode-toggle';
import GraphButton2 from './graph-button2';
import SearchButton from './search-button';
import SettingsButton from './settings-modal/settings-button';

const Header = ({ sideBarOpen, setSideBarOpen, sidebarDisabled }) => {
  const siteMetadata = useSiteMetadata();

  return (
    <header className="pl-4 pr-8 w-full flex flex-wrap justify-between items-center bg-skin-header text-skin-base border-b border-skin-base z-10">
      <div className="flex items-center justify-between">
        <div>
          {!sidebarDisabled && (
            <button
              onClick={() => setSideBarOpen(!sideBarOpen)}
              type="button"
              className="p-2 rounded hover:opacity-60 focus:outline-none focus:ring focus:ring-skin-base"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
          )}
        </div>
        <Link
          to="/"
          className="no-underline rounded hover:opacity-60 focus:outline-none focus:ring focus:ring-skin-base px-4"
        >
          <h1 className="text-xl">{siteMetadata.title}</h1>
        </Link>
      </div>
      <div className="flex space-x-4">
        <SearchButton />
        <GraphButton2 />
        {typeof window !== 'undefined' ? <DarkModeToggle /> : null}
        <SettingsButton />
      </div>
    </header>
  );
};

export default Header;

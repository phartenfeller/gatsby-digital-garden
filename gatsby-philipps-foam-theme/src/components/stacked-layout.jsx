import { useWindowWidth } from '@react-hook/window-size';
import React, { memo, useEffect, useState } from 'react';
import {
  StackedPagesProvider,
  useStackedPagesProvider,
} from 'react-stacked-pages-hook';
import useKeyboardListeners from '../hooks/useKeyboardListeners';
import useThemeSettings from '../hooks/useThemeSettings';
import useNoteWidth from '../state/useNoteWidth';
import useThemeState from '../state/useThemeState';
import { dataToNote } from '../utils/data-to-note';
import './custom.css';
import Header from './header';
import Note from './note';
import NoteWrapper from './note-wrapper';
import PageIndexSidebar from './page-index-sidebar';
import SEO from './seo';
import './stacked-layout.css';
import './theme.css';

let themeInitialized = false;

const Content = ({
  scrollContainer,
  stackedPages,
  index,
  sidebarDisabled,
  noteWidth,
}) => {
  useKeyboardListeners();
  const { theme, setTheme } = useThemeState();
  const [sideBarOpen, setSideBarOpen] = useState(false);

  useEffect(() => {
    if (!themeInitialized) {
      setTheme(theme);
      themeInitialized = true;
    }
  });

  return (
    <div className="layout min-h-screen max-h-screen flex flex-col">
      <SEO title={stackedPages[stackedPages.length - 1].data.title} />
      <Header
        sideBarOpen={sideBarOpen}
        setSideBarOpen={setSideBarOpen}
        sidebarDisabled={sidebarDisabled}
      />
      <div className="flex flex-grow max-h-screen overflow-hidden">
        {!sidebarDisabled && <PageIndexSidebar sideBarOpen={sideBarOpen} />}
        <div className="note-columns-scrolling-container" ref={scrollContainer}>
          <div
            className="note-columns-container"
            style={{ width: noteWidth * (stackedPages.length + 1) }}
          >
            {stackedPages.map((page, i) => (
              <NoteWrapper
                key={page.slug}
                i={typeof index !== 'undefined' ? index : i}
                slug={page.slug}
                title={page.data.title}
              >
                <Note
                  title={page.data.title}
                  mdx={page.data.mdx}
                  inboundReferences={page.data.inboundReferences}
                  outboundReferences={page.data.outboundReferences}
                  headings={page.data.headings}
                />
              </NoteWrapper>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
const MemoContent = memo(Content);

const NotesLayout = ({ location, data }) => {
  const { sidebarDisabled, noteWidth } = useThemeSettings();

  const { activeNoteWidth, initWidth } = useNoteWidth();
  initWidth(noteWidth); // set initial note width

  const windowWidth = useWindowWidth();

  const [state, scrollContainer] = useStackedPagesProvider({
    firstPage: { slug: data?.file?.fields?.slug, data },
    location,
    processPageQuery: dataToNote,
    pageWidth: activeNoteWidth,
  });

  let pages = state.stackedPages;
  let activeIndex;
  if (windowWidth <= 800) {
    const activeSlug = Object.keys(state.stackedPageStates).find(
      (s) => state.stackedPageStates[s].active
    );
    activeIndex = state.stackedPages.findIndex(
      (page) => page.slug === activeSlug
    );
    if (activeIndex === -1) {
      activeIndex = state.stackedPages.length - 1;
    }

    pages = [state.stackedPages[activeIndex]];
  }

  return (
    <StackedPagesProvider value={state}>
      <MemoContent
        windowWidth={windowWidth}
        scrollContainer={scrollContainer}
        stackedPages={pages}
        index={activeIndex}
        sidebarDisabled={sidebarDisabled}
        noteWidth={activeNoteWidth}
      />
    </StackedPagesProvider>
  );
};

export default NotesLayout;

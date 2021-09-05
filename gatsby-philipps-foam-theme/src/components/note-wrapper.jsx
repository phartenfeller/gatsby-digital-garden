import React from 'react';
import {
  LinkToStacked,
  PageIndexProvider,
  useStackedPage,
} from 'react-stacked-pages-hook';

import './note-wrapper.css';

function noteContainerClassName({ overlay, obstructed, highlighted } = {}) {
  return `note-container ${overlay ? 'note-container-overlay' : ''} ${
    obstructed ? 'note-container-obstructed' : ''
  } ${highlighted ? 'note-container-highlighted' : ''}`;
}

const NoteWrapper = ({ children, slug, title, openPages }) => {
  const [, state, i] = useStackedPage();
  const indexFromBehind = openPages - (i + 1);

  return (
    <div
      className={`border-l border-r border-skin-base ${noteContainerClassName(
        state
      )}`}
      // No clue why this works...
      style={{
        left: 40 * (i || 0),
        right: `calc(var(--note-width) * -1px + 40px + ${
          40 * indexFromBehind
        }px )`,
      }}
    >
      <div className="note-content">{children}</div>
      <LinkToStacked
        to={slug}
        className="obstructed-label pt-6 text-skin-base border-r border-skin-base"
      >
        {title}
      </LinkToStacked>
    </div>
  );
};

const ContextProvider = ({ i, slug, title, openPages, children }) => (
  <PageIndexProvider value={i}>
    <NoteWrapper
      slug={slug}
      title={title}
      openPages={openPages}
      children={children}
    />
  </PageIndexProvider>
);

export default ContextProvider;

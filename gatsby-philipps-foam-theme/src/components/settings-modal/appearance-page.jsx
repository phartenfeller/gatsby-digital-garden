import React, { useState } from 'react';
import useNoteWidth from '../../state/useNoteWidth';

const AppearancePage = () => {
  const { activeNoteWidth, defaultWidth, resetWidth, setUserWidth } =
    useNoteWidth();

  const [noteWidth, setNoteWidth] = useState(activeNoteWidth);

  const updateWidth = () => {
    setUserWidth(noteWidth);
  };

  const reset = () => {
    resetWidth();
    setNoteWidth(defaultWidth);
  };

  return (
    <div>
      <div>
        <label htmlFor="note-width" className="block font-medium mb-2">
          Note Width
        </label>
        <div className="flex items-center">
          <div>
            <input
              type="number"
              name="note-width"
              id="note-width-input"
              className="block w-full rounded-lg px-2 py-1 border-2 border-skin-base bg-skin-base focus:border-skin-accent focus:ring-0 focus:outline-none"
              placeholder={defaultWidth}
              value={noteWidth}
              onChange={(e) => setNoteWidth(e.target.value)}
              min="100"
              max="2500"
            />
          </div>
          <span className="ml-1 opacity-75">px</span>
          <button
            onClick={updateWidth}
            type="button"
            className="mx-5 bg-skin-base text-skin-base px-2 py-1 rounded-md border-2 border-skin-base hover:bg-opacity-60 focus:outline-none focus:border-skin-accent"
          >
            save
          </button>
          <button type="link" className="mx-2 tw-link" onClick={reset}>
            reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppearancePage;

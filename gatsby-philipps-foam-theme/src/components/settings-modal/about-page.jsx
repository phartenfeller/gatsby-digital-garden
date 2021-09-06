import React from 'react';
import useThemeSettings from '../../hooks/useThemeSettings';

const AboutPage = () => {
  const { themeVersion } = useThemeSettings();

  return (
    <div className="select-text">
      <h2 className="font-semibold text-xl mb-2">Gatsby Philipps Foam Theme</h2>
      <div className="text-base space-y-1">
        <div>
          By{' '}
          <a
            className="underline rounded hover:opacity-75 focus:ring-1 focus:ring-skin-base"
            href="https://hartenfeller.dev"
          >
            Philipp Hartenfeller
          </a>
        </div>
        <div>
          Forked from Mathieu Dutour's{' '}
          <a
            className="underline rounded hover:opacity-75 focus:ring-1 focus:ring-skin-base"
            href="https://github.com/mathieudutour/gatsby-digital-garden"
          >
            gatsby-digital-garden
          </a>
        </div>
        <div>{`Version ${themeVersion}`}</div>
        <div>
          <a
            className="underline rounded hover:opacity-75 focus:ring-1 focus:ring-skin-base"
            href="https://github.com/phartenfeller/gatsby-philipps-foam-theme"
          >
            Star on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

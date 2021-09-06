import { graphql, useStaticQuery } from 'gatsby';

export default () => {
  const data = useStaticQuery(graphql`
    query themeSettings {
      philippsFoamThemeConfig {
        sidebarDisabled
        noteWidth
        themeVersion
      }
    }
  `);

  const { sidebarDisabled, noteWidth, themeVersion } =
    data.philippsFoamThemeConfig;

  return { sidebarDisabled, noteWidth, themeVersion };
};

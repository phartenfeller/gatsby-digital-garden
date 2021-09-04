import { graphql, useStaticQuery } from 'gatsby';

export default () => {
  const data = useStaticQuery(graphql`
    query themeSettings {
      philippsFoamThemeConfig {
        sidebarDisabled
        noteWidth
      }
    }
  `);

  const { sidebarDisabled, noteWidth } = data.philippsFoamThemeConfig;

  return { sidebarDisabled, noteWidth };
};

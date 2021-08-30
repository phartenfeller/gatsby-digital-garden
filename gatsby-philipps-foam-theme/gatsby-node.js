/* eslint-disable no-console */
const fs = require(`fs`);
const path = require(`path`);
const { urlResolve } = require(`gatsby-core-utils`);
const {
  findTopLevelHeading,
} = require(`gatsby-transformer-markdown-references`);
const shouldHandleFile = require('./should-handle-file');

// These are customizable theme options we only need to check once
let basePath;
let contentPath;
let rootNote;

async function copyFile(from, to) {
  return fs.promises.writeFile(to, await fs.promises.readFile(from));
}

exports.onPreBootstrap = async ({ store }, themeOptions) => {
  const { program } = store.getState();

  basePath = themeOptions.basePath || `/`;
  contentPath = themeOptions.contentPath;
  rootNote = themeOptions.rootNote;

  if (contentPath) {
    const dir = path.isAbsolute(contentPath)
      ? contentPath
      : path.join(program.directory, contentPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  if (contentPath) {
    await copyFile(
      path.join(__dirname, './fragments/file.fragment'),
      `${program.directory}/.cache/fragments/garden-fragments.js`
    );
    await copyFile(
      path.join(__dirname, './fragments/file-graph.fragment'),
      path.join(__dirname, './src/use-graph-data.js')
    );
  }
};

function getTitle(node, content) {
  if (
    typeof node.frontmatter === 'object' &&
    node.frontmatter &&
    node.frontmatter.title
  ) {
    return node.frontmatter.title;
  }
  return (
    findTopLevelHeading(content) ||
    (typeof node.fileAbsolutePath === 'string'
      ? path.basename(
          node.fileAbsolutePath,
          path.extname(node.fileAbsolutePath)
        )
      : '') ||
    (typeof node.absolutePath === 'string'
      ? path.basename(node.absolutePath, path.extname(node.absolutePath))
      : '')
  );
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`type PhilippsFoamThemeConfig implements Node {
sidebarDisabled: Boolean!
noteWidth: Int!
}`);
};

exports.onCreateNode = async ({ node, actions, loadNodeContent }, options) => {
  const { createNodeField } = actions;

  if (node.internal.type === `File` && shouldHandleFile(node, options)) {
    createNodeField({
      node,
      name: `slug`,
      value: urlResolve(basePath, path.parse(node.relativePath).dir, node.name),
    });
    createNodeField({
      node,
      name: `title`,
      value: getTitle(node, await loadNodeContent(node)),
    });
  }
};

exports.sourceNodes = (
  { actions: { createNode }, createNodeId, createContentDigest },
  { sidebarDisabled = false, noteWidth = 625 }
) => {
  const themeConfig = {
    sidebarDisabled,
    noteWidth,
  };

  createNode({
    ...themeConfig,
    id: createNodeId(`philipps-foam-theme-config`),
    parent: null,
    children: [],
    internal: {
      type: `PhilippsFoamThemeConfig`,
      contentDigest: createContentDigest(themeConfig),
      content: JSON.stringify(themeConfig),
      description: `Configuration Options for gatsby-philipps-foam-theme`,
    },
  });
};

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    MdxFrontmatter: {
      priv: {
        type: `Boolean`,
        resolve(source) {
          const priv = source.private;
          if (priv == null) {
            return false;
          }
          return priv;
        },
      },
      aliases: {
        type: `[String!]`,
        resolve(source) {
          const { aliases } = source;
          if (aliases == null) {
            return [];
          }
          return aliases;
        },
      },
    },
  };
  createResolvers(resolvers);
};

exports.createPages = async ({ graphql, actions, reporter }, options) => {
  const { createPage } = actions;

  if (contentPath) {
    const result = await graphql(
      `
        {
          allFile {
            nodes {
              id
              sourceInstanceName
              ext
              internal {
                mediaType
              }
              fields {
                slug
              }
              childMdx {
                frontmatter {
                  priv
                }
              }
            }
          }
        }
      `
    );

    if (result.errors) {
      console.log(result.errors);
      throw new Error(`Could not query notes`, result.errors);
    }

    const LocalFileTemplate = require.resolve(`./src/templates/local-file.jsx`);

    const localFiles = result.data.allFile.nodes
      .filter((node) => shouldHandleFile(node, options))
      .filter((x) => x.childMdx.frontmatter.priv !== true);

    localFiles.forEach((node) => {
      createPage({
        path: node.fields.slug,
        component: LocalFileTemplate,
        context: {
          id: node.id,
        },
      });
    });

    if (rootNote) {
      // backwards compatibility
      const withoutLeadingSlash = rootNote.replace(/^\//, '');
      if (withoutLeadingSlash === 'index') {
        reporter.error(
          `You root note is named "index". This causes errors please rename it.`
        );
        return;
      }

      const root = localFiles.find(
        (node) => node.fields.slug.replace(/^\//, '') === withoutLeadingSlash
      );
      if (root) {
        createPage({
          path: basePath,
          component: LocalFileTemplate,
          context: {
            id: root.id,
          },
        });
      } else {
        reporter.error(
          `Error initializing root node. No note found with filename "${withoutLeadingSlash}"`
        );
      }
    } else {
      reporter.error(
        `You need to specify a root node to generate an index page...`
      );
    }
  }
};

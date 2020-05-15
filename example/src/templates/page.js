import React from "react";
import { graphql } from "gatsby";
import * as PropTypes from "prop-types";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "../layouts";
import Reference from "../components/Reference";

const propTypes = {
  data: PropTypes.object.isRequired,
};

class PageTemplate extends React.Component {
  render() {
    const roamPage = this.props.data.roamPage;
    return (
      <Layout>
        <MDXRenderer>{roamPage.fields.markdown.childMdx.body}</MDXRenderer>
        {roamPage.fields.inboundReferences.length ? (
          <div>
            <hr />
            <h3>References to this note</h3>
            {roamPage.fields.inboundReferences.map((node) => (
              <Reference node={node} key={node.id} />
            ))}
          </div>
        ) : null}
      </Layout>
    );
  }
}

PageTemplate.propTypes = propTypes;

export default PageTemplate;

export const pageQuery = graphql`
  query($id: String!) {
    roamPage(id: { eq: $id }) {
      fields {
        markdown {
          childMdx {
            body
          }
        }
        inboundReferences {
          ... on RoamBlock {
            id
            string
            fields {
              parentPage {
                title
              }
              slug
            }
          }
          ... on RoamPage {
            id
            title
            fields {
              slug
            }
          }
        }
      }
    }
  }
`;
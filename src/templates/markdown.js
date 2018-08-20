import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'

// import Header from '../components/Header'
import Versions from '../components/Versions'
import TableOfContents from '../components/TableOfContents/index'

import './markdown.css'
import './b16-tomorrow-dark.css'

export default class MarkdownTemplate extends React.Component {
  static childContextTypes = {
    location: PropTypes.object,
  }

  state = {
    isExpand: false,
  }

  componentDidMount() {
    this.scrollToHash()

    // if (typeof docsearch === 'function') {
    //   docsearch({
    //     apiKey: '221332a85783d16a5b930969fe4a934a',
    //     indexName: 'openpitrix',
    //     inputSelector: '.ks-search > input',
    //     debug: false,
    //   })
    // }

    document.addEventListener('click', this.handleClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick)
  }

  scrollToHash = () => {
    setTimeout(() => {
      if (this.props.location.hash) {
        const id = decodeURIComponent(this.props.location.hash).slice(1)
        const element = document.getElementById(id)
        element && element.scrollIntoView()
      }
    }, 100)
  }

  getChildContext() {
    return {
      location: this.props.location,
    }
  }

  handleExpand = () => {
    this.setState(({ isExpand }) => ({
      isExpand: !isExpand,
    }))
  }

  handleClick = e => {
    if (this.markdownRef && this.markdownRef.contains(e.target)) {
      this.setState({ isExpand: false })
    }
  }

  render() {
    const { slug } = this.props.pathContext
    const postNode = this.props.data.postBySlug

    const post = postNode.frontmatter
    if (!post.id) {
      post.id = slug
    }

    return (
      <div>
        <Helmet>
          <title>{`${post.title} | ${
            this.props.data.site.siteMetadata.title
          }`}</title>
        </Helmet>
        <BodyGrid>
          <NavContainer isExpand={this.state.isExpand}>
            <Versions
              versions={this.props.data.versions}
              current={postNode.fields.version}
            />
            <ToCContainer>
              <TableOfContents
                chapters={
                  this.props.data.tableOfContents.edges[0].node.chapters
                }
              />
            </ToCContainer>
          </NavContainer>
          <MainContainer isExpand={this.state.isExpand}>
            {/*<Header*/}
              {/*location={this.props.location}*/}
              {/*isExpand={this.state.isExpand}*/}
              {/*toggleExpand={this.handleExpand}*/}
            {/*/>*/}
            <MarkdownBody
              className="md-body"
              innerRef={ref => {
                this.markdownRef = ref
              }}
            >
              <h1>{post.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
            </MarkdownBody>
          </MainContainer>
        </BodyGrid>
      </div>
    )
  }
}

const BodyGrid = styled.div`
  overflow-x: hidden;
`

const NavContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background-color: #242e42;
  box-shadow: 4px 0 8px 0 rgba(101, 125, 149, 0.2);
  transition: left 0.2s ease-in-out;
  overflow-y: auto;
  color: #fff;
  z-index: 2;

  @media only screen and (max-width: 768px) {
    left: ${({ isExpand }) => {
      return isExpand ? 0 : '-290px'
    }};
  }
`

const MainContainer = styled.div`
  margin-left: 280px;

  & > div {
    margin: auto;
  }

  & > h1 {
    color: #303e5a;
  }

  @media only screen and (max-width: 768px) {
    width: 100vw;
    margin-left: ${({ isExpand }) => {
      return isExpand ? '280px' : '0'
    }};
    transition: margin-left 0.2s ease-in-out;
  }
`

const ToCContainer = styled.div`
  padding: 40px 0;
`

const MarkdownBody = styled.div`
  padding: 40px 40px;

  @media only screen and (max-width: 768px) {
    padding: 24px 24px;
  }
`

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  fragment ChildMarkdownRemark on MarkdownRemark {
    fields {
      slug
    }
    frontmatter {
      title
    }
    headings {
      value
      depth
    }
  }
  query MarkdownBySlug($slug: String!, $id: String!, $version: String!) {
    site {
      siteMetadata {
        title
      }
    }
    postBySlug: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      fields {
        version
      }
    }
    versions: allMarkdownRemark {
      group(field: fields___version) {
        fieldValue
      }
    }
    languages: allMarkdownRemark(
      filter: { fields: { version: { eq: $version } } }
    ) {
      group(field: fields___language) {
        fieldValue
      }
    }
    tableOfContents: allContentJson(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          chapters {
            title
            entry {
              id
              childMarkdownRemark {
                ...ChildMarkdownRemark
              }
            }
            entries {
              entry {
                id
                childMarkdownRemark {
                  ...ChildMarkdownRemark
                }
              }
            }
            chapters {
              title
              entry {
                id
                childMarkdownRemark {
                  ...ChildMarkdownRemark
                }
              }
              entries {
                entry {
                  id
                  childMarkdownRemark {
                    ...ChildMarkdownRemark
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

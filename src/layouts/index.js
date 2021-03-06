/* global graphql */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';

import { AllChallengeNode } from '../redux/propTypes';

import Header from '../components/Header';
import Map from '../components/Map';

import './global.css';
import 'react-reflex/styles.css';
import './layout.css';

const Layout = ({ children, data: { allChallengeNode: { edges } } }) => (
  <Fragment>
    <Helmet
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' }
      ]}
    />
    <Header />
    <div className='app-wrapper'>
      <ReflexContainer orientation='vertical'>
        <ReflexElement flex={0.2} minSize={100}>
          <aside id='map'>
            <Map
              nodes={edges
                .map(({ node }) => node)
                .filter(({ isPrivate }) => !isPrivate)}
            />
          </aside>
        </ReflexElement>

        <ReflexSplitter />

        <ReflexElement>
          <main>{children()}</main>
        </ReflexElement>
      </ReflexContainer>
    </div>
  </Fragment>
);

Layout.propTypes = {
  children: PropTypes.func,
  data: AllChallengeNode
};

export default Layout;

export const query = graphql`
  query LayoutQuery {
    allChallengeNode(
      filter: { isPrivate: { eq: false } }
      sort: { fields: [superOrder, order, suborder] }
    ) {
      edges {
        node {
          fields {
            slug
            blockName
          }
          block
          title
          isRequired
          isPrivate
          superBlock
          dashedName
        }
      }
    }
  }
`;

import _ from 'lodash';
import React from 'react';
import Navbar from './commons/navbar';

import { Container, Grid } from 'semantic-ui-react';
import contents from '../content.config.json';

import Post from './commons/post';

class Main extends React.PureComponent {
  render() {
    const renderPost = (posts, startIdx, length) => {
      return _.slice(posts, startIdx, length).map((post, idx) => {
        return (
          <Post
            key={`${_.uniqueId()}-post`}
            title={post.title}
            content={post.content}
            createdAt={post.timestamp}
            categories={post.categories}
            headline={post.headline}
          />
        )
      })
    };

    return (
      <Grid >
        <Grid.Row>
          <Grid.Column>
            <Navbar/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Container className="mobileCompatible">
              {renderPost(contents, 0, 5)}
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Main;
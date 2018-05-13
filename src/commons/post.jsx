import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Segment, Header, Divider, Grid, Loader } from 'semantic-ui-react';
import mdUtil from '../utils/markdown';

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: null
    };
  }

  componentDidMount() {
    axios.get(this.props.content)
      .then((content) => {
        this.setState({
          content: content.data
        });
      });
  }

  render() {
    if (!this.state.content) {
      return (
        <Segment>
          <Grid padded>
            <Grid.Row>
              <Grid.Column>
                <Loader active />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      );
    }

    return (
      <Segment className="post">
        <Grid padded>
          <Grid.Row>
            <Grid.Column>
              <Header as="h1"
                content={this.props.title}
                subheader={`Created At : ${this.props.createdAt}`}
              />
            </Grid.Column>
          </Grid.Row>
          <Divider/>
          <Grid.Row>
            <Grid.Column>
            {mdUtil.render(this.state.content)}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
            <Divider/>
            <div style={{float: "right" }}>
              Category: {this.props.categories}
            </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

Post.propsType = {
  content: PropTypes.instanceOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
};

export default Post;
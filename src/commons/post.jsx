import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import slugify from 'slugify';

import { Container, Button, Popup, Label, Segment, Header, Divider, Grid, Loader } from 'semantic-ui-react';
import mdUtil from '../utils/markdown';

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: null,
      showComment: false,
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
    const fbComment = (
      <Grid.Row>
        <Grid.Column>
          <div
            className="fb-comments"
            data-width="600"
            data-href={`http://tpratama.github.io/blog#${slugify(this.props.title)}`}
            data-numposts="5"
          />
        </Grid.Column>
      </Grid.Row>
    );

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
      <Grid padded style={{ paddingBottom: "80px" }}>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1"
              content={this.props.title}
              subheader={this.props.headline}
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
            <Grid stackable>
              <Grid.Row>
                <Grid.Column width={2}>
                <Button
                  icon="comment"
                  onClick={() => this.setState({
                    showComment: !this.state.showComment
                  })
                  }
                />
                </Grid.Column>
                <Grid.Column floated="right" width={10}>
                  <div style={{float: "right" }}>
                    {
                      this.props.categories.map(category => <Label key={`${_.uniqueId()}-label-category`}>
                        {category}
                      </Label>)
                    }
                    <Label>{this.props.createdAt}</Label>
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <div style={{ display: this.state.showComment ? 'block' : 'none' }}>
                    { fbComment }
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

Post.propsType = {
  content: PropTypes.instanceOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  headline: PropTypes.string.isRequired,
};

export default Post;
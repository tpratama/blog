import React from 'react';
import { Grid, Header, Container, Divider } from 'semantic-ui-react';

class Navbar extends React.PureComponent {
  render() {
    return (
      <Grid padded>
        <Grid.Row className="navbar" >
          <Grid.Column>
            <Container>
              <Grid>
                <Grid.Row>
                  <Grid.Column>
                    <Header
                      as="h1"
                      inverted
                      content="My Scratch Pad"
                      subheader="Created with my own cms with react for learning purpose :)"
                    />
                    <Divider/>
                    <p>My personal blog about how to be a <b>good coder</b>, <b>campus life</b>, and <b>random things</b></p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Navbar;
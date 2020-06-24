import React from 'react';
import Img from 'gatsby-image';
import { Card, CardImg, Button, Col } from 'reactstrap';

export default function Choice({ checkAnswer, edge, api }) {
  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardImg
          tag={Img}
          fixed={edge.node.childImageSharp.fixed}
        />
        <Button
          outline
          color="primary"
          onClick={() => checkAnswer(api.name)}
        >
          {api.name}
        </Button>
      </Card>
    </Col>
  );
}

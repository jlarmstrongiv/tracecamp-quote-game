import React from 'react';
import { Container, Row } from 'reactstrap';
export default function Choices({ children }) {
  return (
    <Container>
      <Row>{children}</Row>
    </Container>
  );
}

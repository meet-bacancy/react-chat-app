import React from 'react';
import { Container } from 'reactstrap';
import MessageBar from '../components/chat-components/MessageBar';

const DashBoard = () => {
  return (
    <Container fluid className="p-0">
      <Container>
        <MessageBar />
      </Container>
    </Container>
  );
};

export default DashBoard;

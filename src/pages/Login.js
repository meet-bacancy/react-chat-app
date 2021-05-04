import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardTitle,
} from 'reactstrap';
import { useAuth } from '../hooks/useAuth';
import { setItemInStorage } from '../utils/helper';

const Login = () => {
  const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const history = useHistory();
  const auth = useAuth();
  const onLoginClick = (e) => {
    e.preventDefault();
    auth.login();
    setItemInStorage('user', {
      email,
    });
    history.push('/');
  };
  return (
    <Container>
      <Row className="justify-content-center align-items-center h-100vh">
        <Col sm="12" md={6}>
          <Card>
            <CardBody>
              <CardTitle tag="h3" className="text-center mb-5">
                React Chat App
              </CardTitle>
              <Form onSubmit={onLoginClick}>
                <FormGroup>
                  <Label for="email">Name</Label>
                  <Input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter your name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </FormGroup>
                <Button color="primary">Start Chat</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

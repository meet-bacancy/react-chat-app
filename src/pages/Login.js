import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardTitle,
  Button,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  InputGroupButtonDropdown,
  Spinner,
} from 'reactstrap';
import { useAuth } from '../hooks/useAuth';
import { setItemInStorage } from '../utils/helper';
import { postAddUser } from '../services/api';
import { DEFAULT_ROOM_TYPE, ROOM_TYPE } from '../utils/constants';

const Login = () => {
  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [roomType, setRoomType] = useState(DEFAULT_ROOM_TYPE);
  const [isLoading, setLoading] = useState(false);

  const history = useHistory();
  const auth = useAuth();

  const handleOnJoinRoom = () => {
    if (roomId.trim().length > 0) {
      auth.login();
      setItemInStorage('user', {
        name,
      });
      history.push(`/${roomId}`);
    }
  };

  const onLoginClick = (e) => {
    e.preventDefault();
    if (roomType === ROOM_TYPE.createRoom) {
      setLoading(true);
      postAddUser({ name })
        .then((res) => {
          setLoading(false);
          if (res && res.roomUrl) {
            auth.login();
            setItemInStorage('user', {
              name,
            });
            history.push(`/${res.roomUrl}`);
          }
        })
        .catch((err) => {
          console.log(
            '🚀 ~ file: Login.js ~ line 49 ~ onLoginClick ~ err',
            err,
          );
          setLoading(false);
        });
    } else {
      handleOnJoinRoom();
    }
  };
  const toggle = () => setDropdownOpen(!dropdownOpen);

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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </FormGroup>
                <>
                  {roomType === ROOM_TYPE.joinRoom ? (
                    <FormGroup>
                      <Label for="roomId">Room-id</Label>
                      <Input
                        type="text"
                        name="roomId"
                        id="roomId"
                        placeholder="Enter room id"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        required
                      />
                    </FormGroup>
                  ) : null}
                </>
                <InputGroupButtonDropdown
                  addonType="prepend"
                  isOpen={dropdownOpen}
                  toggle={toggle}
                >
                  <Button color="primary" disabled={isLoading}>
                    {isLoading ? <Spinner className="mr-2" size="sm" /> : null}
                    {roomType === ROOM_TYPE.joinRoom
                      ? 'Join room'
                      : 'Create room'}
                  </Button>
                  <DropdownToggle disabled={isLoading} split color="primary" />
                  <DropdownMenu>
                    <DropdownItem
                      onClick={() => setRoomType(ROOM_TYPE.createRoom)}
                    >
                      Create Room
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => setRoomType(ROOM_TYPE.joinRoom)}
                    >
                      Join Room
                    </DropdownItem>
                  </DropdownMenu>
                </InputGroupButtonDropdown>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

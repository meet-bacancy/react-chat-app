import network from './network';

export const postAddUser = (data) => network.publicGet('/get-room', data);

export const postGetUser = () => {};

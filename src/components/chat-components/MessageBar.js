import { Button } from 'reactstrap';
import React, { useState } from 'react';
// import { Picker } from 'emoji-mart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { getItemFromStorage, socket } from '../../utils/helper';

const MessageBar = () => {
  const [value, setValue] = useState('');
  const { name } = getItemFromStorage('user');
  // const [shouldShowEmoji, setShowEmoji] = useState(false);

  const handleSubmit = (msg) => {
    setValue('');
    socket.emit('chat message', { userName: name, msg });
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="w-50 message-bar d-flex">
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={handleChange}
        placeholder="Type a message here then hit ENTER"
        required
      />
      <Button
        className="ml-2"
        color="primary"
        disabled={!value.trim().length}
        onClick={() => handleSubmit(value)}
      >
        <FontAwesomeIcon icon={faPaperPlane} className="rotate-45" />
      </Button>
    </div>
  );
};

export default MessageBar;
/* {shouldShowEmoji ? (
        <span>
          <Picker onSelect={addEmoji} />
        </span>
      ) : (
        <FontAwesomeIcon
          className="far icon mt-2 ml-2"
          icon={faSmileBeam}
          onClickCapture={() => setShowEmoji(true)}
        />
      )} */

// const addEmoji = (e) => {
//   const sym = e.unified.split('-');
//   const codesArray = [];
//   sym.forEach((el) => codesArray.push(`0x${el}`));
//   const emoji = String.fromCodePoint(...codesArray);
//   setValue(`${value}${emoji}`);
// };

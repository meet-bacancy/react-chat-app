import React, { useState } from 'react';
import { Picker } from 'emoji-mart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmileBeam } from '@fortawesome/free-solid-svg-icons';

const MessageBar = () => {
  const [value, setValue] = useState('');
  const [shouldShowEmoji, setShowEmoji] = useState(false);

  const handleSubmit = () => {};

  const addEmoji = (e) => {
    const sym = e.unified.split('-');
    const codesArray = [];
    sym.forEach((el) => codesArray.push(`0x${el}`));
    const emoji = String.fromCodePoint(...codesArray);
    setValue(`${value}${emoji}`);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          value={value}
          onChange={handleChange}
          placeholder="Type a message here then hit ENTER"
        />
      </form>
      {shouldShowEmoji ? (
        <span>
          <Picker onSelect={addEmoji} />
        </span>
      ) : (
        <FontAwesomeIcon
          className="far"
          icon={faSmileBeam}
          onClickCapture={() => setShowEmoji(true)}
        />
      )}
    </>
  );
};

export default MessageBar;

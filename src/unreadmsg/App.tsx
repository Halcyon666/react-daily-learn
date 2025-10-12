import React from "react";
import "./style.css";

export default function App() {
  const [unreadMessages, setUnreadMessages] = React.useState(["a", "b"]);

  const getShowMsg = (): string => {
    const unreadNum = unreadMessages.length;
    const msgToShow =
      unreadNum == 0
        ? "You're caught up!"
        : unreadNum == 1
        ? "You have 1 unread message"
        : `You have ${unreadNum} unread messages`;
    return msgToShow;
  };

  return (
    <div>
      {/* 0 mean false in javascript, but when using true or false value, 
       but no condition, will be falsely display 0 in page, make sure to use condition like 
       `unreadNum > 0` */}
      {/* {unreadNum && (
        <h1>You have {!unreadNum ? "no" : unreadNum} unread messages!</h1>
      )} */}
      {/* <h1>You have {!unreadNum ? "no" : unreadNum} unread messages!</h1>
      <ul>
        {unreadMessages.map((msg) => (
          <li>{msg}</li>
        ))}
      </ul> */}
      <h1>{getShowMsg()}</h1>
    </div>
  );
}

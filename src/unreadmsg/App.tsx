import React from "react";
import "./style.css";

export default function App() {
  const [unreadMessages, setUnreadMessages] = React.useState(["a", "b"]);

  /**
   * Challenge:
   * Only display the <h1> below if there are unread messages
   */
  const unreadNum = unreadMessages.length;

  return (
    <div>
      {/* 0 mean false in javascript, but when using true or false value, 
       but no condition, will be falsely display 0 in page, make sure to use condition like 
       `unreadNum > 0` */}
      {/* {unreadNum && (
        <h1>You have {!unreadNum ? "no" : unreadNum} unread messages!</h1>
      )} */}
      <h1>You have {!unreadNum ? "no" : unreadNum} unread messages!</h1>
      <ul>
        {unreadMessages.map((msg) => (
          <li>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

import { useState } from "react";

const User = (props) => {
  const [count] = useState(0);
  const [count2] = useState(2);
  return (
    <div>
      <h2>Count : {count}</h2>

      <h2>Count 2: {count2}</h2>
      <div>{props.name}</div>
      <div>Cyberpark</div>
      <div>Calicut</div>
    </div>
  );
};

export default User;

import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      count3: 3,
    };
  }

  render() {
    const { name } = this.props;
    const { count, count3 } = this.state;

    return (
      <div>
        <h2>count ={count}</h2>
        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1,
            });
          }}
        >
          increase
        </button>
        <div>{name}</div>
        <div>qb</div>
        <div>Calicut</div>
      </div>
    );
  }
}

export default UserClass;

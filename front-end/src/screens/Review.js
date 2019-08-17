import React from 'react';

function Review(props) {
  return (
    <div>
      <button onClick={props.handleSubmit}>Submit</button>
    </div>
  );
}

export default Review;

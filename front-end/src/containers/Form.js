import React from 'react';

function Form(props) {
  return (
    <div>
      <button onClick={props.handleReview}>Review</button>
    </div>
  );
}

export default Form;

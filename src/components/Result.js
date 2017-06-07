import React from 'react';

  function Result(props) {
    return (
      <div className="result">
        Should you pick Jack? Without Doubt!
      </div>
    );
  }

  Result.propTypes = {
    quizResult: React.PropTypes.string.isRequired,
  };

  export default Result;

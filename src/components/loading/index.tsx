import React from "react";


export const Loading: React.FC = () => {
  return (
    <div className="loading">
      <div className="pencil">
        <div className="pencil__ball-point"></div>
        <div className="pencil__cap"></div>
        <div className="pencil__cap-base"></div>
        <div className="pencil__middle"></div>
        <div className="pencil__eraser"></div>
      </div>
      <div className="line"></div>
      <div>
      <h2>Page Loading...</h2>

      </div>
    </div>
  )
}



import { response } from "express";
import React from "react";
import { Link } from "react-router-dom";

export type Card = {
  id: number;
  name: string;
  content: string;
  location: string;
  mentions: string;
};

const Chirp: React.FunctionComponent<Card> = (props) => {
  

  return (
    <>
     

      {/* Card Below */}
      <div
        className="card col-6 m-3 shadow rounded"
        key={props.id}
      >
        <p className="card-header">{props.name}</p>
        <div className="card-body">
          <p className="card-title">{props.location}</p>
          <h5 className="card-text">{props.content}</h5>
        </div>
        <div id="button-container" className="row d-flex flex-row-reverse">
          <Link className="btn-info"to={`/${props.id}/details`}>Admin Options</Link>
        </div>
      </div>
    </>
  );
};

export default Chirp;

import React from "react";
import { Link } from "react-router-dom";

import "./index.css";

const Navbar = (props: { show: boolean }) => {
  return (
    <div className={props.show ? "sideNav active" : "sideNav"}>
      <ul>
        <li>
          <Link className="link" to="/home">
            Home
          </Link>
        </li>
        <hr />
        <li>
          <Link className="link" to="/todo">
            To Do
          </Link>
        </li>
        <hr />
        <li>
          <Link className="link" to="/inprogress">
            In progress
          </Link>
        </li>
        <hr />
        <li>
          <Link className="link" to="/done">
            Done
          </Link>
        </li>
        <hr />
      </ul>
    </div>
  );
};

export default Navbar;

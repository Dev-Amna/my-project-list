import React from "react";
import Data from "../data/data";

function Projects() {
  return (
    <div>


      {Data.map((item, idx) => (
        <div key={idx}>
          {/* example fields */}
          <h3>{item.id}</h3>
          <p>{item.code}</p>
        </div>
      ))}
    </div>
  );
}

export default Projects;

import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth()
      .get("/colors")
      .then(res => {
        console.log("BubblePage.js: useEffect", res);
        setColorList(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </React.Fragment>
  );
};

export default BubblePage;

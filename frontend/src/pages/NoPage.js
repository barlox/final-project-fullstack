import { React, useEffect} from "react";

const NoPage = (props) => {

  useEffect(() => {
    props.setNoFound(true);
  }
    // eslint-disable-next-line
    , []);

  return (
    <div className="no-found"></div>
  )
};

export default NoPage;

import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
// import HeadSection from "./HeadSection";
import FeatureSection from "./FeatureSection";
import HeadSection from "./HeadSection";

function Home(props) {
  // const { selectHome } = props;
  // useEffect(() => {
  //   selectHome();
  // }, [selectHome]);
  return (
    <Fragment>
      <HeadSection />
    </Fragment>
  );
}

Home.propTypes = {
};

export default Home;

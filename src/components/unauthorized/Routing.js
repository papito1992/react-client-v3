import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PropsRoute from "../../components/shared/PropsRoute";
import Home from "./home/Home";
// import Blog from "./blog/Blog";
// import BlogPost from "./blog/BlogPost";

function Routing(props) {
  const { blogPosts, selectBlog, selectHome } = props;
  return (
    <Switch>
      <PropsRoute path="/" component={Home}  />
    </Switch>
  );
}

Routing.propTypes = {
};

export default memo(Routing);

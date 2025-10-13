import React from "react";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

const RenderRichText = ({ content }) => {
  const contentState = convertFromRaw(JSON.parse(content));
  const html = stateToHTML(contentState);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default RenderRichText;

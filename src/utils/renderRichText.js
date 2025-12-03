import React from "react";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

const RenderRichText = ({ content }) => {
  let html = content;

  try {
    const raw = JSON.parse(content);

    // Se for Draft.js válido, converter:
    if (raw.blocks) {
      const contentState = convertFromRaw(raw);
      html = stateToHTML(contentState);
    }
  } catch (error) {
    // Se der erro no JSON.parse,
    // significa que é HTML puro mesmo — então deixa como está
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default RenderRichText;

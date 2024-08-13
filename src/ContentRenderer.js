import React from 'react';

const applyStyles = (line, styles) => {
  // Primero, reemplazamos los corchetes dobles
  let result = line
    .replace(/\[\[(.*?)\]\]/g, (_, p1) => {
      return `[<span style="color: ${styles.brackets};">${p1}</span>]`;
    });

  // Luego, reemplazamos los paréntesis dobles
  result = result
    .replace(/\(\((.*?)\)\)/g, (_, p1) => {
      return `(<span style="color: ${styles.highlight};">${p1}</span>)`;
    });

  // Finalmente, manejamos el texto sin formato
  result = result
    .replace(/`(.*?)`/g, (_, p1) => {
      return `<span style="color: ${styles.text};">${p1}</span>`;
    });

  // Manejamos el estilo especial
  result = result
    .replace(/\{\{(.*?)\}\}/g, (_, p1) => {
      return `<span class="${styles.special}">${p1}</span>`;
    });

    
  return result;
};

const ContentRenderer = ({ content, styles }) => (
  <div style={{ color: styles.text }}>
    {content.split('\n').map((line, index) => (
      <div key={index} dangerouslySetInnerHTML={{ __html: applyStyles(line, styles) }}></div>
    ))}
  </div>
);

export default ContentRenderer;

// src/components/ServerImage.jsx
import React, { useState } from "react";

function ServerImage({ name }) {
  const [src, setSrc] = useState(`/img/${name}.png`);

  return (
    <img
      src={src}
      alt={`Imagen de ${name}`}
      className="server-image"
      onError={() => setSrc("/img/default.jpg")}
    />
  );
}

export default ServerImage;

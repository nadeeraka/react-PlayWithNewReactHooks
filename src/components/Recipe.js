import React from "react";

export default function Recipe({ ng, img, label }) {
  return (
    <div>
      <h1>{label}</h1>
      <img src={img} alt="" />
      <p>{ng}</p>
    </div>
  );
}

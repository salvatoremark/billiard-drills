import React from "react";

export default function NoItems({ message }) {
  return (
    <div>
      <div className='text-left'>
        <strong>There are no drill statistics yet.</strong>
        <p>{message}</p>
      </div>
    </div>
  );
}

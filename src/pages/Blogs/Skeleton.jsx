import React from "react";

export default function Skeleton() {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
      <figure className="w-full h-48 bg-gray-200 skeleton"></figure>
      <div className="card-body">
        <h2 className="card-title bg-gray-200 skeleton"></h2>
        <p className="bg-gray-200 skeleton"></p>
        <div className="card-actions justify-end">
          <button className="btn bg-gray-200 w-36 skeleton"></button>
        </div>
      </div>
    </div>
  );
}

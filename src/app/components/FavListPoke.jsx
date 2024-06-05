"use client";

import React from "react";
import LikePoke from "./LikePoke";
import { FaTrash } from "react-icons/fa";

function FavListPoke({ items, onDelete }) {
  return (
    <section className="grid sm:grid-cols-1 mt-4 md:grid-cols-3 lg:grid-cols-4 gap-2 ">
      {items.map((item) => (
        <div className="flex flex-col items-center shadow-xl rounded-md bg-yellow-50">
          <img src={item.sprites?.other.home.front_default} />
          <h3 className="my-2 text-md font-medium">{item.name}</h3>
          <div className="flex space-x-1 ">
            <LikePoke item={item} />
            <button
              onClick={() => {
                const confrimDel = window.confirm(
                  `Are you sure to delete ${item.name}?`
                );
                if (confrimDel) {
                  onDelete(item.id);
                }
              }}
              className="mb-1.5 hover:scale-125"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}

export default FavListPoke;

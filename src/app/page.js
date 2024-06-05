"use client";
import React, { useEffect, useState } from "react";
import FavListPoke from "./components/FavListPoke";

export default function HomePage() {
  const [pokemon, setPokemon] = useState(""); // แสดงข้อมูลโปเกม่อน
  const [items, setItems] = useState([]); // บึนทึกโปเกม่อนที่ถูกเพิ่ม Favlist
  const [count, setCount] = useState(1);
  const [searchPokemon, setSearchPokemomn] = useState(""); // search pokemon form
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ทำการโหลดข้อมูลจาก Local Storage เมื่อหน้าเว็บโหลด
    const storedItems = localStorage.getItem("favoritePokemon");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${count}`);
      const data = await res.json();

      if (res.ok) {
        setPokemon(data);
        setLoading(false);
      }
    };

    getData();
  }, [count]);

  const addFavPokemon = () => {
    const isAlreadyAdded = items.some((item) => item.id === pokemon.id);
    
    if (isAlreadyAdded) {
      alert(`This pokemon is already in your favourite list.`);
      return;
    } else {
      setItems((previousPokemon) => [...previousPokemon, pokemon]);
      localStorage.setItem(
        "favoritePokemon",
        JSON.stringify([...items, pokemon])
      );
    }
  };

  const nextPokemon = () => {
    setCount((count) => count + 1);
  };

  const preViousPokemon = () => {
    if (count < 2) {
      alert(`Not found pokemon`);
      return;
    } else {
      setCount((count) => count - 1);
    }
  };

  const handleDelete = (id) => {
    // กรองออกเฉพาะโปเกมอนที่ไม่ตรงกับ id ที่ต้องการลบ
    const filteredItems = items.filter((item) => item.id !== id);
    // อัพเดทข้อมูลใน Local Storage โดยใช้ข้อมูลที่กรองแล้ว
    localStorage.setItem("favoritePokemon", JSON.stringify(filteredItems));
    // อัพเดท state เพื่อเปลี่ยนแปลงในหน้าเว็บ
    setItems(filteredItems);
    window.location.reload();
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchPokemon) {
      alert("Please fill the pokemon name before submit");
      return;
    }

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchPokemon.toLowerCase()}`
      );
      const data = await res.json();

      if (res.ok) {
        setLoading(false);
        setPokemon(data);
        setSearchPokemomn("");
      } else {
        alert(`No pokemon name ${searchPokemon} exist`);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="max-w-7xl p-6 bg-gray-100 opacity-95 border border-gray-200 rounded-lg shadow mx-auto my-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          <div className="bg-whhite p-4 rounded-lg shadow-xl">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Pokemon</h1>
              {loading ? (
                <div>
                  <h2 className="text-xl font-semibold">Loading.........</h2>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSearch}>
                    <input
                      type="text"
                      className="w-[280px] p-2 rounded-md bg-gray-200 hover:bg-gray-300 hover:scale-110"
                      onChange={(e) => setSearchPokemomn(e.target.value)}
                      placeholder="Search Pokemon..."
                    />
                    <button className="mx-4 bg-blue-500 text-white px-3 py-2 rounded-full hover:bg-blue-600">
                      Search
                    </button>
                  </form>
                  <br />

                  <img
                    className="img__css bg-gradient-to-r from-blue-200 to-green-200 rounded-full p-10 w-auto mx-auto mb-6"
                    src={pokemon.sprites?.other.home.front_default}
                  />
                  <h2 className="text-2xl my-1 font-semibold">
                    {pokemon.name}
                  </h2>
                  <h3>
                    Attack:{" "}
                    {pokemon.stats && pokemon.stats.length > 3 && (
                      <span>{pokemon.stats[3].base_stat}</span>
                    )}
                  </h3>
                  <h3 className="my-1">
                    Type:{" "}
                    {pokemon.types && pokemon.types[0] && (
                      <span>{pokemon.types[0].type.name}</span>
                    )}
                  </h3>

                  <h3 className="mb-3">Exp: {pokemon.base_experience}</h3>
                  <button
                    className="bg-gradient-to-r from-blue-500 to-green-400 font-bold py-3 px-14 rounded-lg shadow-md hover:from-blue-500 hover:to-green-600 text-white"
                    onClick={addFavPokemon}
                  >
                    Add to favourite
                  </button>
                  <div className="flex justify-center space-x-10 mt-5">
                    <button
                      onClick={preViousPokemon}
                      className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded-md"
                    >
                      Back
                    </button>
                    <button
                      onClick={nextPokemon}
                      className="bg-green-400 hover:bg-green-500 text-white px-4 py-1 rounded-md"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-center mt-4 font-mono">
              Your Favourite Pokemon
            </h2>
            {items.length > 0 ? (
              <FavListPoke items={items} onDelete={handleDelete} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-lg ">No favourite pokemon</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [peopleList, setPeopleList] = useState({});
  const [currentWarName, setCurrentWarName] = useState(1);

  // console.log("nirdosh repos", peopleList);
  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:3001/people/${currentWarName}`
    );
    setPeopleList(response.data);
  };

  useEffect(() => {
    fetchData();
  }, [currentWarName]);

  return (
    <div style={{ margin: "4rem" }}>
      <label htmlFor="warName">Choose a warName:</label>
      <select
        name="warName"
        id="warName"
        onChange={(e) => setCurrentWarName(e.target.value)}
      >
        <option value="1">Luke Skywalker</option>
        <option value="2">C-3PO</option>
        <option value="3">R2-D2</option>
        <option value="4">Darth Vader</option>
        <option value="5">Leia Organa</option>
        <option value="6">Owen Lars</option>
        <option value="7">Beru Whitesun lars</option>
        <option value="8">R5-D4</option>
        <option value="9">Biggs Darklighter</option>
        <option value="10">Obi-Wan Kenobi</option>
      </select>

      <h1>{peopleList?.name}</h1>
      <ul>
        <li>
          <strong>Birth Year</strong>:{" "}
          {peopleList?.birth_year ? peopleList?.birth_year : "-"}
        </li>
        <li>
          <strong>Eye color</strong>:{" "}
          {peopleList?.eye_color ? peopleList?.eye_color : "-"}
        </li>
        <li>
          <strong>Gender</strong>:{" "}
          {peopleList?.gender ? peopleList?.gender : "-"}
        </li>
        <li>
          <strong>Hair color</strong>:{" "}
          {peopleList?.hair_color ? peopleList?.hair_color : "-"}
        </li>
        <li>
          <strong>Height</strong>:{" "}
          {peopleList?.height ? peopleList?.height : "-"}
        </li>
        <li>
          <strong>Mass</strong>: {peopleList?.mass ? peopleList?.mass : "-"}
        </li>
        <li>
          <strong>Skin color</strong>:{" "}
          {peopleList?.skin_color ? peopleList?.skin_color : "-"}
        </li>
        <li>
          <strong>Home planet</strong>
          <ul>
            {(peopleList?.homeworld || []).length && (
              <>
                <li>
                  <strong>Title</strong> {peopleList?.homeworld[0]?.name}
                </li>
                <li>
                  <strong>Terrain</strong> {peopleList?.homeworld[0]?.terrain}
                </li>
                <li>
                  <strong>Population</strong>{" "}
                  {peopleList?.homeworld[0]?.population}
                </li>
              </>
            )}
          </ul>
        </li>
        <li>
          <strong>Species</strong>
          <ul>
            {(peopleList?.species || []).length ? (
              peopleList.species.map((s, i) => {
                return (
                  <>
                    <li key={i}>
                      <strong>Name</strong> {s.name}
                    </li>
                    <li>
                      <strong>Average Lifespan</strong> {s.average_lifespan}
                    </li>
                    <li>
                      <strong>Classification</strong> {s.classification}
                    </li>
                    <li>
                      <strong>Language</strong> {s.language}
                      <hr />
                    </li>
                  </>
                );
              })
            ) : (
              <p>No species</p>
            )}
          </ul>
        </li>
        <li>
          <strong>Films</strong>
          <ul>
            {(peopleList?.films || []).length ? (
              peopleList.films.map((f, i) => {
                return (
                  <>
                    <li key={i}>
                      <strong>Title</strong> {f.title}
                    </li>
                    <li>
                      <strong>Director</strong> {f.director}
                    </li>
                    <li>
                      <strong>Producer</strong> {f.producer}
                    </li>
                    <li>
                      <strong>Release_date</strong> {f.release_date}
                      <hr />
                    </li>
                  </>
                );
              })
            ) : (
              <p>No films</p>
            )}
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default App;

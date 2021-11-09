const express = require("express");
const fetch = require("node-fetch");
var cors = require("cors");
const app = express();
app.use(cors());
const port = 3001;

async function FetchChildApi(urls) {
  const data = urls.map(async (u) => {
    return await fetch(u).then((res) => res.json());
  });
  const allpro = await Promise.all(data);
  console.log("nirdosh data", allpro);
  return allpro;
}

async function resGetData(url) {
  console.log("nirdosh ", `https://swapi.dev/api${url}`);
  return await fetch(`https://swapi.dev/api${url}`)
    .then((res) => res.json())
    .then(async (mainData) => {
      const { films, species, homeworld } = mainData;
      return {
        ...mainData,
        homeworld: await FetchChildApi([homeworld]),
        species: await FetchChildApi(species),
        films: await FetchChildApi(films),
      };
    });
}

// const resPostData = () => {
//   return fetch(`https://swapi.dev/api/people/1/`, {
//     method: "POST",
//     body: JSON.stringify(id),
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((res) => res.json())
//     .then((json) => json);
// };

app.get("/people/:id", async (req, res) => {
  res.send(await resGetData("/people/" + req.params.id));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

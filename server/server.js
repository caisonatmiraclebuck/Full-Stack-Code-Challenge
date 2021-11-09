const express = require("express");
const fetch = require("node-fetch");
var cors = require("cors");
const app = express();
app.use(cors());
const port = 3001;

//Call chiled api
async function FetchChildApi(urls) {
  const data = urls.map(async (u) => {
    return await fetch(u).then((res) => res.json());
  });
  const allpro = await Promise.all(data);
  return allpro;
}
//Call main api
async function resGetData(url) {
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
//backend routing
app.get("/people/:id", async (req, res) => {
  res.send(await resGetData("/people/" + req.params.id));
});
//Port use
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

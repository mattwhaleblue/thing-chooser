const fs = require("fs");

const r = `hablar
mirar
escuchar
ayudar
tomar
comer
aprender
deber
leer
vivir
permitir
recibir
abrir
alcanzar
llegar
buscar
parecer
conocer
querer
dirigir
construir
exigir
decir
jugar
pensar
empezar
entender
volver
doler
sentir
morir
conseguir`;


const createObj = () => {
  const words = r.split("\n");

  return words.map((word) => {
    const final2 = word.slice(-2);
    const stem = word.slice(0, -2);

    if (final2 === "ir") {
      return {
        name: word,
        pastParticiple: stem + "ido",
        gerund: stem + "iendo",
        present: {
          yo: stem + "o",
          tu: stem + "es",
          el: stem + "e",
          nosotros: stem + "imos",
          ellos: stem + "en",
        },
        preterite: {
          yo: stem + "í",
          tu: stem + "iste",
          el: stem + "ió",
          nosotros: stem + "imos",
          ellos: stem + "ieron",
        },
        imperfect: {
          yo: stem + "ía",
          tu: stem + "ías",
          el: stem + "ía",
          nosotros: stem + "íamos",
          ellos: stem + "ían",
        },
      };
    }

    if (final2 === "er") {
      return {
        name: word,
        pastParticiple: stem + "ido",
        gerund: stem + "iendo",
        present: {
          yo: stem + "o",
          tu: stem + "es",
          el: stem + "e",
          nosotros: stem + "imos",
          ellos: stem + "en",
        },
        preterite: {
          yo: stem + "í",
          tu: stem + "iste",
          el: stem + "ió",
          nosotros: stem + "imos",
          ellos: stem + "ieron",
        },
        imperfect: {
          yo: stem + "ía",
          tu: stem + "ías",
          el: stem + "ía",
          nosotros: stem + "íamos",
          ellos: stem + "ían",
        },
      };
    }

    return {
      name: word,
      pastParticiple: stem + "ado",
      gerund: stem + "ando",
      present: {
        yo: stem + "o",
        tu: stem + "es",
        el: stem + "e",
        nosotros: stem + "imos",
        ellos: stem + "en",
      },
      preterite: {
        yo: stem + "é",
        tu: stem + "aste",
        el: stem + "ó",
        nosotros: stem + "amos",
        ellos: stem + "aron",
      },
      imperfect: {
        yo: stem + "aba",
        tu: stem + "abas",
        el: stem + "aba",
        nosotros: stem + "abamos",
        ellos: stem + "aban",
      },
    };
  });
};

const objs =  createObj();


fs.writeFileSync("./verbs.json", JSON.stringify(objs, null, 2));

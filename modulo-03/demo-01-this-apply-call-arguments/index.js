"use strict";

const {
  watch,
  promises: { readFile },
} = require("fs");

class File {
  watch(event, filename) {
    console.log("this", this);
    console.log("arguments", Array.prototype.slice.call(arguments));
    this.showContent(filename);
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString());
  }
}

const file = new File();
// Dessa forma, ele ignora o 'this' da classe File e herda o this do watch!
// watch(__filename, file.watch);

// Alternativa para não herdar o this da função watch
// watch(__filename, (event, filename) => file.watch(event, filename));

// Podemos deixar explícito qual é o contexto que a função deve seguir
// o bind retorna uma função com o 'this' que se mantém do file, ignorando o watch
// watch(__filename, file.watch.bind(file));

// aaa
file.watch.call(
  { showContent: () => console.log("Call: Hey!") },
  null,
  __filename,
);
file.watch.apply({ showContent: () => console.log("Apply: Hey!") }, [
  null,
  __filename,
]);

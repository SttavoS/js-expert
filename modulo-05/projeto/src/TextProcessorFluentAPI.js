import { evaluateRegex } from "./utils/regex.js";

export default class TextProcessorFluentAPI {
  // Propriedade privada!
  #content;

  constructor(content) {
    this.#content = content;
  }

  /*
   * ?<=Informa que irá extrair os dados que vem depois desse grupo.
   * [contratante|contratada] ou um ou outro, irá procurar por uma das duas palavras
   * :\s{1} vai procurar pelo caractere literal, nesse caso um dois-pontos seguido de um espaço
   * Tudo acima está dentro de um grupo (), e o que queremos extrair vem depois desse grupo.
   *
   * (?!\s) negative look arround, vai ignorar tudo que seja apenas espaço que
   * venha depois do grupo de captura ou seja, vai ignorar os contratantes do
   * fim do documento.
   *
   * .*\n irá capturar qualquer coisa até o primeiro \n (quebra de linha)
   * .*? non greeety, esse ? faz com que ele pare na primeira recorrência,
   * assim ele evita ficar em loop
   *
   * $ informar que a pesquisa acaba no fim da linha
   * g -> global
   * m -> multiline
   * i -> insensitive
   * */
  extractPeopleData() {
    const matchPerson =
      /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gim;

    const onlyPerson = this.#content.match(matchPerson);
    this.#content = onlyPerson;

    return this;
  }

  divideTextInColumns() {
    const splitRegex = evaluateRegex(/,/);
    this.#content = this.#content.map((line) => line.split(splitRegex));

    return this;
  }

  removeEmptyCharacters() {
    const trimSpaces = evaluateRegex(/^\s+|\s+$|\n/g);
    this.#content = this.#content.map((line) =>
      line.map((item) => item.replace(trimSpaces, "")),
    );

    return this;
  }

  build() {
    return this.#content;
  }
}

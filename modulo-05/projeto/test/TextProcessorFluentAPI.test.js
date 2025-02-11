import { describe, it } from "mocha";
import { expect } from "chai";
import TextProcessorFluentAPI from "../src/TextProcessorFluentAPI.js";
import valid from "./mock/valid.js";

describe("TextProcessorFluentAPI", () => {
  it("build", () => {
    const result = new TextProcessorFluentAPI(valid).build();

    expect(result).to.be.deep.equal(valid);
  });

  it("extractPeopleData", () => {
    const result = new TextProcessorFluentAPI(valid)
      .extractPeopleData()
      .build();

    const expected = [
      [
        "Xuxa da Silva , brasileira, casada, CPF 235.743.420-12, residente e ",
        "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo.",
      ].join("\n"),
      [
        "Arya Robbin, belga, casado, CPF 884.112.200-52, residente e ",
        "domiciliada a Av. paulista, 1400, bairro Consolação, São Paulo.",
      ].join("\n"),
      [
        "Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ",
        "domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo.",
      ].join("\n"),
    ];

    expect(result).to.be.deep.equal(expected);
  });

  it("#divideTextInColumns", () => {
    const content = [
      [
        "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
        "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. ",
      ].join("\n"),
    ];

    const result = new TextProcessorFluentAPI(content)
      .divideTextInColumns()
      .build();

    const expected = [
      [
        "Xuxa da Silva",
        " brasileira",
        " casada",
        " CPF 235.743.420-12",
        " residente e \ndomiciliada a Rua dos bobos",
        " zero",
        " bairro Alphaville",
        " São Paulo. ",
      ],
    ];

    expect(result).to.be.deep.equal(expected);
  });

  it("#removeEmptyCharacters", () => {
    const content = [
      [
        "Xuxa da Silva",
        " brasileira",
        " casada",
        " CPF 235.743.420-12",
        " residente e \ndomiciliada a Rua dos bobos",
        " zero",
        " bairro Alphaville",
        " São Paulo. ",
      ],
    ];
    const result = new TextProcessorFluentAPI(content)
      .removeEmptyCharacters()
      .build();

    const expected = [
      [
        "Xuxa da Silva",
        "brasileira",
        "casada",
        "CPF 235.743.420-12",
        "residente e domiciliada a Rua dos bobos",
        "zero",
        "bairro Alphaville",
        "São Paulo.",
      ],
    ];
    expect(result).to.be.deep.equal(expected);
  });

  it("#mapPerson", () => {
    const content = [
      [
        "Xuxa da Silva",
        "brasileira",
        "casada",
        "CPF 235.743.420-12",
        "residente e domiciliada a Rua dos bobos",
        "zero",
        "bairro Alphaville",
        "São Paulo.",
      ],
    ];

    const result = new TextProcessorFluentAPI(content).mapPerson().build();
    const expected = [
      {
        nome: "Xuxa da Silva",
        nacionalidade: "Brasileira",
        estadoCivil: "Casada",
        documento: "23574342012",
        rua: "Rua dos bobos",
        numero: "zero",
        bairro: "Alphaville",
        estado: "São Paulo",
      },
    ];
    expect(result).to.be.deep.equal(expected);
  });
});

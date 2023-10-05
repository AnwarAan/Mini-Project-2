const randNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generatorCode = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  let code = "XXXX-XXXX-XXXX-XXXX";
  let newArr = [];
  for (let i = 0; i < 16; i++) {
    const index = randNumber(16, 1);
    newArr += alphabet[index];
  }
  newArr.split("").map((item) => (code = code.replace("X", item)));
  return code;
};

export default generatorCode;

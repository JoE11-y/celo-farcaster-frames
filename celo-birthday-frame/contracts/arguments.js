// npx hardhat verify <Contract Address> --network alfajores --constructor-args arguments.js
module.exports = [
  "0x77117D60eaB7C044e785D68edB6C7E0e134970Ea", // address param
  "590080924736463686012467503391001454017377993996437203705047956386072265915", // big number param
  1, // uint param
  false, // bool param
  18, // uint param
  false, // bool param
  [0, 0, 0, 0], // array param
  [false, false, false], // array param
];

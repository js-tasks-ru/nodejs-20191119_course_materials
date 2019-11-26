"use strict";

const CAPITALS_EN = Array.from({length: 26}, (v, k) => String.fromCharCode(65 + k));
const LOWERS_EN = Array.from({length: 26}, (v, k) => String.fromCharCode(97 + k));

const CAPITALS_RU = Array.from({length: 32}, (v, k) => String.fromCharCode(1040 + k));
const LOWERS_RU = Array.from({length: 32}, (v, k) => String.fromCharCode(1072 + k));

function encodeChar(char, shift, alphabet) {
  const position = alphabet.indexOf(char);
  const newPosition = (alphabet.length + (position + shift)) % alphabet.length;
  return alphabet[newPosition]
}

function getAlphabet(char) {
  for (const alphabet of [LOWERS_RU, LOWERS_EN, CAPITALS_RU, CAPITALS_EN]) {
    if (alphabet.includes(char)) {
      return alphabet;
    }
  }
  return false;
}

function encode(shift, data) {
  return data
    .split('')
    .map(char => {
      const alphabet = getAlphabet(char);
      return alphabet ? encodeChar(char, shift, alphabet) : char
    })
    .join('');
}

function decode(shift, data) {
  return encode(-shift, data)
}

module.exports = {
  encode,
  decode,
};

export function generateToken() {
  const character = `1234567890`;
  let result = '';
  const characterLength = character.length;

  for (let i = 0; i < 6; i++) {
    result += character.charAt(Math.floor(Math.random() * characterLength));
  }

  return result;
}

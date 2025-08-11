export function generateToken(length = 20) {
  var character =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  var token = "";

  for (let i = 0; i < length; i++) {
    token += character[Math.floor(Math.random() * character.length)];
  }

  return token;
}

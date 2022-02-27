const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const salt = "6683571eb8ad254fee7ad720a0465064ea0976785ba106cd1339d42cb752556b";

function stringToKey(string) {
  const derivedKey = crypto.pbkdf2Sync(string.normalize("NFD"), salt, 100000, 32, 'sha512')
  console.log(derivedKey.toString('hex'));
  return derivedKey
}

function encrypt(text, k) {
  const iv = crypto.randomBytes(16);
  const key = stringToKey(k);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted
  };
}

function decrypt(encryptedData, iv, k) {
  const encryptedText = Buffer.from(encryptedData, 'hex');
  const key = stringToKey(k);
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  try {
    decrypted += decipher.final('utf8');
  } catch (e) {
    console.warn("Decryption failed: " + e.reason);
    return null;
  }
  return decrypted;
}

module.exports = {
  encrypt,
  decrypt
};
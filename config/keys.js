const crypto = require("crypto")
  .randomBytes(256)
  .toString("hex"); // Provides cryptographic functionality (OpenSSL's hash, HMAC, cipher, decipher, sign and verify functions)

module.exports = {
  database: "mongodb://localhost:27017/react",
  secret: "crypto",
  password: "1kakao@Total3Goovoo$"
};

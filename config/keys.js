const crypto = require("crypto")
  .randomBytes(256)
  .toString("hex"); // Provides cryptographic functionality (OpenSSL's hash, HMAC, cipher, decipher, sign and verify functions)

module.exports = {
  database:
    "mongodb+srv://jongwoo:dbrCK200!@fctotal-qbkml.mongodb.net/test?retryWrites=true",
  secret: "crypto",
  password: "1kakao@Total3Goovoo$",
  S3_BUCKET: "fctotalbucket",
  AWS_ACCESS_KEY_ID: "AKIAIBYQQYVZ3IN2T32Q",
  AWS_SECRET_ACCESS_KEY: "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"
};

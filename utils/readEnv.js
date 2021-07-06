const dotEnv = require("dotenv");
const { parsed } = dotEnv.config({ path: "./config/config.env" });

module.exports = {
  ...parsed,
  PLC_SLOT: +parsed.PLC_SLOT,
  PLC_SCAN: +parsed.PLC_SCAN,
};

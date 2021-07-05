const { Controller, Tag, TagList, Structure } = require("st-ethernet-ip");

// read enviroment
const { PLC_IP, PLC_SLOT, PLC_SCAN } = require("../utils/readEnv");

// PLC controller
const PLC = new Controller();

// connect to PLC
const connect = async (ip = PLC_IP, slot = PLC_SLOT) => {
  try {
    await PLC.connect(ip, slot);
    console.log(`PLC connected to ${ip} slot ${slot}`);
  } catch (ex) {
    console.error("Error while connecting PLC:", ex.message);
  }
};

// read dint value
const readDInt = async tagName => {
  const tag = new Tag(tagName);
  await PLC.readTag(tag);

  return tag.value;
};

// read real value
const readReal = async (tagName, digits = 3) => {
  const tag = new Tag(tagName);
  await PLC.readTag(tag);

  return parseFloat(tag.value.toFixed(digits));
};

// read boolean
const readBool = async tagName => {
  const tag = new Tag(tagName);
  await PLC.readTag(tag);

  return tag.value;
};

module.exports = { connect, readDInt, readReal, readBool };

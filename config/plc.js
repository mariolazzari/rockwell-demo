const {
  Controller,
  Tag,
  TagList,
  Structure,
  EthernetIP,
} = require("st-ethernet-ip");
const { SINT, INT, DINT, REAL, BOOL } = EthernetIP.CIP.DataTypes.Types;

// read enviroment
const { PLC_IP, PLC_SLOT, PLC_SCAN } = require("../utils/readEnv");

// PLC controller
const PLC = new Controller();
const tagList = new TagList();
let tag;
let structure;

// connect to PLC
const connect = async (ip = PLC_IP, slot = PLC_SLOT) => {
  try {
    // plc connection
    await PLC.connect(ip, slot);
    console.log(`PLC connected to ${ip} slot ${slot}`);

    // Set scan rate of subscriptions
    PLC.scan_rate = PLC_SCAN;
    // Begin Scanning
    PLC.scan();
    console.log(`Start PLC event scan every ${PLC_IP} ms`);

    // get tags list
    await PLC.getControllerTagList(tagList);
  } catch (ex) {
    console.error("Error while connecting PLC:", ex.message);
  }
};

// get PLC properties
const getProperties = () => PLC.properties;

// read tag
const readTag = async (tagName, progName) => {
  try {
    tag = new Tag(tagName, progName);
    await PLC.readTag(tag);

    return tag.value;
  } catch (ex) {
    console.log(`Error while reading tag ${tagName}: ${ex}`);
  }
};

// write tag
const writeTag = async (tagName, progName, type, value) => {
  try {
    tag = new Tag(tagName, progName, type);
    tag.value = value;
    await PLC.writeTag(tag);
  } catch (ex) {
    console.log(`Error while writing tag ${tagName}: ${ex}`);
  }
};

// read dint value
const readDInt = async (tagName, progName = null) => readTag(tagName, progName);

// read real value
const readReal = async (tagName, progName = null, digits = 3) => {
  const value = await readTag(tagName, progName);

  // round value
  return parseFloat(value.toFixed(digits));
};

// read boolean
const readBool = async (tagName, progName = null) =>
  await readTag(tagName, progName);

// read string
const readString = async tagName => {
  try {
    structure = new Structure(tagName, tagList);
    await PLC.readTag(structure);

    return structure.value;
  } catch (ex) {
    console.error(`Error reading string ${tagName}: ${ex.generalStatusCode}`);
  }
};

// write dint
const writeDInt = async (tagName, value, progName = null) =>
  await writeTag(tagName, progName, DINT, value);

// write real
const writeReal = async (tagName, value, progName = null) =>
  await writeTag(tagName, progName, REAL, value);

// write bool
const writeBool = async (tagName, value, progName = null) =>
  await writeTag(tagName, progName, BOOL, value);

// write string
const writeString = async (tagName, value) => {
  try {
    structure = new Structure(tagName, tagList);
    structure.value = value;
    await PLC.writeTag(structure);
  } catch (ex) {
    console.error(`Error writing value ${value} into string ${tagName}: ${ex}`);
  }
};

// subscribe tag
const subscribe = async (tagName, progName = null) => {
  PLC.subscribe(new Tag(tagName, progName));

  PLC.forEach(tag => console.log(tag.name));
};

module.exports = {
  connect,
  getProperties,
  readDInt,
  readReal,
  readBool,
  readString,
  writeDInt,
  writeReal,
  writeBool,
  writeString,
  subscribe,
};

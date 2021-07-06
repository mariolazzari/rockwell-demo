const plc = require("./config/plc");

// read values
const readVals = async () => {
  // connect cpu
  await plc.connect();

  // cpu properties
  //console.log(plc.getProperties());

  // read dint
  const marioDint0 = await plc.readDInt("MARIO_DINT[0]");
  console.log(marioDint0);
  // read real
  const marioReal0 = await plc.readReal("MARIO_REAL[0]");
  console.log(marioReal0);
  // read bool
  const marioBool = await plc.readBool("MARIO_bool.0");
  console.log(marioBool);
  // read string
  let marioString = await plc.readString("Mario_String");
  console.log(marioString);

  // write dint
  await plc.writeDInt("Mario_Dint[1]", 23);
  // write real
  await plc.writeReal("Mario_Real[1]", 23.23);
  // write boolean
  await plc.writeBool("MARIO_bool_2", false);

  // write string
  await plc.writeString("Mario_String", "Ciao Mario");
  marioString = await plc.readString("Mario_String");
  console.log(marioString);

  // subscribe tag
  plc.subscribe("MARIO_DINT[0]");
};

readVals();

/*

PLC.connect("119.24.0.110", 0).then(async () => {

  // Set Scan Rate of Subscription Group to 50 ms (defaults to 200 ms)
  PLC.scan_rate = 50;
  // Begin Scanning
  PLC.scan();

  PLC.subscribe(new Tag("mario_bool_1")); // Controller Scope Tag

  // Catch the Tag "Changed" and "Initialized" Events
  PLC.forEach(tag => {
    // Called on the First Successful Read from the Controller
    tag.on("Initialized", tag => {
      console.log("Initialized", tag.value);
    });

    // Called if Tag.controller_value changes
    tag.on("Changed", (tag, oldValue) => {
      console.log(`Changed from ${oldValue} to ${tag.value}`);
    });
  });

*/

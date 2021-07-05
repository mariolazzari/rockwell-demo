const plc = require("./config/plc");

// read values
const readVals = async () => {
  // connect cpu
  await plc.connect();

  // read vals
  const marioDint0 = await plc.readDInt("MARIO_DINT[0]");
  console.log(marioDint0);
  const marioReal0 = await plc.readReal("MARIO_REAL[0]");
  console.log(marioReal0);

  const marioBool = await plc.readBool("MARIO_bool.0");
  console.log(marioBool);
};

readVals();
/*
const PLC = new Controller();

const marioDint = new Tag();
const marioReal = new Tag("MARIO_REAL[0]");
const marioBool = new Tag("Mario_Bool.0");
const marioBool5 = new Tag("Mario_Bool.5");
const marioString = new Tag("MARIO_String[0]");

PLC.connect("119.24.0.110", 0).then(async () => {
  console.log(PLC.properties);

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

  try {
    /*
        await PLC.readTag(marioDint);
        console.log(marioDint.value);

        await PLC.readTag(marioReal);
        console.log(marioReal.value);
    */

/*
await PLC.readTag(marioBool);
console.log(marioBool.value);

await PLC.readTag(marioBool5);
console.log(marioBool5.value);
*/

/*
        await PLC.readTag(marioString);
        console.log(marioString.value);
        */

/*
    const tagList = new TagList();
    await PLC.getControllerTagList(tagList);
    console.log(tagList);
    */

// read string
/*
    const stringStructure = new Structure("Mario_String", tagList);
    await PLC.readTag(stringStructure);

    console.log(stringStructure.value);

    stringStructure.value = "New String Value";
    await PLC.writeTag(stringStructure);


    //console.log("Mario DInt:", marioReal.value);
  } catch (error) {
    console.log("Errore", error);
  }
});

*/

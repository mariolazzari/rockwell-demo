const { Controller, Tag, TagList, Structure } = require("st-ethernet-ip");

const PLC = new Controller();

const marioDint = new Tag("MARIO_DINT[0]");
const marioReal = new Tag("MARIO_REAL[0]");
const marioBool = new Tag("Mario_Bool.0");
const marioBool5 = new Tag("Mario_Bool.5");
const marioString = new Tag("MARIO_String[0]");

PLC.connect("119.24.0.110", 0).then(async () => {
  console.log(PLC.properties);

  try {
    /*
    await PLC.readTag(marioDint);
    console.log(marioDint.value);

    await PLC.readTag(marioReal);
    console.log(marioReal.value);
*/

    await PLC.readTag(marioBool);
    console.log(marioBool.value);

    await PLC.readTag(marioBool5);
    console.log(marioBool5.value);

    /*
    await PLC.readTag(marioString);
    console.log(marioString.value);
    */

    const tagList = new TagList();
    await PLC.getControllerTagList(tagList);
    console.log(tagList);

    // read string
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
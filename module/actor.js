import { getRandomIntInclusive, shuffleArray } from "./utils.js";

/**
 * Extend the base Actor entity for the Tachyon Squad system
 * @extends {Actor}
 */
export class SqdCmdrActor extends Actor {

};

//---[ HOOKS ]---
/**
  * Set default values for new actors' tokens
  */
 Hooks.on("preCreateActor", (createData) => {


    console.log(`[DEBUG-J] ${JSON.stringify(createData)}`);

    const actorTemplate = game.system.template.Actor;

    // randomize stats
    let stats;
    let stress;
    let stressMax;
    let stressMin;

    switch (createData.type) {
        case "ace":
            stats = actorTemplate.ace.creation.statarray;
            stressMax = actorTemplate.ace.creation.stress.ceiling;
            stressMin = actorTemplate.ace.creation.stress.floor;
            break;
        case "veteran":
            stats = actorTemplate.veteran.creation.statarray;
            stressMax = actorTemplate.veteran.creation.stress.ceiling;
            stressMin = actorTemplate.veteran.creation.stress.floor;
            break;
        case "experienced":
            stats = actorTemplate.experienced.creation.statarray;
            stressMax = actorTemplate.experienced.creation.stress.ceiling;
            stressMin = actorTemplate.experienced.creation.stress.floor;
            break;
        default:
            stats = actorTemplate.rookie.creation.statarray;
            stressMax = actorTemplate.rookie.creation.stress.ceiling;
            stressMin = actorTemplate.rookie.creation.stress.floor;
            break;
    }

    stats = shuffleArray(stats);

    stress = getRandomIntInclusive(stressMin, stressMax);

    mergeObject(createData,
        {
            "token.bar1": { "attribute": "stress" },                       // Default Bar 1 to Stress
            "token.bar2": { "attribute": "shields" },                      // Default Bar 2 to Shields
            "token.displayName": CONST.TOKEN_DISPLAY_MODES.HOVER,          // Default display name to be on hover
            "token.displayBars": CONST.TOKEN_DISPLAY_MODES.HOVER,          // Default display bars to be on hover
            "token.disposition": CONST.TOKEN_DISPOSITIONS.NEUTRAL,         // Default disposition to neutral
            "token.name": createData.name,                                 // Set token name to actor name
            "data.gunnery.value": stats[0],
            "data.pilot.value": stats[1],
            "data.tactics.value": stats[2],
            "data.technology.value": stats[3],
            "data.stress.value": stress,
            "data.stress.max": stress
        })

    console.log(`stress max -> ${createData.data.stress.max}`);

    // Set custom default token
    if (!createData.img)
        createData.img = "systems/sqdcmdr/imgs/img_actor_default.png"

    // Default characters to Link Data = true
    //const characterTypes = ["ace", "veteran", "experienced", "rookie"];

    if ($.inArray(createData.type, actorTemplate.types) !== -1) {
        createData.token.actorLink = true;
    }
});

Hooks.on("createActor", (createData) => {


    console.log(`[DEBUG-J] createActor -> ${JSON.stringify(createData)}`);
});


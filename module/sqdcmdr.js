/**
 * Squadron Commander - FVTT system based on Simple Worldbuilding System by Atropos
 * Author: NeoAeZ
 * Software License: GNU GPLv3
 */

// Import Modules
import { SqdCmdrActor } from "./actor.js";
import { SqdCmdrItemSheet } from "./item-sheet.js";
import { SqdCmdrActorSheet } from "./actor-sheet.js";
import { _getInitiativeFormula } from "./combat.js";

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once("init", async function () {
  console.log(`Initializing Tachyon Squad System`);

  // Patch Core Functions
  Combat.prototype._getInitiativeFormula = _getInitiativeFormula;

  // Define custom Entity classes
  CONFIG.Actor.entityClass = SqdCmdrActor;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("mk-sqdcmdr", SqdCmdrActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("mk-sqdcmdr", SqdCmdrItemSheet, { makeDefault: true });
});


Hooks.once("ready", async function () {

  // Get list of default Actor folders from the System's template.json
  const defaultFolders = game.system.template.Folder.Actors;

  // Find all the Actor folders that currently exist in the World
  const folders = await game.folders.entities.filter(f => f.data.type === "Actor" && f.depth === 1);

  // Iterate through the default Actor folders and if one doesn't exit then create it
  await defaultFolders.forEach(defaultFolder => {
    console.log(`[DEBUG-J] checking for default folder: ${defaultFolder}`);

    if (!folders.some(folder => folder.name === defaultFolder)) {
      console.log(`[DEBUG-J] Creating folder (${defaultFolder})`);
      Folder.create({ "name": defaultFolder, "type": "Actor", "parent": null });
    } else {
      console.log(`[DEBUG-J] Folder (${defaultFolder}) found. Skipping creation.`);
    }
  });
});

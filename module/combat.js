


export const _getInitiativeFormula = function(combatant) {
    console.log(`[DEBUG-J] _getInitiativeFormula called...`);
    const actor = combatant.actor;
    if ( !actor ) return "4df";
    const init = actor.data.data.tactics;
    const parts = ["4df", init ? (init.value ? init.value : 0) : 0];
    return parts.filter(p => p !== null).join(" + ");
};
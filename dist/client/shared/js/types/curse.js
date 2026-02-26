export var Curses = {
    HEALTH: 0,
    RESISTANCES: 1,
};
export var curseDurationMap = [
    function (level) { return level * 1000; },
    function (level) { return level * 1000; },
    function (level) { return level * 1000; },
];
export var curseDescriptionMap = [
    "Prevent enemy health regeneration for # seconds",
    "Decrease enemy resistances by #% for # seconds",
    "Decrease enemy defense by #% for # seconds",
];

import { randomInt } from "./utils";
var amountPerMob = {
    rat: [1, 5],
    crab: [2, 5],
    bat: [2, 5],
    goblin: [4, 10],
    skeleton: [10, 15],
    snake: [10, 15],
    ogre: [14, 15],
    skeleton2: [16, 18],
    eye: [15, 20],
    spectre: [15, 20],
    deathknight: [15, 22],
    rat2: [14, 26],
    bat2: [16, 26],
    goblin2: [12, 24],
    werewolf: [12, 36],
    yeti: [14, 38],
    skeleton3: [16, 38],
    snake2: [18, 40],
    wraith: [18, 40],
    zombie: [12, 36],
    cow: [12, 46],
    rat3: [32, 100],
    golem: [32, 140],
    oculothorax: [32, 110],
    kobold: [32, 110],
    snake3: [32, 110],
    snake4: [32, 110],
    skeleton4: [32, 110],
    ghost: [32, 132],
    spider: [32, 132],
    spider2: [32, 132],
    skeletonberserker: [32, 136],
    skeletonarcher: [32, 136],
    wraith2: [32, 136],
    mage: [32, 136],
};
export var generateRandomGoldAmount = function (name, isMiniBoss) {
    var range = amountPerMob[name];
    if (!Array.isArray(range))
        return;
    var amount = randomInt(range[0], range[1]);
    return Math.ceil(amount * (isMiniBoss ? 1.5 : 1));
};
export var generateRandomNanoAmount = function (_network) {
};

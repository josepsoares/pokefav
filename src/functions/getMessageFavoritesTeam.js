import { personalityFavorites, personalityTeams } from '../assets/content/personalityContent';

const getStats = (array) => {
    var saveStats = [];
    var returnArray = [];
    for (let item of array) {
        returnArray.push({ name: item.stat.name, value: [] })
        saveStats.push([])
    }
    return [returnArray, saveStats];
}

const getStatsValues = (firstArray, secondArray, stats) => {
    for (let x = 0; x < firstArray.length; x++) {
        for (let [index, secondItem] of secondArray.entries()) {
            stats[index].value.push(secondItem.base_stat)
            let sum = stats[index].value.reduce((a, b) => a + b, 0);
            stats[index].value = [sum];
        }
    }
}

const compareStats = (array, personality) => {
    var returnResults = [];
    let lastIndex = array.length - 1;

    class verdictFromStats {
        constructor(name, verdict, stats) {
            this.name = name;
            this.verdict = verdict;
            this.stats = stats;
        }
    }

    if (personality === 'favorites') {
        for (let resultStats of personalityFavorites) {
            returnResults.push(new verdictFromStats(resultStats[0], resultStats[1], resultStats[2]));
        }
    } else {
        for (let resultStats of personalityTeams) {
            returnResults.push(new verdictFromStats(resultStats[0], resultStats[1], resultStats[2]));
        }
    }

    switch (array[lastIndex].name) {
        case 'hp':
            if (array[lastIndex - 1].name === 'defense') {
                return [returnResults[1].name, returnResults[1].verdict]
            } else {
                return [returnResults[0].name, returnResults[0].verdict]
            }
        case 'attack':
            if (array[lastIndex - 1].name === 'special-attack') {
                return [returnResults[3].name, returnResults[3].verdict]
            } else if (array[lastIndex - 1].name === 'speed') {
                return [returnResults[4].name, returnResults[4].verdict]
            } else {
                return [returnResults[2].name, returnResults[2].verdict]
            }
        case 'defense':
            if (array[lastIndex - 1].name === 'special-defense') {
                return [returnResults[6].name, returnResults[6].verdict]
            } else if (array[lastIndex - 1].name === 'hp') {
                return [returnResults[1].name, returnResults[1].verdict]
            } else {
                return [returnResults[5].name, returnResults[5].verdict]
            }
        case 'special-attack':
            if (array[lastIndex - 1].name === 'attack') {
                return [returnResults[3].name, returnResults[3].verdict]
            } else if (array[lastIndex - 1].name === 'speed') {
                return [returnResults[8].name, returnResults[8].verdict]
            } else {
                return [returnResults[7].name, returnResults[7].verdict]
            }
        case 'special-defense':
            if (array[lastIndex - 1].name === 'defense') {
                return [returnResults[6].name, returnResults[6].verdict]
            } else {
                return [returnResults[9].name, returnResults[9].verdict]
            }
        case 'speed':
            if (array[lastIndex - 1].name === 'attack') {
                return [returnResults[4].name, returnResults[4].verdict]
            } else if (array[lastIndex - 1].name === 'special-attack') {
                return [returnResults[8].name, returnResults[8].verdict]
            } else {
                return [returnResults[10].name, returnResults[10].verdict]
            }
        default:
            return 'Ops! Something went wrong'
    }
}

const getStatsMessages = (array, type) => {
    if (array.length === 0) {
        return type === 'favorites' ?
            (["You still haven't added any Pokémon to your Favorites Pokémon List in order to calculate this result"])
            :
            (["You still haven't added any Pokémon to your Favorite Pokémon Team in order to calculate this result"]);
    } else {
        let arrayStats = getStats(array[0].stats);
        getStatsValues(array, array[0].stats, arrayStats[0]);
        arrayStats[0].sort((a, b) => a.value[0] - b.value[0]);
        return compareStats(arrayStats[0], arrayStats[1]);
    }
}

export default getStatsMessages
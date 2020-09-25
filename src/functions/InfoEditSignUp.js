import string from 'lodash/string';

export const optionsGender = [
    { value: 'Female', label: 'Female' },
    { value: 'Male', label: 'Male' }
];

export const femaleAvatars = ['acetrainerf', 'lady', 'lass', 'idol', 'battlegirl', 'cowgirl']
export const maleAvatars = ['acetrainerm', 'richboy', 'ruinmaniac', 'blackbelt', 'roughneck', 'bugcatcher']

export const getNatGameRegion = array => {
    const optionsNationality = [];
    const optionsGame = [];
    const optionsRegion = [];


    for (let item of array[0]) {
        optionsNationality.push({ value: item.name, label: item.name })
    }

    for (let item of array[1].results) {
        optionsGame.push({ value: string.startCase(item.name), label: string.startCase(item.name) })
    }

    for (let item of array[2].results) {
        optionsRegion.push({ value: string.startCase(item.name), label: string.startCase(item.name) })
    }

    return [optionsNationality, optionsGame, optionsRegion]
}
export const getUniqueIndexes = (data: {id: number}[]) => {
    const indexes = data.map((item) => item.id);
    const unique = [...new Set(indexes) ]
    return unique;
}

export const shuffleArray = <T>(arrayOrigin: T[]) => {
    // stack overflow
    const array = [...arrayOrigin];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const getRandomItems = <T>(arrayOrigin: T[], count: number) => {
    return shuffleArray(arrayOrigin).slice(0, count);
} 

export const getFieldsEqualString = (fields: string[], property: string) => 
    fields.map((item) => `${property}=${item}`).join('&');

/**
 * делит массив на подмассивы: ([1,2,3,4,5,6,7], 3) => [[1,2,3], [4,5,6], [7]]
 * @param allIndexes 
 * @param partLength количество индексов в подмассиве
 * @returns 
 */
export const splitIndexesToLists = (allIndexes: number[], partLength: number) => 
    allIndexes.reduce((acc, item, i) => {
        const lastIndex = acc.length - 1; 
        if (i % partLength) {
            acc[lastIndex].push(item);
        } else {
            acc.push([item])
        }
        return acc
    }, [] as number[][]);


export const getRandomItemFromList = <T>(items: T[]) =>  items[Math.floor(Math.random() * items.length)];
export const getRandomNumberByMax = (max: number) => Math.floor(Math.random() * max);

export const getCurrentYear = () => new Date().getFullYear()
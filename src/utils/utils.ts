export const getUniqueIndexes = (data: {id: number}[]) => {
    const indexes = data.map((item) => item.id);
    const unique = [...new Set(indexes) ]
    return unique;
}

export const shuffleArray = <T>(arrayOrigin: T[]) => {
    const array = [...arrayOrigin];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const getFieldsEqualString = (fields: string[], property: string) => 
    fields.map((item) => `${property}=${item}`).join('&');


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
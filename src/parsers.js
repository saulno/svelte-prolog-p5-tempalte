export const parseInteger = (str) => {
    let str2 = str.replace('.', '');
    let value = str2.split(" = ")[1];
    return parseInt(value);
}

export const parseModel = (arr) => {
    let list = arr.map(elem => {
        let str = elem.replace('-', '').replace('(', '').replace(')', '');
        const l = str.split(",");
        return [parseInt(l[0]), parseInt(l[1])];
    });
    return list;
}

export const parsePoints = (arr) => {
    let list = arr.map(elem => {
        let str = elem.replaceAll('-', '').replaceAll('(', '').replaceAll(')', '');
        const l = str.split(",");
        return [parseInt(l[0]), parseInt(l[1]), l[2]];
    });
    return list;
    str
}

export const parseError = (err) => {
    return err;
}
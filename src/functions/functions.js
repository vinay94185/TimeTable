export function filter(dataSet, callback) {
    if(dataSet === undefined) throw new Error('tried to filter undefined');
    let filtered = [];
    for(var data in dataSet) {
        var ret = callback(dataSet[data]);
        if(ret) {
            filtered.push(ret)
        }
    }
    return filtered
}


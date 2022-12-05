export function getShortPath(j) {
    // j = end node, x = current node, y = short path order
    let y = [];
    let x = j;
    while (x !== null) {
        y.unshift(x);
        x = x.previousNode;
    };
    return y;
}
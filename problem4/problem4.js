function methodOne(n) {
    if(n < 1) return;
    let result = (n * (n + 1)) / 2;
    if (result > Number.MAX_SAFE_INTEGER) throw new Error("Value exceeds safe integer range.");
    return result;
}

function methodTwo(n) {
    let sum = 0;
    for(let i = 1; i<= n; i++){
        sum +=i;
    }
    if (sum > Number.MAX_SAFE_INTEGER) throw new Error("Value exceeds safe integer range.");
    return sum;
}   

function methodThree(n) {
    if(n < 1 ) return 0;
    if(n === 1) return n;
    let result =  n + methodThree(n - 1);
    if (result > Number.MAX_SAFE_INTEGER) throw new Error("Value exceeds safe integer range.");
    return result;
}

// As my opinion, I would prefer option 2, because it is a simple and straightforward
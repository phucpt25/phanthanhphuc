function methodOne(n) {
    if(n < 1) return;
    return (n * (n + 1)) / 2;
}

function methodTwo(n) {
    let sum = 0;
    for(let i = 1; i<= n; i++){
        sum +=i;
    }
    return sum;
}   

function methodThree(n) {
    if(n < 1 ) return 0;
    if(n === 1) return n;
    return n + method3(n - 1);
}

// As my oponion I will prefer option 2, because is a straightforward and easy to understand
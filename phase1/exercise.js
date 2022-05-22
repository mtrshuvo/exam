function countWays(n)
{
    let memo = new Array(n+1).fill(-1) ;
    helper(n, memo) ;
    return memo[n] ;
}
function helper(n, memo)
{
    if (n <= 1)
        return memo[n] = 1;
   
    if(memo[n] != -1 ){
        return memo[n] ;
    }
    memo[n] = helper(n - 1, memo) + helper(n - 2, memo);
    return  memo[n] ;
}


// console.log(countWays(0));
// console.log(countWays(3));
// console.log(countWays(4));
// console.log(countWays(5));
// console.log(countWays(10));
// console.log(countWays(15));
// console.log(countWays(20));
// console.log(countWays(50));
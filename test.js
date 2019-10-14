var minCostClimbingStairs = function(cost) {

    let arr = [cost[0],cost[1]]

    for (var i = 2; i < cost.length; i++) {
        arr[i] = Math.min(arr[i-1],arr[i-2])+cost[i]
        
    }
    return Math.min(arr[cost.length-1],arr[cost.length-2])
    
};

minCostClimbingStairs([10,15,20])
import requests from "../utils/mockRequest";

export function reqCarsousel(){
    return requests({
        url:'carousel',
        method:'GET',
    })
}

export function reqCharityRank(){
    return requests({
        url:'rank',
        method:'GET'
    })
}
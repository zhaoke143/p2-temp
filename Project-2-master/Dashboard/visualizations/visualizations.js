function buildplot{
    var date = unpack(data.dataset.data, 1)
    var attacks = unpack(data.dataset.data, 22)
    var weapontype = unpack(data.datset.data,19)
    var region = unpack(data.dataset.data, 6)
    var trace1{
        type: "line",
        x: date,
        y: attacks
    }

    var trace2{
        type: "bubble",
        x: date,
        y: weapontype
    }

    var trace3{
        type: "bar"
        x: date,
        y: region
    }    

}


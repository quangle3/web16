console.log($);

let gameId = location.href.split("/")[4];
console.log(gameId);

let i = 0;
$.ajax({
    type: "get",
    url: "/game/"+gameId,
    success: function(data) {
        console.log(data);
        // console.log(data.length);
        for(let i=0; i<data.length; i++) {
            $(`#name${i+1}`).text(data[i]);
        }
    }, error: function(err) {
        console.log(err);
    }
});

$(`#addRow`).on("click input", function() {
    var sum1 = 0;
    var sum2 = 0;
    var sum3 = 0;
    var sum4 = 0;
    let input = [];
    for(let j=0; j<i; j++) {
        
        if($(`#round${j+1} .data1`).val()=="") {
            $(`#round${j+1} .data1`).val(0);
        }   
        if($(`#round${j+1} .data2`).val()=="") {
            $(`#round${j+1} .data2`).val(0);
        }
        if($(`#round${j+1} .data3`).val()=="") {
            $(`#round${j+1} .data3`).val(0);
        }
        if($(`#round${j+1} .data4`).val()=="") {
            $(`#round${j+1} .data4`).val(0);
        }    
        input.push($(`#round${j+1} .data1`).val());
        input.push($(`#round${j+1} .data2`).val());   
        input.push($(`#round${j+1} .data3`).val());
        input.push($(`#round${j+1} .data4`).val());
        sum1 += JSON.parse($(`#round${j+1} .data1`).val());
        sum2 += JSON.parse($(`#round${j+1} .data2`).val());
        sum3 += JSON.parse($(`#round${j+1} .data3`).val());
        sum4 += JSON.parse($(`#round${j+1} .data4`).val());
    }
    console.log(input);
    $.ajax({
        type: "post", 
        url: "/input/"+gameId,
        data: {
            gameId: gameId,
            value: JSON.stringify(input) 
        },
        success: function(data) {
            console.log(data);

        }, error: function(err) {
            console.log(err);
        }
    });
    
    $(`#sosPlayer1`).text(sum1);
    $(`#sosPlayer2`).text(sum2);
    $(`#sosPlayer3`).text(sum3);
    $(`#sosPlayer4`).text(sum4);
});

$("#add").on("click", function() {
    $(`#addRow`).append(`
        <tr id="round${++i}">
            <td>Round ${i}</td>
            <td><input type="number" class="data1"></td> 
            <td><input type="number" class="data2"></td>
            <td><input type="number" class="data3"></td>
            <td><input type="number" class="data4"></td>
        </tr>
    `)
    
});

var a=-1;
var b=-1;
$.ajax({
    type: "get",
    url: "/data/"+gameId,
    success: function(data) {
        console.log(data);
        let sum1=0;
        let sum2=0;
        let sum3=0;
        let sum4=0;
        for(let j=0; j<data.length/4; j++) {
            $(`#addRow`).append(`
                <tr id="round${++i}">
                    <td>Round ${i}</td>
                    <td><input type="number" class="data1"></td> 
                    <td><input type="number" class="data2"></td>
                    <td><input type="number" class="data3"></td>
                    <td><input type="number" class="data4"></td>
                </tr>
            `)
            $(`#round${i} .data1`).val(data[++a]);
            $(`#round${i} .data2`).val(data[++a]);
            $(`#round${i} .data3`).val(data[++a]);
            $(`#round${i} .data4`).val(data[++a]);
            sum1 += JSON.parse(data[++b]); 
            sum2 += JSON.parse(data[++b]);
            sum3 += JSON.parse(data[++b]);
            sum4 += JSON.parse(data[++b]);            
        }
        $(`#sosPlayer1`).text(sum1);
        $(`#sosPlayer2`).text(sum2);
        $(`#sosPlayer3`).text(sum3);
        $(`#sosPlayer4`).text(sum4);
    }, error: function(err) {
        console.log(err);
    }
});


    










    







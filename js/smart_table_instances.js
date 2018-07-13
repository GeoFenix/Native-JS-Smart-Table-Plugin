document.addEventListener('DOMContentLoaded', function () {
    console.log('czesc Jola, tu skrypt z instancja tabeli data 2018');

    var parameters2 = { 
        nextPreviousButtons: true,
        rowsPerPage: 10,
        rowsColoring: true,
        toolTips: true,
    };

    var elForTable1 = document.querySelector('#smart-table');


// Testowa instancja
var table1 = new SmartTable(elForTable1, columns_2, data_2, parameters2);
table1.pagination();

// Test pieciu takich samych tabel (z Adrianem)

var elForTableAll = document.querySelectorAll('.js-smart-table');

var arrayOfSmartTables = [];
for (var it = 0; it < elForTableAll.length; it++){
    var zmienna = new SmartTable(elForTableAll[it], columns_2, data_2, parameters2);
    arrayOfSmartTables.push(zmienna);
};
setTimeout(function(){
    // debugger;
    for (var jt = 0; jt < arrayOfSmartTables.length; jt++ ){
        if (jt%2 === 0){
            arrayOfSmartTables[jt].pagination();
        }
        // 0%2 // 0
        // 1%2 // 1
        // 2%2 // 0
        // 3%2 // 1
        // 4%2 //0
        // 5%2 //1
    };    
}, 300);




// Nie usuwac ponizszych nawiasow, to do funkcji DOM!!!
});
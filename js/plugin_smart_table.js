//Poczatek konstruktora
    /**
     * Creates a new isntance of Smart Table 
     * 
     * @constructor 
     * @param {nodeElement} element     An element to which a SmartTable new instance is appended
     * @param {object}      columns     An object with column names and data types as properties
     * @param {array}       data        Array of objects, where each object is a single data row
     * @param {object}      parameters  Additional parameteres enabling/disabling some of the methods (TU OPISAĆ JAKIE?)
     */
    var SmartTable = function (element, columns, data, parameters) {
    /**
     * Cashing the main constructor variables as properties of 'this' function   
     */
        /** @property {nodeElement}     this.element        A variable for a function's parameter 'element'*/
        this.element = element;
        /** @property {object}          this.columns        To jest kolumna */
        this.columns = columns;
        /** @property {object}           this.columns        A variable for a function's parameter 'columns'*/
        this.columns = columns;
        /** @property {array}            this.data           A variable for a function's parameter 'data'*/
        this.data = data;
        /** @property {object}           this.parameters     A variable for a function's parameter 'parametres'*/
        this.parameters = parameters;
        /** @property {array}            this.dataTypeArray  An array for a data types from this.columns, empty at initial conditions */
        this.dataTypeArray = [];
        /** @property {array}            this.arrayInputs    An array of inputs created according to this.columns, empty at initial conditions*/
        this.arrayInputs = [];
        /** @property {nodeElement|null} this.table          A table for this.data, equalls null at initial conditions */ 
        this.table = null; 
        /** @property {nodeElement|null} this.columnsRow     A row containing column names (headers), equalls null at initial conditions */
        this.columnsRow = null;
        /** @property {nodeElement|null} this.filterRow      Additional row with inputs for filtering, equalls null at initial conditions */
        this.filterRow = null;
        /** @property {nodeElement|null} this.actionColumn   First column in a table for action buttons, equalls null at initial conditions */
        this.actionColumn = null;
        /** @property {nodeList|null}    this.actionColumn   List of all existing rows in the table, equalls null at initial conditions */
        this.allRows = null;
        /** @property {nodeElement|null} this.buttonAddRow   A button adding a row for a new record, equalls null at initial conditions*/
        this.buttonAddRow = null;
        /** @property {nodeElement|null} this.newInsertRow   A temporary row for inserting a new record, equalls null at initial conditions */
        this.newInsertRow = null;
        /** @property {array}            this.arrayOfId      An array for values of records Id for further numbering, empty at initial conditions  */
        this.arrayOfId = [];
        /** @property {nodeElement|null} this.currentRow     A row being under current action: edit/remove, equalls null at initial conditions */
        this.currentRow = null;
        /** @property {array}            this.oldTextArray   A temporary array for table data text values from this.currentRow, empty at initial conditions  */
        this.oldTextArray = [];
        /** @property {array}            this.pagesArray     An array used in pagination for storing table slices related to pages, empty at initial conditions  */
        this.pagesArray = [];
        /** @property {array}            this.pagesArray     TO DO  */
        this.paginationRefreshNumber = 0;

    /**
     * Running default constructor methods  
     */
        this.appendTable();
        this.fillColumnsRow();
        this.defineDataTypeArray();
        this.defineArrayInputs();
        this.addFilterRow();
        this.addDataRows();
        this.addActionColumn();
        this.addTooltip();
        // this.pagination();

    };
    //Koniec konstruktora

    //Metoda 1: Umieszczenie tabeli w elemencie_________Metoda 1: APPEND TABLE__(this.table)
    /**
     * Creates a table and append it to this.element
     * @private
     */
    SmartTable.prototype.appendTable = function(){
        this.table = document.createElement('table');
        this.element.appendChild(this.table);
    };
    //Metoda 1

    //Metoda 2: Zdefiniowanie wiersza columnsRow_________Metoda 2: ADD COLUMNS ROW__(this.columnRow)
    /**
     * Creates a table row for columns name and append it to the table
     * @private
     */
    SmartTable.prototype.addColumnsRow = function () {
        this.columnsRow = document.createElement('tr');
        this.table.appendChild(this.columnsRow);
    };
    //Metoda 2

    //Metoda 2.1: Wypelnienie wiersza columnsRow_________Metoda 2.1: FILL COLUMNS ROW
    /**
     * Creates table headers for this.columnsRow and fills them with column names
     * @private
     */
    SmartTable.prototype.fillColumnsRow = function () {
        // var columnsRow = this.addColumnsRow();
        this.addColumnsRow();
        for (var it = 0; it < this.columns.length; it++) {
            var th = document.createElement('th');
            this.columnsRow.appendChild(th);
            th.setAttribute('scope', 'col'); // niekoniecznie
            th.innerText = this.columns[it].columnName;
        };
    };
    //Metoda 2.1

    //Metoda 3: Zdefiniowanie wiersza newRow ____________Metoda 3: ADD NEW ROW__(newRow)
    /**
     * Creates a new table row with table data for different purposes 
     * @private
     * @returns {nodeElement} Returns a new table row
     */
    SmartTable.prototype.addNewRow = function () {
        var newRow = document.createElement('tr');
        for (var it = 0; it < this.columns.length; it++) {
            var td = document.createElement('td');
            newRow.appendChild(td);
        };
        return newRow;
    };
    //Metoda 3

    //Metoda 4: Zdefiniowanie tabeli z typem danych______Metoda 4: DEFINE DATA TYPE ARRAY__(this.dataTypeArray)
    /**
     * Contains two methods for filling up the array for data types - this.dataTypeArray 
     * @private
     */
    SmartTable.prototype.defineDataTypeArray = function () {
        this.dataTypeArray = [];
        if (this.columns.dataType) {
            this.dataTypeArrayfromColumnData();
        } else if (this.data) {
            this.dataTypeArrayfromData();
        } else {
            console.log('Wprowadz typy danych w columns albo same dane');
        };
    };
    //Metoda 4

    //Metoda 4.1. Typ danych podany z zewnatrz____________Metoda 4.1: DATA TYPE ARRAY FROM COLUMNS
    /**
     * Fills the array this.dataTypeArray with data types based on dataType property from this.columns
     * @private
     */
    SmartTable.prototype.dataTypeArrayfromColumns = function () {
        for (var it = 0; it < this.columns.length; it++) {
            for (var it = 0; it < this.columns.length; it++) {
                this.dataTypeArray.push(this.columns[it].dataType);
                console.log(this.dataTypeArray);
            }
        }
    };
    //Metoda 4.1

    //Metoda 4.2. Typ danych na podstawie danych__________Metoda 4.2: DATA TYPE ARRAY FROM DATA
    /**
     * Fills the array this.dataTypeArray with data types based on data from this.data
     * @private
     */
    SmartTable.prototype.dataTypeArrayfromData = function () {
        for (var key in this.data[0]) {
            var wartoscKlucza = this.data[0][key];
            var parsIntToString = parseInt(wartoscKlucza, 10) + '';
            if (parsIntToString.indexOf('NaN') > -1 && key.indexOf('age') === -1) {
                // np username ma @ na poczatku, wiec @ nie na pierwszym miejsc
                if (wartoscKlucza.indexOf('@') > 0) {
                    this.dataTypeArray.push('email');
                } else {
                    this.dataTypeArray.push('text');
                }
            // Tu dodatkowy warunek na age
            } else if (key.indexOf('age') > -1) {
                this.dataTypeArray.push('text');
            } else {
                this.dataTypeArray.push('number');
            }
        }
    };
    //Metoda 4.2

    //Metoda 4.3: Zdefiniowanie tablicy z inputami ___________Metoda 4.3: DEFINE ARRAY INPUTS__________(this.arrayInputs)
    /**
     * Creates inputs, defines their type according to this.dataTypeArray data and fills this.arrayInputs with them
     * @param {array} dataTypeArray An array of data types as strings - this.dataTypeArray
     * @private
     */
    SmartTable.prototype.defineArrayInputs = function (dataTypeArray) {
        for (var it = 0; it < this.dataTypeArray.length; it++) {
            var input = document.createElement('input');
            input.type = this.dataTypeArray[it];
            input.setAttribute('placeholder', this.columns[it].columnName);
            this.arrayInputs.push(input);
        };
        console.log(this.arrayInputs);
    };
    //Metoda 4.3

    //Metoda 5: Zdefiniowanie wiersza filterRow________________Metoda 5: ADD FILTER ROW_______________(this.filterRow)
    /**
     * Defines a row with filters and append it to the table
     * @param {*} dataTypeArray An array of data types as strings - this.dataTypeArray
     */
    SmartTable.prototype.addFilterRow = function (dataTypeArray) {
        this.filterRow = this.addNewRow();
        this.addInputsToRow(this.filterRow);
        this.table.appendChild(this.filterRow);
        this.filterRowsByInputs();
    };
    //Metoda 5

    // Metoda 5.1 Dodaj inputs do  wiersza_____________________Metoda 5.1: ADD INPUTS TO ROW
    /**
     * Adds inputs to a row; in case of a current row also stores old text of table data in an array this.oldTextArray
     * @param {nodeElement} row A row to which inputs are added, could be: filterRow, newInsertRow or currentRow 
     * @private
     */
    SmartTable.prototype.addInputsToRow = function (row) {
        if (row === this.filterRow){
            for (var it = 0; it < row.children.length; it++) { 
                var input = this.arrayInputs[it];
                var inputClone = input.cloneNode(true);
                inputClone.classList.add('tooltip');
                inputClone.dataset.text = 'Wpisz kryterium filtrowania';
                row.children[it].appendChild(inputClone);
            };
            this.addTooltip();
        } else {
            for (var it = 1; it < row.children.length; it++) { 
                var input = this.arrayInputs[it-1];
                var inputClone = input.cloneNode(true);
                inputClone.classList.add('tooltip');
                var columnName = this.columns[it-1].columnName;
                if (row === this.currentRow){
                    var oldText = row.children[it].innerText;
                    inputClone.value = oldText;
                    this.oldTextArray.push(oldText);
                    row.children[it].innerText = '';
                    row.children[it].appendChild(inputClone);
                    this.setIdDisabled(this.currentRow);
                    if (inputClone.disabled === true){
                        inputClone.dataset.text = 'Nie można edytować';
                    } else {
                        inputClone.dataset.text = 'Edytuj ' + columnName;
                    };
                } else if (row === this.newInsertRow){
                    row.children[it].appendChild(inputClone);
                    this.setIdDisabled(this.newInsertRow);
                    if (inputClone.disabled === true){
                        inputClone.dataset.text = 'Nie można edytować';
                    } else {
                        inputClone.dataset.text = 'Wpisz ' + columnName;
                    };
                }
                this.addTooltip();
            }
        }
    };
    //Metoda 5.1

    //Metoda 6: Dodawanie wierszy z danymi________________Metoda 6: ADD DATA ROWS
    /**
     * Adds rows with data to the table; throw a message when data doesn't exist
     * @private
     */
    SmartTable.prototype.addDataRows = function () {
        if (!this.data){
            var messageRow = document.createElement('tr');
            this.table.appendChild(messageRow);
            messageRow.innerText = 'No data found';
            return;
        } else {
            this.insertValueFromData();
            this.rowsColoring();
        }
    };
    //Metoda 6

    //Metoda 6.1: Uzupelnianie dataRows danymi____________Metoda 6.1: INSERT VALUE FROM DATA
    /**
     * Adds rows with data to the table
     * @private
     */
    SmartTable.prototype.insertValueFromData = function () {
        for (var it = 0, jt = 0; it < this.data.length; it++, jt = 0) {
            var dataRow = this.addNewRow();
            this.table.appendChild(dataRow);
            for (var key in this.data[it]) {
                var td = dataRow.children[jt];
                td.innerText = this.data[it][key];
                jt++;
            }
        }
    };
    //Metoda 6.1

    //Metoda 7 Dodanie kolumny Actions____________________Metoda 7: ADD ACTION COLUMN________(this.actionColumn;this.allRows)
    /**
     * Adds a column Action with action buttons: Add New Rows Button and Edit and Remove buttons
     * @private  
     */
    SmartTable.prototype.addActionColumn = function () {
        // Dodawanie th Actions
        var firstThBeforeAction = this.columnsRow.querySelector('th');
        this.actionColumn = document.createElement('th');
        this.columnsRow.insertBefore(this.actionColumn,firstThBeforeAction);
        this.actionColumn.innerText = 'Actions';
        // Dodawanie td Actions do kazdego rows
        this.allRows = this.table.querySelectorAll('tr');
        for (var it = 1; it < this.allRows.length; it++){
            var firstTdBeforeAction = this.allRows[it].querySelector('td');
            var actionTd = document.createElement('td');
            this.allRows[it].insertBefore(actionTd, firstTdBeforeAction);
            if (it === 1){
                this.appendAddRowsButton(actionTd);
            };
            if (it > 1){
                this.addButtonsEditAndRemove(actionTd)
            }
        }
        this.allRows = null
    };
    // Metoda 7

    //Metoda 7.1 Dodanie buttonAddRow_____________________Metoda 7.1: APPEND ADD ROWS BUTTON________(this.buttonAddRow)
    /**
     * 
     * @param {nodeElement} td First table data element in the second row (filter row) of the table for Add Rows Button
     * @private 
     */
    SmartTable.prototype.appendAddRowsButton = function (td) {
        this.buttonAddRow = document.createElement('button');
        this.buttonAddRow.classList.add('tooltip');
        this.buttonAddRow.dataset.text = 'Dodaj nowy wiersz do wprowadzenia rekordu';
        this.buttonAddRow.innerText = 'AddRow';
        td.appendChild(this.buttonAddRow);
        this.buttonAddRow.addEventListener('click', this.onClickAddNewInsertRowHandler.bind(this));
    };
    //Metoda 7.1

    //Metoda 8  Dodanie wiersza do wprow. danych__________Metoda 8: ON CLICK ADD NEW INSERT ROW HANDLER ______(this.newInsertRow)
    /**
     * On click the addRow button adds a new row to insert new data record
     * There is a condition that it can be added only if no new row/current exists/is being edited 
     * @callback
     * @private
     */
    SmartTable.prototype.onClickAddNewInsertRowHandler = function(){
        if (this.newInsertRow === null && this.currentRow === null){
            this.newInsertRow = this.addNewRow();
            var firstTdBeforeAction = this.newInsertRow.querySelector('td');
            var actionTd = document.createElement('td');
            this.newInsertRow.insertBefore(actionTd, firstTdBeforeAction);
            this.addInputsToRow(this.newInsertRow);
            this.table.insertBefore(this.newInsertRow, this.filterRow.nextSibling);
            this.addButtonsAcceptAndCancel(this.newInsertRow);
            this.autoNumbering(this.newInsertRow);
        }
    };
    //Metoda 8

    //Metoda 8.2a Numerowanie ID __________________________Metoda 8.2a AUTO NUMBERING
    /**
     * Assign a sequential number to a newly inserted row based on the highest existing id value  
     * @param {nodeElement} newRow It should be this.newInsertRow
     * @private
     */
    SmartTable.prototype.autoNumbering = function (newRow) {
        //Utworzenie tablicy z indeksami
        this.definingArrayOfId();
        // Sortowanie indeksow
        this.dataSorting(this.arrayOfId);
        // Umieszczenie nowego ID w inpucie
        this.addNextNumberToInputWithID(newRow);
    };
    //Metoda 8.2a

    //Metoda 8.2b Utworzenie tablicy z nr ID _______________Metoda 8.2b DEFINING ARRAY OF ID______(this.arrayOfId)
    /**
     * Fills an array this.arrayOfId with each row ID values 
     * Identifies Id cell by column name: ID, Id or id
     * @private 
     */
    SmartTable.prototype.definingArrayOfId = function () {
        //Wyszukanie kolumny z ID i warunek ze number
        var currentAllRows = this.table.querySelectorAll('tr');
        for (var it = 1; it < this.newInsertRow.children.length; it++ ){
            var columnName = this.columns[it - 1].columnName;
            if (columnName === 'ID' || columnName === 'Id' || columnName === 'id'){
                for (var jt = 3; jt < currentAllRows.length; jt++) {
                    var tdInnerText = currentAllRows[jt].children[it].innerText;
                    var tdParsInt = parseInt(tdInnerText, 10);
                    if (!isNaN(tdParsInt)) {
                        this.arrayOfId.push(tdParsInt);
                    }
                }
            }
        }
    };
    //Metoda 8.2b

    //Metoda 8.2c Sortowanie tablicy z nr ID_______________Metoda 8.2c DATA SORTING
    /**
     * Sorts ascendantly an array of ID values
     * @param {array} arrayTosort An array with each existing row ID, should be this.arrayOfId
     * @private
     */
    SmartTable.prototype.dataSorting = function (arrayTosort) {
        var arraySorted = arrayTosort.sort(function (a, b) {
            return a - b;
        })
    };
    //Metoda 8.2c

    //Metoda 8.2d Dodawanie kolejnego auto ID______________Metoda 8.2d ADD NEXT NUMBER TO INPUT WITH ID
    /**
     * Adds next sequential number corresponding to a new row into appropriate input
     * @param {nodeElement} row It should be a newRow parameter from autoNumbering method and equals this.newInsertRow
     * @private
     */
    SmartTable.prototype.addNextNumberToInputWithID = function (row) {
        var lastId = this.arrayOfId[this.arrayOfId.length - 1];
        var nextId = lastId + 1;
        var IDindex = null;
        for (var it = 1; it < this.newInsertRow.children.length; it++) {
            var columnName = this.columns[it - 1].columnName;
            if (columnName === 'ID' || columnName === 'Id' || columnName === 'id') {
                var IDindex = it;
            }
        };
        row.children[IDindex].querySelector('input').value = nextId;
    };
    //Koniec Metoda 8.2d

    // Metoda 9 Ustawienie inputu ID jako disabled_________Metoda 9 SET ID DISABLED
    /**
     * Sets the input related to Id column as disabled   
     * @param {nodeElement} row It should be this.currentRow or this.newInsertRow
     * @private
     */
    SmartTable.prototype.setIdDisabled = function (row) {
        for (var it = 1; it < row.children.length; it++) {
            var input = row.children[it].querySelector('input')
            var columnName = this.columns[it - 1].columnName;
            if (columnName === 'ID' || columnName === 'Id' || columnName === 'id' ) {
                input.setAttribute('disabled', 'true');
            }
        }
    };// Metoda 9

    //Metoda 10 Dodanie buttonAccept i Cancel______________Metoda 10: ADD BUTTONS ACCEPT AND CANCEL
    /**
     * Adds Accept and Cancel buttons to action column when a row is in the editing mode 
     * @param {nodeElement} row It should be this.currentRow or this.newInsertRow
     * @private
     */
    SmartTable.prototype.addButtonsAcceptAndCancel = function (row) {
        var buttonAccept = document.createElement('button');
        buttonAccept.innerText = 'A';
        buttonAccept.classList.add('tooltip');
        buttonAccept.dataset.text = 'Akceptuj wiersz';
        row.children[0].appendChild(buttonAccept);
        var buttonCancel = document.createElement('button');
        buttonCancel.innerText = 'C';
        buttonCancel.classList.add('tooltip');
        buttonCancel.dataset.text = 'Anuluj akcję';
        row.children[0].appendChild(buttonCancel);
        //Zapiecie eventow:
        this.addEventOnButtonAccept(buttonAccept);
        this.addEventOnButtonCancel(buttonCancel);
        this.addTooltip();
    };
    // Metoda 10

    //Metoda 10.1 Zapiecie eventow na buttonAccept_________Metoda 10.1. ADD EVENT ON BUTTON ACCEPT
    /**
     * Adds event listener on the Accept button with a row accepting callback function 
     * @param {nodeElement} button It should be the Accept button
     * @private
     */
    SmartTable.prototype.addEventOnButtonAccept = function (button) {
        button.addEventListener('click', this.onClickAcceptRowHandler.bind(this));
    };
    //Metoda 10.1

    //Metoda 10.2 Zapiecie eventow na buttonAccept_________Metoda 10.2. ADD EVENT ON BUTTON CANCEL
    /**
     * Adds event listener on the Cancel button with a row canceling callback function
     * @param {nodeElement} button It should be the Cancel button
     */
    SmartTable.prototype.addEventOnButtonCancel = function (button) {
        button.addEventListener('click', this.onClickCancelRowHandler.bind(this));
    };
    // Metoda 10.2

    //Metoda 10.1a Akceptuj nowy/edytowany wiersz___________Metoda 10.1a: ON CLICK ACCEPT ROW HANDLER
    /**
     * Accepts a row which had been edited when clicking on Accept button
     * @callback
     * @param {*} event 
     * @private
     */
    SmartTable.prototype.onClickAcceptRowHandler = function (event) {
        var newOrEditedRow = event.target.parentElement.parentElement;
        this.rowValidator(newOrEditedRow);
        this.removeTooltipClass(newOrEditedRow);
    };
    // Metoda 10.1a

    //Metoda 10.1b Walidator emaila_________________________Metoda 10.1b: ROW EMAIL VALIDATOR
    /**
     * In case when there is an email column validates whether at least '@' was written in the input
     * @param {nodeElement} row It is a variable newOrEditedRow from a method onClickAcceptRowHandler 
     */
    SmartTable.prototype.rowValidator = function (row) {
        //Walidacja na maila
        /**
         * A local variable for checking if the email column exists; when exists then it is 'true'
         * @type {boolean|null} 
         * @private
         */
        var emailValidator = null;
        for (var it = 0; it < this.dataTypeArray.length; it++){
            if (this.dataTypeArray[it] === 'email'){
                emailValidator = true;
            }
        };
        if (emailValidator === true){
            var emailInputValue = row.querySelector('input[type = "email"]').value;
            if (emailInputValue.indexOf('@') > 0) {
                this.acceptRow(row);
            } else {
                this.removeErrorMessage();
                this.addErrorMessage('Musisz wstawić email z malpa: @');
            }
        } else {
            /**
             * A local variable for checking if any of the input is not empty,in that case it is true it is 'true'
             * @type {boolean|null}
             */
            var notEmptyInputValidator = null;
            var inputAll = row.querySelectorAll('input');
            for (var it = 0; it < inputAll.length; it++) {
                if (inputAll[it].disabled === false && inputAll[it].value !== ''){
                    notEmptyInputValidator = true;
                };
            };
            if (notEmptyInputValidator === true){
                this.acceptRow(row);
            } else {
                this.removeErrorMessage();
                this.addErrorMessage('Musisz wypełnić przynajmniej jedno pole');
            }
        }
    };
    //Metoda 10.1b

    //Metoda 10.1c Usuwanie error messageParagraf___________Metoda 10.1c: ACCEPT ROW
    /**
     * Accepts a row after successful validation by removing inputs, two cases for: current and new input row
     * @param {nodeElement} row It is a variable newOrEditedRow from a method onClickAcceptRowHandler->rowValidator
     * @private
     */
    SmartTable.prototype.acceptRow = function (row) {
        this.removeInputs(row);
        var actionTd = event.target.parentElement;
        this.removeTwoButtons(actionTd);
        this.addButtonsEditAndRemove(actionTd);
        if (row === this.newInsertRow) {
            this.appendNewRowtoTable(row);
            this.newInsertRow = null;
            this.rowsColoring();
            this.removeErrorMessage();
            this.onKeyupFilterRowsHandler();
        } else {
            this.rowsColoring();
            this.currentRow = null;
            this.removeErrorMessage();
            this.onKeyupFilterRowsHandler();
        };
    };
    //Metoda 10.1c

    //Metoda 10.1d Usuwanie error messageParagraf___________Metoda 10.1d: REMOVE ERROR MESSAGE
    /**
     * Removes a current error message paragraf which was displayed while row validating  
     * @private
     */
    SmartTable.prototype.removeErrorMessage = function () {
        if (document.querySelector('.errorParagraf')) {
            var errorParagraf = document.querySelector('.errorParagraf');
            errorParagraf.parentElement.removeChild(errorParagraf);
        };
    };
    //Metoda 10.1d

    //Metoda 10.1e Dodawanie error messageParagraf___________Metoda 10.1e: ADD ERROR MESSAGE
    /**
     * Adds a paragraf with error message text while row validation
     * @param {string} messageText Introduce an error text message you want to appear in the error paragraf
     * @private
     */
    SmartTable.prototype.addErrorMessage = function (messageText) {
        var errorParagraf = document.createElement('p');
        errorParagraf.innerText = messageText;
        errorParagraf.classList.add('errorParagraf')
        this.element.parentElement.insertBefore(errorParagraf, this.element);
    };
    //Metoda 10.1e

    //Metoda 11 Usuniecie inputow___________________________Metoda 11: REMOVE INPUTS
    /**
     * Removes inputs from a row and update the inner text
     * @param {nodeElement} row It is a variable newOrEditedRow from a method onClickAcceptRowHandler->rowValidator->acceptRow
     * @private
     */
    SmartTable.prototype.removeInputs = function (row) {
        for (var it = 1; it < row.children.length; it++) {
            var input = row.children[it].querySelector('input');
            row.children[it].innerText = input.value;
        }
    };
    //Metoda 11

    //Metoda 12 Usuniecie buttonow akcji___________________Metoda 12: REMOVE TWO BUTTONS
    /**
     * Removes two action buttons: Edit and Remove or Accept and Cancel from the indicated table data cell
     * @param {nodeElement} td Table data cell of a current or new insert row containing the two action buttons
     * @private
     */
    SmartTable.prototype.removeTwoButtons = function (td) {
        var button1 = td.querySelector('button');
        var button2 = button1.nextSibling;
        button1.parentElement.removeChild(button1);
        button2.parentElement.removeChild(button2);
    };
    //Metoda 12

    //Metoda 13 Wstawianie wiersza do tabeli________________Metoda 13: APPEND NEW ROW TO TABLE
    /**
     * Appends to a table new insert row which was successfully validated
     * @param {nodeElement} newRow It is a variable this.newInsertRow from a method onClickAcceptRowHandler->rowValidator->acceptRow
     * @private
     */
    SmartTable.prototype.appendNewRowtoTable = function (newRow) {
        this.table.appendChild(newRow);
    };
    //Metoda 13

    //Metoda 14. Kolorowanie co drugiego wiersza____________Metoda 14 ROWS COLORING____(this.allRows)
    /**
     * Colors every second row of the table
     * @public
     */
    SmartTable.prototype.rowsColoring = function () {
        if (!!this.parameters.rowsColoring){
            this.allRows = this.table.querySelectorAll('tr');
            var rowsArray = [];
            for (it = 2; it < this.allRows.length; it++) {
                this.allRows[it].style.backgroundColor = '';
                if (this.allRows[it].style.display === ''){
                    rowsArray.push(this.allRows[it]);
                }
            };
            for (var it = 0; it < rowsArray.length; it++) {
                rowsArray[it].style.backgroundColor = '';
                if (it % 2 === 0) {
                    rowsArray[it].style.backgroundColor = '#fac000';
                }
            };
        }
    };
    //Metoda 14

    //Metoda 10.2a Anuluj nowy/edytowanie wiersza____________Metoda 10.2.a ON CLICK CANCEL ROW HANDLER_____(this.oldTextArray, this.currentRow, this.newInsertRow)
    /**
     * Cancels a row which had been edited when clicking on Cancel button
     * @param {*} event 
     * @callback 
     * @private
     */
    SmartTable.prototype.onClickCancelRowHandler = function (event) {
        row = event.target.parentElement.parentElement;
        if (row === this.newInsertRow){
            this.removeTooltipClass(row);
            this.table.removeChild(event.target.parentElement.parentElement);
            this.removeErrorMessage();
        } else {
            this.removeTooltipClass(row);
            this.cancelEditingCurrentRow();
            this.oldTextArray = [];
            this.removeErrorMessage();
        }
        this.newInsertRow = null;
        this.currentRow = null;
    };
    // Metoda 10.2a

    //Metoda 15 Dodanie buttonAccept i Cancel________________Metoda 15 ADD BUTTONS EDIT AND REMOVE
    /**
     * Add two action buttons: Edit and Remove into the indicated table data cell
     * @param {nodeElement} td Table data cell of a current or new insert row for the action buttons Edit and Remove
     * @private
     */
    SmartTable.prototype.addButtonsEditAndRemove = function (td) {
        buttonEdit = document.createElement('button');
        buttonEdit.innerText = 'E';
        buttonEdit.classList.add('tooltip');
        buttonEdit.dataset.text = 'Edytuj wiersz';
        td.appendChild(buttonEdit);
        buttonRemove = document.createElement('button');
        buttonRemove.innerText = 'R';
        buttonRemove.classList.add('tooltip');
        buttonRemove.dataset.text = 'Usuń wiersz';
        td.appendChild(buttonRemove);
        //Zapiecie eventow:
        this.addEventOnButtonEdit(buttonEdit);
        this.addEventOnButtonRemove(buttonRemove);
    };

    // Metoda 15.1 Zapiecie eventow na buttonEdit____________Metoda 15.1 ADD EVENT ON BUTTON EDIT
    /**
     * Adds event listener on the Cancel button with a row editing callback function 
     * @param {nodeElement} button The action button: Edit
     * @private
     */
    SmartTable.prototype.addEventOnButtonEdit = function (button) {
        button.addEventListener('click', this.onClickEditRowHandler.bind(this));
    };
    // Metoda 15.1

    // Metoda 15.2 Zapiecie eventow na buttonRemove____________Metoda 15.2: ADD EVENT ON BUTTON REMOVE
    /**
     * Adds event listener on the Cancel button with a row editing callback function
     * @param {nodeElement} button The action button: Remove
     * @private
     */
    SmartTable.prototype.addEventOnButtonRemove = function (button) {
        button.addEventListener('click', this.onClickRemoveRowHandler.bind(this));
    };
    // Metoda 15.2

    // Metoda 15.1a Edytuj wiersz______________________________Metoda 15.1a: ON CLICK EDIT ROW HANDLER_____(this.currentRow)
    /**
     * Allows for editing mode of a current row 
     * @param {*} event
     * @callback
     * @private 
     */
    SmartTable.prototype.onClickEditRowHandler = function (event) {
        if (this.currentRow === null && this.newInsertRow === null) {
            this.currentRow = event.target.parentElement.parentElement;
            //Dodanie inputow
            this.addInputsToRow(this.currentRow);
            var actionTd = this.currentRow.children[0];
            // Usuniecie buttonow Edit i Remove
            this.removeTwoButtons(actionTd);
            // Dodanie buttonow Accept i Cancel;
            this.addButtonsAcceptAndCancel(this.currentRow);
        }
    };
    // Metoda 15.1a

    // Metoda 15.2a Usun wiersz_______________________________Metoda 15.2a: ON CLICK REMOVE ROW HANDLER_____(this.currentRow)
    /**
     * Removes a current row
     * @callback
     * @param {*} event 
     */
    SmartTable.prototype.onClickRemoveRowHandler = function (event) {
        this.table.removeChild(event.target.parentElement.parentElement);
        this.onKeyupFilterRowsHandler();
    };
    // Metoda 15.2a

    // Metoda 10.2b Anuluj edytowanie wiersza________________Metoda 10.2b: CANCEL EDITING CURRENT ROW________(this.currentRow, this.oldTextArray)
    /**
     * Assigns original table data values existing before editing mode of a current row
     * @private
     */
    SmartTable.prototype.cancelEditingCurrentRow = function () {
        for (var it = 1; it < this.currentRow.children.length; it++) {
            this.currentRow.children[it].innerText = this.oldTextArray[it - 1];
        };
        var actionTd = this.currentRow.children[0];
        this.removeTwoButtons(actionTd);
        // Dodanie buttonow Accept i Cancel;
        this.addButtonsEditAndRemove(actionTd);
    };
    // Metoda 10.2b

    // Metoda 16 Zapiecie eventu filtrowanie na inputs_______Metoda 16: FILTER ROWS BY INPUTS_________________(this.filterRow)
    /**
     * Adds event listener on every input in a filter row with filtering function as a callback 
     * @private
     */
    SmartTable.prototype.filterRowsByInputs = function () {
        var inputArrayFilter = this.filterRow.querySelectorAll('input');
        for (var mt = 0; mt < inputArrayFilter.length; mt++){
            inputArrayFilter[mt].addEventListener('keyup', this.onKeyupFilterRowsHandler.bind(this));
        };
    };
    //Metoda 16

    // Metoda 16.1 Filtrowanie wg inputow____________________Metoda 16.1: ON KEY UP FILTER ROWS HANDLER_________(this.allRows)
    /**
     * Filters all data records according to filter row inputs values, filtering order increases from left to right side
     * In case of data type 'number' allows for using filtering math functions with comparison signs: >,<,<=,>=
     * @param {*} event 
     * @callback
     * @private
     */
    SmartTable.prototype.onKeyupFilterRowsHandler = function (event) {
        // Stan poczatkowy, wszystkie wyswietlamy
        this.allRows = this.table.querySelectorAll('tr');
        for (var rt = 0; rt < this.allRows.length; rt++ ){
            this.allRows[rt].style.display = '';
        };
        // Filtrowanie
        var inputArrayFilter = this.filterRow.querySelectorAll('input');
        for (var it = 2; it < this.allRows.length; it++) {
            for (var jt = 0; jt < inputArrayFilter.length; jt++){
                var inputValue = '' + inputArrayFilter[jt].value;
                inputValue2 = inputValue.toLowerCase();
                var tdText = '' + this.allRows[it].children[jt + 1].innerText;
                tdText2 = tdText.toLowerCase();
                if (!(inputValue === '')){
                    var tdTextNumber = parseInt(tdText,10)
                    // jezeli dane sa liczbai a filter zaczyna sie jako > lub < zastosuj fukcje matematyczne filtrowania
                    if (true !== isNaN(tdTextNumber) && inputValue.indexOf('>') === 0 || inputValue.indexOf('<') === 0){
                        this.mathFunctionsForFiltering(inputValue,tdTextNumber,it);
                    } else {
                        //w innym przypadku jest to tekst
                        if (this.allRows[it].style.display === '' && !(tdText2.indexOf(inputValue2) > -1)) {
                            this.allRows[it].style.display = 'none';
                        };
                    }
                }
            }
        }
        this.pagination();
        this.rowsColoring();
        
    }
    //Metoda 16.1

    // Metoda 16.2 Funkcje matemat. do filtrowania __________Metoda 16.2: MATH FUNCTIONS FOR FILTERING
    /**
     * Allows for filtering the table rows according to number type inputs using also comparison signs: >,<,<=,>= 
     * Uses 'slice' property to cut string input value into comparison sign and the rest containing number
     * Uses 'switch' function to hide the row if it doesn't meet the criterion of a sing and a number
     * @param {string} inputValue Text from input value being originally a number and containing also a comparison sign
     * @param {nodeElement} tdTextToNumber Data from table data element as a number
     * @param {number} itNumber Number of iteration corresponding to the index of a particular row in this.allRows
     * @private
     * @todo Fix the switch function for some comparison signs - rows are not hidden (details in my notesS)
     */
    SmartTable.prototype.mathFunctionsForFiltering = function (inputValue,tdTextToNumber,itNumber) {
        /**
         * A variable to contain a comparison sign part of the inputValue
         * @type {string|null}
         */
        var comparisonSign = null;
        var tdTextNumber = tdTextToNumber;
          /**
         * A variable to contain a rest part of the inputValue which is a number
         * @type {string|null}
         */
        var inputValueNumberRest = null;
        // Dla wartosci inputow zawierajacych < lub > oddziela znak od reszty liczbowej wlasnoscia 'slice'
        if (inputValue.indexOf('>') === 0 || inputValue.indexOf('<') === 0 && inputValue.indexOf('=') !== 1) {
            comparisonSign = inputValue.slice(0,1);
            inputValueNumberRest = inputValue.slice(1,inputValue.length);
        // Dla wartosci inputow zawierajacych <= lub >= oddziela znak od reszty liczbowej wlasnoscia 'slice'
        } else if (inputValue.indexOf('>=') === 0 || inputValue.indexOf('<=') === 0) {
            comparisonSign = inputValue.slice(0,2);
            inputValueNumberRest = inputValue.slice(2,inputValue.length)
        }
        // Wykorzystuje funkcje switch zeby ukryc dany wiersz jesli wartosc odpowiedniej komorki liczbowej nie spelnia
        // kryterium znaku i reszty liczbowej wartosci filtra
        switch (comparisonSign){
            case '>':
            if (!(tdTextNumber > inputValueNumberRest)) {
                this.allRows[itNumber].style.display = 'none'
            }; 
            break;
            case '<':
            if (!(tdTextNumber < inputValueNumberRest)) {
                this.allRows[itNumber].style.display = 'none'
            }; 
            break;
            case '>=':
            if (!(tdTextNumber >= inputValueNumberRest)) {
                this.allRows[itNumber].style.display = 'none'
            }; 
            break;
            case '<=':
            if (!(tdTextNumber <= inputValueNumberRest)) {
                this.allRows[itNumber].style.display = 'none'
            }; 
            break;
            default:
            console.log('Blad');
        }
    };

    // Metoda 17 Paginacja po 10_____________________________Metoda 17: PAGINATION_________________(this.pagesArray)
    /**
     * Displays rows according to their number per page specified by user 
     * @private
     * @todo firstOrCurrentPageDisplay dokończyć
     */
    SmartTable.prototype.pagination = function () {
        console.log('To jest paginacja');
        // 1. Do funkcji this.firstOrCurrentPageDisplay();
        var currentPageButton = this.element.querySelector('button[style]');
        // 2. Warunki poczatkowe, zerujemy i usuwamy poprzedni element z buttonami
        this.pagesArray = [];
        if (this.element.querySelector('.divPaginButton')) {
            var existingDivPaginButton = this.element.querySelector('.divPaginButton');
            existingDivPaginButton.parentElement.removeChild(existingDivPaginButton);
        };
        // 3. Dodajemy element na umieszczenie buttons
        var divPaginButton = document.createElement('div');
        divPaginButton.classList.add('divPaginButton');
        this.element.appendChild(divPaginButton);
        // 4.  Zaladowanie wszystkich rows do tablicy
        /**
         * An array for all rows for further slicing into pages
         * @type {array}
         */
        var rowsArray = [];
        for (it = 2; it < this.table.children.length; it++) {
            if (this.table.children[it].style.display === ''){
                rowsArray.push(this.table.children[it]);
            }
        };
        // 5. Dzielenie tabeli na slicy wg stron 
        this.tableIntoSlices(rowsArray, divPaginButton)
        // 6. Zapiecie eventow na przyckiski stron
        var pagesButtons = divPaginButton.querySelectorAll('button.buttonPage');
        for (it = 0; it < pagesButtons.length; it++){
            pagesButtons[it].addEventListener('click', this.onClickShowChosenPageHandler.bind(this))
        }
        // 8. Dodanie Przycisków next i previous wraz z dopietymi eventami
        if (!!this.parameters.nextPreviousButtons){
            this.addButtonsNextAndPrevious(divPaginButton, pagesButtons);
        } else {
            throw 'Wprowadzana wartosc powinna byc true/false' 
        }
        // 7. Na poczatek wyswietlanie pierwszej strony lub poprzedniej jesli byla:
        this.firstOrCurrentPageDisplay(currentPageButton);


    };
    //Metoda 17

    // Metoda 17.1 Podzial tabeli wg stron___________________Metoda 17.1: TABLE INTO SLICES_________________(this.pagesArray)
    /**
     * Cuts an array with all rows into slices according to the number per page specified by user
     * @param {array} allRowsArray An array containing all rows for further slicing into pages
     * @param {nodeElement} divForButtons Div element for storing pagination buttons
     * @private
     */
    SmartTable.prototype.tableIntoSlices = function (allRowsArray, divForButtons) {
        /**
         * Represents a number of rows per page specified by user in parameters object
         * @public
         * @type {boolean}
         * @todo Optionally simplify code in condition (allRowsArray.length < rowsPerPage)
         */
        var rowsPerPage = this.parameters.rowsPerPage
        if (rowsPerPage > 0){
            var pagesNumberInteger = 0;
            var pagesNumberRational = allRowsArray.length / rowsPerPage;
            var pagesNumberRest = allRowsArray.length%rowsPerPage;
            var start = 0;
            var end = rowsPerPage;
            if (allRowsArray.length < rowsPerPage){
                pagesNumberInteger = 1;
                for (var it = 0; it < pagesNumberInteger; it++) {
                    var pageTableSlice = allRowsArray.slice(start, end);
                    this.pagesArray.push(pageTableSlice);
                    this.addPageButton(divForButtons, it);
                };
            } else if (pagesNumberRest === 0){
                pagesNumberInteger = pagesNumberRational;
                for (var it = 0; it < pagesNumberInteger; it++) {
                    var pageTableSlice = allRowsArray.slice(start, end);
                    start += rowsPerPage;
                    end += rowsPerPage;
                    this.pagesArray.push(pageTableSlice);
                    this.addPageButton(divForButtons, it);
                };
            } else if (pagesNumberRest !== 0){
                pagesNumberInteger = pagesNumberRational - pagesNumberRest*0.1 + 1;
                for (var it = 0; it < pagesNumberInteger; it++) {
                    var pageTableSlice = allRowsArray.slice(start, end);
                    start += rowsPerPage;
                    end += rowsPerPage;
                    this.pagesArray.push(pageTableSlice);
                    this.addPageButton(divForButtons, it);
                }
            } 
        } else if (rowsPerPage <= 0){
            throw 'Wartosci rowne i mniejsze od zera oznaczaja brak paginacji'
        }
    };
    //Metoda 17.1

    // Metoda 17.1a Slice na tabeli ilosci pages________________Metoda 17.1a: ADD PAGE BUTTON
    /**
     * Adds a button 
     * @param {nodeElement} divForButtons2 Div element for storing pagination buttons from method this.tableIntoSlices
     * @param {number} it2 Index of table slice (page) in the array this.pagesArray, when adds 1 then it is a button page button number 
     */
    SmartTable.prototype.addPageButton = function (divForButtons2, it2) {
        var button = document.createElement('button');
        button.innerText = it2 + 1;
        button.classList.add('tooltip');
        button.dataset.text = 'Wybierz stronę';
        divForButtons2.appendChild(button);
        button.classList.add('buttonPage');
        this.addTooltip();
    };
    //Metoda 17.1a

    // Metoda 17.2 Warunki poczatkowe display none____________Metoda 17.2: PAGINATION INITIAL CONDITIONS______(this.pagesArray)
    /**
     * Sets initial conditions for pagination: all rows are hidden 
     * @private
     */
    SmartTable.prototype.paginationInitialConditions = function () {
        this.pagesArray.forEach(function (arraySlice, index) {
            for (it = 0; it < arraySlice.length; it++) {
                arraySlice[it].style.display = 'none';
            }
        });
    };
    //Metoda 17.2

    // Metoda 17.3 Event pokazujacy wskazana strone__________Metoda 17.3: ON_CLICK_SHOW_CHOSEN_PAGE_HANDLER
    /**
     * Display rows corresponding to the page button which was clicked
     * @param {*} event 
     * @callback
     * @private
     */
    SmartTable.prototype.onClickShowChosenPageHandler = function (event) {
        this.paginationInitialConditions();
        var pageNo = parseInt(event.target.innerText,10);
        this.pagesArray[pageNo - 1].forEach(function (arraySlice) {
            arraySlice.style.display = '';
        });
        this.rowsColoring();
        this.chosenButtonHighlight(event.target);
    };
    //Metoda 17.3

    // Metoda 17.4 Podswietlenie wybranego button____________Metoda 17.4: CHOSEN BUTTON HIGHLIGHT
    /**
     * Highlights a page button which was clicked to show corresponding rows
     * @param {nodeElement} button The page button 
     * @private
     */
    SmartTable.prototype.chosenButtonHighlight = function (button) {
        // Initial conditions button
        var pagesButtons = this.element.querySelectorAll('button.buttonPage');
        for (it = 0; it < pagesButtons.length; it++){
            pagesButtons[it].removeAttribute('style')
        };
        // Wybrany button
        button.style.backgroundColor = 'white';
        button.style.border = '3px solid black';
        button.style.fontWeight = 'bold';
    };
    //Metoda 17.4

     // Metoda 17.5 Dodanie przyciskow Next i Previous________Metoda 17.5: ADD BUTTONS NEXT AND PREVIOUS
     /**
      * Adds pagination buttons Next and Previous if specified by user in parameter object
      * @param {nodeElement} divPaginButton2 Div element for storing pagination buttons defined in method this.pagination
      * @param {nodeList} pagesButtons2 All buttons having class .buttonPage
      * @public
      */
    SmartTable.prototype.addButtonsNextAndPrevious = function (divPaginButton2, pagesButtons2) {
        var buttonNext = document.createElement('button');
        buttonNext.innerText = 'Next';
        buttonNext.classList.add('tooltip');
        buttonNext.dataset.text = 'Następna strona';
        divPaginButton2.insertBefore(buttonNext, pagesButtons2[0]);
        buttonNext.addEventListener('click', this.onClickShowNextPageHandler.bind(this));
        var buttonPrevious = document.createElement('button');
        buttonPrevious.innerText = 'Previous';
        buttonPrevious.classList.add('tooltip');
        buttonPrevious.dataset.text = 'Poprzednia strona';
        divPaginButton2.appendChild(buttonPrevious, pagesButtons2[pagesButtons2.lenght-1]);
        buttonPrevious.addEventListener('click', this.onClickShowPreviousPageHandler.bind(this));
        this.addTooltip();
    };
    //Metoda 17.5

    // Metoda 17.5a Wyswietlenie nastepnej strony ____________Metoda 17.5a: ON CLICK SHOW NEXT PAGE HANDLER
    /**
     * Displays the next page rows in relation the currently chosen ones
     * @param {*} event 
     * @callback
     * @private
     */
    SmartTable.prototype.onClickShowNextPageHandler = function (event) {
        /**
         * Represents a button which coressponding rows are currently displayed
         * It is selected thanks to the style attribute related to highliting 
         * @type {nodeElement}
         */
        var currentPageButton = this.element.querySelector('button[style]');
        var nextPageButton = currentPageButton.nextSibling;
        this.paginationInitialConditions();   
        var pageNo = parseInt(currentPageButton.innerText,10);
        // Pamietaj, pageNo ma nr wiekszy niz indeks w pagesArray!
        if (pageNo === this.pagesArray.length){
            this.pagesArray[pageNo-1].forEach(function (arraySlice) {
                arraySlice.style.display = '';
            }); 
            this.chosenButtonHighlight(currentPageButton);
        } else {
            this.pagesArray[pageNo].forEach(function (arraySlice) {
                arraySlice.style.display = '';
            });
            this.chosenButtonHighlight(nextPageButton);
        };
        this.rowsColoring();
    };
    //Metoda 17.5a

    // Metoda 17.5b Wyswietlenie poprzedniej strony____________Metoda 17.5b: ON CLICK SHOW PREVIOUS PAGE HANDLER
    /**
     * Displays the previous page rows in relation the currently chosen ones
     * @param {*} event 
     * @callback
     * @private
     */
    SmartTable.prototype.onClickShowPreviousPageHandler = function (event) {
        /**
         * Represents a button which coressponding rows are currently displayed
         * It is selected thanks to the style attribute related to highliting 
         * @type {nodeElement}
         */
        var currentPageButton = this.element.querySelector('button[style]');
        var previousPageButton = currentPageButton.previousSibling;
        this.paginationInitialConditions();   
        var pageNo = parseInt(currentPageButton.innerText,10);
        // Pamietaj, pageNo ma nr wiekszy niz indeks w pagesArray!
        if (pageNo === 1){
            this.pagesArray[0].forEach(function (arraySlice) {
                arraySlice.style.display = '';
            }); 
            this.chosenButtonHighlight(currentPageButton);
        } else {
            this.pagesArray[pageNo-2].forEach(function (arraySlice) {
                arraySlice.style.display = '';
            });
            this.chosenButtonHighlight(previousPageButton);
        };
        this.rowsColoring();
    };
    //Metoda 17.5b

    // Metoda 17.6 Wyswietla pierwsza/biezaca strone__________Metoda 17.6: FIRST OR CURRENT PAGE DISPLAY____(this.paginationRefreshNumber)
    /**
     * Displays the same or the first page when pagination is refreshed after some operation 
     * like e.g. filtering
     * @param {nodeElement} currentPageButton2 A button chosen before pagination refreshing, 
     * it is currentPageButton from method this.pagination
     * @todo when we are at the given page and try e.g. filtering after that operation 
     * the first pagination page is displayed insted of the previously active - FIX it!!! 
     */
    SmartTable.prototype.firstOrCurrentPageDisplay = function (currentPageButton2) {
        //     if (this.paginationRefreshNumber > 0){
        //     console.log(document.querySelector('button[style]'))
        //     var currentButtonNumber = parseInt(currentPageButton2.innerText,10)
        //     console.log('jestem wewnatrz petli dla AddRow')
        //     this.paginationInitialConditions(this.pagesArray);
        //     this.pagesArray[currentButtonNumber-1].forEach(function (arraySlice) {
        //         arraySlice.style.display = '';
        //     });
        //     var buttonFirstPage = document.querySelectorAll('button.buttonPage')[currentButtonNumber-1];
        //     buttonFirstPage.style.backgroundColor = 'white';
        //     buttonFirstPage.style.border = '3px solid black';
        // //     buttonFirstPage.style.fontWeight = 'bold';
        // } 
        if (this.paginationRefreshNumber === 0) {
            console.log('jestem wewnatrz petli samego poczatku')
            this.paginationInitialConditions(this.pagesArray);
            this.pagesArray[0].forEach(function (arraySlice) {
                arraySlice.style.display = '';
            });
            var buttonFirstPage = this.element.querySelectorAll('button.buttonPage')[0];
            buttonFirstPage.style.backgroundColor = 'white';
            buttonFirstPage.style.border = '3px solid black';
            buttonFirstPage.style.fontWeight = 'bold';
            // this.paginationRefreshNumber += 1
        }
    };
    //Metoda 17.6

    //Metoda 18 Dodanie tooltips___________________Metoda 18: ADD TOOLTIP_____________________________________
    /**
     * Turn on a tooltip option if specified by user in parameter object
     * @public
     */
    SmartTable.prototype.addTooltip = function () {
        /**
         * Contains all node elements for which the tooltip book should be displayed
         * @type {nodeList}
         */
        var listTooltips = this.element.querySelectorAll('.tooltip');
        if (!!this.parameters.toolTips){
            var span = document.createElement('span');
            span.classList.add('tooltipText');
            for (var it = 0; it < listTooltips.length; it++){
                var element = listTooltips[it];
                if (element.tagName === 'INPUT'){
                    // Tutaj musimy dla inputu wybrac jego parentElement zeby box sie poprawnie pojawil
                    element = listTooltips[it].parentElement;
                    // Musimy tez zabrac klase tooltip inputowi
                    listTooltips[it].classList.remove('tooltip');
                    // Za to przypisujemy ta klase i text do parentElementu
                    element.classList.add('tooltip');
                    element.dataset.text = listTooltips[it].dataset.text;
                }
                element.addEventListener('mouseover', function(){
                    var text = event.currentTarget.dataset.text;
                    span.innerText = text;
                    event.currentTarget.appendChild(span);
                });
                element.addEventListener('mouseout', function(){
                    event.currentTarget.removeChild(span);
                });
            }
        } else {
            this.removeTooltipClass(this.element);
        }
    };
    //Metoda 18

    // Metoda 18.1 Usuwanie klasy toolTip_______________Metoda 18.1: REMOVE TOOLTIP CLASS
    /**
     * Removes tooltip class from the all elements if tooltip option was not chosen by user  
     * @param {nodeElement} element Div element in which the smart table instance is placed 
     * @private
     */
    SmartTable.prototype.removeTooltipClass = function (element) {
        var listTooltips = element.querySelectorAll('.tooltip');
        for (var it = 0; it < listTooltips.length; it++){
            listTooltips[it].classList.remove('tooltip');
        }
    };
    //Metoda 18.1



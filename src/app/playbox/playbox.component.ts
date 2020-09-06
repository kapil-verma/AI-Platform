
import { Component, OnInit, HostListener, Input, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from 'npm'

import * as XLSX from 'xlsx';

type AOA = any[][];
@Component({
    selector: 'playbox-modal-content',
    template: `
                <div class="modal-body">{{playboxModalMessage}}</div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-dark btn-block btn-sm" (click)="activeModal.close('Close click')">Close</button>
                </div>
            `,
})
export class PlayboxModalContent {
    @Input() playboxModalMessage;
    constructor(public activeModal: NgbActiveModal) {}
}


@Component({
  selector: 'app-playbox',
  templateUrl: './playbox.component.html',
  styleUrls: ['./playbox.component.css']
})


export class PlayboxComponent implements OnInit{//OnInit: a lifecycle hook, which perform component initialization and retrieve data

    filteredData= [];
    data = [];
    updatedata=[];
    rows = [];
    columns =  [];
    public isUploadCollapse = true;
    public isDatasourceCollapse = true;
    public sheetData = null;
    numbers = new Array();
    key= new Array;
    _noOfRows:number;
    selected = [];
    selsheet = [];
    firedOnceStat: boolean = true;
    statdata={};
    rowstat = [];
    columnstat = [];
    keys = [];
    
    openPlayboxModal(content) {
        const modalRef = this.modalService.open(PlayboxModalContent, { centered:true });
        modalRef.componentInstance.playboxModalMessage = content;
    }

    createProject(playboxTabset) {
        this.openPlayboxModal('New project created successfully... moving to data ingestion');
        playboxTabset.select('tab-ingestion');
    }

    onFileChange(evt: any) {
        /* wire up file reader */
        const target: DataTransfer = <DataTransfer>(evt.target);
        if (target.files.length !== 1) throw new Error('Cannot use multiple files');
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
            /* read workbook */
            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

            /* grab first sheet */
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];

            /* save data */
            this.sheetData = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
        };
        reader.readAsBinaryString(target.files[0]);
    }
    get noOfRows(): number{
        return this._noOfRows;
    }
    set noOfRows(value:number){
        this._noOfRows= value;
        this.updatedata = this.noOfRows? this.data.slice(0, this.noOfRows): this.data;
        this.filteredData = this.updatedata;//used for filtering columns only for the displayed no. of rows 
    }
    
fullstatistics():void{
if(this.firedOnceStat){
    this.http.post('http://127.0.0.1:10001/api/stats', this.rows).subscribe(postdata=>{
this.statdata = postdata
console.log(postdata)
});
this.keys=Object.keys(this.statdata);
//console.log(this.keys)
for (var k=0; k<this.keys.length; k++) {
var arr={};
var obj={};
arr=this.statdata[this.keys[k]];
obj['Columns'] =this.keys[k];
obj= {...obj, ...arr}
this.rowstat.push(obj);
}
//console.log(this.rowstat)
var key=Object.keys(this.statdata[this.keys[0]])
for (var i=0; i<key.length; i++){
var obj1= {};
obj1['prop'] =key[i];
this.columnstat.push(obj1);
}
var obj= {};
obj['prop'] ='Columns'
this.columnstat= [obj, ...this.columnstat];
//console.log(this.columnstat)
}
this.firedOnceStat=false;
};

    firedOnce: boolean = true;
        showTable: boolean = true;

    
        displayTable(): void{
            if(this.firedOnce){ 
                for (var i = 1; i < this.sheetData.length; i++) {
                    var obj = {};
                    for (var j = 0; j < this.sheetData[0].length; j++) {
                        obj[this.sheetData[0][j]] = this.sheetData[i][j];
                    }
                    this.rows.push(obj);
                }
                for (var k = 0; k < this.sheetData[0].length; k++) {
                    var obj1 = {};
                        obj1['prop'] = this.sheetData[0][k];
                    this.columns.push(obj1);
                }
                this.updatedata = this.rows.slice(0, 5);
                for (var k = 0; k < this.sheetData[1].length; k++) {
                    if (typeof this.sheetData[1][k] === "number") {
                        this.numbers.push(this.sheetData[0][k])
                        this.key.push(k)
                    }
                }
             }
            this.firedOnce = false;
            };
            
    rowNo(){
        let count: number = 0
        for (var i = 1; i < this.sheetData.length; i++) {
            count++
            }
            return count
            }
    arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

    mean(x){
            var ary = new Array();
            for(var m=1; m<this.sheetData.length; m++){
                ary.push(this.sheetData[m][x])
            }

        return this.arrAvg(ary).toFixed(3)
        }
    median(x) {
            var ary = new Array();
            for(var m=1; m<this.sheetData.length; m++){
                ary.push(this.sheetData[m][x])
            }
            if (ary.length == 0)
                return null;
            ary.sort(function (a,b){return a - b})
            var mid = Math.floor(ary.length / 2);
            if ((ary.length % 2) == 1)  // length is odd
                return ary[mid].toFixed(3);
            else
                return ((ary[mid - 1] + ary[mid]) / 2).toFixed(3);
        }
    mode(x) {
        var ary = new Array();
        for(var m=1; m<this.sheetData.length; m++){
            ary.push(this.sheetData[m][x])
        }
        return ary.sort((a,b) =>
              ary.filter(v => v===a).length
            - ary.filter(v => v===b).length
        ).pop();
        }

        onSelect({ selected }) {
            var result = [];
            this.selected.splice(0, this.selected.length);
            this.selected.push(...selected);
            for(var i = 0; i < this.selected.length; i++){
            result.push([]);
            for(var key in this.selected[i]){
            result[result.length-1].push(this.selected[i][key]) 
            }
            }
            this.selsheet = result;
            } 

ngOnInit(): void { this.data = this.rows;
// copy over dataset to empty object
this.filteredData = this.rows;
}
filterDatatable(event){
// get the value of the key pressed and make it lowercase
let val = event.target.value.toLowerCase();
// get the amount of columns in the table
let colsAmt = this.columns.length;
// get the key names of each column in the dataset
let keys = Object.keys(this.rows[0]);
// assign filtered matches to the active datatable
this.updatedata = this.filteredData.filter(function(item){//feeding the filtered result in updatedata
// iterate through each row's column data
for (let i=0; i<colsAmt; i++){
// check for a match
if (item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 || !val){
// found match, return true to add to result set
return true;
}
}
});
// whenever the filter changes, always go back to the first page
}
constructor(private modalService: NgbModal, private http: HttpClient) {

}
}

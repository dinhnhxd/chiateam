import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import * as moment from "moment";


import { ExportService } from '../_services/export.service';
@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {
  isShow = false;
  isSpin = false;
  listPlays: any;
  playerName: any;
  arrayRawPlay = new Array();
  arraySort = new Array();
  arraySuffer = new Array();
  arrayOrigin = new Array();
  arrayBackup = new Array();
  xr = new Array();

  input_team = new FormGroup({
    number_team: new FormControl(''),
    number_player: new FormControl(''),
  });

  title = 'angular-exportexcel-example';

  customers: any = [];
  constructor(
    private cdref: ChangeDetectorRef,
    private exportService: ExportService) { }

  ngOnInit(): void {
    for (let i = 0; i <= 25; i++) {
      this.customers.push({
        firstName: `first${i}`, lastName: `last${i}`,
        email: `abc${i}@gmail.com`, address: `000${i} street city, ST`, zipcode: `0000${i}`
      });
    }
  }
  ex() {
    console.log(this.customers)
    this.export(this.customers);
  }




  export(file: any) {
    let now_time = moment().format('DD/MM/YYYY, h:mm:ss a');
    let file_name = "chia_bang_ngay_" + now_time;
    this.exportService.exportExcel(file, file_name);
  }
  ngAfterContentChecked() {

    // this.sampleViewModel.DataContext = this.DataContext;
    // this.sampleViewModel.Position = this.Position;
    // this.cdref.detectChanges();

  }
  onPlayer(index_play: any, event: any) {
    this.arrayRawPlay.splice(index_play, 1, event.target.value);

  }
  spinRandomPlayer() {
    this.arraySuffer = this.arrayRawPlay;
    if (this.arraySuffer.length == 0) {
      this.arraySuffer = this.arrayBackup
    }

    this.arraySuffer = this.shuffle(this.arraySuffer);

    this.isShow = false;
    this.isSpin = true;

  }
  onSubmit() {
    let number_team = this.input_team.value.number_team;
    let number_player = this.input_team.value.number_player;
    let a = Math.floor(number_player / number_team);
    let b = number_player % number_team;
    var phan_nguyen = (number_player - (number_player % number_team));
    // console.log('phan_nguyen ' + phan_nguyen);
    let array_dump = this.createArray(number_team, a);

    let array_play = this.createArray_player(number_player);
    let array_play_check = this.createArray_player(b);
    for (let j = 0; j < array_play_check.length; j++) {
      array_dump[j] = array_dump[j] + array_play_check[j];
    }
    this.isShow = true
    this.listPlays = array_play;
    this.arraySort = array_dump;
    // let arr: { player_name: number; }[] = [];
    // array_play.forEach((e, index) => {
    //   arr.push({
    //     "player_name": index
    //   })
    // });
    // this.input_player = new FormGroup({

    //   // player_name: new FormControl(''),
    // });
  }
  onSave(a: any) {
    // this.listPlays = a.value;
    this.isShow = true
  }
  createArray(len: any, count: any) {
    let arr = Array.apply(null, Array(len)).map(function (x, i) { return count; });
    return arr

  }
  createArray_player(len: any) {
    let arr = Array.apply(null, Array(len)).map(function (x, i) { return 1; });
    return arr

  }

  getArrayList(len: any) {
    let arr = Array.apply(null, Array(len)).map(function (x, i) { return i; });
    return arr
  }
  shuffle(array: any) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
  spiceArray(_index: any, arr: any) {
    _index = parseInt(_index);
    let new_ = arr.splice(0, _index);

    new_.forEach((element: any) => {
      this.arrayBackup.push(element)
    });
    return new_
  }
  spiceArray_2(team: any, _index: any, arr: any) {

    _index = parseInt(_index);
    let new_ = arr.splice(0, _index);
    new_.forEach((element: any) => {
      this.arrayBackup.push(element)
    });

    return new_
  }

  chiaTeam(arr1: any, arr2: any) {
    let arrcheck = [];
    for (let i = 0; i < arr1.length; i++) {
      let a = this.spiceArray_2(i, arr1[i], arr2);
      arrcheck.push(a)
    }
    console.log(arrcheck.length)
    let b = this.handle(arrcheck, arrcheck.length)
    this.export(b);
  }
  onExcel() {
    if (this.arraySuffer.length == 0) {
      this.arraySuffer = this.arrayBackup;
    }
    if (this.arraySuffer.length != 0) {

      this.chiaTeam(this.arraySort, this.arraySuffer)
    }
    else {
      this.chiaTeam(this.arraySort, this.arraySuffer)
    }
  }
  handle(arrcheck: any, number:any) {
    let customers = [];
    console.log('number '+number);
    console.log(arrcheck);
    let j = arrcheck.length;
    // for (let j = 0; j < arrcheck.length; j++) {
      for (let index = 0; index < arrcheck[0].length; index++) {
        // if (j < arrcheck.length - 1) {
          if(number == 2){
            customers.push({
              "Team Xanh": arrcheck[0][index],
              "Team Đỏ": arrcheck[1][index],
              // "Team Đồng": arrcheck[j + 1][index],
            });
          }
          else if(number == 3){
           
            customers.push({
              "Team Xanh": arrcheck[0][index],
              "Team Đỏ": arrcheck[1][index],
              "Team Đồng": arrcheck[2][index],
            });
          }
          else if(number == 4){
            customers.push({
              "Team Xanh": arrcheck[0][index],
              "Team Đỏ": arrcheck[ 1][index],
              "Team Đồng": arrcheck[ 2][index],
              "Team Đen": arrcheck[3][index],
            });
          }
          else{
            console.log('vao else')
            customers.push({
              "Team Xanh": arrcheck[0][index],
              // "Team Đỏ": arrcheck[j + 1][index],
            });
          }
         
        // }

      }
    // }
    console.log(customers)
    return customers
    
  }
}


import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePickerComponent } from 'ng2-date-picker';
import { CampaignsService } from '../campaigns.service';
import { CampaignDetail } from '../campaign-detail';
import { Http, Response} from '@angular/http';
@Component({
  selector: 'app-static-day',
  templateUrl: './static-day.component.html',
  styleUrls: ['./static-day.component.css']
})
export class StaticDayComponent implements OnInit {
  selectedDate = '';
  testDate = '';
  campaignsDetail = [];
  arrayOfKeys = [];
  datePickerConfig = {
    'format': "DD-MM-YYYY"
  }
  constructor(private campaignService: CampaignsService, private http: Http) {
    let todayTimeStamp = +new Date; // Unix timestamp in milliseconds
    let oneDayTimeStamp = 1000 * 60 * 60 * 24; // Milliseconds in a day
    let onDayBefore = todayTimeStamp - oneDayTimeStamp;
    let yesterdayDate = new Date(onDayBefore);
    let dateTimeSplit = yesterdayDate.toISOString().slice(0, 10).split('-');
    let yesterdayDateConvert = dateTimeSplit[0] + '_' + dateTimeSplit[1] + '_' + dateTimeSplit[2];
    this.selectedDate = dateTimeSplit[2] + '-' + dateTimeSplit[1] + '-' + dateTimeSplit[0];
   }

  ngOnInit() {

  }

  @ViewChild('dayPicker') datePicker: DatePickerComponent;
  open() {
      this.datePicker.api.open();
  }

  close() {
       this.datePicker.api.close();
  }

  chooseDate() {
    console.log(this.selectedDate);
    let _tmp;
    if  (this.selectedDate["_i"]) {
      _tmp = this.selectedDate["_i"];
    } else {
      _tmp = this.selectedDate;
    }
    // console.log(_tmp)
    try {
      var dateTimeSplit = _tmp.split('-');
      var url = 'assets/data/statics/static_day_' + dateTimeSplit[2] + '_' + dateTimeSplit[1] + '_' + dateTimeSplit[0] + '.csv';
    } catch (error) {
      url = "assets/data/statics/static_day_2018_04_20.csv";
    }
    // console.log(url)
    this.http.get(url).subscribe(
      data => {
        this.campaignsDetail = this.campaignService.extractData(data);
        // console.log(this.campaignsDetail);
      },
      error => {
        // this.campaignsDetail = this.campaignService.handleError(error)
        alert("khong co du lieu")
      }
    )
  }
}

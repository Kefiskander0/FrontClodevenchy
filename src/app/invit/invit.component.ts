import {
  Component,Input, Output,OnInit,EventEmitter,ViewChild,} from '@angular/core';
import { Invitation } from '../shared/models/invitation.model';
import { EventService } from 'src/app/shared/service/Event.service';
import {ToastrService} from "ngx-toastr";
import 'jspdf-autotable';
import { InvitationService } from 'src/app/shared/service/invitation.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent,
} from 'ng-apexcharts';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';







@Component({
  selector: 'app-invit',
  templateUrl: './invit.component.html',
  styleUrls: ['./invit.component.css'],
})
export class InvitComponent implements OnInit {
  series!: ApexAxisChartSeries;
  chart!: ApexChart;
  dataLabels!: ApexDataLabels;
  plotOptions!: ApexPlotOptions;
  yaxis!: ApexYAxis;
  xaxis!: ApexXAxis;
  fill!: ApexFill;
  title!: ApexTitleSubtitle;
  public chart1!: ApexChart;
  public series1!: ApexNonAxisChartSeries;
  public labels!: any;
  public responsive!: ApexResponsive[];

  invits: Invitation[] = [];
  data: any;
  keyword: any = 'name';
  @Input() InvitationId: any;
  @Output() newEventAssigned = new EventEmitter();

  invitation!: Invitation;
  listInv!: Invitation[];

  @Input('modalDefault') modalDefault: any;

  public length!: number;
  public page = 1;
  public pageSize = 15;
  searchText: any;
  date!: Date;
  local!: string;

  invitList: any;
  invitationForm!: FormGroup;

  @Input() inviList!: Invitation[];

  static = { Accepted: 0, Refused: 0, InProgress: 0 };
  p: number = 1;

  isShowed = false;
  isNotifShowed = false;
  currentDate = new Date();
  toastBody = '';
  TypeToast = '';

 
 

  invitForm!: NgForm;
  constructor(
    router: ActivatedRoute,
    private route: ActivatedRoute,
    public invitService: InvitationService,
    public eventservice: EventService,
    public httpClient: HttpClient,
    private toastr: ToastrService
    
  ) {}

  ngOnInit(): void {



    this.eventservice.getAllEvent().subscribe((res) => {
      this.data = res;
    });
    console.log(this.InvitationId);
    //codeeestatissst
    console.log(this.inviList);

    this.invitService.getListInvitService().subscribe((res) => {
      this.initChartData(res);
      this.series1 = [
        this.calculateData(res, 'Accepted'),
        this.calculateData(res, 'Refused'),
        this.calculateData(res, 'InProgress'),
      ];
      this.chart1 = {
        width: 410,
        type: 'pie',
      };
      this.labels = ['Accepted', 'Refused', 'InProgress'];
      this.responsive = [
        {
          breakpoint: 580,
          options: {
            chart: {
              width: 410,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ];
    });



  }

  //code stat//
  public initChartData(res: any): void {
    this.series = [
      {
        name: 'Invitation',
        data: [
          this.calculateDataChart2(res, 0),
          this.calculateDataChart2(res, 1),
          this.calculateDataChart2(res, 2),
          this.calculateDataChart2(res, 3),
          this.calculateDataChart2(res, 4),
          this.calculateDataChart2(res, 5),
          this.calculateDataChart2(res, 6),
          this.calculateDataChart2(res, 7),
          this.calculateDataChart2(res, 8),
          this.calculateDataChart2(res, 9),
          this.calculateDataChart2(res, 10),
          this.calculateDataChart2(res, 11),
        ],
      },
    ];
    this.chart = {
      height: 350,
      type: 'bar',
    };
    this.plotOptions = {
      bar: {
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      },
    };
    this.dataLabels = {
      enabled: true,
      formatter: function (val) {
        return val + '%';
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#304758'],
      },
    };
    this.xaxis = {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      position: 'top',
      labels: {
        offsetY: -18,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
        offsetY: -35,
      },
    };
    this.fill = {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [50, 0, 100, 100],
      },
    };
    (this.yaxis = {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + '%';
        },
      },
    }),
      (this.title = {
        text: 'Nombre du contrats selon la Date',
        floating: false,
        offsetY: 320,
        align: 'center',
        style: {
          color: '#444',
        },
      });

    //fincode stat//
  }

  calculateData(res: any, _v: any) {
    return res.filter((r: any) => r.status === _v).length;
  }
  calculateDataChart2(res: any, _v: any) {
    return res.filter(
      (r: Invitation) => new Date(r.dateInvitation).getMonth() === _v
    ).length;
  }
  //Fin code staat

  //code affectation
 

}

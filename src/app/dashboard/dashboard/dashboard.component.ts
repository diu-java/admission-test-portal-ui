import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from "chart.js";
import {AdmissionDashboardService} from "../../Service/admission/admissionDashboard.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  public chart: any;
  programs:any=[];
  totalValues:any=[];
  achievedValues:any=[];
  dashboard_reports:any=[];
  dashboard_seats:any=[];
  semester_admissions:any=[];
  today_admissions:any=[];
  semester_form_admissions:any=[];
  today_form_admissions:any=[];
  constructor(private admissionDashboardReportService: AdmissionDashboardService, private titleService: Title) {
    Chart.register(...registerables);
    this.titleService.setTitle('Dashboard | Admission Portal');
  }
  ngOnInit() {
    this.getAdmissionDashboardReport();
    this.getAdmissionDashboardSeat();
    this.getAdmissionDashboardAdmission();
    this.getAdmissionDashboardAdmissionToday();
    this.getAdmissionDashboardAdmissionForm();
    this.getAdmissionDashboardAdmissionFormToday();
  }
  getAdmissionDashboardReport(){
    this.admissionDashboardReportService.getAdmissionDashboardReport().subscribe((response:any)=>{
      const latestSemesterCode = response.data.find((report: any) => report.semester_code)?.semester_code;
      if (latestSemesterCode) {
        this.dashboard_reports = response.data.filter((item:any)=>item.semester_code === latestSemesterCode )
      }
    })
  }
  getAdmissionDashboardAdmission(){
    this.admissionDashboardReportService.getAdmissionDashboardAdmission().subscribe((response:any)=>{
      const latestSemesterCode = response.data.find((report: any) => report.semester_code)?.semester_code;
      if (latestSemesterCode) {
        this.semester_admissions = response.data.filter((item:any)=>item.semester_code === latestSemesterCode && item.total !== 0)
      }
    })
  }
  getAdmissionDashboardAdmissionToday(){
    this.admissionDashboardReportService.getAdmissionDashboardAdmissionToday().subscribe((response:any)=>{
      const latestSemesterCode = response.data.find((report: any) => report.semester_code)?.semester_code;
      if (latestSemesterCode) {
        this.today_admissions = response.data.filter((item:any)=>item.semester_code === latestSemesterCode && item.total !== 0)
      }
    })
  }
  getAdmissionDashboardAdmissionForm(){
    this.admissionDashboardReportService.getAdmissionDashboardAdmissionForm().subscribe((response:any)=>{
      const latestSemesterCode = response.data.find((report: any) => report.semester_code)?.semester_code;
      if (latestSemesterCode) {
        this.semester_form_admissions = response.data.filter((item:any)=>item.semester_code === latestSemesterCode )
      }
    })
  }
  getAdmissionDashboardAdmissionFormToday(){
    this.admissionDashboardReportService.getAdmissionDashboardAdmissionFormToday().subscribe((response:any)=>{
      const latestSemesterCode = response.data.find((report: any) => report.semester_code)?.semester_code;
      if (latestSemesterCode) {
        this.today_form_admissions = response.data.filter((item:any)=>item.semester_code === latestSemesterCode )
      }
    })
  }
  getAdmissionDashboardSeat(){
    this.admissionDashboardReportService.getAdmissionDashboardSeat().subscribe((response:any)=>{
      const latestSemesterCode = response.data.find((report: any) => report.semester_code)?.semester_code;
      if (latestSemesterCode) {
        this.dashboard_seats = response.data.filter((item:any)=>item.semester_code === latestSemesterCode && item.study_campus	=== 'Daffodil International University')
        for (let i=0;i< this.dashboard_seats.length; i++){
          this.programs.push(this.dashboard_seats[i].program_short_name);
          this.totalValues.push(this.dashboard_seats[i].seat_limit)
          this.achievedValues.push(this.dashboard_seats[i].seat_admitted)
        }
        this.createBarChart();
      }
    })
  }


  createBarChart() {
    const randomColors = (numColors: number) => {
      const colors = [];
      for (let i = 0; i < numColors; i++) {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        colors.push(`rgba(${r}, ${g}, ${b}, 0.6)`);
      }
      return colors;
    };

    const canvas = document.getElementById("MyChart") as HTMLCanvasElement;
    if (canvas) {
      canvas.height = 400;
    }
    // const formattedLabels = this.programs.map((program:any, index:any) => `${program} (${this.totalValues[index]})`);
    this.chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: this.programs,
        datasets: [
          {
            label: 'Admitted',
            data: this.achievedValues,
            backgroundColor: randomColors(this.programs.length),
            borderColor: randomColors(this.programs.length),
            borderWidth: 1
          },
          {
            label: 'Remaining Seats',
            data: this.totalValues.map((total:any, index:any) => total - this.achievedValues[index]),
            backgroundColor: randomColors(this.programs.length),
            borderColor: randomColors(this.programs.length),
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true,
            beginAtZero: true
          }
        }
      }
    });
  }


}

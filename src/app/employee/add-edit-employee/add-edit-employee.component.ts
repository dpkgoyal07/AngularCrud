import { Component, Input, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit{
  // @Input() employeedetailsdata: any;
  constructor(private service: ApiserviceService) { }
  @Input() emp: any;
  // @Input() emp1: any;
 
  EmployeeId = "";
  EmployeeName = "";
  Department = "";
  DateOfJoining = "";
  PhotoFileName = "";
  PhotoFilePath = "";
  DepartmentList: any = [];


  ngOnInit(): void {
    this.loadEmployeeList();
    
  }
 

  loadEmployeeList() {
    this.service.getAllDepartmentNames().subscribe((data: any) => {
      this.DepartmentList = data;
      this.EmployeeId = this.emp?.employeeID??0;
      this.EmployeeName = this.emp?.employeeName;
      this.Department = this.emp?.department;
      this.DateOfJoining = this.emp?.dateOfJoining;
      this.PhotoFileName = this.emp?.PhotoFileName;
      // this.PhotoFilePath = this.service?.photoUrl + this.PhotoFileName;
     
    });
  }

  addEmployee() {
    var val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName
    };
    this.service.addEmployee(val).subscribe(res => {
      alert(res.toString());
    });
  }

  updateEmployee() {
    var val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName
    };

    this.service.updateEmployee(val).subscribe(res => {
      alert(res.toString());
    });
  }


  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    this.service.uploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = data.toString();
    })
  }
  empEvent(item:string){
    console.log(item);
  }
}

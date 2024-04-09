import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import { AddEditEmployeeComponent } from '../add-edit-employee/add-edit-employee.component';
@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.css']
})

export class ShowEmployeeComponent implements OnInit{
  constructor(private service: ApiserviceService) { }
  employeeData = { name: 'John', age: 30 };
  EmployeeList: any = [];
  ModalTitle = "";
  EmployeeName:string="";
  ActivateAddEditEmpComp: boolean = false;
  emp: any; 
  // page load
  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick() {
    this.emp = {
      EmployeeId: "0",
      EmployeeName: "",
      Department: "",
      DateOfJoining: "",
      PhotoFileName: "anonymous.png"
    }
    this.ModalTitle = "Add Employee";
    this.ActivateAddEditEmpComp = true;
  }

  @Output() dataToParentEvent = new EventEmitter<string>();

editClick(item: any) {
  this.emp = item;
  this.ModalTitle = "Edit Employee";
  this.ActivateAddEditEmpComp  = true ;
}

  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.service.deleteEmployee(item).subscribe(data => {
        alert(data.toString());
        this.refreshEmpList();
      })
    }
  }

  closeClick() {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }

  refreshEmpList() {
    this.service.getEmployeeList().subscribe(data => {
      this.EmployeeList = data;
    });
  }
  
}

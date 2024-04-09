import { Component, OnInit, Input  } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-add-edit-department',
  templateUrl: './add-edit-department.component.html',
  styleUrls: ['./add-edit-department.component.css']
})
export class AddEditDepartmentComponent implements OnInit {

  constructor(private service: ApiserviceService) { }

  @Input() depart: any;
  DepartmentId = "";
  DepartmentName = "";
  addData:boolean=false;
  updateData:boolean=true;
  ngOnInit(): void {
    debugger;
    setTimeout(() => {
        let departmentName = localStorage.getItem("departmentName");
        let departmentID = localStorage.getItem("departmentID");
        this.DepartmentId = departmentID ?? "0";
        this.DepartmentName = departmentName ?? "";
        localStorage.clear();
    }, 100); 
}


  addDepartment() {
    debugger
    var dept = {
      DepartmentId: 0,
      DepartmentName: this.DepartmentName
    };
    this.service.addDepartment(dept).subscribe(res => {
      alert(res.toString());
    });
  }
  

  updateDepartment(id:any) {
    debugger
    var dept = {
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName
    };
    this.service.updateDepartment(dept).subscribe(res => {
      alert(res.toString());
    });
  }
}

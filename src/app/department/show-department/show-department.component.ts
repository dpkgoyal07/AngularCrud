import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-show-department',
  templateUrl: './show-department.component.html',
  styleUrls: ['./show-department.component.css']
})
export class ShowDepartmentComponent implements OnInit{

  constructor(private service: ApiserviceService) { }
  DepartmentList: any = [];
  ModalTitle = "";
  ActivateAddEditDepartComp: boolean = false;
depart:any;

  DepartmentIdFilter = "";
  DepartmentNameFilter = "";
  DepartmentListWithoutFilter: any = [];
  isAscending = true;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  @Output() newData: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit(): void {
    this.refreshDepList();
  }
  

  addClick() {
    this.depart = {
      DepartmentId: "0",
      DepartmentName: ""
    }
    this.ModalTitle = "Add Department";
    this.ActivateAddEditDepartComp = true;
  }

  editClick(item: any) {
    debugger;
    this.depart = item;
    this.ModalTitle = "Edit Department";
    this.ActivateAddEditDepartComp = true;
    localStorage.clear();
    localStorage.setItem("departmentID",this.depart.departmentID);
    localStorage.setItem("departmentName",this.depart.departmentName);
  }

  deleteClick(item: any) {
    debugger;
    if (confirm('Are you sure??')) {
      this.service.deleteDepartment(item).subscribe(data => {
        alert(data.toString());
        this.refreshDepList();
      })
    }
  }

  closeClick() {
    this.ActivateAddEditDepartComp = false;
    this.refreshDepList();
  }


  refreshDepList() {
    debugger;
    this.service.getDepartmentList().subscribe(data => {
      debugger
      this.DepartmentList = data;
      this.DepartmentListWithoutFilter = data;
      console.log("Record",data);
    });
  }

  // sortResult(prop: any, asc: any) {
  //   this.DepartmentList = this.DepartmentListWithoutFilter.sort(function (a: any, b: any) {
  //     if (asc) {
  //       return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
  //     }
  //     else {
  //       return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
  //     }
  //   });
  // }

  FilterFn() {
    debugger
    var DepartmentIdFilter = this.DepartmentIdFilter;
    var DepartmentNameFilter = this.DepartmentNameFilter;

    this.DepartmentList = this.DepartmentListWithoutFilter.filter(
      function (el: any) {
        return el.DepartmentId.toString().toLowerCase().includes(
          DepartmentIdFilter.toString().trim().toLowerCase()
        ) &&
          el.DepartmentName.toString().toLowerCase().includes(
            DepartmentNameFilter.toString().trim().toLowerCase())
      }
    );
  }
  onTableDataChange(event: any) {
    debugger;
    this.page = event;
    this.refreshDepList();
  }
  onTableSizeChange(event: any): void {
    debugger;
    this.tableSize = event.target.value;
    this.page = 1;
    this.refreshDepList();
  }
  sortResult(isAscending: boolean) {
    debugger;
    this.DepartmentList = this.DepartmentList.sort((a: any, b: any) => {
      const nameA = (a.departmentName || '').toUpperCase();
      const nameB = (b.departmentName || '').toUpperCase();
  
      if (nameA < nameB) {
        return isAscending ? -1 : 1; // -1 for ascending, 1 for descending
      }
      if (nameA > nameB) {
        return isAscending ? 1 : -1; // 1 for ascending, -1 for descending
      }
      return 0; // names must be equal
    });
  
    // Update the sort direction
    this.isAscending = isAscending;
  }
  
  

  
  
}

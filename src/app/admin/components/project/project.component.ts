import { Component, OnInit, Input, Output, EventEmitter, ContentChild } from '@angular/core';
import { CheckBoxPrinterComponent } from '../check-box-printer/check-box-printer.component';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @Input("currentProject") project: Project;
  @Input("recordIndex") i: number;

  @Output() editClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onEditClick(event, index)
  {
    this.editClick.emit({event, index});
  }
  onDeleteClick(event, index)
  {
    this.deleteClick.emit({event, index});
  }

  @ContentChild("selectionBox") selectionBox: CheckBoxPrinterComponent

  isAllCheckChange(b: boolean)
  {
    if(b)
    {
      this.selectionBox.check();
    }
    else
    {
      this.selectionBox.unCheck();
    }
  }
}

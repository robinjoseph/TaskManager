import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../models/project';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Project[], searchBy: string, searchText: string): any[] 
  {
    debugger;
    if(value == null)
    {
      return value;
    }
    
    let resultArray= [];
    for(let item of value)
    {
      if(String(item[searchBy]).toLowerCase().indexOf(searchText.toLowerCase()) >= 0)
      {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}

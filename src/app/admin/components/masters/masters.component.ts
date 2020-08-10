import { Component, OnInit, ComponentFactoryResolver, ViewChildren, QueryList } from '@angular/core';
import { ComponentLoaderDirective } from 'src/app/directives/component-loader.directive';
import { CountriesComponent } from '../countries/countries.component';
import { ClientLocationsComponent } from '../client-locations/client-locations.component';
import { TaskPrioritiesComponent } from '../task-priorities/task-priorities.component';
import { TaskStatusComponent } from '../task-status/task-status.component';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.scss']
})
export class MastersComponent implements OnInit {
  masterMenuItems = [
    {itemName: "Countries", displayName: "Countries", component: CountriesComponent},
    {itemName: "ClientLocaions", displayName: "Client Locaions", component: ClientLocationsComponent},
    {itemName: "TaskPriorities", displayName: "Task Priorities", component: TaskPrioritiesComponent},
    {itemName: "TaskStatus", displayName: "Task Status", component: TaskStatusComponent},
  ];

  activeItem: string;
  tabs= [];

  @ViewChildren(ComponentLoaderDirective) 
  componentLoaders: QueryList<ComponentLoaderDirective>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  menuItemClick(masterMenuItem : any)
  {
    this.activeItem = masterMenuItem.itemName;

    let matchingTabs = this.tabs.filter((tab)=>
      {
        return tab.itemName == masterMenuItem.itemName
      });
    
    if(matchingTabs.length == 0)
    {
      this.tabs.push({
        tabIndex: this.tabs.length,
        itemName: masterMenuItem.itemName,
        displayName: masterMenuItem.displayName
      });

      setTimeout(()=>{
        var componentLoadersArray = this.componentLoaders.toArray();
        var componentFactory= this.componentFactoryResolver
          .resolveComponentFactory(masterMenuItem.component);
  
        var viewContainerRef= componentLoadersArray[this.tabs.length-1].viewContainerRef;
        viewContainerRef.createComponent(componentFactory);
        // console.log(componentLoadersArray);
      },100);
    }


    
  }

}

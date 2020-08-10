import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  Designation : string;
  UserName : string;
  NoOfTeamMembers : number;
  TotalCostOfAllProjects : number;
  PendingTasks : number;
  UpcomingProjects : number;
  ProjectCost : number;
  CurrentExpenditure : number;
  AvailableFunds : number;
  Clients: string[];
  Projects: string[];
  Years: number[] =[];
  TeamMembersSummary =[];
  TeamMembers =[];

  ngOnInit(): void {
    this.Designation = "Team Leader";
    this.UserName = "John Smith";
    this.NoOfTeamMembers = 67;
    this.TotalCostOfAllProjects = 240;
    this.PendingTasks = 15;
    this.UpcomingProjects = 2;
    this.ProjectCost = 2113507;
    this.CurrentExpenditure = 96788;
    this.AvailableFunds = 52536;
    this.Clients= [
      "ABC Infotech Ltd.", "DEF Infotech Ltd.", "GHI Infotech Ltd."
    ]
    this.Projects= [
      "Project A", "Project B", "Project C","Project D"
    ];

    for(var i = 2019; i>=2010 ;i--)
    {
      this.Years.push(i);
    }

    this.TeamMembersSummary=[
      {Region: "East", TeamMembersCount: 20, TemporaryUnavailableTeamMembers: 4},
      {Region: "West", TeamMembersCount: 10, TemporaryUnavailableTeamMembers: 2},
      {Region: "North", TeamMembersCount: 10, TemporaryUnavailableTeamMembers: 3},
      {Region: "South", TeamMembersCount: 15, TemporaryUnavailableTeamMembers: 5}
    ];

    this.TeamMembers=[
      { Region: "East", Members: [
          {ID:  1, Name: "Ford", Status: "Available"},
          {ID:  1, Name: "Miller", Status: "Available"},
          {ID:  1, Name: "Johns", Status: "Busy"},
          {ID:  1, Name: "James", Status: "Busy"}      
        ]
      },
      { Region: "West", Members: [
        {ID:  1, Name: "Ford", Status: "Available"},
        {ID:  1, Name: "Miller", Status: "Available"},
        {ID:  1, Name: "Johns", Status: "Busy"},
        {ID:  1, Name: "James", Status: "Busy"}         
        ]
      },
    { Region: "North", Members: [
      {ID:  1, Name: "Ford", Status: "Available"},
          {ID:  1, Name: "Miller", Status: "Available"},
          {ID:  1, Name: "Johns", Status: "Busy"},
          {ID:  1, Name: "James", Status: "Busy"}        
       ]
    },
    { Region: "South", Members: [
      {ID:  1, Name: "Ford", Status: "Available"},
      {ID:  1, Name: "Miller", Status: "Available"},
      {ID:  1, Name: "Johns", Status: "Busy"},
      {ID:  1, Name: "James", Status: "Busy"}       
      ]
    }
    ];
  }

  onProjectChange($event){
    console.log($event.target.innerHTML);
    if($event.target.innerHTML == "Project A")
    {
      this.ProjectCost = 3232323;
      this.CurrentExpenditure = 96788;
      this.AvailableFunds = 52536;
    }
    else if($event.target.innerHTML == "Project B")
    {
      this.ProjectCost = 3232323;
      this.CurrentExpenditure = 4545;
      this.AvailableFunds = 56565;
    }
    else if($event.target.innerHTML == "Project C")
    {
      this.ProjectCost = 565656;
      this.CurrentExpenditure = 4545;
      this.AvailableFunds = 767;
    }
    else if($event.target.innerHTML == "Project D")
    {
      this.ProjectCost = 23232332;
      this.CurrentExpenditure = 767;
      this.AvailableFunds = 90809;
    }
  }

}

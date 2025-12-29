import { Component } from '@angular/core';

@Component({
  selector: 'app-developer-team',
  templateUrl: './developer-team.component.html',
  styleUrls: ['./developer-team.component.scss']
})
export class DeveloperTeamComponent {
  
  // Tech Stack
  techStack = [
    { name: 'Java', icon: 'fab fa-java text-danger' },
    { name: 'Spring Boot', icon: 'fas fa-leaf text-success' },
    { name: 'Angular', icon: 'fab fa-angular text-danger' },
    { name: 'MySQL', icon: 'fas fa-database text-info' },
    { name: 'HTML5', icon: 'fab fa-html5 text-warning' },
    { name: 'CSS3', icon: 'fab fa-css3-alt text-primary' },
    { name: 'JavaScript', icon: 'fab fa-js text-warning' },
    { name: 'Git', icon: 'fab fa-git-alt text-danger' }
  ];

  // Projects
  projects = [
    { 
      title: 'Case Management System', 
      description: 'A Spring Boot + Angular application to manage criminal case records with Excel upload and dashboards.',
      tech: 'Spring Boot, Angular, MySQL',
      link: 'https://github.com/YOUR-PROJECT-LINK'
    },
    { 
      title: 'Training Management Portal', 
      description: 'Portal for trainee registration and training details with Excel uploads and reporting.',
      tech: 'Spring Boot, Angular, PostgreSQL',
      link: ''
    }
  ];

}

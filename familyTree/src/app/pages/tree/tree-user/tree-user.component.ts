import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tree-user',
  templateUrl: './tree-user.component.html',
  styleUrls: ['./tree-user.component.scss']
})
export class TreeUserComponent implements OnInit {
  @Input() comments: any;
  @Input() parents: any;

  constructor() { }

  ngOnInit(): void {
  }
}

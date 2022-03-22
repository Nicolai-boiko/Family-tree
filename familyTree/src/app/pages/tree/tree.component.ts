import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  public postComments = [
    {
      text: "1",
      comments: [
        {
          text: "1.1",
          comments: [
            {
              text: "1.1.1 ",
              comments: [{
                text: "2",
                comments: [
                  {
                    text: "2.1",
                  },
                  {
                    text: "2.1.1"
                  }
                ]
              }]
            }
          ]
        },
        {
          text: "1.2",
          comments: [
            {
              text: "1.2.1"
            }
          ]
        },
        {
          text: "1.2",
          comments: [
            {
              text: "1.2.1"
            }
          ]
        },
        {
          text: "1.2",
          comments: [
            {
              text: "1.2.1"
            }
          ]
        }
      ],
      parents: [
        {
          text: "1.1",
          comments: [
            {
              text: "1.1.1 ",
            }
          ],
          parents: [{
            text: "1.1.1 ",
          }],
        },
        {
          text: "1.2",
          comments: [
            {
              text: "1.2.1"
            }
          ],
          parents: [{
            text: "1.2.1"
          }],
        }],
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

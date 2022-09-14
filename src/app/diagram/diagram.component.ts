import { Component, OnInit, Input } from '@angular/core';
import * as go from 'gojs';
const $ = go.GraphObject.make;

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})
export class DiagramComponent implements OnInit {

  public diagram: go.Diagram = null;

  @Input()
  public model: go.Model;

  constructor() { }

  ngOnInit(): void {
  } 

  public ngOnChanges() { 
    if(this.diagram){
      this.diagram.model = this.model
    }
  }


  public ngAfterViewInit(){
    this.diagram = $(go.Diagram, 'myDiagramDiv',
      {
        layout:
          $(go.TreeLayout,
            {
              isOngoing: true,
              treeStyle: go.TreeLayout.StyleLastParents,
              arrangement: go.TreeLayout.ArrangementHorizontal, 
              angle: 90,
              layerSpacing: 50, 
              alternateAngle: 90,
              alternateLayerSpacing: 50,
              alternateAlignment: go.TreeLayout.AlignmentBus,
              alternateNodeSpacing: 50
            }),
        'undoManager.isEnabled': true
      }
    );

    this.diagram.model = this.model
  }

}

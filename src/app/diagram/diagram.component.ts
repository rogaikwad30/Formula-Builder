import { Component, OnInit, Input } from '@angular/core';
import * as go from 'gojs';
const $ = go.GraphObject.make;

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css'],
})
export class DiagramComponent implements OnInit {
  public diagram: go.Diagram = null;

  @Input()
  public model: go.Model;

  constructor() {}

  ngOnInit(): void {}

  public ngOnChanges() {
    if (this.diagram) { 
      this.diagram.model = this.model;
    }
  }

  public ngAfterViewInit() {

    this.diagram = $(go.Diagram, 'myDiagramDiv', {
      layout: $(go.TreeLayout, {
        isOngoing: true,
        treeStyle: go.TreeLayout.StyleLastParents,
        arrangement: go.TreeLayout.ArrangementHorizontal,
        angle: 90,
        layerSpacing: 50,
        alternateAngle: 90,
        alternateLayerSpacing: 90,
        alternateAlignment: go.TreeLayout.AlignmentBus,
        alternateNodeSpacing: 50,
      }),
      'undoManager.isEnabled': true,
    });

    this.diagram.nodeTemplate = $(
      go.Node,
      'Auto',
      $(
        go.Shape,
        'RoundedRectangle',
        { strokeWidth: 5, stroke: null, name: 'SHAPE' },
        new go.Binding('fill', 'color')
      ),
      $(
        go.TextBlock,
        { margin: 10, font: 'bold' },
        new go.Binding('text', 'name')
      )
    );

    this.diagram.model = this.model;
  }
}

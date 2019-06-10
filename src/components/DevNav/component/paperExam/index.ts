import Vue from 'vue'
import Component from 'vue-class-component'
import Paper from 'paper'


declare const paper:any;
@Component({
})
export default class PaperJSExamComponent extends Vue {
  public tc:any = [];
  mounted() {
		//// Get a reference to the canvas object
		//let canvas = document.getElementById('paperCanvas');
		//// Create an empty project and a view for the canvas:
		//paper.setup(canvas);
		//// Create a Paper.js Path to draw a line into it:
		//var path = new paper.Path();
		//// Give the stroke a color
		//path.strokeColor = 'black';
		//var start = new paper.Point(100, 100);
		//// Move to start and draw a line from there
		//path.moveTo(start);
		//// Note that the plus operator on Point objects does not work
		//// in JavaScript. Instead, we need to call the add() function:
		//path.lineTo(start.add([ 200, -50 ]));
		//// Draw the view now:
		//paper.view.draw();
  }
}

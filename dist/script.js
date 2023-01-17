class Boxes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      namev: "",
      value: "",
      circleId: "",
      cancel: true };

    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleColourCircle = this.handleColourCircle.bind(this);
    this.handleColourDraw = this.handleColourDraw.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleMouseDraw = this.handleMouseDraw.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleResetColour = this.handleResetColour.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleColourCircle(e) {
    e.preventDefault();
    let heldCircle = e.target.getAttribute("id");
    //console.log(heldCircle);
    let hex = Math.floor(Math.random() * 0xFFFFFF);
    let colr = "#" + ("000000" + hex.toString(16)).substr(-6);
    e.target.style.background = `radial-gradient(circle, rgba(255, 255, 255, 0.88), ${colr}, ${colr}, ${colr})`;
    e.target.style.boxShadow = `1px 1px 22px 3px ${colr}, 0px 0px 6px 1px ${colr}`;
    this.setState({
      value: colr,
      circleId: heldCircle });

  }

  handleColourDraw(e) {
    e.preventDefault();
    let drawArray = [];
    let draw = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
    if (draw.className === "pixel") {
      drawArray.push(draw);
      //console.log(draw.getAttribute("id"));
      draw.style.background = `radial-gradient(circle, rgba(255, 255, 255, 0.88), ${this.state.value}, ${this.state.value}, ${this.state.value})`;
      draw.style.boxShadow = `1px 1px 22px 3px ${this.state.value}, 0px 0px 6px 1px ${this.state.value}`;
    }
  }

  handleMouseDraw(e) {
    if (typeof e.cancelable !== 'boolean' || e.cancelable !== this.state.cancel) {
      e.preventDefault();
      let drawArray = [];
      let draw = document.elementFromPoint(e.clientX, e.clientY);
      if (draw.className === "pixel") {
        drawArray.push(draw);
        //console.log(draw.getAttribute("id"));
        draw.style.background = `radial-gradient(circle, rgba(255, 255, 255, 0.88), ${this.state.value}, ${this.state.value}, ${this.state.value})`;
        draw.style.boxShadow = `1px 1px 22px 3px ${this.state.value}, 0px 0px 6px 1px ${this.state.value}`;
      }
    }
  }

  handleMouseUp(e) {
    //console.log("mouse click up");
    e.preventDefault();
    this.setState({
      cancel: true,
      value: "" });

  }

  handleMouseDown(e) {
    this.handleColourCircle(e);
    //console.log("mouse click down");
    e.preventDefault();
    this.setState({
      cancel: false });

  }

  handleDoubleClick(e) {
    e.preventDefault();
    //console.log("double clicked!");
    e.target.style.background = "none";
    e.target.style.boxShadow = "none";
  }

  handleMouseOut(e) {
    //console.log("mouse moved out!")
    e.defaultPrevented();
    this.setState({
      value: "" });

  }

  handleTouchEnd(e) {
    e.preventDefault();
  }

  handleReset(e) {
    const getCircles = document.getElementsByClassName("pixel");
    for (let colour of getCircles) {
      colour.style.background = "none";
      colour.style.boxShadow = "none";
    }
  }
  handleResetColour(e) {
    //console.log(this.state.circleId);
    const getCircle = document.getElementById(this.state.circleId);
    //console.log(getCircle);
    getCircle.style.background = "none";
    getCircle.style.boxShadow = "none";
    this.setState({
      circleId: "" });

  }

  render() {
    let draw = [];
    for (let i = 0; i < 513; i++) {
      draw.push( /*#__PURE__*/React.createElement("div", {
        className: "pixel",
        value: i, key: i, id: i,
        onTouchStart: this.handleColourCircle,
        onDoubleClick: this.handleDoubleClick,
        onMouseDown: this.handleMouseDown,
        onMouseUp: this.handleMouseUp }));


    }
    return /*#__PURE__*/(
      React.createElement("div", { className: "wrapper", onMouseUp: this.handleMouseUp }, /*#__PURE__*/
      React.createElement("div", { className: "container" }, /*#__PURE__*/
      React.createElement("div", { className: "heading" }, /*#__PURE__*/
      React.createElement("h1", null, "Light-bright Colour Changing Circles"), /*#__PURE__*/
      React.createElement("button", { onClick: this.handleResetColour }, "RESET COLOUR"), /*#__PURE__*/
      React.createElement("button", { onClick: this.handleReset }, "RESET ALL")), /*#__PURE__*/

      React.createElement("div", { className: "boxes", id: "litebrite",
        onTouchMove: this.handleColourDraw,
        onMouseMove: this.handleMouseDraw,
        onMouseUp: this.handleMouseUp },

      draw)), /*#__PURE__*/


      React.createElement("section", null, /*#__PURE__*/
      React.createElement("p", null, "Desktop: Click and move mouse to light circles."), /*#__PURE__*/
      React.createElement("p", null, "Desktop: Double Click to remove colour from a circle."), /*#__PURE__*/
      React.createElement("p", null, "Desktop and Touch: Click/Touch to change colour of a circle."), /*#__PURE__*/
      React.createElement("p", null, "Touch: Touch and move finger on device to light circles."), /*#__PURE__*/
      React.createElement("p", null, "All: Click \"RESET COLOUR\" button to remove a colour touch or click."), /*#__PURE__*/
      React.createElement("p", null, "All: Click \"RESET ALL\" button to remove colours from all circles."), /*#__PURE__*/
      React.createElement("h2", null, "Thank you for playing!"))));



  }}


ReactDOM.render( /*#__PURE__*/
React.createElement(Boxes, null),
document.getElementById('root'));
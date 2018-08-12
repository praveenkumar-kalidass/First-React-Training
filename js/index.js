var Container = React.createClass({
  hideMenu() {
      $(".sidebar").toggleClass("min-sidebar");
      $("#menu").toggleClass("min-menu");
      $(".content").toggleClass("trans-content");
  },
  showMenu(parameter) {
      $(".subtask").removeClass("trans");
      if (parameter == "work") {
          ReactDOM.render(<Task type="work" add={this.refs.content.addTask} delete={this.refs.content.deleteWorkTask} task={this.refs.content.state.workTask}/>, document.getElementById("task"));
      } else if (parameter == "personal") {
          ReactDOM.render(<Task type="personal" add={this.refs.content.addTask} delete={this.refs.content.deletePersonalTask} task={this.refs.content.state.personalTask}/>, document.getElementById("task"));
      } else if (parameter == "other") {
          ReactDOM.render(<Task type="other" add={this.refs.content.addTask} delete={this.refs.content.deleteOtherTask} task={this.refs.content.state.otherTask}/>, document.getElementById("task"));
      }
  },
  render() {
        return (
          <div className="container">
              <SideMenu ref="sidemenu" hideMenu={this.hideMenu} showWorkMenu={() => this.showMenu("work")} showPersonalMenu={() => this.showMenu("personal")} showOtherMenu={() => this.showMenu("other")}/>
              <Content ref="content"/>
          </div>
        );
  }
});

var SideMenu = React.createClass({
    render() {
        return (
            <div className="sidebar" ref="sidebar">
                <div className="hide-button">
                    <a onClick={this.props.hideMenu}><i className="fa fa-angle-double-left"></i></a>
                </div>
                <ul id="menu">
                    <li onClick={this.props.showWorkMenu}><a><i className="fa fa-suitcase"></i><span>Work</span></a></li>
                    <li onClick={this.props.showPersonalMenu}><a><i className="fa fa-archive"></i><span>Personal</span></a></li>
                    <li onClick={this.props.showOtherMenu}><a><i className="fa fa-list-ul"></i><span>Others</span></a></li>
                </ul>
            </div>
        );
    }
});

var Content = React.createClass({
  getInitialState() {
      return {
        workTask: [],
        personalTask: [],
        otherTask: []
      };
  },
  addObjectInArray(array, id, value) {
      array.push({
          "id": id,
          "description": value,
          "date": new Date().getDate()+"-"+(new Date().getMonth()+1)+"-"+(new Date().getYear()+1900),
          "subtask": []
      });
  },
  addTask(event) {
      if (event.keyCode == 13) {
        if (event.target.value != "") {
          var value = event.target.value;
          var taskParameter = event.target.id;
          event.target.value = "";
          if (taskParameter == "work") {
              var workId = Math.floor((Math.random() * 100) + 1);
              var array = this.state.workTask;
              this.addObjectInArray(array, workId, value);
              this.setState({
                  workTask: array
              });
              ReactDOM.render(<Task type="work" add={this.addTask} delete={this.deleteWorkTask} task={this.state.workTask}/>, document.getElementById("task"));
          } else if (taskParameter == "personal") {
              var personalId = Math.floor((Math.random() * 100) + 1);
              var array = this.state.personalTask;
              this.addObjectInArray(array, personalId, value);
              this.setState({
                  personalTask: array
              });
              ReactDOM.render(<Task type="personal" add={this.addTask} delete={this.deletePersonalTask} task={this.state.personalTask}/>, document.getElementById("task"));
          } else if (taskParameter == "other") {
              var otherId = Math.floor((Math.random() * 100) + 1);
              var array = this.state.otherTask;
              this.addObjectInArray(array, otherId, value);
              this.setState({
                  otherTask: array
              });
              ReactDOM.render(<Task type="other" add={this.addTask} delete={this.deleteOtherTask} task={this.state.otherTask}/>, document.getElementById("task"));
          }
        }
      }
  },
    deleteTask(array) {
        var checkbox = $('[name="checkbox"]');

        for (i=checkbox.length-1; i >= 0; i--) {
            if (checkbox[i].checked) {
                for(j=0; j<array.length; j++){
                    if (checkbox[i].id == array[j].id){
                        array.splice(j,1);
                        checkbox[i].checked = false;
                    }
                }
            }
        }
        $(".delete-task").removeClass("trans");
        $(".subtask").removeClass("trans");
    },
    deleteWorkTask() {
        this.deleteTask(this.state.workTask);
        ReactDOM.render(<Task type="work" add={this.addTask} delete={this.deleteWorkTask} task={this.state.workTask}/>, document.getElementById("task"));
    },
    deletePersonalTask() {
        this.deleteTask(this.state.personalTask);
        ReactDOM.render(<Task type="personal" add={this.addTask} delete={this.deletePersonalTask} task={this.state.personalTask}/>, document.getElementById("task"));
    },
    deleteOtherTask() {
        this.deleteTask(this.state.otherTask);
        ReactDOM.render(<Task type="other" add={this.addTask} delete={this.deleteOtherTask} task={this.state.otherTask}/>, document.getElementById("task"));
    },
    hideSubTask() {
        $(".subtask").removeClass("trans");
    },
    updateComp() {
        this.forceUpdate();
    },
    render() {
        return (
            <div className="content">
                <div className="content-in">
                    <div id="task" className="tasks"></div>
                    <div className="subtask" >
                        <div className="subtask-content">
                        <div>
                        <div className="subtask-header">
                            <input className="checkbox-subtask" type="checkbox"></input>
                            <h3>Note making app</h3>
                            <div className="subtask-input" id="subTaskDate">
                            </div>
                        </div>
                        <div className="subtask-note" id="subTaskNote">
                        </div>
                        </div>
                        <div className="footer">
                            <i className="fa fa-trash"></i>
                            <p className="fa fa-caret-square-o-right" onClick={this.hideSubTask}></p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var Task = React.createClass({
    render() {
      return(
      <div className="task">
          <div className="task-content">
          <input className="task-input" placeholder={"Add an item in \""+this.props.type+"\"..."} onKeyDown={this.props.add} id={this.props.type}></input>
          <div className="task-content-scroll">
              {this.props.task.map((data, i) => <TaskElement type={this.props.type} key={i} task={data}/>)}
          </div>
          </div>
          <div className={"delete-task"} onClick={this.props.delete}>
              <i className="fa fa-trash">Delete</i>
          </div>
      </div>
    );
    }
});

var TaskElement = React.createClass({
    showDelete() {
        var checkbox = $('[name="checkbox"]');
        for (var i=0; i < checkbox.length; i++) {
            if (checkbox[i].checked) {
                $(".delete-task").addClass("trans");
                break;
            }
            $(".delete-task").removeClass("trans");
        }
    },
    showSubTask() {
        $(".subtask").addClass("trans");
        ReactDOM.render(<SubTaskDT task={this.props.task}/>, document.getElementById("subTaskDate"));
        ReactDOM.render(<SubTaskInput task={this.props.task}/>, document.getElementById("subTaskNote"));
    },
    render() {
        return(
            <div className="task-display" onClick={this.showSubTask}>
                <input id={this.props.task.id} type="checkbox" name="checkbox" onClick={this.showDelete} className="checkbox-input"/>
                <a>{this.props.task.description}</a>
                <i className="fa fa-thumb-tack"></i>
                <span>{this.props.task.date}</span>
            </div>
        );
    }
});

var SubTaskDT = React.createClass({
    render() {
        return(
            <div>
                <ul className={(this.props.task.subtask.length != 0) ? "hide" : ""}>
                    <li>
                        <i className="fa fa-calendar"></i>
                        <input id="subdate"className="subtask-date" placeholder="Date: 01-01-2000"/>
                    </li>
                    <li>
                        <i className="fa fa-clock-o"></i>
                        <input id="subtime" className="hour-select" placeholder="HH:mm AM/PM"/>
                    </li>
                </ul>
                <ul className={(this.props.task.subtask.length != 0) ? "" : "hide"}>
                    <li>
                        <i className="fa fa-calendar"></i>
                        <p>{(this.props.task.subtask.length != 0) ? this.props.task.subtask[0].date : ""}</p>
                    </li>
                    <li>
                        <i className="fa fa-clock-o"></i>
                        <p>{(this.props.task.subtask.length != 0) ? this.props.task.subtask[0].time : ""}</p>
                    </li>
                </ul>
            </div>
        );
    }
});

var SubTaskInput = React.createClass({
    addSubTask(event) {
        if (event.keyCode == 13) {
            if (event.target.value != ""){
                if (this.props.task.subtask.length == 0) {
                    var date = $("#subdate").val();
                    var time = $("#subtime").val();
                    this.props.task.subtask.push(
                        {
                            "date": date,
                            "time": time,
                            "note": []
                        }
                    );
                    $("#subdate").val("");
                    $("#subtime").val("");
                }
                var note = event.target.value;
                this.props.task.subtask[0].note.push(
                    {
                        "note": note
                    }
                );
                event.target.value = "";
                ReactDOM.render(<SubTaskDT task={this.props.task}/>, document.getElementById("subTaskDate"));
                ReactDOM.render(<SubTaskInput task={this.props.task}/>, document.getElementById("subTaskNote"));
            }
        }
    },
    render() {
        return(
            <div>
                <div className="box-input">
                <i className="fa fa-plus"></i>
                <input id="subnote" className="note" placeholder={"Add a SubTask for Task:"+ this.props.task.description} onKeyDown={this.addSubTask}/>
                </div>
                <div className="scroll">
                    {this.props.task.subtask.length != 0 ? (this.props.task.subtask[0].note.map((data, i) => <SubTaskNote key={i} task={data}/>)) : ""}
                </div>
            </div>
        );
    }
});

var SubTaskNote = React.createClass({
    render() {
        return(
                <div className="subtask-display">
                <i className="fa fa-external-link"></i>
                <p>{this.props.task.note}</p>
                </div>
        );
    }
});
ReactDOM.render(<Container />,document.getElementById('mount-point'));

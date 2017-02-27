import React, {Component} from 'react';
import {Jumbotron, Button, Input} from 'react-bootstrap';
import Project from '../components/Project';
import TitleBar from '../components/TitleBar';
import ProjectModel from '../models/ProjectModel';

export default class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      createErrorMsg: '',
      openCreateProject: false
    };

    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleFail = this.handleFail.bind(this);
    this.handleCreateProject = this.handleCreateProject.bind(this);
    this.handleCreateSuccess = this.handleCreateSuccess.bind(this);
    this.handleCreateFail = this.handleCreateFail.bind(this);
  }
  componentWillMount() {
    ProjectModel.getProjects(this.handleSuccess, this.handleFail);
  }

  handleSuccess(projects) {
    this.setState({
      projects: projects
    });
  }

  handleFail() {
  }

  handleCreateProject(event) {
    event.preventDefault();
    const name = this.refs.projectName.getValue();
    if (!name) {
      return;
    }
    const project = {name: name};

    ProjectModel.createProject(project, this.handleCreateSuccess, this.handleCreateFail);
  }

  handleCreateSuccess(data) {
    let projects = this.state.projects;
    projects.unshift(data);

    this.setState({
      projects: projects,
      createErrorMsg: ''
    });
  }

  handleCreateFail() {
    this.setState({
      createErrorMsg: 'Oops! Try again!'
    });
  }

  render() {
    let projectList;

    if (!this.state.projects.length) {
      projectList = (<div className="empty-project-list">目前尚無任何專案！</div>);
    } else {
      projectList = this.state.projects.map(project => {
        return (
          <div key={project.id}>
            <Project projectName={project.name} projectId={project.id} projectTime="2015/03/23" />
          </div>
        );
      });
    }

    return (
      <div>
        <TitleBar />
        <div className="container project-list">
          <h1>專案列表</h1>
          <Jumbotron>
            <p>由此開始建立新專案</p>
            <form onSubmit={this.handleCreateProject}>
              <Input type="text"
                ref="projectName"
                className="input-project-name"
                help={this.state.createErrorMsg}
                placeholder="請輸入專案名稱" />
              <Button type="submit" 
                bsStyle="primary"
                className="start-create-project">
                建立
              </Button>
            </form>

          </Jumbotron>
          {projectList}
        </div>
      </div>
    );
  }
}

Project.defaultProps = {
  projects: [],
  editMode: false
};

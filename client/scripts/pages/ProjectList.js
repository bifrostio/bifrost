import React, {Component} from 'react';
import Project from '../components/Project';
import TitleBar from '../components/TitleBar';
import ProjectModel from '../models/ProjectModel';

export default class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      projectName: '',
      createErrorMsg: '',
      openCreateProject: false
    };

    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleFail = this.handleFail.bind(this);
    this.handleCreateProject = this.handleCreateProject.bind(this);
    this.handleCreateSuccess = this.handleCreateSuccess.bind(this);
    this.handleCreateFail = this.handleCreateFail.bind(this);
    this.handleInputProjectNameChange = this.handleInputProjectNameChange.bind(this);
  }

  componentWillMount() {
    ProjectModel.getProjects(this.handleSuccess, this.handleFail);
  }

  handleInputProjectNameChange(event) {
    this.setState({projectName: event.target.value});
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

    const {projectName} = this.state;

    if (!projectName) {
      return;
    }

    const project = {name: projectName};

    ProjectModel.createProject(project, this.handleCreateSuccess, this.handleCreateFail);
  }

  handleCreateSuccess(data) {
    let projects = this.state.projects;
    projects.unshift(data);

    this.setState({
      projects: projects,
      projectName: '',
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
          <div className="jumbotron">
            <div className="col-md-4">
              <p>由此開始建立新專案</p>
              <form onSubmit={this.handleCreateProject}>
                <div className="form-group">
                  <input type="text"
                    className="form-control"
                    placeholder="請輸入專案名稱"
                    value={this.state.projectName}
                    onChange={this.handleInputProjectNameChange} />
                </div>
                <button type="submit"
                  className="start-create-project btn btn-primary">
                  建立
                </button>

              </form>
            </div>
          </div>
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

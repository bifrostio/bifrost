import React, {Component} from 'react';
import Project from 'components/Project';
import ProjectApi from 'utils/ProjectApi';

export default class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };

    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleFail = this.handleFail.bind(this);
  }
  componentWillMount() {
    ProjectApi.getProjects(this.handleSuccess, this.handleFail);
  }

  handleSuccess(projects) {
    this.setState({
      projects: projects
    });
  }

  handleFail() {
  }

  render() {
    let projectList;

    if (!this.state.projects.length) {
        projectList = (<div className="empty-project-list">目前尚無任何專案！</div>);
    } else {
      projectList = this.state.projects.map(project => {
        return (
          <div key={project.id}>
            <Project projectName={project.name} projectTime="2015/03/23" />
          </div>
        );
      });
    }

    return (
        <div className="project-list">
          {projectList}
        </div>
    );
  }
}

Project.defaultProps = {
  projects: [],
  editMode: false
}

import React, {Component} from 'react';

export default class Project extends Component {
  render () {
    const {projectName, projectTime, isEditable, isClose} = this.props;

    return (
      <div className="project-wrap">
        {isEditable && <input type="checkbox" className="project-checkbox" />}
        <div className="project-item">
          {isClose && <div className="project-close">已結案</div>}
          <div className="project-name">
            {projectName}
          </div>
          <div className="project-time">
            開設時間：{projectTime}
          </div>
        </div>
      </div>
    );
  }
}

Project.defaultProps = {
  isEditable: true,
  isClose: false
}

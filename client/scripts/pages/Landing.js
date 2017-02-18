import React, {Component} from 'react';
import {Link} from 'react-router';
import StationModel from '../models/StationModel';

export default class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gettingStartedLink: 'map'
    };
  }

  componentWillMount() {
    StationModel.find((err, result) => {
      const gettingStartedLink = result.length === 1 ? `stations/${result[0].id}` : 'map';
      this.setState({gettingStartedLink});
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top topnav" role="navigation">
            <div className="container topnav">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand topnav" href="#">Bifrost</a>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <a href="#top">頁首</a>
                        </li>
                        <li>
                            <a href="#introduction">簡介</a>
                        </li>
                        <li>
                            <a href="#api">API</a>
                        </li>
                        <li>
                            <a href="#source">源碼</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <a name="top"></a>
        <div className="intro-header">
            <div className="container">

                <div className="row">
                    <div className="col-lg-12">
                        <div className="intro-message">
                            <h1>Bifrost</h1>
                            <h3>物資管理系統</h3>
                            <hr className="intro-divider" />
                            <ul className="list-inline intro-social-buttons">
                                <li>
                                  <Link to={this.state.gettingStartedLink} className="btn btn-default btn-lg">
                                    <i className="fa fa-ambulance fa-fw"></i>
                                    <span className="network-name">Getting Started</span>
                                  </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <a  name="introduction"></a>
          <div className="content-section-a">
              <div className="container">
                  <div className="row">
                      <div className="col-lg-5 col-sm-6">
                          <hr className="section-heading-spacer" />
                          <div className="clearfix"></div>
                          <h2 className="section-heading">確保物資分配到最需要的地方</h2>
                          <p className="lead">
                            在台灣的災害物資運送通常都是透過媒體登高一呼，而物資捐贈常因為沒有適當的溝通管道，導致物資過多、捐贈不需要的物資甚至部分地區根本接收不到任何物資。
                          </p>
                          <p className="lead">
                            Bifrost 希望建立一個雙向的物資管理平台，讓受贈者與捐贈者可以在同一個平台上，知道目前捐贈的狀況以及哪邊需要什麼種類的物資。
                          </p>
                      </div>
                      <div className="col-lg-5 col-lg-offset-2 col-sm-6">
                          <img className="img-responsive" src="images/bifrost-in-mac.png" alt="" />
                      </div>
                  </div>

              </div>

          </div>

          <div className="content-section-b">
              <div className="container">
                  <div className="row">
                      <div className="col-lg-5 col-lg-offset-1 col-sm-push-6  col-sm-6">
                          <hr className="section-heading-spacer" />
                          <div className="clearfix"></div>
                          <h2 className="section-heading">數量及預估運送時間管理</h2>
                          <p className="lead">Bifrost 提供數量以及與運送時間的管理功能，讓受贈者與捐贈者均能知道所需數量、已達到物資等資訊</p>
                      </div>
                      <div className="col-lg-5 col-sm-pull-6  col-sm-6">
                          <img className="img-responsive" src="images/ipad.png" alt="" />
                      </div>
                  </div>

              </div>
          </div>

          <a  name="api"></a>
          <div className="content-section-a">
              <div className="container">
                  <div className="row">
                      <div className="col-lg-5 col-sm-6">
                          <hr className="section-heading-spacer" />
                          <div className="clearfix"></div>
                          <h2 className="section-heading">開放 API</h2>
                          <p className="lead">
                            我們提供 RESTful API 讓開發者可以介接 Bifrost 中的物資資訊開發其他應用，除了 API explorer 介面用於探索我們所提供的 API 以外，並且提供 Angular.js 的 JavaScript SDK。
                          </p>
                      </div>
                      <div className="col-lg-5 col-lg-offset-2 col-sm-6">
                          <img className="img-responsive" src="images/tools.jpg" alt="" />
                      </div>
                  </div>

              </div>

          </div>
        <a  name="source"></a>
        <div className="banner">

            <div className="container">

                <div className="row">
                    <div className="col-lg-6">
                        <h2>Open Source</h2>
                    </div>
                    <div className="col-lg-6">
                        <p className="lead open-source">Bifrost 是一個基於 Node.js 的開源專案，所有源碼均放置於 Github，開發細節請見 github 頁面
                        </p>
                        <ul className="list-inline banner-social-buttons">
                            <li>
                                <a href="https://github.com/bifrostio/bifrost" className="btn btn-default btn-lg"><i className="fa fa-github fa-fw"></i> <span className="network-name">Github</span></a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

        </div>

        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <ul className="list-inline">
                            <li>
                                <a href="#">頁首</a>
                            </li>
                            <li className="footer-menu-divider">&sdot;</li>
                            <li>
                                <a href="#introduction">簡介</a>
                            </li>
                            <li className="footer-menu-divider">&sdot;</li>
                            <li>
                                <a href="#api">API</a>
                            </li>
                            <li className="footer-menu-divider">&sdot;</li>
                            <li>
                                <a href="#source">源碼</a>
                            </li>
                        </ul>
                        <p className="copyright text-muted small">本專案採用 MIT 授權</p>
                    </div>
                </div>
            </div>
        </footer>
      </div>
    );
  }
}

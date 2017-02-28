import React, {Component} from 'react';
import {Link} from 'react-router';
import StationModel from '../models/StationModel';

export default class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = { stations: [] };
  }

  componentWillMount() {
    StationModel.find((err, stations) => {
      this.setState({stations});
    });
  }

  renderButtons() {
    let items = [{icon: 'fa fa-map', to: 'map', text: '瀏覽地圖'}];
    if (this.state.stations.length === 1) {
      items.push({
        icon: 'fa fa-ambulance fa-fw',
        to: `stations/${this.state.stations[0].id}`,
        text: '前往捐贈頁面'
      });
    }
    return items.map((item, i) =>(
      <li key={i}>
        <Link to={item.to} className="btn btn-default btn-lg">
          <i className={item.icon}></i>
          <span className="network-name">{item.text}</span>
        </Link>
      </li>
    ));
  }

  render() {
    return (
      <div className="landing">
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
                                {this.renderButtons()}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="intro-bottom">
                  <p>向下捲動查看更多資訊</p>
                  <i className="fa fa-chevron-down" aria-hidden="true"></i>
                </div>
            </div>
        </div>

        <a  name="introduction"></a>
          <div>
              <div className="container">
                  <div className="row">
                      <div className="col-lg-6 col-sm-6">
                          <hr className="section-heading-spacer" />
                          <div className="clearfix"></div>
                          <h2 className="section-heading">北市社會局「捐物地圖專案」係蝦米?</h2>
                          <div className="lead">
                            <ul>
                                <li><strong>大家相揪一起防災作公益</strong>：測試捐物地圖平台 &amp; 協助勵馨基金會募集物資幫助弱勢</li>
                                <li><strong>順便配合年度大型演習</strong>：106 年民安3號暨臺北世界大學運動會災害防救演習辦的演練</li>
                                <li><strong>誰來加入演習</strong>：公民參與的力量，讓災害防救準備工作，更加貼近真實狀況。</li>
                                <li><strong>如何參加</strong>：線上認領欲捐贈品項及數量 → 依操作指示寄出或親送物資到指定地點 → 收貨人員進行點收確認 → 捐物收據以 E-MAIL 方式寄送到捐物者當初登錄的電子信箱。</li>
                                <li><strong>寄東西給我們的期間</strong>：3 月 1 日至 3 月 10 日</li>
                            </ul>
                          </div>
                          <p className="lead">
                            P.S. 所有物資將於演習當日運送至大量物資集散中心進行演練，演習結束後，所有物資將交由勵馨基金會新北物資中心，轉贈給最需要的人，讓大家的愛心，達到雙倍的效益。
                          </p>
                      </div>
                      <div className="col-lg-5 col-lg-offset-1 col-sm-6">
                          <img className="img-responsive" src="images/taipei-logo.jpg" alt="" />
                      </div>
                  </div>

              </div>

          </div>
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

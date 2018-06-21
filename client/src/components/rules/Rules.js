import React, { Component } from "react";
import jungmoo from "../common/images/jungmoo.jpg";

class Rules extends Component {
  render() {
    let postContent = (
      <div>
        <h1>토탈 규칙</h1>
        <br />
        <span>
          1. 지각한 멤버는 벌금 5,000원과 4쿼터 중 2쿼터 출전, 1쿼터 결장, 1쿼터
          키퍼 또는 심판 (경기 15분 전까지 경기장에 도착하지 않으면 지각 처리)
        </span>
        <br />
        <br />
        <span>
          2. 참가 의사를 밝힌 후, 경기 이틀전에 투표 의사를 바꾸거나 당일
          예고없이 무단 결석한 멤버는 벌금 10,000원
        </span>
        <br />
        <span>
          EX) 일요일 경기: 금요일 11:59PM, 토요일 경기: 목요일 11:59PM 이후 투표
          CHANGE 불가능
        </span>
        <br />
        <br />
        <span>
          3. 회비는 4,6,8,10월... 10일 자정까지 40,000원이며, 미준수 시 납부해야
          할 벌금내역은 아래와 같음 (두달간 4만원)
        </span>
        <br />
        <span>11일 00:00 ~ 13일 23:59 ▶ 벌금 5,000원</span>
        <br />
        <span>14일 00:00 이후 ▶ 벌금 10,000원</span>
        <br />
        <br />
        <span>4. 투표기간 2일 내로 투표하지 않을 경우 ▶ 벌금 5,000원</span>
        <br />
        <div>
          <img
            src={jungmoo}
            style={{
              width: "20vw",
              minWidth: "300px",
              margin: "auto",
              marginTop: "15px"
            }}
            alt="jungmoo"
          />
        </div>
      </div>
    );

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-8">{postContent}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default Rules;

import React from 'react';
import { faLayerGroup, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MainBoard = () => {
  return (
    <>
      {' '}
      <div className="main-overview">
        <div className="overviewcard">
          <div className="overviewcard__icon">
            <FontAwesomeIcon
              icon={faLayerGroup}
              size="3x"
              color="#d56c2c"
              className="mr-2"
            />
          </div>
          <div className="overviewcard__info">
            <div>
              <span className="stats-heading-title">300</span>
            </div>
            <div>
              <span className="stats-heading-label">Mortgages Demands</span>
            </div>
          </div>
        </div>
        <div className="overviewcard">
          <div className="overviewcard__icon">
            <FontAwesomeIcon
              icon={faUsers}
              size="3x"
              color="#d56c2c"
              className="mr-2"
            />
          </div>
          <div className="overviewcard__info">
            <div>
              <span className="stats-heading-title">100</span>
            </div>
            <div>
              <span className="stats-heading-label">Users</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainBoard;

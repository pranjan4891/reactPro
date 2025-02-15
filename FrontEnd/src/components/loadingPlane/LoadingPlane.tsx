import React from 'react';
import './LoadingPlane.css';

const LoadingPlane: React.FC = () => {
  return (
    <div className='loading-container'>
      <div className='stars'></div>
      <div className='twinkling'></div>
      <div className='content-wrapper'>
        <div className='company-logo'>
          <span className='logo-text'>SkyWay</span>
          <span className='logo-dot'>•</span>
          <span className='logo-text'>Travel</span>
        </div>

        <div className='sky'>
          <div className='cloud cloud-1'></div>
          <div className='cloud cloud-2'></div>
          <div className='cloud cloud-3'></div>
          <div className='cloud cloud-4'></div>
          <div className='plane'>
            <div className='plane-window'></div>
            <div className='plane-window'></div>
            <div className='plane-window'></div>
            <div className='plane-body'>
              <div className='plane-line'></div>
            </div>
            <div className='wing-top'></div>
            <div className='wing-bottom'></div>
            <div className='tail'></div>
          </div>
        </div>

        <div className='loading-status'>
          <div className='loading-text'>Preparing Your Journey</div>
          <div className='loading-progress'>
            <div className='progress-bar'>
              <div className='progress-fill'></div>
            </div>
          </div>
          <div className='loading-message'>
            Please wait while we prepare your experience...
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPlane;

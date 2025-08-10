import React from 'react';
import './StartingPage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import excelIllustration from '../StartingPage/excelAnalytics.png';

const StartingPage = () => {
  return (
    <div className="excel-portal">
      <div className="portal-content container-fluid">
        <div className="row align-items-center justify-content-center">
          {/* Left Content */}
          <div className="col-md-6 text-content">
            <h1><span className="highlight">Excel</span> Analytics Portal</h1>
            <p>
              Dive into your Excel-based performance metrics. Visualize, analyze,
              and report effortlessly with our intuitive portal.
            </p>
            <button className="start-button">Launch Portal</button>
          </div>

          {/* Right Image with dotted bg */}
          <div className="col-md-6 image-wrapper">
            <div className="dotted-background">
              <img src={excelIllustration} alt="Excel Portal Illustration" className="excel-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartingPage;

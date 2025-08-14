
import "./Loding.css"; 

const LoadingPage = () => {
  return (
    <div className="card-cont skeleton">
      <div className="card-img skeleton-box"></div>
      <div className="card-details">
        <div className="card-header">
          <div className="skeleton-box skeleton-text title"></div>
          <div className="rating">
            <div className="skeleton-box skeleton-text small"></div>
          </div>
        </div>
        <div className="skeleton-box skeleton-text medium"></div>
        <div className="skeleton-box skeleton-text medium"></div>
        <div className="skeleton-box skeleton-text small"></div>
        <div className="skeleton-box skeleton-text small"></div>
        <div className="skeleton-box skeleton-btn"></div>
      </div>
    </div>
  );
};

export default LoadingPage;

import './banner.css'; 
import BannerImg from "../../assets/images/banner.jpg"

const Banner = () => {
  return (
    <>
    <div className="banner-container">
      <div className="banner-content text-center">
        <img
          src={BannerImg}
          alt="Banner"
          className="img-fluid"
        />
        <div className="banner-heading">
          <h1>Optimized Your Meal</h1>
          <p>Select Meal to Add in Week.You Will be able to edit, modify and change the Meal Weeks.</p>
        </div>
      </div>
    </div>
    <div className="week-heading">
        <h3>Week Orders</h3>
      </div>
    </>
    
  );
};

export default Banner;

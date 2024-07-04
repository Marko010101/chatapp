// Loader.js

import "./DogLoader.css";

const Loader = () => {
  return (
    <div className="loader">
      <div className="dog">
        <div className="dog-body"></div>
        <div className="dog-torso"></div>
        <div className="dog-head"></div>
        <div className="dog-eyes">
          <div className="dog-eye"></div>
          <div className="dog-eye"></div>
        </div>
        <div className="dog-muzzle"></div>
        <div className="dog-tongue"></div>
        <div className="dog-ears">
          <div className="dog-ear"></div>
          <div className="dog-ear"></div>
        </div>
        <div className="dog-tail"></div>
      </div>
    </div>
  );
};

export default Loader;

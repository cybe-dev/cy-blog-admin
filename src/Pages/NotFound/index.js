import React from "react";

class NotFound extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.setHeaderShown(false);
  }

  render() {
    return (
      <div>
        <div className="flex flex-col md:flex-row justify-center items-center h-screen">
          <div>
            <p className="bg-gray-700 text-6xl text-bold text-white">404</p>
          </div>
          <div className="p-0 md:pl-3">
            <p className="text-3xl text-gray-700 text-center md:text-left">
              ERROR
            </p>
            <p className="text-xl text-gray-600 text-center md:text-left">
              Halaman Tidak Ditemukan
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;

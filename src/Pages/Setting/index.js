import React from "react";
import {
  Card,
  InputText,
  Button,
  Toast,
  Spinner,
  Alert,
} from "../../Components";
import { SphereSpinner } from "react-spinners-kit";
import Axios from "axios";
import { backendBaseUrl } from "../../setting";
import { EntypoSave, EntypoCheck } from "react-entypo-icons";

class Setting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      blogName: "",
      key: "",
      showToast: false,
      loadingPost: false,
      error: null,
    };

    this.getData = this.getData.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  componentDidMount() {
    this.props.setTitle({
      title: "Pengaturan",
      breadcrumb: [
        {
          title: "Home",
          path: "/",
        },
        {
          title: "Pengaturan",
        },
      ],
    });

    this.props.setHeaderShown(true);

    this.getData();
  }

  saveData = () => {
    const getThis = this;
    const jwt = getThis.props.jwt;
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };

    const { blogName, key } = getThis.state;

    this.setState({ loadingPost: true, showToast: false });

    Axios.put(backendBaseUrl + "setting/general", { blogName, key }, config)
      .then(function (response) {
        console.log(response.data);
        getThis.setState({ showToast: true, error: null, loadingPost: false });
      })
      .catch(function (error) {
        console.log(error.response);
        getThis.setState({
          loadingPost: false,
          error: error.response.data.message,
        });
      });
  };

  getData = () => {
    const getThis = this;
    const jwt = getThis.props.jwt;
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };

    Axios.get(backendBaseUrl + "setting/general", config)
      .then(function (response) {
        console.log(response.data);

        getThis.setState({
          loading: false,
          blogName: response.data.data.blogName,
          key: response.data.data.key,
        });
      })
      .catch(function (error) {
        console.log(error.response);

        getThis.setState({
          loading: false,
          blogName: null,
          key: null,
        });
      });
  };

  render() {
    const {
      loading,
      blogName,
      key,
      showToast,
      loadingPost,
      error,
    } = this.state;
    return (
      <React.Fragment>
        <Card>
          {loading ? (
            <div className="flex flex-col items-center justify-center p-3">
              <SphereSpinner size={32} color="#000" loading={loading} />
              <p className="mt-3">Mengambil data...</p>
            </div>
          ) : (
            <div className="w-full lg:w-1/3">
              {error && <Alert color="red" body={error} />}
              <InputText
                label="Nama Blog"
                type="text"
                value={blogName}
                onChange={(e) => {
                  this.setState({ blogName: e.target.value });
                }}
              />
              <InputText
                label="Secret Key"
                type="text"
                value={key}
                onChange={(e) => {
                  this.setState({ key: e.target.value });
                }}
              />
              <Button
                type="button"
                color="blue"
                className="flex items-center"
                onClick={() => {
                  this.saveData();
                }}
              >
                <EntypoSave className="mr-2" />
                Simpan
              </Button>
            </div>
          )}
        </Card>
        <Toast show={showToast}>
          <EntypoCheck className="mr-3" />
          Berhasil Menyimpan
        </Toast>
        <Spinner loading={loadingPost} />
      </React.Fragment>
    );
  }
}

export default Setting;

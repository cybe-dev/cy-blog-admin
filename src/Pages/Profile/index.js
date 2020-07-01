import React from "react";
import {
  Card,
  InputText,
  Button,
  Spinner,
  Toast,
  Alert,
} from "../../Components";
import { asyncLocalStorage, backendBaseUrl } from "../../setting";
import Axios from "axios";
import { SphereSpinner } from "react-spinners-kit";
import { EntypoSave, EntypoCheck } from "react-entypo-icons";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      name: null,
      email: null,
      loading: true,
      messageGet: null,
      loadingPost: false,
      showToast: false,
      error: null,
    };

    this.getData = this.getData.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  componentDidMount() {
    this.props.setTitle({
      title: "Profil",
      breadcrumb: [
        {
          title: "Home",
          path: "/",
        },
        {
          title: "Profil",
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

    const { name, email } = getThis.state;

    this.setState({ loadingPost: true, showToast: false });

    Axios.put(backendBaseUrl + "setting/profile", { name, email }, config)
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

  getData = (e) => {
    const getThis = this;
    const jwt = getThis.props.jwt;
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };

    Axios.get(backendBaseUrl + "setting/profile", config)
      .then(function (response) {
        console.log(response.data);

        getThis.setState({
          loading: false,
          name: response.data.data.name,
          email: response.data.data.email,
          messageGet: null,
        });
      })
      .catch(function (error) {
        console.log(error.response);

        getThis.setState({
          loading: false,
          name: null,
          email: null,
          messageGet: error.response.data.message,
        });
      });
  };

  render() {
    const { name, email, loading, loadingPost, showToast, error } = this.state;
    return (
      <React.Fragment>
        <Spinner loading={loadingPost} />

        <Card>
          {loading ? (
            <div className="flex flex-col items-center justify-center p-3">
              <SphereSpinner
                size={32}
                color="#000"
                loading={this.state.loading}
              />
              <p className="mt-3">Mengambil data...</p>
            </div>
          ) : (
            <div className="w-full lg:w-1/3">
              {error && <Alert color="red" body={error} />}
              <InputText
                value={email}
                label="Email"
                type="text"
                onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}
              />
              <InputText
                label="Nama"
                value={name}
                type="text"
                onChange={(e) => {
                  this.setState({ name: e.target.value });
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
                <EntypoSave className="mr-2" /> Simpan
              </Button>
            </div>
          )}
        </Card>
        <Toast show={showToast}>
          <EntypoCheck className="mr-3" />
          Berhasil Menyimpan
        </Toast>
      </React.Fragment>
    );
  }
}

export default Profile;

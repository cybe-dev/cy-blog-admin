import React from "react";
import {
  Card,
  InputText,
  Spinner,
  Toast,
  Button,
  Alert,
} from "../../Components";
import { EntypoCheck } from "react-entypo-icons";
import Axios from "axios";
import { backendBaseUrl } from "../../setting";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      showToast: false,
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      error: null,
    };

    this.saveData = this.saveData.bind(this);
  }

  componentDidMount() {
    this.props.setTitle({
      title: "Ganti Password",
      breadcrumb: [
        {
          title: "Home",
          path: "/",
        },
        {
          title: "Ganti Password",
        },
      ],
    });

    this.props.setHeaderShown(true);
  }

  saveData = () => {
    const getThis = this;
    const { oldPassword, newPassword, confirmNewPassword } = getThis.state;
    const jwt = getThis.props.jwt;
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };

    this.setState({ loading: true });

    if (newPassword == confirmNewPassword) {
      Axios.put(
        backendBaseUrl + "setting/change-password",
        { oldPassword, newPassword },
        config
      )
        .then((response) => {
          getThis.setState({
            loading: false,
            error: null,
            showToast: true,
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          });
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
          getThis.setState({
            error: error.response.data.message,
            loading: false,
          });
        });
    } else {
      getThis.setState({ loading: false, error: "Tolong konfirmasi password" });
    }
  };

  render() {
    const {
      loading,
      showToast,
      error,
      oldPassword,
      newPassword,
      confirmNewPassword,
    } = this.state;
    return (
      <React.Fragment>
        <Card>
          <div className="w-full lg:w-1/3">
            {error && <Alert color="red" body={error} />}
            <InputText
              value={oldPassword}
              label="Password Lama"
              type="text"
              onChange={(e) => {
                this.setState({ oldPassword: e.target.value });
              }}
            />
            <InputText
              value={newPassword}
              label="Password Baru"
              type="text"
              onChange={(e) => {
                this.setState({ newPassword: e.target.value });
              }}
            />
            <InputText
              value={confirmNewPassword}
              label="Konfirmasi Password Baru"
              type="text"
              onChange={(e) => {
                this.setState({ confirmNewPassword: e.target.value });
              }}
            />
            <Button
              type="button"
              color="blue"
              onClick={() => {
                this.saveData();
              }}
            >
              Ganti
            </Button>
          </div>
        </Card>
        <Toast show={showToast}>
          <EntypoCheck className="mr-3" />
          Berhasil Menyimpan
        </Toast>
        <Spinner loading={loading} />
      </React.Fragment>
    );
  }
}

export default ChangePassword;

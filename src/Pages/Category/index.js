import React from "react";
import {
  Card,
  Table,
  Button,
  ConfirmDialog,
  InputText,
  Modal,
  Alert,
} from "../../Components";
import { EntypoTrash, EntypoPencil } from "react-entypo-icons";
import { SphereSpinner, CircleSpinner } from "react-spinners-kit";
import Axios from "axios";
import { backendBaseUrl } from "../../setting";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
      isShowing: false,
      id: null,
      name: null,
      message: null,
      messageGet: null,
      modal: false,
      loadingPost: false,
      action: "Buat",
    };

    this.getData = this.getData.bind(this);
    this.isShowingToggle = this.isShowingToggle.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.modalToggle = this.modalToggle.bind(this);
    this.postData = this.postData.bind(this);
  }

  isShowingToggle = (id = null) => {
    this.setState({ isShowing: !this.state.isShowing, id, message: null });
  };

  modalToggle = (id = null, name = "") => {
    const action = id ? "Edit" : "Buat";
    this.setState({
      modal: !this.state.modal,
      id,
      name,
      message: null,
      action,
    });
  };

  deleteCategory = (id) => {
    const getThis = this;
    const jwt = getThis.props.jwt;
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };

    getThis.isShowingToggle();
    getThis.setState({ loading: true });

    Axios.delete(backendBaseUrl + "category/" + id, config)
      .then(function (response) {
        console.log(response.data);

        getThis.getData();
      })
      .catch(function (error) {
        console.log(error.response.data);
        getThis.getData();
      });
  };

  postData = () => {
    const getThis = this;
    const { id, name } = getThis.state;
    const jwt = getThis.props.jwt;
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };

    getThis.setState({ loadingPost: true });

    if (!id) {
      Axios.post(backendBaseUrl + "category", { name }, config)
        .then((response) => {
          getThis.modalToggle();
          getThis.setState({ loading: true, loadingPost: false });
          console.log(response.data);

          getThis.getData();
        })
        .catch((error) => {
          console.log(error.response.data);
          getThis.setState({
            message: error.response.data.details[0].message,
            loadingPost: false,
          });
          console.log(getThis.state.message);
        });
    } else {
      Axios.put(backendBaseUrl + "category/" + id, { name }, config)
        .then((response) => {
          getThis.modalToggle();
          getThis.setState({ loading: true, loadingPost: false });
          console.log(response.data);

          getThis.getData();
        })
        .catch((error) => {
          console.log(error.response.data);
          getThis.setState({
            message: error.response.data.details[0].message,
            loadingPost: false,
          });
          console.log(getThis.state.message);
        });
    }
  };

  componentDidMount() {
    this.props.setTitle({
      title: "Kategori",
      breadcrumb: [
        {
          title: "Home",
          path: "/",
        },
        {
          title: "Kategori",
        },
      ],
    });

    this.props.setHeaderShown(true);

    this.getData();
  }

  getData = (e) => {
    const getThis = this;
    const jwt = getThis.props.jwt;
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };

    Axios.get(backendBaseUrl + "category", config)
      .then(function (response) {
        console.log(response.data);

        getThis.setState({
          loading: false,
          data: response.data.data,
          messageGet: null,
        });
      })
      .catch(function (error) {
        console.log(error.response.data);

        getThis.setState({
          loading: false,
          data: null,
          messageGet: error.response.data.message,
        });
      });
  };

  render() {
    const { isShowing, action } = this.state;
    return (
      <React.Fragment>
        <ConfirmDialog
          isShowing={isShowing}
          toggle={this.isShowingToggle}
          title="Konfirmasi"
          body="Apakah anda yakin ingin menghapus kategori ini?"
          confirmed={() => {
            this.deleteCategory(this.state.id);
          }}
        />
        <Modal.Base isShowing={this.state.modal}>
          <Modal.Head>{action} Kategori</Modal.Head>
          <div>
            {this.state.message && (
              <Alert color="red" body={this.state.message} />
            )}
            <InputText
              label="Nama"
              type="text"
              value={this.state.name}
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
            />
          </div>
          <Modal.Foot>
            {this.state.loadingPost && (
              <div className="mr-auto flex items-center">
                <CircleSpinner size={16} color="#000" />
              </div>
            )}
            <Button
              type="button"
              className="mr-3 px-3"
              onClick={() => {
                this.modalToggle();
              }}
            >
              Batal
            </Button>
            <Button
              type="button"
              color="blue"
              className="px-3"
              disabled={this.state.loadingPost}
              onClick={() => {
                this.postData();
              }}
            >
              {action}
            </Button>
          </Modal.Foot>
        </Modal.Base>
        <Card>
          {this.state.loading ? (
            <div className="flex flex-col items-center justify-center p-3">
              <SphereSpinner
                size={32}
                color="#000"
                loading={this.state.loading}
              />
              <p className="mt-3">Mengambil data...</p>
            </div>
          ) : (
            <React.Fragment>
              {this.state.data ? (
                <React.Fragment>
                  <Button
                    type="button"
                    color="green"
                    className="mb-3"
                    onClick={() => {
                      this.modalToggle();
                    }}
                  >
                    Buat Kategori
                  </Button>
                  <Table.Responsive>
                    <Table.Thead>
                      <tr>
                        <Table.Th>#</Table.Th>
                        <Table.Th>Nama Kategori</Table.Th>
                        <Table.Th>Aksi</Table.Th>
                      </tr>
                    </Table.Thead>
                    <tbody>
                      {this.state.data.map((item, index) => {
                        return (
                          <tr key={index}>
                            <Table.Td className="text-center">
                              {index + 1}
                            </Table.Td>
                            <Table.Td>{item.name}</Table.Td>
                            <Table.Td>
                              <div className="flex justify-center">
                                <Button
                                  type="button"
                                  color="yellow"
                                  className="m-1"
                                  onClick={() => {
                                    this.modalToggle(item.id, item.name);
                                  }}
                                >
                                  <EntypoPencil />
                                </Button>
                                <Button
                                  type="button"
                                  color="red"
                                  className="m-1"
                                  onClick={() => {
                                    this.isShowingToggle(item.id);
                                  }}
                                >
                                  <EntypoTrash />
                                </Button>
                              </div>
                            </Table.Td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table.Responsive>
                </React.Fragment>
              ) : (
                <div className="p-5">
                  <p className="text-center">{this.state.messageGet}</p>
                  <Button
                    type="button"
                    color="green"
                    className="mt-3 mx-auto"
                    onClick={() => {
                      this.modalToggle();
                    }}
                  >
                    Buat Kategori
                  </Button>
                </div>
              )}
            </React.Fragment>
          )}
        </Card>
      </React.Fragment>
    );
  }
}

export default Category;

import React from "react";
import { Card, Button, Table, ConfirmDialog } from "../../Components";
import { SphereSpinner } from "react-spinners-kit";
import { EntypoPencil, EntypoTrash } from "react-entypo-icons";
import Axios from "axios";
import { backendBaseUrl } from "../../setting";

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: null,
      messageGet: null,
      deleteShow: false,
      id: null,
    };

    this.getData = this.getData.bind(this);
    this.deleteToggle = this.deleteToggle.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  componentDidMount() {
    this.props.setTitle({
      title: "Postingan",
      breadcrumb: [
        {
          title: "Home",
          path: "/",
        },
        {
          title: "Postingan",
        },
      ],
    });

    this.props.setHeaderShown(true);
    this.getData();
  }

  deleteToggle = (id = null) => {
    this.setState({ deleteShow: !this.state.deleteShow, id });
  };

  deletePost = (id) => {
    const getThis = this;
    const jwt = getThis.props.jwt;
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };

    getThis.deleteToggle();
    getThis.setState({ loading: true });

    Axios.delete(backendBaseUrl + "post/" + id, config)
      .then(function (response) {
        console.log(response.data);

        getThis.getData();
      })
      .catch(function (error) {
        console.log(error.response.data);
        getThis.getData();
      });
  };

  getData = (e) => {
    const getThis = this;
    const jwt = getThis.props.jwt;
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };

    Axios.get(backendBaseUrl + "post", config)
      .then(function (response) {
        console.log(response.data);

        getThis.setState({
          loading: false,
          data: response.data.data,
          messageGet: null,
        });
      })
      .catch(function (error) {
        console.log(error.response);

        getThis.setState({
          loading: false,
          data: null,
          messageGet: error.response.data.message,
        });
      });
  };

  render() {
    const { deleteShow } = this.state;
    return (
      <React.Fragment>
        <ConfirmDialog
          isShowing={deleteShow}
          toggle={this.deleteToggle}
          title="Konfirmasi"
          body="Apakah anda yakin ingin menghapus postingan ini?"
          confirmed={() => {
            this.deletePost(this.state.id);
          }}
        />
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
                    type="link"
                    color="green"
                    className="mb-3"
                    path="/post/create"
                  >
                    Buat Postingan
                  </Button>
                  <Table.Responsive>
                    <Table.Thead>
                      <tr>
                        <Table.Th>#</Table.Th>
                        <Table.Th>Judul</Table.Th>
                        <Table.Th>Kategori</Table.Th>
                        <Table.Th>Tanggal Publish</Table.Th>
                        <Table.Th>Aksi</Table.Th>
                      </tr>
                    </Table.Thead>
                    <tbody>
                      {this.state.data.map((item, index) => {
                        const publishDate = new Date(item.createdAt);
                        return (
                          <tr key={index}>
                            <Table.Td className="text-center">
                              {index + 1}
                            </Table.Td>
                            <Table.Td>{item.title}</Table.Td>
                            <Table.Td className="text-center">
                              {item.category
                                ? item.category.name
                                : "Tanpa Kategori"}
                            </Table.Td>
                            <Table.Td className="text-center">
                              {publishDate.getDate() +
                                "-" +
                                publishDate.getMonth() +
                                "-" +
                                publishDate.getFullYear()}
                            </Table.Td>
                            <Table.Td>
                              <div className="flex justify-center">
                                <Button
                                  type="link"
                                  color="yellow"
                                  className="m-1"
                                  path={"/post/edit/" + item.slug}
                                >
                                  <EntypoPencil />
                                </Button>
                                <Button
                                  type="button"
                                  color="red"
                                  className="m-1"
                                  onClick={() => {
                                    this.deleteToggle(item.id);
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
                <div className="p-5 flex flex-col items-center justify-center">
                  <p>{this.state.messageGet}</p>
                  <Button
                    type="link"
                    color="green"
                    className="mt-3"
                    path="/post/create"
                  >
                    Buat Postingan
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

export default Post;

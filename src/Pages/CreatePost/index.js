import React, { Component } from "react";
import {
  Card,
  InputText,
  Button,
  Spinner,
  Alert,
  Toast,
} from "../../Components";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Select from "react-select";
import Axios from "axios";
import { backendBaseUrl } from "../../setting";
import { EntypoSave, EntypoCheck } from "react-entypo-icons";
import { EditorState } from "draft-js";
import { withRouter, Redirect } from "react-router-dom";
import { stateFromHTML } from "draft-js-import-html";
import { stateToHTML } from "draft-js-export-html";

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      body: "",
      title: "",
      category: [],
      categoryId: "",
      loading: false,
      editorState: EditorState.createEmpty(),
      message: null,
      notfound: false,
      selectedCategory: null,
      showToast: false,
    };

    this.getCategory = this.getCategory.bind(this);
    this.getPost = this.getPost.bind(this);
    this.savePost = this.savePost.bind(this);
    this.editorStateHandler = this.editorStateHandler.bind(this);
  }
  componentDidMount() {
    this.props.setHeaderShown(true);

    const slug = this.props.match.params.slug;

    if (slug) {
      this.props.setTitle({
        title: "Edit Postingan",
        breadcrumb: [
          {
            title: "Home",
            path: "/",
          },
          {
            title: "Postingan",
            path: "/post",
          },
          {
            title: "Edit Postingan",
          },
        ],
      });
      this.getPost(slug);
    } else {
      this.props.setTitle({
        title: "Buat Postingan",
        breadcrumb: [
          {
            title: "Home",
            path: "/",
          },
          {
            title: "Postingan",
            path: "/post",
          },
          {
            title: "Buat Postingan",
          },
        ],
      });
    }

    this.getCategory();
  }

  savePost = () => {
    const getThis = this;
    const { title, body, categoryId, id } = getThis.state;
    const jwt = getThis.props.jwt;
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };

    getThis.setState({ loading: true, showToast: false });

    if (id) {
      Axios.put(
        backendBaseUrl + "post/" + id,
        { title, body, categoryId },
        config
      )
        .then((response) => {
          getThis.setState({ loading: false, message: null, showToast: true });
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);

          let msg = error.response.data.message;
          if (error.response.data.details) {
            msg = error.response.data.details[0].message;
          }
          getThis.setState({
            message: msg,
            loading: false,
          });
        });
    } else {
      Axios.post(backendBaseUrl + "post", { title, body, categoryId }, config)
        .then((response) => {
          getThis.setState({
            loading: false,
            message: null,
            showToast: true,
            id: response.data.data.id,
          });
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);

          let msg = error.response.data.message;
          if (error.response.data.details) {
            msg = error.response.data.details[0].message;
          }
          getThis.setState({
            message: msg,
            loading: false,
          });
        });
    }
  };

  getCategory = () => {
    const getThis = this;
    const jwt = getThis.props.jwt;
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };

    Axios.get(backendBaseUrl + "category", config)
      .then(function (response) {
        console.log(response.data);

        let category = [];
        response.data.data.map((item, index) => {
          category.push({ label: item.name, value: item.id });
        });

        getThis.setState({ category });
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  getPost = (slug) => {
    const getThis = this;
    const jwt = getThis.props.jwt;
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };

    Axios.get(backendBaseUrl + "post/" + slug, config)
      .then(function (response) {
        console.log(response.data);

        const { id, title, body, categoryId, category } = response.data.data;

        getThis.setState({
          id,
          title,
          body,
          editorState: EditorState.createWithContent(stateFromHTML(body)),
          categoryId,
        });
        if (category) {
          getThis.setState({
            selectedCategory: {
              value: categoryId,
              label: category.name,
            },
          });
        }
      })
      .catch(function (error) {
        getThis.setState({ notfound: true });
      });
  };

  editorStateHandler = (editorState) => {
    this.setState({
      editorState,
      body: stateToHTML(editorState.getCurrentContent()),
    });
  };

  render() {
    const {
      editorState,
      category,
      title,
      notfound,
      selectedCategory,
      showToast,
    } = this.state;
    if (notfound) {
      return <Redirect to={{ pathname: "/404" }} />;
    }
    return (
      <Card>
        {this.state.message && <Alert color="red" body={this.state.message} />}
        <InputText
          label="Judul"
          type="text"
          value={title}
          onChange={(e) => {
            this.setState({ title: e.target.value });
          }}
        />

        <label className="text-gray-700 text-sm">Postingan</label>
        <Editor
          editorState={editorState}
          wrapperClassName="mt-1 mb-3 block bg-white p-1 rounded-sm border border-gray-400 text-gray-700 text-sm"
          editorClassName="px-3"
          onEditorStateChange={this.editorStateHandler}
        />

        <label className="text-gray-700 text-sm">Kategori</label>
        <Select
          className="text-sm mt-1 mb-3"
          value={selectedCategory}
          options={category}
          isClearable={true}
          onChange={(e) => {
            let value = null;
            let selected = null;
            if (e) {
              value = e.value;
              selected = e;
            }
            this.setState({ categoryId: value, selectedCategory: selected });
          }}
        />

        <Button
          type="button"
          color="blue"
          className="flex items-center"
          onClick={(e) => {
            this.savePost();
          }}
        >
          <EntypoSave className="mr-2" /> Simpan Postingan
        </Button>
        <Spinner loading={this.state.loading} />
        <Toast show={showToast}>
          <EntypoCheck className="mr-3" />
          Berhasil Menyimpan
        </Toast>
      </Card>
    );
  }
}

export default withRouter(CreatePost);

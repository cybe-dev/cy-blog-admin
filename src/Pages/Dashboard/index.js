import React, { Fragment } from "react";
import { EntypoPencil, EntypoChat } from "react-entypo-icons";
import { Stats, Card } from "../../Components";
import Axios from "axios";
import { backendBaseUrl } from "../../setting";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: 0,
      comments: 0,
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.props.setTitle({
      title: "Dashboard",
      breadcrumb: [
        {
          title: "Home",
          path: "/",
        },
        {
          title: "Dashboard",
        },
      ],
    });

    this.props.setHeaderShown(true);

    this.getData();
  }

  getData = () => {
    const getThis = this;
    const jwt = getThis.props.jwt;
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };

    Axios.get(backendBaseUrl + "post/count", config)
      .then(function (response) {
        console.log(response.data);

        getThis.setState({
          posts: response.data.data,
        });
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
    Axios.get(backendBaseUrl + "comment/count", config)
      .then(function (response) {
        console.log(response.data);

        getThis.setState({
          comments: response.data.data,
        });
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  render() {
    const { posts, comments } = this.state;
    return (
      <Fragment>
        <Stats.Wrapper className="mb-3">
          <Stats.Card className="w-full md:w-1/2 mb-3 lg:mr-3 lg:mb-0">
            <Stats.Icon className="bg-gray-700">
              <EntypoPencil />
            </Stats.Icon>
            <Stats.Data value={posts} label="Postingan" />
          </Stats.Card>
          <Stats.Card className="w-full md:w-1/2">
            <Stats.Icon className="bg-gray-700">
              <EntypoChat />
            </Stats.Icon>
            <Stats.Data value={comments} label="Komentar" />
          </Stats.Card>
        </Stats.Wrapper>
        <Card>
          <p className="text-xl font-bold roboto">Selamat datang!</p>
          <p className="roboto">Ini adalah halaman dashboard Cy-blog</p>
        </Card>
      </Fragment>
    );
  }
}

export default Dashboard;

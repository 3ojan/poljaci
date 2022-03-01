import React, { useEffect } from 'react';
import { connect, useSelector } from "react-redux";
import { fetchData } from '../../actions/apiQuestions';

const addNewData = () => {
  return (<div>
    <div className="block">
      <h2 className="subtitle">Add new data</h2>
      <button className="button is-primary">Add new data</button>
    </div>
    <div className="block">
      <strong><br /></strong>
    </div>
  </div>)
}

const createTable = (data) => {
  const items = [];
  data.map(item => {
    items.push(<tr key={item.id}><td>{item.id}</td><td>{item.name}</td><td>{item.username}</td><td>{item.email}</td><td><button className='button is-danger'>Delete</button></td></tr>)
  })
  return <table className='table'>
    <tbody>
      {items}
    </tbody>
  </table>
}

function Home(props) {
  const { fetchData } = props;
  const loading = useSelector(state => state.fetchApi.loading);
  const data = useSelector(state => state.fetchApi.data);

  useEffect(() => {
    fetchData();
    return () => {
    };
  }, []);

  return (
    loading ? <div className="tile is-parent is-vertical text-centered">
      <article className="streched">
        <p className="subtitle">Loading.....</p>
      </article>
    </div> : (
      <div className="centered-table">
        {addNewData()}
        {createTable(data)}
      </div>)
  );
}

const mapStateToProps = state => {
  const { questions } = state;
  return { questions: questions };
};

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchData(dispatch)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);


import React, { useEffect, useState } from 'react';
import { connect, useSelector } from "react-redux";
import { fetchData } from '../../actions/apiQuestions';

const addNewData = (onClick) => {
  return (<div>
    <div className="block">
      <h2 className="subtitle">Add new data</h2>
      <button className="button is-primary" onClick={onClick}>Add new data</button>
    </div>
    <div className="block">
      <strong><br /></strong>
    </div>
  </div>)
}

const createTable = (data, editCallback, deleteCallback) => {
  const items = [];
  data.map(item => {
    items.push(
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.username}</td>
        <td>{item.email}</td>
        <td><button className='button is-warning' onClick={() => { editCallback(item) }}>Edit</button></td>
        <td><button className='button is-danger' onClick={() => { deleteCallback(item) }}>Delete</button></td>
      </tr>)
  })
  return <table className='table'>
    <tbody>
      {items}
    </tbody>
  </table>
}

const editmodal = (item, onEditItem, onCancel, onSave) => {
  const { name, id, email, username } = item;
  return (<div className="modal">
    <div className="modal-background"></div>
    <div className="modal-content">
      <div className="field">
        <label className="label">ID</label>
        <div className="control">
          <input className="input" type="text" placeholder={item.id} disabled />
        </div>
      </div>

      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input className="input" type="name" placeholder={item.name} onChange={(event) => { onEditItem("name", event.target.value) }} />
        </div>
      </div>

      <div className="field">
        <label className="label">Username</label>
        <div className="control">
          <input className="input" type="name" placeholder={item.username} onChange={(event) => { onEditItem("username", event.target.value) }} />
        </div>
      </div>

      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input className="input" type="name" placeholder={item.email} onChange={(event) => { onEditItem("email", event.target.value) }} />
        </div>
      </div>
      <div className="field">
        <button className="button is-success" onClick={onSave}>Save</button>
        <button className="button is-warning" onClick={onCancel}>Cancel</button>
      </div>
    </div>
    <button className="modal-close is-large" aria-label="close" onClick={onCancel}></button>
  </div>)
}
const addModal = (id, onEditItem, onCancel, onSave) => {
  return (
    <div className="modal">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="field">
          <label className="label">ID</label>
          <div className="control">
            <input className="input" type="text" disabled placeholder={id} />
          </div>
        </div>

        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input className="input" type="name" onChange={(event) => { onEditItem("name", event.target.value) }} />
          </div>
        </div>

        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="name" onChange={(event) => { onEditItem("username", event.target.value) }} />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" type="name" onChange={(event) => { onEditItem("email", event.target.value) }} />
          </div>
        </div>
        <div className="field">
          <button className="button is-success" onClick={onSave}>Save</button>
          <button className="button is-warning" onClick={onCancel}>Cancel</button>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={onCancel}></button>
    </div>)
}


function Home(props) {
  const { fetchData } = props;
  const loading = useSelector(state => state.fetchApi.loading);
  const fetchedData = useSelector(state => state.fetchApi.data);

  const [state, setState] = useState({ selectedItem: null, modalVisible: false, data: [], newItem: null, newModalVisible: false })

  useEffect(() => {
    setState({ ...state, data: fetchedData })
  }, [fetchedData]) // set the relation between redux campaign and local state


  useEffect(() => {
    fetchData();
    return () => {
    };
  }, []);

  const onCancel = () => {
    setState({ ...state, modalVisible: false, newModalVisible: false });
  }
  const onSave = () => {
    const item = { ...state };
    const { selectedItem } = item;
    const newData = state.data.filter(item => item.id !== selectedItem.id);
    newData.push(selectedItem);
    setState({ ...state, data: newData, modalVisible: false });
  }
  const onSaveNew = () => {
    const _state = { ...state };
    const { newItem } = _state;
    _state.data.push(newItem);
    setState({ ...state, _state, newModalVisible: false });
  }

  const onDelete = (dataItem) => {
    const newData = state.data.filter(item => item.id !== dataItem.id);
    setState({ ...state, data: newData });
  }

  const onEditSelectedItem = (key, value) => {
    const item = { ...state };
    const { selectedItem } = item;
    selectedItem[key] = value;
    setState({ ...state, selectedItem })
  }
  const onEditNew = (key, value) => {
    const _state = { ...state };
    const { newItem } = _state;
    newItem[key] = value;
    newItem.id = _state.data.length + 1;
    setState({ ...state, newItem })
  }

  const onEdit = (dataItem) => {
    // setSelectedItem(dataItem);
    setState({ ...state, selectedItem: { ...dataItem }, modalVisible: true })
  };



  return (
    loading ? <div className="tile is-parent is-vertical text-centered">
      <article className="streched">
        <p className="subtitle">Loading.....</p>
      </article>
    </div> : (
      <>      <div className="centered-table">
        {addNewData(() => {
          setState({ ...state, newItem: {}, newModalVisible: true })
        })}
        {createTable(state.data, onEdit, onDelete)}
      </div>
        {state.modalVisible && editmodal(state.selectedItem, onEditSelectedItem, onCancel, onSave)}
        {state.newModalVisible && addModal(state.data.length + 1, onEditNew, onCancel, onSaveNew)}
      </>
    )
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


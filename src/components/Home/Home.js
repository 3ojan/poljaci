import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect, useSelector } from "react-redux";
import { addItem, customSetFetchedData, fetchData, setFetchedData } from '../../actions/apiQuestions';
import { setSelectedItem } from '../../actions/items';
import NewItem from './NewItem';

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

const deleteModal = (onCancel, item, onDelete) => {
  return (
    <div className="modal">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="field">
          <label className="label">Are you sure you want to delete ?</label>
          <div className="control">
            <input className="input" type="text" placeholder={item.id} disabled />
            <input className="input" type="text" placeholder={item.name} disabled />
            <input className="input" type="text" placeholder={item.email} disabled />
          </div>
        </div>
        <div className="field">
          <button className="button is-danger" onClick={() => { onDelete(item) }}>Delete</button>
          <button className="button is-warning" onClick={onCancel}>Cancel</button>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={onCancel}></button>
    </div>)
}

const addNewModalForm = (onSubmit, onCancel) => {
  return <NewItem onSubmit={onSubmit} onCancel={onCancel}></NewItem >
}

function Home(props) {
  const { fetchData, setSelectedItem, customSetFetchedData, addItem } = props;
  const loading = useSelector(state => state.fetchApi.loading);
  const fetchedData = useSelector(state => state.fetchApi.data);

  const [state, setState] = useState({ selectedItem: null, modalVisible: false, data: [], itemToDelete: null, newModalVisible: false })

  useEffect(() => {
    console.log(fetchedData)
    if (!fetchedData || fetchedData.length === 0) {
      fetchData();
    }
    return () => {
    };
  }, []);

  const onCancel = () => {
    setState({ ...state, deleteModalVisible: false, itemToDelete: null, newModalVisible: false });
  }
  const onSubmit = (values) => {
    addItem({
      ...values
    });
    onCancel();
  }


  const onDelete = (dataItem) => {
    setState({ ...state, deleteModalVisible: true, itemToDelete: dataItem });
  }
  const confirmDelete = (dataItem) => {
    const newData = fetchedData.filter(item => item.id !== dataItem.id);
    customSetFetchedData(newData)
    setState({ ...state, deleteModalVisible: false, itemToDelete: null });
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
    setSelectedItem(dataItem)
    props.history.push('/edit')
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
        {createTable(fetchedData, onEdit, onDelete)}
      </div>
        {state.deleteModalVisible && deleteModal(onCancel, state.itemToDelete, confirmDelete)}
        {state.newModalVisible && addNewModalForm(onSubmit, onCancel)}
      </>
    )
  );
}

const mapStateToProps = state => {
  const { editable } = state;
  return { editable: editable };
};

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchData(dispatch)),
  setSelectedItem: (item) => dispatch(setSelectedItem(item)),
  setFetchedData: (payload) => dispatch(setFetchedData(payload)),
  customSetFetchedData: (payload) => dispatch(customSetFetchedData(payload)),
  addItem: (payload) => dispatch(addItem(payload)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);


import React, { useEffect, useState } from 'react';
import { connect, useSelector } from "react-redux";
import { setFetchedData } from '../../actions/apiQuestions';
import { editSelectedItem, removeSelectedItem } from '../../actions/items';


function Edit(props) {

  const { edit, removeSelectedItem, setFetchedData } = props;
  const selectedItem = useSelector(state => { return state.editable.selectedItem });
  const fetchApi = useSelector(state => { return state.fetchApi });
  console.log(props)
  useEffect(() => {
    if (!selectedItem) {
      props.history.push('/')
    }
    return () => {
    };
  }, []);

  const onEditSelectedItem = (key, value) => {
    const _item = { ...selectedItem }
    _item[key] = value;
    edit(_item)
  }
  const onSave = (key, value) => {
    const { data } = fetchApi;
    const newData = data.filter(item => item.id !== selectedItem.id);
    newData.push(selectedItem);
    setFetchedData(newData)
    props.history.push('/')
  }

  const onCancel = () => {
    removeSelectedItem()
    props.history.push('/')
  }

  return (
    selectedItem ? (
      <>
        <div className="modal">
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="field">
              <label className="label">ID</label>
              <div className="control">
                <input className="input" type="text" placeholder={selectedItem.id} disabled />
              </div>
            </div>

            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input className="input" type="name" placeholder={selectedItem.name} onChange={(event) => { onEditSelectedItem("name", event.target.value) }} />
              </div>
            </div>

            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input className="input" type="name" placeholder={selectedItem.username} onChange={(event) => { onEditSelectedItem("username", event.target.value) }} />
              </div>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input className="input" type="name" placeholder={selectedItem.email} onChange={(event) => { onEditSelectedItem("email", event.target.value) }} />
              </div>
            </div>
            <div className="field">
              <button className="button is-success" onClick={onSave} >Save</button>
              <button className="button is-warning" onClick={onCancel} >Cancel</button>
            </div>
          </div>
          <button className="modal-close is-large" aria-label="close" onClick={onCancel} ></button>
        </div>
      </>
    ) : null
  );
}

const mapStateToProps = state => {
  const { editable, fetchApi } = state;
  return { editable: editable, fetchApi };
};

const mapDispatchToProps = dispatch => ({
  edit: (payload) => dispatch(editSelectedItem(payload)),
  removeSelectedItem: () => dispatch(removeSelectedItem()),
  setFetchedData: (payload) => dispatch(setFetchedData(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Edit);


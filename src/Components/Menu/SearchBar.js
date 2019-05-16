import React from 'react';
import { connect } from 'react-redux';
import updateSearchText from '../../Actions/updateSearchText';
import toggleSearchRoomForm from '../../Actions/toggleSearchRoomForm';

const handleChange = (dispatch, searchText, socket, e) => {
    e.preventDefault();
    if (searchText.length <= 16) {
        dispatch(updateSearchText(e.target.value));
        socket.emit('searchChatrooms', e.target.value.toLowerCase());
    }
}

const handleSubmit = (dispatch, searchText, socket, e) => {
    e.preventDefault();
    if ( searchText.length > 0 && searchText.length <= 16) {
        socket.emit('createChatroom', searchText);
        dispatch(toggleSearchRoomForm());
    }
}

const SearchBar = ({dispatch, socket, searchText}) => (
    <div className="icon-bar">
        <form onSubmit={(e) => handleSubmit(dispatch, searchText, socket, e)}>
            <input value={searchText} onChange={(e) => handleChange(dispatch, searchText, socket, e)} type="text" placeholder="Create / Search Room (Max 16 characters)"/>
        </form>
    </div>
)

const mapStateToProps = store => ({
    socket: store.socket,
    searchText: store.searchText
});

export default connect(mapStateToProps)(SearchBar)

/*<div className="icon-bar">
        <form >
            <input type="text" placeholder="Create / Search Room" required/>
        </form>
    </div> 
);*/
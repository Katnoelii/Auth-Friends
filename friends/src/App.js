import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import './App.css';
import Login from './components/Login'
import FriendsList from './components/FriendsList'
import PrivateRoute from './components/PrivateRoute'
import {FriendsContext} from './context/FriendsContext'
import {axiosWithAuth} from './utils/axiosWithAuth'
import AddFriend from './components/AddFriend'

function App() {
  const [friends,setFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFriends = () => {
    setLoading(true);
    axiosWithAuth()
      .get('/api/friends')
      .then((res) => {
        setFriends(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getFriends();
  },[])

  const postNewFriend = (friend) => {
		axiosWithAuth()
			.post("/api/friends", friend)
			.then((res) => {
				setFriends([]);
				getFriends();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const deleteFriend = (id) => {
		axiosWithAuth()
			.delete(`/api/friends/${id}`)
			.then((res) => {
				setFriends([]);
				getFriends();
			});
  };
  
  return (
    <Router>
      <FriendsContext.Provider
        value={{
          setFriends,
          getFriends,
          friends,
          loading,
          postNewFriend,
          deleteFriend
        }}
      >
        <div className='App'>
          <header className='header'>
            <Link className='nav' to='/'> Home </Link>
            <Link className='nav' to='/login'>Login</Link>
          </header>
        </div>
        <div className='mainContainer'>
          <Switch>
            <PrivateRoute path='/friends' component={FriendsList}/>
            <PrivateRoute path='/add-friend' component={AddFriend}/>
            <Route path='/login' component={Login}/>
            <Route exact path='/'>
              <h1>Hello!</h1>
            </Route>
          </Switch>
        </div>

      </FriendsContext.Provider>
    </Router>
  )
}

export default App;

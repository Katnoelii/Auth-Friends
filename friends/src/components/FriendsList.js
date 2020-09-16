import React, { useContext } from "react";
import Friends from "./Friends";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import { FriendsContext } from "../context/FriendsContext";

export default function FriendsList() {
	const history = useHistory();
	const { friends, deleteFriend, loading } = useContext(FriendsContext);

	const handleClick = () => {
		history.push("/add-friend");
	};
	return (
		<div className="friends-list">
			<h2>Your Friends</h2>
			<button onClick={handleClick}>Add a New Friend</button>
			<div className="friend-cards">
				{loading === true && <Loader type="Hearts" color="plum" height={150} width={150} />}
				{friends.map((friend) => (
					<Friends key={friend.id} friend={friend} deleteFriend={deleteFriend} />
				))}
			</div>
		</div>
	);
}
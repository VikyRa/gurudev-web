import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faUser } from "@fortawesome/free-solid-svg-icons";
import "./ChatCardsListing.css";


const ChatCardsListing = ({ friendsList }) => {
  console.log(friendsList);


  return (
    <div className="chat-cards-listing">
        <div className="card">
            <div className="img-container">
                <img src="https://thumbs.dreamstime.com/b/profile-icon-male-avatar-portrait-casual-person-silhouette-face-flat-design-vector-46846325.jpg" alt='image'/>

            </div>
            <div className="card-detail">
                <h4 className="title">
                    Brajesh
                </h4>
                <p className="desc"> 
                    Hi Avi
                </p>
            </div>
            <div className="time">10:20 Pm</div>
            <div className="action-btn">
                <FontAwesomeIcon icon={faChevronDown}/>
            </div>
        </div>
    </div>
  );
};

export default ChatCardsListing;

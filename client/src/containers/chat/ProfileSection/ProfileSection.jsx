import { useContext } from 'react';
import './ProfileSection.css'
// import AuthContext from './../../context/AuthContext';

const ProfileSection = ({handleLogout}) => {
    // const userObj = useContext(AuthContext);
    // const { profileImg, name } = userObj;
    return (
        <div className="profile-section">
            <div className="img-container">
                <img alt="image" src='https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/templates/social/reactt-dark_1200x628.png' />
            </div>
            {/* {name} */}Brajesh
            <div className="action-items" onClick={handleLogout}>
                Logout
            </div>
        </div>
    )
}

export default ProfileSection;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bannerlist, getSingleAstrologer, servicelist, updateastrologeraction } from '../../actions';
import Layout from '../../components/Layout';
import Banner from '../../components/UI/Banner';
import { gernateImages } from '../../urlConfig';
import { Carousel } from '../../components/UI/Carousel';
import { mallLlist, homebloglist } from '../../actions';
import reviewlist from '../../actions/page/homeactions';
import { Link } from 'react-router-dom';
import './profile.css';
import { Commonpage } from '../../components/UI/commonpage';
import { Redirect } from 'react-router';
import DatePicker from 'react-date-picker';
import { useAlert } from 'react-alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
* @author
* @function UserProfile
**/

export const AstrologerProfile = (props) => {
   const dispatch = useDispatch();
   const alert = useAlert
   const {user,role} = useSelector((state) => state.auth);

   const { isUpdated, userdata, error, message, loading } = useSelector((state) => state.updateastrologer);

   //   SET STATE CODE START
   const [firstname, setFirstname] = useState('');
   const [lastname, setLastname] = useState('');
   const [email, setEmail] = useState('');
   const [mobile, setMobile] = useState('');
   const [password, setPassword] = useState('');
   const [cpassword, setCpssword] = useState('');
   const [astro_gender, setAstro_gender] = useState('');
   const [alt_mobile, setAlt_mobile] = useState('');
   const [per_hours_charge, setPer_hours_charge] = useState('');
   const [astro_profilePicture, setAstro_profilePicture] = useState('');
   const [dob, setDob] = useState('');
   const [problem_area, setProblem_area] = useState('');
   const [primary_skills, setPrimary_skills] = useState('');
   const [all_skills, setAll_skills] = useState('');
   const [language, setLanguage] = useState('');
   const [experience, setExperience] = useState('');
   const [contribute_hours, setContribute_hours] = useState('');
   const [working_another_platform, setWorking_another_platform] = useState('');
   const [main_source_income, setMain_source_income] = useState('');
   const [onboard_queston, setOnboard_queston] = useState('');
   const [address, setAddress] = useState('');
   const [city, setCity] = useState('');
   const [long_bio, setLong_bio] = useState('');
   const [contact_person_name, setContact_person_name] = useState('');
   const [contact_person_mobile, setContact_person_mobile] = useState('');


   // SET STATE CODE STOP

   const [dropvalue, setDropvalue] = useState('');
   // error validation
   const [userError, setUserError] = useState({});




   // GET EDIT DATA CODE START
   useEffect(() => {

      if (isUpdated) {
         setFirstname(userdata.first_name);
         setLastname(userdata.last_name);
         setEmail(userdata.email);
         setMobile(userdata.mobile);
         setAstro_gender(userdata.gender);
         setAlt_mobile(userdata.alt_mobile)
         setPer_hours_charge(userdata.per_hours_charge)
         setDob(userdata.dob)
         setProblem_area(userdata.problem_area)
         setPrimary_skills(userdata.primary_skills)
         setAll_skills(userdata.all_skills)
         setLanguage(userdata.language)
         setExperience(userdata.experience)
         setContribute_hours(userdata.contribute_hours)
         setWorking_another_platform(userdata.working_another_platform)
         setMain_source_income(userdata.main_source_income)
         setOnboard_queston(userdata.onboard_queston)
         setAddress(userdata.address)
         setCity(userdata.city)
         setLong_bio(userdata.long_bio)
         setContact_person_name(userdata.contact_person_name)
         setContact_person_mobile(userdata.contact_person_mobile)

      }else{
         setFirstname(user.first_name);
         setLastname(user.last_name);
         setEmail(user.email);
         setMobile(user.mobile);
         setAstro_gender(user.gender);
         setAlt_mobile(user.alt_mobile)
         setPer_hours_charge(user.per_hours_charge)
         setDob(user.dob)
         setProblem_area(user.problem_area)
         setPrimary_skills(user.primary_skills)
         setAll_skills(user.all_skills)
         setLanguage(user.language)
         setExperience(user.experience)
         setContribute_hours(user.contribute_hours)
         setWorking_another_platform(user.working_another_platform)
         setMain_source_income(user.main_source_income)
         setOnboard_queston(user.onboard_queston)
         setAddress(user.address)
         setCity(user.city)
         setLong_bio(user.long_bio)
         setContact_person_name(user.contact_person_name)
         setContact_person_mobile(user.contact_person_mobile)
      }
   }, [dispatch, error, message, loading,isUpdated]);

   if(isUpdated){
      toast.success('🦄 Wow so easy!', {
         position: "top-right",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         });
   }

   const updateuserForm = (e) => {
      e.preventDefault();
      // return true;

      const submitdata = {
         first_name: firstname,
         last_name: lastname,
         email: email,
         mobile: mobile,
         gender: astro_gender,
         alt_mobile: alt_mobile,
         per_hours_charge: per_hours_charge,
         profilePicture: astro_profilePicture,
         dob: dob,
         problem_area: problem_area,
         primary_skills: primary_skills,
         all_skills: all_skills,
         language: language,
         experience: experience,
         contribute_hours: contribute_hours,
         working_another_platform: working_another_platform,
         main_source_income: main_source_income,
         onboard_queston: onboard_queston,
         address: address,
         city: city,
         long_bio: long_bio,
         contact_person_name: contact_person_name,
         contact_person_mobile: contact_person_mobile
      }
      dispatch(updateastrologeraction(user._id, submitdata));
      // updateastrologeraction(userId,submitdata)


   }


   // if (role === 'user') {
   //    return <Redirect to='/' />
   // }



   return (
      <Layout title={`Astrologer Account`}>

         <div className="astro-reg pt-5 pb-5">
            <div className="container">
               <form method="post" onSubmit={updateuserForm}>
                  <div className="row shadow p-3">
                     <div className="col-12 text-center mb-4">
                        <h2>Astrologer Update Profile</h2>
                     </div>
                     <div className="col-md-4 mb-3">
                        <label>First Name <span>&#42;</span> :</label>
                        <input type="text" className="form-control" value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="First Name" />
                     </div>
                     <div className="col-md-4 mb-3">
                        <label>Last Name <span>&#42;</span> :</label>
                        <input type="text" className="form-control" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="Last Name" />
                     </div>
                     <div className="col-md-4 mb-3">
                        <label>Email <span>&#42;</span> :</label>
                        <input type="email" className="form-control" placeholder="Google Login" value={email} onChange={(e) => setEmail(e.target.value)} />
                     </div>
                     <div className="col-md-4 mb-3">
                        <label>Mobile No. <span>&#42;</span> :</label>
                        <input type="tel" className="form-control" placeholder="+91-xxxx-xxx-xxx" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                     </div>
                     <div className="col-md-4 mb-3">
                        <label>Alternate No. <span>&#42;</span> :</label>
                        <input type="tel" className="form-control" placeholder="+91-xxxx-xxx-xxx" value={alt_mobile ? alt_mobile : null} onChange={(e) => setAlt_mobile(e.target.value)} />
                     </div>
                     <div className="col-md-4 mb-3">
                        <label>Gender <span>&#42;</span> :</label>
                        <select type="select" className="form-control" value={astro_gender ? astro_gender : null} onChange={(e) => setAstro_gender(e.target.value)}>
                           <option>Select Gender</option>
                           <option value="male">Male</option>
                           <option value="female">Female</option>
                           <option value="other">Other</option>
                        </select>
                     </div>
                     <div className="col-md-4 mb-3">
                        <label>Date of Birth <span>&#42;</span> :</label>
                        <input type='date' className="form-control" value={dob ? dob : new Date()} onChange={(e) => setDob(e.target.value)}
                        />
                        
                     </div>

                     <div className="col-md-4 mb-3">
                        <label>Problem Area <span>&#42;</span> :</label>
                        <input type="text" className="form-control" placeholder="Select Your Problem Area" value={problem_area ? problem_area : null} onChange={(e) => setProblem_area(e.target.value)} />
                     </div>
                     <div className="col-md-4 mb-3">
                        <label>Primary Skills <span>&#42;</span> :</label>
                        <input type="text" className="form-control" placeholder="Select Your Skill" value={primary_skills ? primary_skills : null} onChange={(e) => setPrimary_skills(e.target.value)} />
                     </div>
                     <div className="col-md-4 mb-3">
                        <label>All Skills <span>&#42;</span> :</label>
                        <input type="text" className="form-control" placeholder="Select Your Skill" value={all_skills ? all_skills : null} onChange={(e) => setAll_skills(e.target.value)} />
                     </div>
                     <div className="col-md-4 mb-3">
                        <label>Language <span>&#42;</span> :</label>
                        <input type="text" className="form-control" placeholder="Select Your Language" value={language ? language : null} onChange={(e) => setLanguage(e.target.value)} />
                     </div>
                     <div className="col-md-4 mb-3">
                        <label>Experience <span>&#42;</span> :</label>
                        <select type="select" className="form-control" value={experience ? experience : null} onChange={(e) => setExperience(e.target.value)}>
                           <option>Select Experience</option>

                           <option value='1'>1 Year</option>
                           <option value='2'>2 Year</option>
                           <option value='3'>3 Year</option>
                           <option value='4'>4 Year</option>
                           <option value='5'>5 Year</option>
                           <option value='6'>6 Year</option>
                           <option value='7'>7 Year</option>
                           <option value='8'>8 Year</option>
                           <option value='9'>9 Year</option>
                           <option value='10'>10 Year</option>
                           <option value='11'>11 Year</option>
                           <option value='12'>12 Year</option>
                        </select>
                     </div>
                     <div className="col-md-4 mb-3">
                        <label>How many hours can you contribute daily to Astrotalk? <span>&#42;</span> :</label>
                        <select type="select" className="form-control" value={contribute_hours ? contribute_hours : null} onChange={(e) => setContribute_hours(e.target.value)}>
                           <option>Select Daily Hours</option>
                           <option value='1'>1 Hour</option>
                           <option value='2'>2 Hour</option>
                           <option value='3'>3 Hour</option>
                           <option value='4'>4 Hour</option>
                           <option value='5'>5 Hour</option>
                           <option value='6'>6 Hour</option>
                           <option value='7'>7 Hour</option>
                           <option value='8'>8 Hour</option>
                        </select>
                     </div>
                     <div className="col-md-4 mb-3">
                        <label className="d-block">Are You Working on Any Other Online Platform ? <span>&#42;</span></label>

                        <select type="select" className="form-control" value={working_another_platform ? working_another_platform : null} onChange={(e) => setWorking_another_platform(e.target.value)}>
                           <option value=''>Please select</option>
                           <option value='yes'>Yes</option>
                           <option value='no'>No</option>
                        </select>
                     </div>
                     <div className="col-md-4 mb-3">
                        <label>Whats's Your Main Source of Income ? <span>&#42;</span></label>
                        <input type="text" className="form-control" placeholder="Main Source of Income" value={main_source_income ? main_source_income : null} onChange={(e) => setMain_source_income(e.target.value)} />
                     </div>

                     <div className="col-md-12 mb-3">
                        <label>Why Do You Think We Should Onboard You ? <span>&#42;</span></label>
                        <input type="text" className="form-control" placeholder="Why do you think we should onboard you " value={onboard_queston ? onboard_queston : null} onChange={(e) => setOnboard_queston(e.target.value)} />
                     </div>
                     <div className="col-md-4 mb-3">
                        <label>Complete Address <span>&#42;</span></label>
                        <input type="text" className="form-control" placeholder="Address" value={address ? address : null} onChange={(e) => setAddress(e.target.value)} />
                     </div>
                     <div className="col-md-4 mb-3">
                        <label>City <span>&#42;</span></label>
                        <input type="text" className="form-control" placeholder="City" value={city ? city : null} onChange={(e) => setCity(e.target.value)} />
                     </div>
                     <div className="col-md-4 mb-3">
                        <label>Profile Pic <span>&#42;</span> (jpg, png, jpeg only)</label>
                        <input type="file" className="form-control" placeholder="" />
                     </div>
                     <div className="col-md-4 mb-3">
                        <label>Upload ID Proof  <span style={{ fontSize: '10px', color: 'red' }}>(if indian upload aadhar card and pan card)</span></label>
                        <input type="file" className="form-control" placeholder="" />
                     </div>
                     <div className="col-md-4 mb-3">
                        <label>Emergency Contact Person Name <span>&#42;</span></label>
                        <input type="text" className="form-control" placeholder="Person Name" value={contact_person_name ? contact_person_name : null} onChange={(e) => setContact_person_name(e.target.value)} />
                     </div>
                     <div className="col-md-4 mb-3">
                        <label>Emergency Contact Person Mobile No. <span>&#42;</span></label>
                        <input type="tel" className="form-control" placeholder="Person Mobile No." value={contact_person_mobile ? contact_person_mobile : null} onChange={(e) => setContact_person_mobile(e.target.value)} />
                     </div>

                     <div className="col-md-12 mb-3">
                        <label>Long Bio <span>&#42;</span> (maximum 1000 characters)</label>
                        <textarea className="form-control" placeholder="Long Bio" rows="5" value={long_bio ? long_bio : null} onChange={(e) => setLong_bio(e.target.value)} ></textarea>
                     </div>


                     <div className="col-12 text-center">
                        <button className="btn btn-md btn-danger">Submit</button>
                     </div>
                  </div>
               </form>
            </div>
         </div>

      </Layout>
   )
}

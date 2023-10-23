import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/profile.css";
import background from "./images/robo.jpg";

function EditProfile() {
  const navigate = useNavigate();
  const [userdetails, setuserdetails] = useState({
    firstname: "",
    lastname: "",
    role: "",
    aboutu: "",
    avatar: "",
    email: "",
  });

  const [usercard, setusercard] = useState({
    firstname: "",
    lastname: "",
    role: "",
    aboutu: "",
    avatar: "",
    email: "",
  });

  const avatarOptions = [
    "https://bootdey.com/img/Content/avatar/avatar1.png",
    "https://bootdey.com/img/Content/avatar/avatar2.png",
    "https://bootdey.com/img/Content/avatar/avatar3.png",
    "https://bootdey.com/img/Content/avatar/avatar4.png",
    "https://bootdey.com/img/Content/avatar/avatar5.png",
    "https://bootdey.com/img/Content/avatar/avatar6.png",
    "https://bootdey.com/img/Content/avatar/avatar7.png",
    "https://bootdey.com/img/Content/avatar/avatar8.png",
  ];

  const handleAvatarSelect = (event) => {
    const selectedAvatarUrl = event.target.value;
    setuserdetails({ ...userdetails, avatar: selectedAvatarUrl });
  };

  // Load user details from local storage when the component mounts
  useEffect(() => {
    const savedUserDetails = JSON.parse(localStorage.getItem("userdetails"));

    if (savedUserDetails) {
      setuserdetails(savedUserDetails);
      setusercard(savedUserDetails);
    }
  }, []);

  const [showDetailsSavedAlert, setShowDetailsSavedAlert] = useState(false);
  const [showUnauthorizedAccessAlert, setshowUnauthorizedAccessAlert] =
    useState(false);
  const [formValid, setFormValid] = useState(true);

  const [Email, setEmail] = useState("");

  useEffect(() => {
    if (userdetails.role !== "") {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [userdetails.role]);

  // Load user details from local storage when the component mounts
  useEffect(() => {
    const savedUserEmail = JSON.parse(localStorage.getItem("userEmail"));

    if (savedUserEmail) {
      setEmail(savedUserEmail);
      setuserdetails({ ...userdetails, email: savedUserEmail });
      console.log(userdetails.email);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/editprofile/",
        userdetails
      );
      const data = response.data;
      console.log(data + "hjk");
      if (data === "Information saved Sucessfully!!") {
        setShowDetailsSavedAlert(true);
        setusercard({
          ...usercard,
          firstname: userdetails.firstname,
          lastname: userdetails.lastname,
          role: userdetails.role,
          aboutu: userdetails.aboutu,
          avatar: userdetails.avatar,
          email: Email,
        });
        // Save user details to local storage
        localStorage.setItem("userdetails", JSON.stringify(userdetails));
      } else if (data.name === "AxiosError") {
        setshowUnauthorizedAccessAlert(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        paddingBlock: "50px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div
        className="container"
        style={{ minHeight: "100vh", backgroundAttachment: "fixed" }}
      >
        <div className="content-header">
          <div className="container">
            <div className="row mb-2" style={{ paddingTop: "50px" }}>
              <div className="col-lg-7 col-md-7 col-sm-12">
                <h1
                  className="fs24 page-header-title"
                  style={{
                    textAlign: "left",
                    color: "#FFFFFF",
                    margin: "0px 0px 8px",
                    opacity: 0.8,
                    borderColor: "grey",
                  }}
                >
                  Edit Profile
                </h1>
                <p className="m-0 mb-3 fs16 page-header-desc fs20">
                  <br />
                </p>
              </div>
              <div className="col-lg-5 col-md-5 col-sm-12 mb-1">
                <div className="img-boxes">
                  <div className="card-container">
                    <div className="content">
                      <div className="card">
                        <div className="firstinfo">
                          <img src={usercard.avatar} />
                          <div className="profileinfo">
                            <h1>
                              {usercard.firstname + " " + usercard.lastname}
                            </h1>
                            <h3>{usercard.role}</h3>
                            <p className="bio">{usercard.aboutu}</p>
                          </div>
                        </div>
                      </div>
                      <div className="badgescard">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1.5em"
                          viewBox="0 0 512 512"
                          fill="#96e0e9"
                        >
                          <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                        </svg>
                        <small style={{ paddingLeft: "12px" }}>
                          {usercard.email}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="main"
          style={{ paddingTop: "30px" }}
          onSubmit={handleSubmit}
        >
          <div className="container mt-4">
            <div className="row">
              <div className="col-md-6">
                <form
                  action="/users/edit_profile"
                  id="UserEditProfileForm"
                  method="post"
                  acceptCharset="utf-8"
                >
                  <div style={{ display: "none" }}>
                    <input type="hidden" name="_method" value="POST" />
                  </div>
                  <div
                    className="card"
                    style={{
                      minHeight: "300px",
                      width: "100%",
                      backgroundColor: "rgba(255, 255, 255, 0.6)",
                    }}
                  >
                    <div className="card-body">
                      <div className="row">
                        <div
                          className="col-md-12"
                          style={{ color: "#182359D9", margin: "0px 0px 8px" }}
                        >
                          <div
                            className="form-group"
                            style={{
                              textAlign: "left",
                              fontSize: "20px",
                              paddingTop: "20px",
                              paddingBottom: "10px",
                            }}
                          >
                            <label style={{ paddingBottom: "10px" }}>
                              First Name
                            </label>
                            <input
                              value={userdetails.firstname}
                              type="name"
                              onChange={(e) => {
                                setuserdetails({
                                  ...userdetails,
                                  firstname: e.target.value,
                                });
                              }}
                              placeholder="First name"
                              className="form-control"
                              required="required"
                              style={{
                                paddingBottom: "10px",
                                paddingTop: "10px",
                              }}
                            />
                          </div>
                          <div
                            className="form-group"
                            style={{
                              textAlign: "left",
                              fontSize: "20px",
                              paddingTop: "20px",
                              paddingBottom: "20px",
                            }}
                          >
                            <label style={{ paddingBottom: "10px" }}>
                              Last Name
                            </label>
                            <input
                              value={userdetails.lastname}
                              type="name"
                              onChange={(e) => {
                                setuserdetails({
                                  ...userdetails,
                                  lastname: e.target.value,
                                });
                              }}
                              placeholder="Last name"
                              className="form-control"
                              required="required"
                              style={{
                                paddingBottom: "10px",
                                paddingTop: "10px",
                              }}
                            />
                          </div>
                          <div
                            className="form-group"
                            style={{
                              textAlign: "left",
                              fontSize: "20px",
                              paddingTop: "20px",
                              paddingBottom: "10px",
                            }}
                          >
                            <label style={{ paddingBottom: "10px" }}>
                              Role
                            </label>
                            <select
                              className="form-control"
                              value={userdetails.role} // Bind the selected value to the state
                              required="required"
                              onChange={(e) => {
                                setuserdetails({
                                  ...userdetails,
                                  role: e.target.value,
                                });
                              }}
                            >
                              <option value="">Role</option>{" "}
                              {/* Default option */}
                              <option value="undergraduate">
                                Undergraduate
                              </option>
                              <option value="postgraduate">Postgraduate</option>
                            </select>
                          </div>

                          <div
                            className="form-group"
                            style={{
                              textAlign: "left",
                              fontSize: "20px",
                              paddingTop: "20px",
                              paddingBottom: "20px",
                            }}
                          >
                            <label style={{ paddingBottom: "10px" }}>
                              Avatar
                            </label>
                            <select
                              className="form-control"
                              value={userdetails.avatar} // Bind the selected value to the state
                              onChange={handleAvatarSelect}
                            >
                              <option value="https://www.bootdey.com/img/default-avatar.png">
                                Default avatar
                              </option>{" "}
                              {/* Default option */}
                              {avatarOptions.map((avatarUrl, index) => (
                                <option key={index} value={avatarUrl}>
                                  Avatar {index + 1}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div
                            className="form-group"
                            style={{
                              textAlign: "left",
                              fontSize: "20px",
                              paddingTop: "20px",
                              paddingBottom: "10px",
                            }}
                          >
                            <label style={{ paddingBottom: "10px" }}>
                              About You
                            </label>
                            <textarea
                              value={userdetails.aboutu}
                              onChange={(e) => {
                                setuserdetails({
                                  ...userdetails,
                                  aboutu: e.target.value,
                                });
                              }}
                              className="form-control"
                              required="required"
                              placeholder="About you"
                              cols="30"
                              rows="5"
                              id="UserDescription"
                              spellCheck="false"
                              style={{ height: "150px" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="card-footer"
                      style={{
                        textAlign: "left",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                      }}
                    >
                      <button
                        className="btn icon-btn-save btn-info btn-fill"
                        type="submit"
                        disabled={formValid}
                        style={{
                          fontSize: "18px",
                          padding: "8px 25px",
                          color: "#FFF",
                          backgroundColor: "#86D4F5",
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edited details saved Alert */}
      <div
        className={`modal modal-message modal-success fade ${
          showDetailsSavedAlert ? "show" : ""
        }`}
        tabIndex="-1"
        role="dialog"
        style={{ display: showDetailsSavedAlert ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                class="bi bi-check-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
            </div>
            <div className="modal-title">
              <strong>Success</strong>
            </div>
            <div className="modal-body d-flex flex-column align-items-center">
              The data has been saved correctly
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  setShowDetailsSavedAlert(false);
                  if (showDetailsSavedAlert) {
                    navigate("../bot");
                  }
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        {/*Bad Credentials Alert Modal */}
        <div
          className={`modal modal-message modal-danger fade ${
            showUnauthorizedAccessAlert ? "show" : ""
          }`}
          tabIndex="-1"
          role="dialog"
          style={{ display: showUnauthorizedAccessAlert ? "block" : "none" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  class="bi bi-fire center-svg"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
                </svg>
              </div>
              <div className="modal-title">
                <b>Error!</b>
              </div>
              <div className="modal-body d-flex flex-column align-items-center">
                Bad Credentials. First, Sign up.
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setshowUnauthorizedAccessAlert(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;

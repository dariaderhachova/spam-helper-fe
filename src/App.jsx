import React, { useEffect, useState } from "react"

function App() {
  const [data, setData] = useState([])
  const [updateData, setUpdateData] = useState(false)
  const [modalMode, setModalMode] = useState("add")
  const [id, setId] = useState(-1)
  const [lastName, setLastName] = useState("")
  const [firstName, setFirstName] = useState("")
  const [middleName, setMiddleName] = useState(null)
  const [emailAddress, setEmailAddress] = useState("")
  const [subject, setSubject] = useState("")
  const [text, setText] = useState("")
  const [emailContent, setEmailContent] = useState(null)
  const [showTextArea, setShowTextArea] = useState(false)
  const emailContentList = [
    "Discover the best deals on e-books! Dive into a world of reading with our limited-time discounts on top titles.",
    "Join our loyalty program today and earn rewards with every purchase! Don't miss out on exclusive member benefits.",
    "Upgrade your tech game with our latest gadgets and accessories. Shop now for the latest tech innovations at unbeatable prices!",
    "Plan your dream getaway with our vacation packages! Book now and enjoy special discounts on your next adventure.",
  ]
  useEffect(() => {
    fetch("http://localhost:3000/data")
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setData(data)
      })
  }, [updateData])

  return (
    <section className="container col pt-4 d-flex flex-column gap-2">
      <button
        className="btn btn-secondary btn-light border btn-md w-50 mx-auto"
        onClick={() => setUpdateData(!updateData)}
      >
        Update
      </button>
      <button
        className="btn btn-primary btn-md w-50 mx-auto"
        data-bs-toggle="modal"
        data-bs-target="#modal"
        onClick={() => {
          setModalMode("add")
        }}
      >
        Add user
      </button>
      <section className="container col pt-4 d-flex flex-row justify-content-between">
        <div className="container row pt-4 gap-2 align-items-center">
          {data.length ? (
            <table className="table table-striped table-hover border">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">First name</th>
                  <th scope="col">Middle name</th>
                  <th scope="col">Last name</th>
                  <th scope="col">Email address</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => {
                  return (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.first_name}</td>
                      <td>{row.middle_name || "-"}</td>
                      <td>{row.last_name}</td>
                      <td>{row.email_address}</td>
                      <td>
                        <button
                          className="btn btn-warning mx-2 btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#modal"
                          onClick={() => {
                            setModalMode("edit")
                            setId(row.id)
                            setLastName(row.last_name)
                            setFirstName(row.first_name)
                            setMiddleName(row.middle_name || null)
                            setEmailAddress(row.email_address)
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger mx-2 btn-sm"
                          onClick={() => {
                            fetch(`http://localhost:3000/data/${row.id}`, {
                              method: "DELETE",
                              headers: {
                                "Content-Type": "application/json",
                              },
                            })
                              .then(() => {
                                setTimeout(() => {
                                  setUpdateData(!updateData)
                                }, 1000)
                              })
                              .catch((e) => {
                                alert("Error" + e.message)
                              })
                          }}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-primary mx-2 btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#modal"
                          onClick={() => {
                            setId(row.id)
                            setLastName(row.last_name)
                            setFirstName(row.first_name)
                            setMiddleName(row.middle_name || null)
                            setEmailAddress(row.email_address)
                            setModalMode("mail")
                            setShowTextArea(false)
                          }}
                        >
                          Send mail
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <h2 className="mx-auto text-center">No users</h2>
          )}
          <div className="modal fade" tabIndex={-1} id="modal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {modalMode === 1
                      ? "Edit user"
                      : modalMode === "add"
                      ? "Add user"
                      : "Send email to user"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {modalMode !== "mail" ? (
                    <form id="userForm">
                      <label htmlFor="lastNameInput" className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastNameInput"
                        required
                        value={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value)
                        }}
                      />
                      <label htmlFor="firstNameInput" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstNameInput"
                        required
                        value={firstName}
                        onChange={(e) => {
                          setFirstName(e.target.value)
                        }}
                      />
                      <label htmlFor="middleNameInput" className="form-label">
                        Middle name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="middleNameInput"
                        value={middleName || ""}
                        onChange={(e) => {
                          setMiddleName(e.target.value)
                        }}
                      />
                      <label htmlFor="emailAddressInput" className="form-label">
                        Email address
                      </label>
                      <input
                        type="emailAddress"
                        className="form-control"
                        id="emailAddressInput"
                        value={emailAddress}
                        onChange={(e) => {
                          setEmailAddress(e.target.value)
                        }}
                        required
                      />
                    </form>
                  ) : (
                    <form id="userForm">
                      <label htmlFor="emailAddressInput" className="form-label">
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="emailAddressInput"
                        value={emailAddress}
                        onChange={(e) => {
                          setEmailAddress(e.target.value)
                        }}
                        required
                      />
                      <label htmlFor="subjectInput" className="form-label">
                        Subject
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="subjectInput"
                        required
                        value={subject}
                        onChange={(e) => {
                          setSubject(e.target.value)
                        }}
                      />
                      <label htmlFor="textInput" className="form-label">
                        Text
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="textInput"
                        value={text || ""}
                        onChange={(e) => {
                          setText(e.target.value)
                        }}
                      />
                      <label htmlFor="emailContentSelect">Email content</label>
                      <select
                        id="emailContentSelect"
                        className="form-select"
                        aria-label="Select email content"
                        onChange={(e) => {
                          setShowTextArea(true)
                          setEmailContent(
                            emailContentList[e.target.value - 2] || ""
                          )
                        }}
                        defaultValue={0}
                      >
                        <option value="0" disabled>
                          Choose the content
                        </option>
                        <option value={1}>- Custom content -</option>
                        {emailContentList.map((item, index) => {
                          return (
                            <option key={index + 2} value={index + 2}>
                              {item.split(" ").slice(0, 4).join(" ")} ...
                            </option>
                          )
                        })}
                      </select>
                      {showTextArea && (
                        <textarea
                          className="form-control mt-4"
                          value={emailContent}
                          onChange={(e) => {
                            setEmailContent(e.target.value)
                          }}
                        ></textarea>
                      )}
                    </form>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    className={`btn btn-primary`}
                    type="submit"
                    form="userForm"
                    disabled={!showTextArea && modalMode === "mail"}
                    onClick={async (e) => {
                      e.preventDefault()
                      if (
                        !/^[\w-\.\d-_]+@([\w-]+\.)+[\w-]{2,4}$/.test(
                          emailAddress
                        ) ||
                        !firstName.length ||
                        !lastName.length
                      ) {
                        alert("Incorrect data!")
                        return
                      }
                      fetch(
                        modalMode === "edit"
                          ? `http://localhost:3000/data/${id}`
                          : modalMode === "add"
                          ? `http://localhost:3000/data`
                          : `http://localhost:3000/sendMail`,
                        {
                          method: modalMode === "edit" ? "PUT" : "POST",
                          body:
                            modalMode === "edit" || modalMode === "add"
                              ? JSON.stringify({
                                  last_name: `${lastName}`,
                                  first_name: `${firstName}`,
                                  middle_name: middleName
                                    ? `${middleName}`
                                    : null,
                                  email_address: `${emailAddress}`,
                                })
                              : JSON.stringify({
                                  to: `${emailAddress}`,
                                  subject: `${subject}`,
                                  text: `${text}`,
                                  html: `<p>${emailContent}</p>`,
                                }),
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }
                      )
                        .then((res) => {
                          res.json().then((result) => {
                            if (
                              res.status < 200 ||
                              res.status > 299 ||
                              (modalMode !== "mail" && !result.affectedRows)
                            ) {
                              alert(
                                "Error! Rows affected: " + result.affectedRows
                              )
                            } else {
                              setTimeout(() => {
                                setUpdateData(!updateData)
                              }, 1000)
                            }
                          })
                        })
                        .catch((e) => {
                          alert("Error!\n" + e.message)
                        })
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default App


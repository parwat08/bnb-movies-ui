import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import Select from "react-select";
import { withFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { addMovie } from "./actions";
import { fetchCinemas } from "../Cinemas/actions";

class MovieForm extends Component {
  // const { selectedOption } = this.props.selectedOption

  constructor(props) {
    super(props);
    this.state = {
      selectedCinemas: {}
    };
  }

  componentDidMount() {
    this.props.fetchCinemas();
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleCinemaCheck = (event, cineID) => {
    let { name, value } = event.target;
    this.setState(
      {
        selectedCinemas: {
          ...this.state.selectedCinemas,
          [cineID]: ["MOCK"]
        }
      },
      () => {
        console.log("state", this.state);
      }
    );
  };

  handleShowCheck = (event, cineID, show) => {
    let { name, value } = event;
    console.log("ss", this.state, cineID);
    this.setState({
      selectedCinemas: {
        // ...this.state.selectedCinemas,
        [cineID]: [this.state.selectedCinemas[cineID], show]
      }
    });
  };

  render() {
    const {
      values,
      touched,
      errors,
      dirty,
      isSubmitting,
      handleChange,
      setFieldValue,
      handleBlur,
      handleSubmit,
      handleReset,
      cinemas
    } = this.props;

    return (
      <Form className="p-5 width-50-center" onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="text"
            name="name"
            id="examplename"
            placeholder="Name of the movie"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.name &&
              touched.name &&
              "is-invalid"}`}
          />
          {errors.name &&
            touched.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
        </FormGroup>
        <FormGroup>
          <Input
            type="textarea"
            name="description"
            id="examplePassword"
            placeholder="Description of movie"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.description &&
              touched.description &&
              "is-invalid"}`}
          />
          {errors.description &&
            touched.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
        </FormGroup>
        <FormGroup>
          <Input
            type="number"
            name="price"
            id="exampleText"
            placeholder="Ticket price of movie"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.price &&
              touched.price &&
              "is-invalid"}`}
          />
          {errors.price &&
            touched.price && (
              <div className="invalid-feedback">{errors.price}</div>
            )}
        </FormGroup>
        <FormGroup>
          <Input
            type="date"
            name="date"
            id="examplePassword"
            placeholder="Release date of movie"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.date &&
              touched.date &&
              "is-invalid"}`}
          />
          {errors.date &&
            touched.date && (
              <div className="invalid-feedback">{errors.date}</div>
            )}
        </FormGroup>
        <FormGroup>
          <Input
            type="run_time"
            name="run_time"
            id="examplePassword"
            placeholder="Runtime of movie"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.run_time &&
              touched.run_time &&
              "is-invalid"}`}
          />
          {errors.run_time &&
            touched.run_time && (
              <div className="invalid-feedback">{errors.run_time}</div>
            )}
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="director"
            id="exampleText"
            placeholder="Director of movie"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.director &&
              touched.director &&
              "is-invalid"}`}
          />
          {errors.director &&
            touched.director && (
              <div className="invalid-feedback">{errors.director}</div>
            )}
        </FormGroup>
        <FormGroup>
          <Input
            type="textarea"
            name="cast"
            id="exampleText"
            placeholder="cast of movie"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.cast &&
              touched.cast &&
              "is-invalid"}`}
          />
          {errors.cast &&
            touched.cast && (
              <div className="invalid-feedback">{errors.cast}</div>
            )}
        </FormGroup>
        <FormGroup>
          <Input
            type="file"
            name="poster"
            id="file"
            onChange={event => {
              setFieldValue("poster", event.currentTarget.files[0]);
            }}
            // className={`form-control ${errors.poster &&
            //   touched.poster &&
            //   "is-invalid"}`}
          />
          {errors.poster &&
            touched.poster && (
              <div className="invalid-feedback">{errors.poster}</div>
            )}
        </FormGroup>
        <FormGroup>
          <Input
            type="url"
            name="trailer_link"
            id="exampleText"
            placeholder="Youtube movie link"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.trailer_link &&
              touched.trailer_link &&
              "is-invalid"}`}
          />
          {errors.trailer_link &&
            touched.trailer_link && (
              <div className="invalid-feedback">{errors.trailer_link}</div>
            )}
        </FormGroup>

        <FormGroup>
          <Label>Please select cinemas</Label>
          <fieldset
            style={{
              border: "3px solid"
            }}
          >
            {cinemas.map(cine => {
              let cineID = cine._id;
              return (
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      onClick={event => {
                        this.toggle();
                        this.handleCinemaCheck(event, cineID);
                      }}
                    />{" "}
                    {cine.name} - {cineID}
                    <Modal
                      isOpen={this.state.modal}
                      toggle={this.toggle}
                      className={this.props.className}
                    >
                      <ModalHeader toggle={this.toggle}>
                        Please select show timings for{" "}
                        <b>
                          {cine.name} - {cineID}
                        </b>
                      </ModalHeader>
                      <ModalBody>
                        {cineID}
                        <FormGroup check>
                          <Label check>
                            <Input
                              type="checkbox"
                              onClick={event => {
                                this.handleShowCheck(event, cineID, "9 AM");
                              }}
                            />{" "}
                            9 AM
                          </Label>
                        </FormGroup>{" "}
                        <FormGroup check>
                          <Label check>
                            <Input
                              type="checkbox"
                              onClick={event => {
                                this.handleShowCheck(event, cineID, "12 PM");
                              }}
                            />{" "}
                            12 PM
                          </Label>
                        </FormGroup>{" "}
                        <FormGroup check>
                          <Label check>
                            <Input
                              type="checkbox"
                              onClick={event => {
                                this.handleShowCheck(event, cineID, "3 PM");
                              }}
                            />{" "}
                            3 PM
                          </Label>
                        </FormGroup>{" "}
                        <FormGroup check>
                          <Label check>
                            <Input
                              type="checkbox"
                              onClick={event => {
                                this.handleShowCheck(event, cineID, "6 PM");
                              }}
                            />{" "}
                            6 PM
                          </Label>
                        </FormGroup>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>
                          OK
                        </Button>{" "}
                        <Button color="secondary" onClick={this.toggle}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </Label>
                </FormGroup>
              );
            })}
          </fieldset>
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

const EnhancedForm = withFormik({
  mapPropsToValues: props => {
    return {
      // email: props.user.email,
      // password: props.user.password,
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("name is required!"),
    description: Yup.string().required("description is required"),
    price: Yup.number().required("Please enter the price"),
    run_time: Yup.string().required("Please enter your run_time"),
    director: Yup.string().required("Please enter director of movie"),
    cast: Yup.string().required("Please enter cast of movie"),
    trailer_link: Yup.string().required(
      "Please enter the trailer link from youtube"
    )
    // gender: Yup.string().required("Please enter your gender")
  }),

  handleSubmit: (values, { props: { addMovie }, setSubmitting }) => {
    let formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }
    addMovie(formData);
  }
})(MovieForm);

const mapStateToProps = state => {
  return {
    cinemas: state.cinemas.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMovie: data => dispatch(addMovie(data)),
    fetchCinemas: () => dispatch(fetchCinemas())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnhancedForm);
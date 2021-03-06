import Link from "next/link";
import Image from "next/image";
import styles from "../styles/HomePage.module.css";
import truckImg from "../public/images/Truck-Instructions.png";
import truckShippingIcon from "../public/logos/Truck-mini-logo.svg";
import watchIcon from "../public/logos/watch-mini-logo.svg";
import settingsIcon from "../public/logos/setting-mini-logo.svg";
import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Button,
  Col,
  Row,
  ControlLabel,
  Card,
  FormLabel,
} from "react-bootstrap";
import LogoGrid from "./LogoGrid";
import { useState, useEffect } from "react";
import axios from "axios";
import router from "next/router";



const domain = process.env.NEXT_PUBLIC_API_DOMAIN_NAME;

const HomePage = () => {
  const [testimonials, setTestimonials] = useState(null);

  useEffect(async () => {
    await getTestimonials(setTestimonials);
  }, []);

  const imageUploadHandler = async (image) => {
    await imageUpload(image);
  };

  return (
    <>
      <div className={styles.bannerContainer}>
        <h1 className={styles.banner}>
          Common area to put the logo and other decals
        </h1>
      </div>
      <Container className={styles.container}>
        <Image
          src={truckImg}
          className={styles.truckImg}
          alt="Truck Sign Vinyl"
        ></Image>

      </Container>
      <LogoGrid />
      <div className={styles.uploadLogoContainer}>
        <h2 className={styles.uploadLogoHeader}>Have your own Logo?</h2>
        <p className={styles.uploadLogoPBold}>
          You can upload your own logo and order how many units you need
        </p>
        <p className={styles.uploadLogoP}>
          Just make sure to upload the correct file, PDF or AI are very well
          welcome!
        </p>


        <label for="uploadButton" className={styles.uploadButton}>
          UPLOAD NOW
        </label>

        <input
          id="uploadButton"
          type="file"
          hidden
          accept="image/png, image/jpeg"
          onChange={(e) => imageUploadHandler(e.target.files[0])}
        />

        <Row className={styles.cardRow}>
          <Col className={styles.cardCol} xs={12} sm={12} md={4} lg={4}>
            <Card className={styles.card}>
              <div className={styles.cardShippingIcon_div}>
                <Image
                  className={styles.cardShippingIcon}
                  src={truckShippingIcon}
                  alt="Truck Sign Vinyl Shipping Icon"
                  // height={70}
                  // width={70}
                  width="100%" height="100%" layout="responsive" objectFit="contain"
                />
              </div>
              <Card.Header className={styles.cardHeader}>
                Free Shipping Over $50
                <Card.Title className={styles.cardTitle}>
                  Order today and get the free shipping
                </Card.Title>
              </Card.Header>
              <Card.Body className={styles.cardBody}>
                <p>
                  Yes, 95% of all orders are produced and leave our facility the
                  same or next business day.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col className={styles.cardCol} xs={12} sm={12} md={4} lg={4}>
            <Card className={styles.card}>
              <div className={styles.cardIcon_div}>
                <Image
                  className={styles.cardIcon}
                  src={watchIcon}
                  alt="Truck Sign Vinyl Watch Icon"
                  height={50}
                  width={50}
                />
              </div>
              <Card.Header className={styles.cardHeader}>
                Same Day Production
                <Card.Title className={styles.cardTitle}>
                  Available on orders placed before 1:00 PM EST.
                </Card.Title>
              </Card.Header>
              <Card.Body className={styles.cardBody}>
                <p>
                  We send all orders by USP or FedEx next day production
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col className={styles.cardCol} xs={12} sm={12} md={4} lg={4}>
            <Card className={styles.card}>
              <div className={styles.cardIcon_div}>
                <Image
                  className={styles.cardIcon}
                  src={settingsIcon}
                  alt="Truck Sign Apply Vinyl Icon"
                  height={50}
                  width={50}
                />
              </div>
              <Card.Header className={styles.cardHeader}>
                Easy to Install
                <Card.Title className={styles.cardTitle}>
                  Achieve Professional Results
                </Card.Title>
              </Card.Header>
              <Card.Body className={styles.cardBody}>
                <p>
                  Apply our vinyl lettering yourself. Save money and get the
                  same professional results.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <Container className={styles.testimonialsContainer}>
        <h2 className={styles.testimonialsHeader}>Testimonials</h2>
        <p className={styles.testimonialsP}>Our satisfied client works</p>
      </Container>
      {testimonials == null ? (
        <></>
      ) : (
        <Row className={styles.testimonialsRow}>
          {testimonials.map((tes, index) => {
            return (
              <Col
                key={index}
                xs={12}
                sm={12}
                md={6}
                lg={6}
                className={styles.testimonialsCol}
              >
                <Container className={styles.testimonialsWrapper}>
                  <img
                    alt="Truck Sign Vinyl testimonial"
                    className={styles.testimonialsImg}
                    src={tes.image}
                  />
                  <div className={styles.testimonialsFooter}>
                    <p className={styles.testimonialsP}>{tes.text}</p>
                  </div>
                </Container>
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default HomePage;

const getTestimonials = (setTestimonials) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const testimonials_url = domain + "truck-signs/comments/";
  axios
    .get(testimonials_url, config)
    .then(async (res) => {
      const result = await res.data;
      setTestimonials(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

const imageUpload = async (image) => {
  const data = new FormData();

  data.append("image", image);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const upload_image_url = domain + "truck-signs/upload-customer-image/";

  axios
    .post(upload_image_url, data, config)
    .then(async (res) => {
      const result = await res.data["Result"];
      router.push(`/product/${result.id}/`);
    })
    .catch((error) => console.log(error));
};

import React from "react";
import { useHistory } from "react-router-dom";
import {
  Link,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  CssBaseline,
  Grid,
  makeStyles
} from "@material-ui/core";
import { Facebook, Instagram, WhatsApp } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    textAlign: "center",
    background: "#000",
    color: "#fff",
    zIndex: 99,
    position: "relative"
  },
  item: {
    justifyContent: "center",
    padding: theme.spacing(8, 1, 1, 1)
  },
  icons: {
    padding: theme.spacing(0.3)
  }
}));

const REFUND_TEXT =
  "Buyer may be entitled to a refund for prepaid Orders. Tomestry retains the right to retain the penalty payable by the Buyer from the amount refundable to him/her. The Buyer shall also be entitled to a refund of proportionate value in the event packaging of an item in an Order or the complete Order, is either tampered or damaged and the Buyer refuses to accept at the time of delivery for the said reason.Buyer may be entitled to a refund upto 100% of the Order value if PDP fails to deliver the Order due to a cause attributable to either PDP or Tomestry, however such refunds will be assessed on a case to case basis by Tomestry.Our decision on refunds shall be final and binding.All refund amounts shall be credited to Buyer’s account as may be stipulated as per the payment mechanism of Buyer’s, Payment Gateway generally take 5-7 Days of time to Credit your refund in your account.If your face any issue or there will any doubt related to refund policy you can contact us any time on our helpline.";
const Cancellation_Text =
"As a general rule Buyer shall not be entitled to cancel Order once placed. Buyer may choose to cancel Order only within one-minute of the Order being placed. However, subject to Buyer’s previous cancellation history, Tomestry reserves the right to deny any refund to Buyer pursuant to a cancellation initiated by Buyer even if the same is within one-minute followed by suspension of account, as may be necessary in the sole discretion of Tomestry. If Buyer cancels his/her Order after one minute of placing it, Tomestry shall have a right to collect a penalty of 100% of the Order amount for breach of contract terms as a compensation for the damages suffered by Tomestry, with a right to either not to refund the Order value in case Buyer’s Order is prepaid or recover from the Buyer’s subsequent Order in case his/her Order is postpaid, to compensate the Merchants and PDPs.";
const Dummy_Text =
"";
const PRICING_TEXT =
"Tomestry is a home food delivery company. we or tomestry always try to provide you your need at shop price only. our pricing structure follow the commission base work, we has listed all items on website are same as shop menu price and we use to deliver it same on shop price to you, on each order we get 20% of sale commission from shop end which is our gross profit.We never shows price on website by increasing rather than shop price.";
const Terms_Text =
"This is tomestry.com ,Home based food delivery company. we made a simple steps to use our services for you. There is one condition that you must have a mobile fone or PC where you can open your browser and open tomestry.com , when you will open tomestry.com on PC browser then it will open tomestry home page for you, then you need to signup your account via your mobile no. by passing otp verification process, and the order your food and our rider will delivery it to the address which you mention, and if you open tomestry.com in mobile browser then it will redirect you to the page where you will need to download tomestry application then try to order. for any doubts in terms which write mail to us on tomestrytomestry@gmail.com , tomestry.com@gmail.com";
const TERM_TEXT =
" Privacy Policy===> We i.e. Tomestry, are committed to protecting the privacy and security of your personal information. Your privacy is important to us and maintaining your trust is paramount. This privacy policy explains how we collect, use, process and disclose information about you. By using our website/ app/ platform and affiliated services, you consent to the terms of our privacy policy (“Privacy Policy”) in addition to our ‘Terms of Use.’ We encourage you to read this privacy policy to understand the collection, use, and disclosure of your information from time to time, to keep yourself updated with the changes and updates that we make to this policy.This privacy policy describes our privacy practices for all websites, products and services that are linked to it. However this policy does not apply to those affiliates and partners that have their own privacy policy. In such situations, we recommend that you read the privacy policy on the applicable site.Should you have any clarifications regarding this privacy policy, please write to us at tomestrytomestry@gmail.com , tomestry.com@gmail.com , 'the collection, storage and use of information related to you'===>We may automatically store certain information including but not limited to information about your web browser, IP address, cookies stored on your device and other information about you based upon your behaviour on the website. We use this information to do internal research on our users’ demographics, interests and behaviour to better understand, protect and serve our users. This information is compiled and analyzed on an aggregated basis. This information may include the URL that you just came from (whether this URL is on the website or not), which URL you next go to (whether this URL is on the website or not), your computer browser information, your IP address, and other information associated with your interaction with the website.We may also share your Mobile IP/Device IP with third party(ies) and to the best of our knowledge, be-life and representations given to us by these third party(ies) this information is not stored by them.We also collect and store personal information provided by you from time to time on the website/app. We only collect and use such information from you that we consider necessary for achieving a seamless, efficient and safe experience, customized to your needs including:To enable the provision of services opted by you; To communicate necessary account and product/service related information from time to time; To allow you to receive quality customer care services; To undertake necessary fraud and money laundering prevention checks, and comply with the highest security standards; To comply with applicable laws, rules and regulations; and To provide you with information and offers on products and services, on updates, on promotions, on related, affiliated or associated service providers and partners, that we believe would be of interest to you.   Where any service requested by you involves a third party, such information as is reasonably necessary by the Company to carry out your service request, may be shared with such third party.We also do use your contact information to send you notifications based on the tasks allotted to you and also based on your interests and prior activity. The Company may also use contact information internally to direct its efforts for product improvement, to contact you as a survey respondent, to notify you if you win any contest; and to send you promotional materials from its contest sponsors or advertisers.The Company will not use your financial information for any purpose other than to complete a transaction with you. Additionally, your information may be used to communicate with you, screen orders for potential risk or fraud, use of preferences related information for advertising purposes and site optimization. Blinkit reserves the right to change this policy from time to time. Any changes shall be effective immediately upon the posting of the revised Privacy Policy. We encourage you to periodically review this page for the latest information on our privacy practices.";

const ABOUT_TEXT =
  "This is Tomestry.com , We are a home food delivery company. We use to provide foods, green vegetables, tiffin services, grocery, cloth washing services and much more services. Also we work for Website and Android Development Works. Tomestry Official Email ===> tomestrytomestry@gmail.com , tomestry.com@gmail.com , HelpLine No. 8604850890 , 9161419412 , Official Address===> V.P Homes, Opposite to-BBD University, Faizabad Road, Lucknow, Uttar Pradesh(226028)";
const CONTACT_TEXT =
"Tomestry.com always here to help you. If you have any query related to tomestry ordering system then you can contact us any time, our offlicial email id ===>> tomestrytomestry@gmail.com , tomestry.com@gmail.com  HelpLine No. 8604850890 , 9161419412  Our Official Address:- V.P Homes, Opposite to-BBD University, Faizabad Road, Lucknow, Uttar Pradesh(226028) ,<====  We will be Happy to Help You.";  


export default props => {
    const [text, setText] = React.useState(null)
    const [showDialog, setShowDialog] = React.useState(false)
  const history = useHistory();
  const classes = useStyles();
  return (
    <CssBaseline>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={6} md={4} className={classes.item}>
            <Typography
              variant={"h5"}
              style={{ textDecoration: "underline", fontWeight: "bolder" }}
            >
              {" "}
              Quick Links
            </Typography>
            {/* <h4
              onClick={() => {
                history.push(":/");
              }}
            >
              Contact Us{" "} */}
            {/* </h4> */}

            <h4
              onClick={() => {
                history.push("/profile");
              }}
            >
              Profile{" "}
            </h4>
            <h4
              onClick={() => {
                history.push("/cart");
              }}
            >
              {" "}
              Cart{" "}
            </h4>
            <h4
              onClick={() => {
                history.push("/orderHistory");
              }}
            >
              {" "}
              OrderHistory
            </h4>
          </Grid>

          <Grid item xs={6} md={4} className={classes.item}>
            <Typography
              variant={"h5"}
              style={{ textDecoration: "underline", fontWeight: "bolder" }}
            >
              {" "}
              Disclaimer{" "}
            </Typography>
            <h4 onClick={()=> {
                setText("CONTACT US")
                setShowDialog(true)
            }}> Contact Us</h4>
            <h4 onClick={()=> {
                setText("PRIVACY POLICY")
                setShowDialog(true)
            }}> Privacy Policy</h4>
            <h4 onClick={()=> {
                setText("Cancellation")
                setShowDialog(true)
            }}> Cancellation Policy</h4>
            <h4 onClick={()=> {
                setText("OUR PRICING")
                setShowDialog(true)
            }}> Our Pricing</h4>
            <h4 onClick={()=>{
                setText("REFUND")
                setShowDialog(true)
            }}> Refund Policy</h4>
            <h4 onClick={()=> {
                setText("Terms")
                setShowDialog(true)
            }}> Terms</h4>
            <h4 onClick={() => {
                setText("ABOUT US")
                setShowDialog(true)
            }}> About Us </h4>
          </Grid>
          <Grid item xs={12} md={4} className={classes.item}>
            <Typography> Connect with us+</Typography>
            <Facebook
              fontSize={"large"}
              className={classes.icons}
              onClick={() =>
                (window.location = "https://www.facebook.com/tomestry.foodie/")
              }
            />
            <Instagram
              fontSize={"large"}
              className={classes.icons}
              onClick={() =>
                (window.location = "https://instagram.com/Tomestry_Foodie/")
              }
            />
            <WhatsApp
              fontSize={"large"}
              className={classes.icons}
              onClick={() => (window.location = "https://wa.me/918604850890")}
            />
          </Grid>
        </Grid>
        <small>
          <Link to={"/"}>Tomestry.com</Link>
        </small>
        <Dialog
          open={showDialog}
          disableBackdropClick={false}
          fullWidth={true}
          maxWidth={"sm"}
        >
          <DialogTitle> {text }</DialogTitle>
          <DialogContent>
          <Typography variant={"subtitle2"}>
              {text === "ABOUT US"? ABOUT_TEXT : Dummy_Text }
              {/* {text === "Cancellation"? Cancellation_Text : ABOUT_TEXT} */}
          </Typography>
          <Typography variant={"subtitle2"}>
              {text === "REFUND"? REFUND_TEXT : Dummy_Text }
              {/* {text === "Cancellation"? Cancellation_Text : ABOUT_TEXT} */}
          </Typography>
          <Typography variant={"subtitle2"}>
              {text === "Cancellation"? Cancellation_Text : Dummy_Text }
              {/* {text === "Cancellation"? Cancellation_Text : ABOUT_TEXT} */}
          </Typography>
          <Typography variant={"subtitle2"}>
              {text === "PRIVACY POLICY"? TERM_TEXT : Dummy_Text }
              {/* {text === "Cancellation"? Cancellation_Text : ABOUT_TEXT} */}
          </Typography>
           <Typography variant={"subtitle2"}>
              {text === "Terms"? Terms_Text : Dummy_Text }
              {/* {text === "Cancellation"? Cancellation_Text : ABOUT_TEXT} */}
          </Typography>
          <Typography variant={"subtitle2"}>
              {text === "CONTACT US"? CONTACT_TEXT : Dummy_Text }
              {/* {text === "Cancellation"? Cancellation_Text : ABOUT_TEXT} */}
          </Typography>
          <Typography variant={"subtitle2"}>
              {text === "OUR PRICING"? PRICING_TEXT : Dummy_Text }
              {/* {text === "Cancellation"? Cancellation_Text : ABOUT_TEXT} */}
          </Typography>

          </DialogContent>
          <DialogActions>
            <Button
              variant={"contained"}
              color={"primary"}
              onClick={() => setShowDialog(false)}
            >
            Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </CssBaseline>
  );
};

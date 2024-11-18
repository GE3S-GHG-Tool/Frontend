import { Box, Modal, Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import "./TermsModal.css";

const TermsModal = ({ isTermsOpen, onClose, onCancel, onAgree }) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const contentRef = useRef(null);

  const handleScroll = (e) => {
    if (contentRef.current) {
      const element = e.target;
      const reachedBottom =
        Math.abs(element.scrollHeight - element.clientHeight - element.scrollTop) < 5;
      setIsButtonEnabled(reachedBottom);
    }
  };

  useEffect(() => {
    if (isTermsOpen) {
      setIsButtonEnabled(false); // Reset the button state when the modal opens
    }
  }, [isTermsOpen]);

  return (
    <Modal
      open={isTermsOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          //   width: 400,
          backgroundColor: "#fff",
          // border: "2px solid #000",
          boxShadow: 24,
          padding: "3rem",
          width: "70vw",
          maxHeight: "85vh",
          height: "100%",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          // alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "1.6rem",
            fontFamily: "Inter",
            color: "#000",
          }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Privacy Policy
        </Typography>

        <Box
          className="terms-color"
          ref={contentRef}
          onScroll={handleScroll}
          sx={{
            flexGrow: 1,
            backgroundColor: "#f7f7f7",
            p: 1.5,
            borderRadius: "12px",
            overflow: "auto",
          }}
        >
          {/* <p className="terms-heading">1. Introduction</p>
          <p className="terms-para">
            Welcome to [Emission Web App Name], an application designed to
            assist users in calculating and reporting greenhouse gas (GHG)
            emissions. By accessing or using this app, you agree to comply with
            and be bound by the following terms and conditions. If you do not
            agree with these terms, you must not use the app.
          </p>
          <p className="terms-heading">2. Eligibility</p>
          <p className="terms-para">
            The app is intended for use by individuals or organizations involved
            in GHG emissions reporting or management. Users must be at least 18
            years old to create an account and use the app. By agreeing to these
            terms, you confirm that you meet this age requirement
          </p>

          <p className="terms-heading">3. User Responsibilities</p>
          <p className="terms-para">As a user of the app, you agree to:</p>

          <ul className="terms-list">
            <li>
              Provide accurate and up-to-date information when using the app.
            </li>
            <li>
              Use the app for lawful purposes related to emissions calculations
              and reporting.
            </li>
            <li>Keep your login credentials secure and confidential.</li>
            <li>
              Notify us immediately of any unauthorized use of your account.
            </li>
          </ul> */}
          <p className="terms-para">
            Please read the following Terms of Use (“Terms of Use” or “Terms”)
            of Green House Gas (GHG) Inventory Tool (“this GHG Tool”).
          </p>
          <p className="terms-para">
            Please read the Terms carefully before logging in this GHG Tool
            and/or accessing this GHG Tool and/or Services and/or using the
            Services in any manner whatsoever. This GHG Tool is owned and
            operated by the Company, i.e., Global Energy and Environmental
            Engineering Services (“GE3S”/ “Company”/ "we,"/"us," or "our").By
            accessing or using the GHG Tool, you agree to comply with and be
            bound by these Terms. IF YOU DO NOT AGREE TO THESE TERMS, YOU MUST
            NOT USE THIS GHG TOOL.
          </p>

          <p className="terms-para">
            You will be bound by the Terms of Use set forth herein and the
            Privacy Policy available here [Link of Privacy Policy]. These Terms
            of Use and the Privacy Policy constitute a valid and legally binding
            arrangement between You and GE3S.
          </p>

          <p className="terms-para">
            By logging in and/or accessing the GHG Tool and/or Services and/or
            using the GHG Tool, and/or Services You agree to be bound by these
            Terms, the Privacy Policy including any additional guidelines,
            policies and future modifications, amendments, enhancements,
            deletions/reductions in the Services and/or this GHG Tool. 
          </p>

          <p className="terms-para">
            If You find any of these Terms or any provisions of the Privacy
            Policy unacceptable, do not tender Your acceptance to use this GHG
            Tool or any of its Features or Services then do not access or use
            this GHG Tool, it’s Feature and/or Services. Your use of this GHG
            Tool, it’s features and/or Services shall be treated as your
            acceptance of these Terms. You acknowledge that we are providing You
            with a revocable, limited, non-exclusive, and non-transferable
            license to use this GHG Tool, it’s Features and Services.  
          </p>

          <p className="terms-para">
            If You leave a Service/webpage of this GHG Tool and visit a website,
            app or other digital property operated by a third party, we, at GE3S
            cannot be held responsible or liable in any manner whatsoever, for
            the protection and privacy of any information that you provide while
            visiting such third-party services. Accordingly, please exercise
            caution and review the Privacy Policy for more information.
          </p>

          <p className="terms-para">
            [This document is an electronic record. This electronic record is
            generated by a computer system and does not require any physical or
            digital signatures.]
          </p>

          <p className="terms-para">
            When You use this GHG Tool, You will be subject to these Terms of
            Use. We may update these Terms of Use from time to time and you
            shall keep yourself updated about such amendments. Please ensure You
            read the following Terms of Use and any updated version when You use
            and/or access this GHG Tool and/or it's any Features or Services.
          </p>

          <p className="terms-heading">1. Interpretation</p>
          <p className="terms-para">
            The words of which the initial letter is capitalized have meanings
            defined under the following definitions. The following definitions
            shall have the same meaning regardless of whether they appear in
            singular or in plural.
          </p>
          <p className="terms-heading">2. Definitions</p>
          <p className="terms-para">
            2.1 "Tool" refers to the Sustainability Rating Tool provided by the
            Company, including but not limited to any software, applications,
            and associated services.
          </p>
          <p className="terms-para">
            2.2 "Services" refers to all functionalities, features, and
            operations provided by the Company through the Sustainability Rating
            Tool
          </p>
          <p className="terms-para">
            2.3 "Data Protection Legislation" means any and all data protection
            and privacy legislation in force from time to time in those parts of
            the world in which the parties operate and/or Process Personal Data
            (either directly or through a third party) including but not limited
            to the Turkish law on the protection of personal data, the General
            Data Protection Regulation (EU) 2016/679, The California Consumer
            Privacy Act of 2018 (CCPA), and any legislation and/ or regulation
            which amends, replaces, re-enacts or consolidates any of them;
          </p>

          <p className="terms-para">
            2.4 "Information" includes:
            <ul className="terms-list">
              <li>
                Personal Information: Details such as email address used for
                account management and report delivery. This information is not
                shared with third parties, except as needed for Tool operation
                and in line with this Privacy Policy.
              </li>
              <li>
                Non-Personal Programmatic Information: Data about your program’s
                focus and sustainability characteristics used to generate and
                analyze reports.
              </li>
              <li>
                Non-Personal Statistical Information: Data on site traffic and
                usage patterns used to improve the Tool’s performance.
              </li>
            </ul>
          </p>

          <p className="terms-heading">3. Information Collection</p>
          <p className="terms-para">
            We collects and processes information as follows:
          </p>
          <p className="terms-para">
            3.1 Personal Information
            <ul className="terms-list">
              <li>
                Details for creating and managing your account, such as
                usernames, user IDs, passwords, and authentication credentials.
              </li>
              <li>
                Personal details such as your name, email address, phone number,
                company name, and company address.
              </li>
              <li>
                Payment details, billing addresses, and transaction history, if
                applicable.
              </li>
              <li>
                Information about your device, IP address, browser type,
                operating system, device identifiers, and usage patterns.
                Personal information may include email addresses and other
                details provided voluntarily during the registration process or
                through interactions with the Tool.M
              </li>
              <li>
                Personal information is used to create and manage secure user
                accounts, deliver system-generated sustainability reports, and
                provide related functionalities. This information is stored on
                secure servers and is used solely by us and its authorized
                service providers for the operation of the Tool. We do not sell,
                rent, or share your personal information with third parties for
                their business purposes.
              </li>
            </ul>
          </p>

          <p className="terms-para">
            3.2 Non-Personal Programmatic Information
            <ul className="terms-list">
              <li>
                Non-personal programmatic information includes data such as the
                focus of your program, level of implementation, and
                sustainability characteristics.
              </li>
              <li>
                Non-personal programmatic information includes data such as the
                focus of your program, level of implementation, and
                sustainability characteristics.
              </li>
            </ul>
          </p>

          <p className="terms-para">
            3.3 Non-Personal Statistical Information
            <ul className="terms-list">
              <li>
                Non-personal statistical information includes site traffic,
                usage patterns, and other data collected in real-time.
              </li>
              <li>
                This information is used to measure site activity, improve
                website structure and performance, and enhance user experience.
                Statistical data helps us understand user interests and optimize
                the Tool accordingly.
              </li>
            </ul>
          </p>

          <p className="terms-heading">4. Use of Information</p>

          <p className="terms-para">
            4.1 The data collected is primarily used to provide the services you
            have subscribed to, enhance and improve those services, and
            facilitate the development of new services. Additionally, your data
            may be utilized for broader purposes such as publication, aimed at
            benefiting businesses, society, and governments by fostering
            innovation, informed decision-making, and overall growth. We ensure
            that any such use of data is carried out in compliance with
            applicable legal standards and data protection principles.
          </p>

          <p className="terms-para">
            4.2 Data processing is conducted in compliance with Data Protection
            legislation, including but not limited to the Data Protection
            Legislation. We use artificial intelligence (AI) for data
            extraction, and in some cases, this involves the use of services
            provided by third parties such as OPENAI. By choosing to use our
            services that involve AI-driven extraction, you expressly consent to
            the use of OPENAI for this purpose. By doing so, you also agree to
            be bound by OPENAI’s Terms and Conditions. If You do not wish to
            agree to OpenAI Terms and Conditions, in that case You may still use
            the Tool without OPENAI features and services in the Tool.
          </p>

          <p className="terms-para">
            4.3 We may use the your username, user ID, password, and email
            address. This information is used to:
            <ul className="terms-list">
              <li>Create and manage user accounts.</li>
              <li>
                Facilitate the login process and ensure secure access to the
                Tool.
              </li>
              <li>
                Deliver system-generated reports and provide account-related
                notifications.
              </li>
              <li>
                Personal data is stored on secured servers and is used
                exclusively for the purposes stated above. It is not shared with
                third parties except as required for the operation of the Tool
                and in compliance with this Privacy Policy.
              </li>
              <li>Deletion of the data from the Tool.</li>
            </ul>
          </p>

          <p className="terms-para">
            4.4 We may use the information such as company details, sector
            selections, annual revenue ranges, sustainability report data,
            energy bills, and emission reports. This data is used to:
            <ul className="terms-list">
              <li>
                Generate and update sustainability index assessments and
                sector-specific KPIs.
              </li>
              <li>
                Assess the overall sustainability score of a company and
                create/modify/update the said reports.
              </li>
              <li>
                Aggregated and de-identified programmatic data may be used for
                research and analysis to improve the Tool's functionalities and
                effectiveness.
              </li>
            </ul>
          </p>

          <p className="terms-para">
            4.5 We may use the statistical information which Includes data on
            site traffic and usage patterns. This information is used to:
            <ul className="terms-list">
              <li>
                Analyze site performance and user interactions with the Tool.M
              </li>
              <li>
                Enhance user experience by improving site structure,
                functionality, and interface.
              </li>
              <li>
                Make data-driven decisions for future updates and enhancements
                to the Tool.
              </li>
              <li>
                This data collected and stored shall be used to improve the
                performance and reliability of the Tool.
              </li>
            </ul>
          </p>

          <p className="terms-heading">5. International Data Transfers</p>

          <p className="terms-para">
            <ul className="terms-list">
              <li>
                In operating this Tool, your information may be transferred
                globally, including to countries or territories outside of where
                it was initially collected. This includes transfers to locations
                that might not have equivalent data protection standards.
              </li>
              <li>
                For example If you are located in the EEA zone, your personal
                data may be transferred to countries outside the EEA. These
                transfers are safeguarded by mechanisms such as EU Standard
                Contractual Clauses or adequacy decisions by the European
                Commission.
              </li>
              <li>
                We implement appropriate security measures to protect your data
                during international transfers, in line with applicable Data
                Protection Legislations.
              </li>
              <li>
                Our service providers, located in countries including the MENA
                region, EEA, Switzerland, the USA, Canada, India, and Australia,
                also adhere to stringent data protection standards.
              </li>
              <li>
                We implement appropriate technical and organizational measures
                to protect your personal information from unauthorized access,
                alteration, disclosure, or destruction. Your data is stored on
                secure servers and access is restricted to authorized personnel
                only.
              </li>
              <li>
                We retain personal/non personal, statical and programmatic data
                only for as long as necessary to fulfil the purposes for which
                it was collected, including providing services to You such as
                account management, report generation, and compliance with legal
                obligations.
              </li>
              <li>
                You have the right to access, correct, or update your personal
                information. You may also request the deletion of your data,
                subject to applicable legal requirements and operational
                constraints.
              </li>
              <li>
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with an updated effective date. We
                encourage you to review this Privacy Policy periodically to stay
                informed about our data practices.
              </li>
            </ul>
          </p>

          <p className="terms-heading">6. JURISDICTION AND GOVERNING LAW</p>

          <p className="terms-para">
            <ul className="terms-list">
              <li>
                This Tool is operated by GE3S from its headquarters at Office
                115, Incubator Building, Masdar City, Abu Dhabi, United Arab
                Emirates. These Terms of Use, and any disputes arising out of or
                relating to them, shall be governed by and construed in
                accordance with the laws of the United Arab Emirates(UAE).
              </li>
              <li>
                You irrevocably consent to the exclusive jurisdiction of the
                competent courts located in Abu Dhabi, United Arab Emirates, for
                any legal action arising out of or relating to these Terms of
                Use or your use of the Tool. You waive any objection to the
                jurisdiction of such courts on grounds of venue, forum
                non-convenient, or any similar grounds.
              </li>
              <li>
                We recognize that it is possible for you to access the Tool from
                any jurisdiction in the world and we, to the possible extent
                comply with the laws of the particular jurisdictions in which
                they operate. However, If any material on this Tool, or your use
                of the Tool, is contrary to the laws of the place where you are
                when you access it, the Tool is not intended for you, and we ask
                you not to use this Tool. You are responsible for informing
                yourself of the laws of your jurisdiction and complying with
                them.
              </li>
            </ul>
          </p>

          <p className="terms-para">
            We reserve the right, at our complete discretion, to change these
            terms and conditions at any time by posting revised terms on the
            Tool. It is your responsibility to check periodically for any
            changes we may make to these terms and conditions. Your continued
            use of this Tool following the posting of changes to these terms or
            other policies means you accept the changes.
          </p>

          <div className="terms-heading">
            7. If You have any questions about this Privacy Policy, or have any
            grievance arising from the use of this Tool, please contact us at
            the details set forth below:
          </div>

          <p className="terms-para">
            <ul className="terms-list">
              <li>Email: legal@ge3s.in</li>
              <li>Phone: [*]</li>
              <li>
                Postal Address: Office 115, Incubator Building, Masdar City, Abu
                Dhabi, United Arab Emirates
              </li>
            </ul>
          </p>

          <p className="terms-para">
            Upon receiving Your questions/feedbacks/grievance, we will review
            Your questions/feedbacks/grievance. By contacting us, You agree to
            provide all necessary information to facilitate the resolution of
            Your questions/feedbacks/grievance
          </p>
        </Box>

        <Box
          className="terms-btn_div"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <button
            className="terms-cancel_btn"
            onClick={() => {
              onCancel();
              onClose();
            }}
          >
            Cancel
          </button>
          <button
            className="terms-accept_btn"
            onClick={() => {
              onAgree();
              onClose();
            }}
            disabled={!isButtonEnabled} 
          >
            I have read and accept the terms of services
          </button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TermsModal;

import { Collapse } from 'antd';
import React, { Component } from 'react';

export default class Consent extends Component {
  render() {
    return (
      <div>
        <h1>FAQ</h1>
        <h3>Website</h3>
        <Collapse>
          <Collapse.Panel
            header="Where can I find out how to use the features in ViDeX?"
            key="1"
          >
            <p>
              You can click on the "Start Tour" button to see how the different
              features work.
            </p>
          </Collapse.Panel>
          <Collapse.Panel
            header="I am not able to export my annotations to OneNote. What could be the issue?"
            key="2"
          >
            <p>
              This may be due to your Microsoft account not permitting the ViDeX
              app to send information to your OneNote Notebook. You can manage
              the permissions for the application{' '}
              <a href="https://account.live.com/consent/Manage">here</a>.
            </p>
          </Collapse.Panel>
          <Collapse.Panel
            header="Can I use my UBC Office 365 account (@ubc365.onmicrosoft.com) to export to OneNote?"
            key="3"
          >
            <p>
              The UBC Office 365 accounts do not support our Export to OneNote
              feature. As an alternative, you can export your annotations using
              the "Export to PDF" option.
            </p>
          </Collapse.Panel>
          <Collapse.Panel header="Can I run ViDeX on my iPad?" key="4">
            <p>
              At the moment we do not support iPad but we are working on making
              ViDeX available to them in the future. You can still use ViDeX on
              your Mac devices.
            </p>
          </Collapse.Panel>
          <Collapse.Panel
            header="I am not able to register for my course, what should I do?"
            key="5"
          >
            <p>
              The app may have failed to recognize the registration token.
              Please try again, ensuring there is no spaces or extra characters
              in the registration token when you paste it. You can also try
              registering by pasting the registration link (e.g.
              https://videx.ece.ubc.ca/?token=token_name) directly into the
              address bar. This link is also shared with you by the instructor.
            </p>
          </Collapse.Panel>
          <Collapse.Panel
            header="I am facing problems using the application. What should I do?"
            key="6"
          >
            <p>
              If you experience minor bugs with the applications, please use our
              Online Feedback form (located at the footer) to inform us of the
              issue. Describe the issue that you faced along with information
              about what Browser and Operating System you were using when the
              issue occured. We aim to solve all problems within 1 day. In the
              rare case that the issue is serious and it prevents you from
              accessing and studying your course videos, please email
              negarmh@mail.ubc.ca to receive an alternative link to the videos.
            </p>
          </Collapse.Panel>
          <Collapse.Panel
            header="What browsers does ViDeX support? Are there any recommended browsers?"
            key="7"
          >
            <p>
              We support all the major browsers on all operating systems. For
              the best ViDeX experience we recommend students use Google Chrome.
            </p>
          </Collapse.Panel>
        </Collapse>
        <br />
        <h3>Data</h3>
        <Collapse>
          <Collapse.Panel header="What data about me is saved?" key="1">
            <p>
              ViDeX is an online video viewing software. To record your
              interactions with the system, your usage data needs to be stored
              in a database that records what actions participants took at what
              times. The events logged include typical activities associated
              with watching video, e.g., playing, stopping, pausing, fast
              forwarding, rewinding, jumping to specific time in the video, etc,
              and also events specific to ViDeX, including highlighting and note
              taking. System events, such as when you sign in and out of ViDeX,
              will also be logged.
            </p>
          </Collapse.Panel>
          <Collapse.Panel
            header="Can the instructor see how I watch the course videos?"
            key="2"
          >
            <p>
              The collected data, which will have no personally identifiable
              information, will be password protected, and encrypted. Course
              instructors will have no knowledge of participants’ identities,
              but will have access to class data as a whole that is aggregated.
              Only the principal and co-investigators will have access to this
              anonymized data and ensure the UBC policies concerning privacy and
              confidentiality issues are fully met.
            </p>
          </Collapse.Panel>
          <Collapse.Panel
            header="Why are you collecting this data? What is my data used for?"
            key="3"
          >
            <p>
              The database will allow us to record the interactions between many
              participants and ViDeX simultaneously. This allows us to deploy
              the system to many individuals and collect much more data than
              what would be possible in a lab based study. The database will be
              used by the research team to conduct an exploratory data analysis
              to identify patterns of use, annotation, and navigation of the
              instructional videos. By logging usage data, we can explore
              hypotheses that were not thought of a priori.
            </p>
          </Collapse.Panel>
          <Collapse.Panel
            header="What data is shared with Microsoft? What is it used for?"
            key="4"
          >
            <p>
              There are two types of data we collect. Your main user data is
              your bookmarks, tags, highlights, notes and any other data you
              create while using ViDeX. The other type of data is the telemetry
              data ii.e. play, pause and use of Microsoft video services. Both
              types of data are anonymized, without any personally-identifiable
              information and encrypted. The user data is electronically
              transferred to a password protected database which is stored on a
              Microsoft server in Toronto, Canada. Only the research team and
              Microsoft development team will have access to the contents of the
              database. The telemetry data is used by Microsoft to debug and
              analyze service usage of the underlying services we use to support
              ViDeX. Microsoft may process this data in the United States.
              Microsoft may use this information to provide and improve the
              application, including commercial versions of the services and
              application which Microsoft develops and distributes to customers.
            </p>
          </Collapse.Panel>
          <Collapse.Panel
            header="Is my ViDeX data linked to my course performance? Will my ViDeX data affect my course grade?"
            key="5"
          >
            <p>
              Not at all. Neither instructors nor the investigators have access
              to any identifiable data from you, so linking your ViDeX data to
              your course performance is not possible.
            </p>
          </Collapse.Panel>
          <Collapse.Panel header="For how long will my data be saved?" key="6">
            <p>
              All user data will be stored on an encrypted, password protected
              hard drive accessible by the Principle Investigators’ office for a
              period of 5 years.
            </p>
          </Collapse.Panel>
        </Collapse>
        <br />
        <h3>Research</h3>
        <Collapse>
          <Collapse.Panel header="What is the goal of this research?" key="1">
            <p>
              The goal of this study is to evaluate how post-secondary students
              watch instructional videos using an online video viewer, called
              ViDeX. Students’ use of ViDeX will be anonymously logged. The log
              data will then be analyzed to explore how different features of
              ViDeX, such as highlighting, tagging and note taking, are used in
              support of active learning. Overall, this project is identifying
              video needs of students and instructors, and evaluating solution
              approaches from pedagogical, usability, and technological
              perspectives, towards more strategic, effective, and active
              learning from video.
            </p>
          </Collapse.Panel>
          <Collapse.Panel header="Who is conducting this research?" key="2">
            <p>
              The study will be conducted by the Principal Investigator, Dr.
              Sidney Fels, and the Co-Investigators Dr. Negar M. Harandi, Dr.
              Ido Roll, Dr. Dongwook Yoon, Samuel Dodson who is a PhD student,
              and Matthew Fong who is a PhD student. This is a collaborative
              research partnership with Microsoft and UBC. For seeing the
              updated list of investigators, please check
              videx.ece.ubc.ca\research.
            </p>
          </Collapse.Panel>
          <Collapse.Panel header="Who is funding this research?" key="3">
            <p>
              This research is supported in part by a Teaching and Learning
              Enhancement Fund from the University of British Columbia, the
              Natural Sciences and Engineering Research Council of Canada, and
              Microsoft.
            </p>
          </Collapse.Panel>

          <Collapse.Panel
            header="Why can I only opt-out after the class is over if I want to use ViDeX?"
            key="4"
          >
            <p>
              ViDeX allows students to have a new learning experience with
              video. To support the features, we need to keep track of your
              bookmarks, highlights, tags and notes. Thus, if you don’t want to
              participate in the experiment, but still want to use ViDeX, we
              need to store that data. However, once you are finished using
              ViDeX, then we can delete all your data from the database so it
              will not be used in the experiment. Thus, this is why we need to
              have the opt-out after the class to make sure you can still use
              ViDeX.
            </p>
          </Collapse.Panel>
          <Collapse.Panel
            header="How will my participation help improve student learning?"
            key="5"
          >
            <p>
              We are seeking to find better ways that students and instructors
              can use video in the classroom. Your participation provides
              valuable insights about how you are using video and which features
              you would like to have to improve your video learning experience.
              We are using ViDeX at UBC, so future students will directly
              benefit from your suggestions and the insights we get from seeing
              how you use ViDeX. We also publish internationally on these
              results, thus, students and instructors will benefit from a deeper
              understanding of how video interfaces could support learning
              better. Finally, as we are partners with Microsoft, the results
              from this study may influence the direction that future products
              may take to provide better learning experiences for a global
              audience.
            </p>
          </Collapse.Panel>
          <Collapse.Panel
            header="How can I find out more about the research?"
            key="6"
          >
            <p>
              The research website for ViDeX, videx.ece.ubc.ca\research,
              includes more information about the research. You are welcome to
              email us at videx@ece.ubc.ca for more information.
            </p>
          </Collapse.Panel>
          <Collapse.Panel
            header="How can I get involved with the research?"
            key="7"
          >
            <p>
              We are constantly looking for student participants to join our
              design and evaluation studies. We also accept applications from
              new graduate students to join our research and development group.
              Please email us at videx@ece.ubc.ca to inquire about possible
              opportunities.
            </p>
          </Collapse.Panel>
        </Collapse>
      </div>
    );
  }
}

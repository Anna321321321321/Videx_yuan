import React, { Component } from 'react';
import { h1, p, span } from './styles';

export default class Consent extends Component {
  render() {
    return (
      <div>
        <style jsx>{h1}</style>
        <style jsx>{p}</style>
        <style jsx>{span}</style>
        <h1>Consent Form</h1>
        <p>
          An Investigation of a ViDeX Interface in OneNote to Provide Video
          Experience for Learning
        </p>
        <p>
          Dr. Sidney Fels, Principal Investigator, ssfels@ece.ubc.ca, (604)
          822-5338
        </p>
        <p>
          <span>Who will participate in the study? </span>
          The study is intended for UBC students who are 18 years of age or
          older. If you are younger than that, please note that fact to the
          Principal Investigator or a Co-Investigator, because UBC may then have
          additional obligations with regard to your data or need to impose
          requirements for participation in the study.
        </p>
        <p>
          <span>Who is conducting the study? </span>
          The study will be conducted by the Principal Investigator, Dr. Sidney
          Fels, and the Co-Investigators Dr. Negar M. Harandi, Dr. Ido Roll,
          Samuel Dodson who is a PhD student, and Matthew Fong who is a PhD
          student. Course instructors will have no knowledge of participants’
          identities, but will have access to data after final grades are
          submitted and the course is over. This is a collaborative research
          partnership with Microsoft and UBC.
        </p>
        <p>
          <span>Why are we doing this study? </span>
          This study is being conducted in order to gain an understanding of how
          post-secondary students interact with instructional videos using an
          online video viewer, called ViDeX.
        </p>
        <p>
          <span>How is the study done? </span>
          You are invited to participate in the study by using ViDeX to watch,
          navigate, and annotate videos that have been assigned by your
          instructor. Data about your video usage patterns, such as what parts
          you watch, what you highlight, tag, and take notes on, what parts of
          any videos are rewatched and any feedback you have about ViDeX will be
          collected by UBC. Your use of ViDeX will be anonymously logged and the
          contents of your notes will be anonymized. The log data will then be
          analyzed by UBC to explore how different features of ViDeX, such as
          highlighting, note taking and tagging, are used in support of active
          learning. While the time to participate varies by course, we expect
          that you will spend 30–60 minutes using ViDeX throughout the semester.
          There is no compensation for or obligation to complete the study, and
          there will be no impact on your class standing if you choose not to
          participate. Your participation will be kept confidential from course
          instructors, and only after final grades are submitted and the course
          is over, will course instructors have access to the aggregated data.
        </p>
        <p>
          <span>What will happen to the study results? </span>
          The results of your interactions with the viewing system will be
          reported without any reference to you specifically. Regardless of
          whether you complete the study or not, all information that you
          provide will be treated confidentially. No names will be attached to
          the computer recording or files. UBC will store data on an encrypted,
          password protected hard drive that is kept in a locked cabinet in the
          Principle Investigators’ office for a period of 5 years; Microsoft
          will process data as described below.
        </p>
        <p>
          UBC will make the results of this study available to participants,
          course instructors, and university partners including Microsoft. All
          the log data is anonymized so that you cannot be identified by UBC or
          Microsoft researchers. It is expected that this research will be
          published as part of students’ graduate theses, journals,
          publications, or other sources; thus, your participation is
          appreciated for contributing to advancing knowledge and graduate
          students’ research. Additionally, ViDeX may collect information about
          your use of the application (see above) and send that data to
          Microsoft, or the data may be collected and later given to Microsoft.
          Microsoft may process data in the United States. Microsoft may use
          this information to provide and improve the application and other
          Microsoft offerings, including commercial versions of those offerings
          and/or the application which Microsoft develops and distributes to
          customers.
        </p>
        <p>
          Microsoft may have separate written commitments to you concerning the
          use or protection of content or data, in Microsoft license terms that
          may be presented to you for Office 365 technologies (such as OneNote)
          that you use in conjunction with the study. With respect to the use
          and protection of data collected from you during the study and
          provided to Microsoft, this consent form will prevail to the extent of
          any conflicts between it and those Microsoft commitments.
        </p>
        <p>
          If you do not want to participate in this study, you may continue to
          use the software, but you will need to opt-out of the data collection
          after the study completion. Please contact the Principal Investigator,
          Dr. Sidney Fels (ssfels@ece.ubc.ca) or Dr. Negar M Harandi
          (negarmh@mail.ubc.ca) to have your data removed from the database.
        </p>
        <p>
          There are no immediate benefits to participating, but, in the future,
          others may benefit from what we learn.
        </p>
        <p>
          <span>Questions? </span>
          If you have any questions or concerns, please contact Dr. Negar M.
          Harandi at negarmh@mail.ubc.ca. If you have any concerns or complaints
          about your rights as a research participant and/or your experiences
          while participating in this study, contact the Research Participant
          Complaint Line in the UBC Office of Research Ethics at 604-822-8598 or
          e-mail RSIL@ors.ubc.ca or call toll free 1-877-822-8598.
        </p>
        <p>
          You have the right to refuse to participate in this study at any time.
          If you decide to take part, you may choose to pull out of the study at
          any time without giving a reason and without any negative impact on
          your class standing. However, if you want to continue to use the
          software, you will be required to request your data be removed at the
          end of the study as logging of your data is needed to continue to
          support the functionality of ViDeX during the study period.
        </p>
        <p>
          By using ViDeX, you agree to provide consent for the use of your data
          as outlined above.
        </p>
      </div>
    );
  }
}

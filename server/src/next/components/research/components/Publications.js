import PublicationCard from './PublicationCard';
import React, { Component, Fragment } from 'react';
import { Pagination } from 'semantic-ui-react';

export default class Publications extends Component {
  render() {
    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', margin: "50px" }}
      >
        <PublicationCard
          header="Weaving together media, technologies, and people: Students’ information practices in flipped classrooms. (2019 ILS)"
          meta="Samuel Dodson, Ido Roll, Negar M. Harandi, Sidney Fels, Dongwook Yoon"
          description="Students in flipped classrooms are challenged to orchestrate an increasingly
          heterogeneous collection of learning objects, including audiovisual materials as well as traditional
          learning objects, such as textbooks and syllabi. This study aims to examine students’ information
          practices interacting with and synthesizing across learning objects, technologies and people in flipped
          classrooms."
          path="/static/research-papers/2019-ILS-Weaving-Together.pdf"
        />
        <PublicationCard
          header="Instructors Desire Student Activity, Literacy, and Video Quality Analytics to Improve Video-based Blended Courses. (2019 L@S)"
          meta="Matthew Fong, Samuel Dodson, Negar Mohaghegh Harandi, Kyoungwon Seo, Dongwook Yoon, Ido Roll, Sidney Fels"
          description="While video becomes increasingly prevalent in educational settings, current research has yet to investigate what feedback instructors need regarding their students' engagement and learning despite video technologies being equipped to provide viewing analytics and collect student feedback."
          path="/static/research-papers/2019-L@S-Instructor-Desire.pdf"
        />
        <PublicationCard
          header="Video-Based Consensus Annotations for Learning:A Feasibility Study (2019 ASIS&T)"
          meta="Samuel Dodson, Matthew Fong, Luanne Freund, Rick Kopak, Dongwook Yoon, Sidney Fels"
          description=" Wwe explore the feasibility of aggregating students’ annotations of videos 
          (e.g., highlights, notes, and tags) to identify “hot spots,” which can signal areas of in-
          terest to subsequent learners."
          path="/static/research-papers/asist-2018-heatmap-v6-final.pdf"
        />
        <PublicationCard
          header="“Can you believe [1:21]?!”: Content and time-based reference patterns in video comments. (2019 CHI)"
          meta="Matin Yarmand, Dongwook Yoon, Samuel Dodson, Ido Roll, Sidney Fels"
          description="We present a taxonomy for classifying video references, generate novel design concepts by analyzing thousands of YouTube comments, and introduce an empirically-motivated proof-of-concept interface."
          path="/static/research-papers/2019-chi-video-comments.pdf"
        />
        <PublicationCard
          header="Video annotations in helping locate in-video information for revisitation (2019 Master's thesis)"
          meta="Min Li"
          description="Master's thesis published in UBC."
          path="/static/research-papers/2019-Master-Thesis-Min.pdf"
        />
        <PublicationCard
          header="An Active Viewing Framework for Video-Based Learning (2018 L@S)"
          meta="Samuel Dodson, Ido Roll, Matthew Fong, Dongwook Yoon, Negar M. Harandi, Sidney Fels"
          description="This paper addresses this need by introducing a framework of
            active viewing, which is situated in an established model of
            active learning to describe students’ behaviors while learning
            from video."
          path="/static/research-papers/2018-l@s-active-viewing-framework.pdf"
        />
        <PublicationCard
          header="ViDeX: A Platform for Personalizing Educational Videos (2018 JCDL)"
          meta="Matthew  Fong,  Samuel  Dodson,  Xueqin  Zhang,  Ido  Roll,  and  Sidney  Fels. 2018"
          description="As video-based learning is increasingly used in all sectors of 
          education, there is a need for video players that support active viewing
          practices. We introduce a video player that allows students to mark
          up video with highlights, tags, and notes in order to personalize
          their video-based learning experience."
          path="/static/research-papers/2018-jcdl-videx-platform-personalizing.pdf"
        />
        <PublicationCard
          header="Active Viewing: A Study of Video Highlighting in the Classroom (2018 CHIIR)"
          meta="Samuel Dodson, Ido Roll, Matthew Fong, Dongwook Yoon, Negar M. Harandi, Sidney Fels"
          description="Video is an increasingly popular medium for education. Motivated
          by the problem of video as a one-way medium, this paper inves-
          tigates the ways in which learners’ active interaction with video
          materials contributes to active learning. In this study, we exam-
          ine active viewing behaviors, specifically seeking and highlighting
          within videos, which may suggest greater levels of participation
          and learning."
          path="/static/research-papers/2018-chiir-active-viewing-study.pdf"
        />
        <PublicationCard
          header="Student Video-Usage in Introductory Engineering Courses (2018 CEEA)"
          meta="Negar M. Harandi, Farshid Agharebparast, Luis Linares, Samuel Dodson, Ido Roll, Matthew Fong, Dongwook Yoon and Sidney Fels"
          description="Canadian Engineering Education Association (CEEA - ACEG18)"
          path="/static/research-papers/CEEA-FinalSubmission.pdf"
        />
        <PublicationCard
          header="Investigation of a quick tagging mechanism to help enhance the video learning experience (2017 Master's thesis)"
          meta="Xueqin Zhang"
          description="Master's thesis published in UBC."
          path="/static/research-papers/2017-Master-Thesis-Qin.pdf"
        />
        <PublicationCard
          header="An Investigation of Textbook-Style Highlighting for Video (2016 GI)"
          meta="Fong, Matthew; Miller, Gregor; Zhang, Xueqin; Roll, Ido; Hendricks, Christina; Fels, Sidney"
          description="We provided students with a number of video interface features to establish which they would find most useful for video courses. 
          From this, we designed an interface which uses textbook-style highlighting on a video filmstrip and transcript, both presented adjacent to a video player. 
          This interface was qualitatively evaluated to determine if highlighting works well for saving intervals, 
          and what strategies students use when given both direct video highlighting and the textbased transcript interface"
          path="/static/research-papers/gi2016-26.pdf"
        />
        <PublicationCard
          header="How Personal Video Navigation History can be Visualized (2014 SIGGRAPH)"
          meta="Hajri, Abir Al; Fong, Matthew; Miller, Gregor; Fels, Sidney"
          description="Video navigation histories are a simple archive that a person can use to easily ﬁnd a previously viewed video interval. 
          They may navigate to the exact location within the original video simply by clicking on the references within their history. 
          This provides the user with a record for historical navigation and removes much of the burden of relying on memory. "
          path="/static/research-papers/alhajri-etal-siggraph2014.pdf"
        />
        <PublicationCard
          header="Casual Authoring using a Video Navigation History (2014 GI)"
          meta="Fong, Matthew; Hajri, Abir Al; Miller, Gregor; Fels, Sidney"
          description="We propose the use of a personal video navigation history, which records a user’s viewing behaviour, as a basis for casual video editing and sharing. 
          Our novel interaction supports users’ navigation of previously-viewed intervals to construct new videos via simple playlists. 
          The intervals in the history can be individually previewed and searched, ﬁltered to identify frequently-viewed sections, and added to a playlist from which they can be reﬁned and re-ordered to create new videos. "
          path="/static/research-papers/fong-etal-gi2014.pdf"
        />
        <PublicationCard
          header="Fast Forward with your VCR: Visualizing Single-Video Viewing Statistics for Navigation and Sharing (2014 GI)"
          meta="Hajri, Abir Al; Fong, Matthew; Miller, Gregor; Fels, Sidney"
          description="Online video viewing has seen explosive growth, yet simple tools to facilitate navigation and sharing of the large video space have not kept pace. We propose the use of single-video viewing statistics as the basis for a visualization of video called the View Count Record (VCR). 
          Our novel visualization utilizes variable-sized thumbnails to represent the popularity (or affectiveness) of video intervals, and provides simple mechanisms for fast navigation, informed search, video previews, simple sharing and summarization. "
          path="/static/research-papers/alhajri-etal-gi2014.pdf"
        />
        <PublicationCard
          header="Visualization of Personal History for Video Navigation (2014 CHI)"
          meta="Hajri, Abir Al; Miller, Gregor; Fong, Matthew; Fels, Sidney"
          description="We present an investigation of two different visualizations of videohistory: Video Timeline and Video Tiles. 
          VideoTimeline extends the commonly employed list-based visualization for navigation history by applying size to indicate heuristics and occupying the full screen with a two-sided timeline."
          path="/static/research-papers/alhajri-etal-chi2014.pdf"
        />
        <PublicationCard
          header="Video Navigation using a Personal Viewing History (2013 INTERACT)"
          meta="Hajri, Abir Al; Miller, Gregor; Fels, Sidney; Fong, Matthew"
          description=" We describe a new video interface based on a recorded personal navigation history which 
          provides simple mechanisms to quickly find and watch previously viewed intervals, highlight segments of video the user found interesting and support other video tasks such as crowd-sourced video popularity measures and consumer-level video editing."
          path="/static/research-papers/alhajri-etal-interact2013.pdf"
        />
      </div>
    );
  }
}

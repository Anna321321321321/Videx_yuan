import { Grid } from 'semantic-ui-react';
import React, { Component, Fragment } from 'react';
import AuthorCard from './AuthorCard';

export default class AuthorContainer extends Component {
  render() {
    return (
      <Fragment>
        <Grid stackable={true} relaxed={true} columns={4} padded>
          <Grid.Row>
            <Grid.Column>
              <AuthorCard
                imageSrc="/static/profile-pics/sid.jpg"
                name="Sidney Fels"
                title="Research Lead"
                description="Sid Fels: (Prof, ECE, British Columbia, 1998-); PhD (CS, Toronto, 1994); MSc (CS, Toronto 1994); BASc (EE, Waterloo, 1988): Sid is a Distinguished University Scholar at UBC (2004-). 
                He was a visiting researcher at ATR Media Integration	&amp; Communications Research Laboratories in Kyoto, Japan (1996-1997).  
                 He is internationally known for his work in human-computer interaction, biomechanical modeling, neural networks, new interfaces for musical expression and interactive arts. 
                Sid has been interested in how changing the interface for experiencing video can enable new forms of learning and thinking for over a decade. 
                He is the research lead on this project."
                contact="ssfels@ece.ubc.ca"
              />
            </Grid.Column>
            <Grid.Column>
              <AuthorCard
                imageSrc="/static/profile-pics/dongwook.jpg"
                name="Dongwook Yoon"
                title="Researcher"
                description="Dongwook Yoon is an assistant professor at the UBC department of computer science. Yoon&apos;s research lies at the intersection of human-computer interactions, computer-supported cooperative work, computer-mediated communication, and educational technology.
                He builds interactive systems powered by expressive multimodal interactions. Yoon received his B.S. with Electrical Engineering in 2007 and M.S. with Computer Graphics in 2009 at Seoul National University. In 2017, Yoon earned his Ph.D. in Information Science at Cornell University."
                contact="http://dwyoon.com/"
              />
            </Grid.Column>
            <Grid.Column>
              <AuthorCard
                imageSrc="/static/profile-pics/ido.jpg"
                name="Ido Roll"
                title="Researcher"
                description="I am Ido Roll, Senior Manager for Research and Evaluation in the Centre for Teaching,
                 Learning, and Technology (CTLT) in the University of British Columbia (UBC). I graduated from the Human Computer Interaction Institute (HCII) at Carnegie Mellon University, and later was a researcher at the 
                 Carl Wieman Science Education Initiative (CWSEI) and the Department of Educational and Counselling Psychology, 
                 and Special Education (ECPS) in UBC. I study how adaptive technologies can support students in becoming better learners in classroom and online settings. 
                 I am particularly interested in using large-scale fine-grain data to support personalized instruction and inform theories of learning, as part of the growing field of Learning Analytics."
                contact={'http://idoroll.com/'}
              />
            </Grid.Column>
            <Grid.Column>
              <AuthorCard
                imageSrc="/static/profile-pics/negar.jpg"
                name="Negar M. Harandi"
                title="Teaching and Learning Fellow"
                description="Negar is a Teaching and Learning Fellow in the department of Electrical and Computer Engineering at UBC, where she received her PhD in 2016. 
                In her new role, Negar has been facilitating the use of ViDeX in courses across UBC. 
                Her research uses student surveys and interviews to explore engineering education topics including, but not limited to, the use of videos in large flipped and blended classrooms."
                contact="negarm@ece.ubc.ca"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <AuthorCard
                imageSrc="/static/profile-pics/kyoungwons.png"
                name="Kyoungwon Seo"
                title="Postdoctoral Research Fellow"
                description="Kyoungwon Seo is a Postdoctoral Research Fellow at the UBC department of Electrical and Computer Engineering. 
                He has deep expertise in user experience design methods, data science skills, and 
                the capacity to create virtual reality prototypes to test assumptions. 
                His interests focused on “how to promote the user’s psychological, emotional and behavioral well-being” using HCI (Human-Computer Interaction) 
                models, user-centered design methods, evaluation metrics, experimental design, and statistical methodologies. 
                He has collaborated with multiple interdisciplinary partners such as product designers, engineers, medical doctors, and users, to identify the key technologies to solve their wicked problems."
                contact="https://kyoungwonseo.com/"
              />
            </Grid.Column>
            <Grid.Column>
              <AuthorCard
                imageSrc="/static/profile-pics/samuel.jpg"
                name="Samuel Dodson"
                title="PhD Student"
                description="Samuel is a PhD student at the UBC iSchool. 
                His work explores how students use and create information by annotating and note taking in different media (e.g., audio, text, and video). 
                Samuel conducts mixed methods research in order to investigate how to support students' agency in the video-based learning practices."
                contact="dodsons@mail.ubc.ca"
              />
            </Grid.Column>
            <Grid.Column>
              <AuthorCard
                imageSrc="/static/profile-pics/matt.jpg"
                name="Matthew Fong"
                title="PhD Student"
                description="Matthew Fong (University of British Columbia) is a PhD student in the Electrical and Computer Engineering Department at the UBC. 
                His research explores the behaviours of students using educational video interfaces in and out of the classroom, as well as instructors' use of video and video analytics."
                contact="mfong@ece.ubc.ca"
              />
            </Grid.Column>
            <Grid.Column>
              <AuthorCard
                imageSrc="/static/profile-pics/ranjitha.jpg"
                name="Ranjitha Jaddigadde Srinivasa"
                title="MASc Student"
                description="Ranjitha is a graduate student in the department of Electrical and Computer Engineering at UBC. 
                She is currently working in the Human Communication Technologies lab under the supervision of Dr. Sidney Fels. 
                Her primary research interests are in the areas of Human Computer Interaction and Computer Vision."
                contact="ranjitha.jsrinivasa@gmail.com"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <AuthorCard
                imageSrc="/static/profile-pics/Xueqin.jpg"
                name="Xueqin Zhang"
                title="Software Engineer"
                description="Xueqin has been working as software engineer in Human Communication Technologies Lab at UBC since 2019. She was a MASc student in the department of Electrical and Computer Engineering at UBC. She loves the beauty of HCI and is passionate about solving complex engineering problems."
                contact="abbiezhangxq@hotmail.com"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment>
    );
  }
}
